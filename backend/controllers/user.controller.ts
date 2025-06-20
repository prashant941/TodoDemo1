
import { AsyncHandler } from "../utils/asyncHandler.ts";
import type { Request, Response } from 'express';

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const Profile = AsyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userData = req.user;
    res.status(200).json(userData);
  }
);

export const logOut = AsyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout Successfully" });
  }
);
