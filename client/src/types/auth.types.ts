export interface SignUpPayload {
  name: string;
  email: string;
  password: string;
}

export interface SignInPayload {
  email: string;
  password: string;
}

export interface ForgetPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token?: string;
  newPassword?: string;
  otp?:string | object
}

export interface AuthResponse {
  message: string;
  status: number;
  data: any;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
}
export interface AuthState {
  user: any;
  isAuthenticated: boolean;
  isLoading: string | boolean;
  isError: boolean;
  message: string;
}

export type stateMange = {
  auth?: AuthState;
  org?: object;
  todo?: object;
};
