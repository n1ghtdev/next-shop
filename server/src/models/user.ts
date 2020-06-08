import { Schema, Document, model } from 'mongoose';
import { IOrder } from './order';

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: String,
  email: {
    type: String,
    required: true,
    min: 6,
    max: 64,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  refreshToken: String,
  role: {
    type: Number,
    enum: [0, 1],
    default: 1,
  },
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Order',
    },
  ],
});

enum Role {
  user = 1,
  admin = 0,
}

interface IUserSchema extends Document {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  refreshToken?: string;
  role: Role;
}

export interface IUser extends IUserSchema {
  orders: IOrder[];
}

export default model<IUser>('User', UserSchema);
