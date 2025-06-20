import User from "../models/user.model.ts";

type AuthQuery = { email: string } | { otp: number };

export const authService = async (query: AuthQuery) => {
  const user = await User.findOne({ where: query });
  return user ?? null;
};
