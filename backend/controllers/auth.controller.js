import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { authService } from "../services/authservice.js";
import User from "../models/user.model.js";
import { AsyncHandler } from "../utils/asyncHandler.js";
import { EmailService } from "../services/emai.lService.js";
export const Registration = AsyncHandler(async (req, res) => {
  if (!req.body)
    return res.status(400).json({ message: "All Feild IS Required" });

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All Feild Is Required" });
  }
  const userExites = await authService({ email });
  if (userExites) {
    return res.status(400).json({ message: "Email Is Alreday Exites" });
  }
  const HashPassword = await bcryptjs.hash(password, 10);
  const userData = await User.create({ name, email, password: HashPassword });
  if (!userData) {
    return res.status(400).json({ message: "No Data Inserted" });
  }

  res.status(200).json({ message: "Register successfully" }, userData);
});

export const login = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All Feild Is required" });
  }
  const userExites = await authService({ email });
  if (!userExites) {
    return res.status(402).json({ message: "User Not Registr" });
  }
  const comparePassword = await bcryptjs.compare(
    password,
    userExites?.password
  );
  if (!comparePassword) {
    return res.status(401).json({ message: "Invalid Password" });
  }
  const token = jwt.sign({ id: userExites.uuid }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
    path: "/",
    maxAge: 2 * 24 * 60 * 60 * 1000,
  });

  const userObj = userExites.get({ plain: true });
  const { password: _, ...whitoutPassword } = userObj;
  res
    .status(200)
    .json({ message: "Login Successfully", data: whitoutPassword });
});

export const forgetPassword = AsyncHandler(async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: "Email Is Required" });
  }
  const { email } = req.body;
  if (!email) {
    return res.status(402).json({ message: "Invalid Email" });
  }

  const userExites = await authService({ email });

  if (!userExites) {
    return res.status(404).json({ message: "User Not Exites" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);

  EmailService(otp, email)
    .then(() => {
      res.status(200).json({ message: "Otp Send Successfully" });
    })
    .catch((err) => {
      console.log(err);

      res.status(400).json({ message: "Otp Error" });
    });
});

export const ResertPassword = AsyncHandler(async (req, res) => {

  const { otp: sedingOtp, password } = req.body;
  const currentTime = new Date();
  const user = await authService({ otp: sedingOtp });
  if (!user) {
    return res.status(402).json({ message: "Wrong Otp" });
  }

  if (user.otp !== parseInt(sedingOtp) || currentTime > user.otpExpires) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }
  if (!password) {
    return res.status(200).json({ message: "Verificastion Successfully" });
  }
  const HashPassword = await bcryptjs.hash(password, 10);
  await User.update(
    { password: HashPassword, otp: null, otpExpires: null },
    { where: { email: user?.email } }
  );
  res.status(200).json({ message: "Passowrd Updated Successfully" });
});

export const logout = AsyncHandler(async (_, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
    path: "/",
  });
  res.status(200).json({ message: "Logout Successfully" });
});
