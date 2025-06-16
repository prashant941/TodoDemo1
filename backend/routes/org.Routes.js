import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  allInvitastion,
  createOrganization,
  deleteOrg,
  myOrg,
  pendingInvitastion,
  respondInvite,
  sendInvite,
  updateOrg,
} from "../controllers/org.controller.js";
const router = express.Router();
router.post("/", authMiddleware, createOrganization);
router.post("/:orgId/invite", authMiddleware, sendInvite);
router.post("/invite/respond", authMiddleware, respondInvite);
router.get("/myorg", authMiddleware, myOrg);
router.delete("/deleteOrg/:orgId", authMiddleware, deleteOrg);
router.get("/myInviteOrg", authMiddleware, allInvitastion);
router.get("/pending", authMiddleware, pendingInvitastion);
router.post("/orgUpdate/:orgId", authMiddleware, updateOrg);
export default router;
