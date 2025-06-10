import { AsyncHandler } from "../utils/asyncHandler.js";

export const Profile = AsyncHandler(async (req, res) => {
  const userData = req.user;
  res.status(200).json(userData);
});

export const logOut = AsyncHandler(async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout Successfully" });
});
