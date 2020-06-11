export interface IUserSignInInput {
  email: string;
  password: string;
}

export interface IUserSignUpInput extends IUserSignInInput {
  firstName: string;
  lastName?: string;
}

export interface IUserJWTPayload {
  _id: string;
}
