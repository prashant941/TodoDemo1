export interface UserAttributes {
  uuid: string;
  name: string;
  email: string;
  password: string;
  otp: number | null;
  otpExpires: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}
