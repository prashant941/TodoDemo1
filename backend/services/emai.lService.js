import User from "../models/user.model.js";
import nodemailer from 'nodemailer';
export const EmailService = async (otp,email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "pg.hmrtech@gmail.com",
      pass: "yhty shmk lzxu erxl",
    },
  });

  await transporter.sendMail({
    from: "<pg.hmrtech@gmail.com>",
    to: email,
    subject: "Hello :heavy_check_mark:",
    text: "Hello user",
    html: `<div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 30px;">
      <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <div style="padding: 20px; text-align: center; background-color: #4a90e2; color: white;">
          <h1 style="margin: 0;">Your OTP Code</h1>
        </div>
        <div style="padding: 30px; text-align: center;">
          <p style="font-size: 16px; color: #333;">Use the following One-Time Password (OTP) to complete your login. The code is valid for 10 minutes.</p>
          <div style="margin: 20px 0; font-size: 28px; font-weight: bold; letter-spacing: 4px; color: #4a90e2;">
            ${otp}
          </div>
          <p style="font-size: 14px; color: #999;">If you didn t request this code, please ignore this email.</p>
        </div>
        <div style="padding: 20px; text-align: center; background-color: #f4f4f4; font-size: 12px; color: #777;">
          &copy; ${new Date().getFullYear()} Your Company. All rights reserved.
        </div>
      </div>
    </div>`,
  });
  const otpExpiryTime = new Date(Date.now() + 10 * 60 * 1000);
  await User.update(
    { otp: otp.toString(), otpExpires: otpExpiryTime },
    { where: { email } }
  );
};
