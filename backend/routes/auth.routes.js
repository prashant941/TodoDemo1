import express from "express";

import {
  Registration,
  ResertPassword,
  forgetPassword,
  login,
  logout,
} from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/sign-up", Registration);
router.post("/sign-in", login);
router.post("/logout",logout)
router.post("/forget-password", forgetPassword);
router.put("/reset-password", ResertPassword);

export default router;
