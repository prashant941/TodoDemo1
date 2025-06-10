import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Token Note Provide" });
  }
  try {
    const isVerify = jwt.verify(token, process.env.JWT_SECRET);
    const userData = await User.findOne({
      where: { uuid: isVerify.id },
      attributes: { exclude: ["password"] },
    });

    req.user = userData;
    req.id = userData?.uuid;
    next();
  } catch (error) {
    return res.status(402).json({ message: "Token Is Expire" });
  }
};
