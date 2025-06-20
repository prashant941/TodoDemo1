import type { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { authService } from "../services/authservice.ts";
import User from "../models/user.model.ts";
import { AsyncHandler } from "../utils/asyncHandler.ts";
import { EmailService } from "../services/emai.lService.ts";

interface AuthRequestBody {
  name?: string;
  email: string;
  password?: string;
  otp?: string;
}

export const Registration = AsyncHandler(
  async (req: Request<{}, {}, AuthRequestBody>, res: Response) => {
    const { name, email, password } = req.body;
    // const name = (req.body as {name:string}).name demo
    // const {
    //   name,
    //   email,
    //   password,
    // }: { name: string; email: string; password: string } = req.body;
    // const name = (req.b ody as {name:string}).name

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const userExists = await authService({ email });

    if (userExists) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const userData = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (!userData) {
      return res.status(500).json({ message: "Failed to register user." });
    }

    return res
      .status(200)
      .json({ message: "Registered successfully", data: userData });
  }
);

export const login = AsyncHandler(
  async (req: Request<{}, {}, AuthRequestBody>, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const userExists = await authService({ email });
    if (!userExists) {
      return res.status(404).json({ message: "Please sign up first." });
    }

    const isMatch = await bcryptjs.compare(
      password,
      userExists.get("password") as string
    );
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign(
      { id: userExists.get("uuid") },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "2d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
    });

    const userObj = userExists.get({ plain: true });
    const { password: _, ...withoutPassword } = userObj;

    return res
      .status(200)
      .json({ message: "Login successful", data: withoutPassword });
  }
);

export const forgetPassword = AsyncHandler(
  async (req: Request<{}, {}, AuthRequestBody>, res: Response) => {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    const userExists = await authService({ email });

    if (!userExists) {
      return res.status(404).json({ message: "User does not exist." });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 mins

    await User.update({ otp, otpExpires }, { where: { email } });

    try {
      await EmailService(otp, email);
      return res.status(200).json({ message: "OTP sent successfully." });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to send OTP." });
    }
  }
);

export const ResetPassword = AsyncHandler(
  async (req: Request<{}, {}, AuthRequestBody>, res: Response) => {
    const { otp: inputOtp, password } = req.body;

    if (!inputOtp) {
      return res.status(400).json({ message: "OTP is required." });
    }

    const user = await authService({ otp: Number(inputOtp) });

    if (!user) {
      return res.status(404).json({ message: "Invalid or expired OTP." });
    }

    const now = new Date();
    if (
      user.get("otp") !== parseInt(inputOtp!) ||
      now > (user.get("otpExpires") as Date)
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP." });
    }

    if (!password) {
      return res.status(200).json({ message: "OTP verification successful." });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    await User.update(
      { password: hashedPassword, otp: null, otpExpires: null },
      { where: { email: user.get("email") } }
    );

    return res.status(200).json({ message: "Password updated successfully." });
  }
);

export const logout = AsyncHandler(async (_: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
  });

  return res.status(200).json({ message: "Logout successful." });
});
