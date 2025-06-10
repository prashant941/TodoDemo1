import User from "../models/user.model.js";

export const authService = async (query) => {
  const userExites = await User.findOne({ where: query });

  if (!userExites) {
    return false;
  }
  return userExites;
};
