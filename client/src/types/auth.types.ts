export interface ISignUpPayload {
  name: string;
  email: string;
  password: string;
}

export interface ISignInPayload {
  email: string;
  password: string;
}

export interface IForgetPasswordPayload {
  email: string;
}

export interface IResetPasswordPayload {
  token?: string;
  newPassword?: string;
  otp?: string | object;
}

export interface IAuthResponse {
  message: string;
  status: number;
  data: any;
}

export interface IUserProfile {
  id: string;
  name: string;
  email: string;
}
export interface IAuthState {
  user: any;
  isAuthenticated: boolean;
  isLoading: string | boolean;
  isError: boolean;
  message: string;
}

export type IstateMange = {
  auth?: IAuthState;
  org?: object;
  todo?: object;
};
