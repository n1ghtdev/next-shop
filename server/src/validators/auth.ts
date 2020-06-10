import Joi from '@hapi/joi';
import { IUserSignUpInput } from '../typings';

export function signUpValidation(data: IUserSignUpInput) {
  const schema = Joi.object({
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).optional(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
}

export function signInValidation(data: IUserSignInInput) {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
}
