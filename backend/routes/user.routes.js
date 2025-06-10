import express from "express";
import { logOut, Profile } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/me").get(authMiddleware, Profile);
router.post("/logout", logOut);
export default router;
