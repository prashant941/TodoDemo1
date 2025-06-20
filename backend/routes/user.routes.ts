import express from "express";
import { logOut, Profile } from "../controllers/user.controller.ts";
import { authMiddleware } from "../middleware/auth.middleware.ts";

const router = express.Router();

router.route("/me").get(authMiddleware, Profile);
router.post("/logout", logOut);
export default router;
