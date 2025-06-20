import express from "express";
import {
  Registration,
  ResetPassword,
  forgetPassword,
  login,
  logout,
} from "../controllers/auth.controller.ts";

const router = express.Router();

router.post("/sign-up", Registration);

router.post("/sign-in", login);

router.post("/logout", logout);

router.post("/forget-password", forgetPassword);

router.put("/reset-password", ResetPassword);

export default router;
