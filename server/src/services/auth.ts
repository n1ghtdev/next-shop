/* eslint-disable no-underscore-dangle */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config';
import UserModel from '../models/user';
import { IUserJWTPayload } from '../typings';

export class AuthService {
  static async SignUp(input: any) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(input.password, salt);

      const userRecord = await UserModel.create({
        ...input,
        // salt: salt.toString('hex'),
        password: hashedPassword,
      });

      if (!userRecord) {
        throw new Error('User cannot be created');
      }

      const accessToken = this.generateAccessToken(userRecord._id);
      const refreshToken = this.generateRefreshToken(userRecord._id);
      await UserModel.updateOne({ _id: userRecord._id }, { refreshToken });

      const user = userRecord.toObject();
      delete user.password;
      delete user.refreshToken;

      return { user, accessToken, refreshToken };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async SignIn(email: string, password: string) {
    const userRecord = await UserModel.findOne({ email });

    if (!userRecord) {
      throw new Error("User with this email doesn't exists");
    }

    const isPasswordValid = await bcrypt.compare(password, userRecord.password);

    if (isPasswordValid) {
      const accessToken = this.generateAccessToken(userRecord._id);
      const refreshToken = this.generateRefreshToken(userRecord._id);
      await UserModel.updateOne({ _id: userRecord._id }, { refreshToken });

      const user = userRecord.toObject();
      delete user.password;
      delete user.refreshToken;

      return { user, accessToken, refreshToken };
      // eslint-disable-next-line no-else-return
    } else {
      throw new Error('Invalid password');
    }
  }

  static async updateTokens(token: string) {
    const payload: IUserJWTPayload = (await jwt.verify(
      token,
      config.JWT_REFRESH_SECRET
    )) as IUserJWTPayload;

    if (!payload) {
      throw new Error('Invalid Token');
    }

    const userRecord = await UserModel.findOne({ _id: payload._id });

    if (!userRecord) {
      throw new Error('User not found');
    } else if (userRecord.refreshToken !== token) {
      throw new Error('Session Expired');
    }

    const accessToken = this.generateAccessToken(userRecord._id);
    const refreshToken = this.generateRefreshToken(userRecord._id);
    await UserModel.updateOne({ _id: userRecord._id }, { refreshToken });

    const user = userRecord.toObject();
    delete user.password;
    delete user.refreshToken;

    return { user, accessToken, refreshToken };
  }

  static generateAccessToken(userId: string) {
    return jwt.sign(
      {
        _id: userId,
      },
      config.JWT_SECRET,
      { expiresIn: '30m' }
    );
  }

  static generateRefreshToken(userId: string) {
    return jwt.sign(
      {
        _id: userId,
      },
      config.JWT_REFRESH_SECRET,
      { expiresIn: '30d' }
    );
  }
}
