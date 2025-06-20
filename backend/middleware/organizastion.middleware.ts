import jwt from 'jsonwebtoken';
import type { JwtPayload } from 'jsonwebtoken';
import User from "../models/user.model.ts";
import type { Request, Response, NextFunction } from 'express';

interface AuthenticatedRequest extends Request {
  user?: any;
  id?: string;
}

export const OrganizationMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "Token Not Provided" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    const userData = await User.findOne({
      where: { uuid: decoded.id },
      attributes: { exclude: ["password"] },
    });

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const plainUser = userData.get(); // Plain object
    req.user = plainUser;
    req.id = plainUser.uuid;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token is expired or invalid" });
  }
};
