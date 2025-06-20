import express from "express";
import type { Request, Response, NextFunction } from "express";
import { authMiddleware } from "../middleware/auth.middleware.ts";
import {
  allInvitations,
  createOrganization,
  deleteOrg,
  myOrg,
  pendingInvitations,
  respondInvite,
  sendInvite,
  updateOrg,
} from "../controllers/org.controller.ts";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) =>
    createOrganization(req, res, next)
);

router.post(  
  "/:orgId/invite",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) =>
    sendInvite(req, res, next)
);

router.post(
  "/invite/respond",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) =>
    respondInvite(req, res, next)
);

router.get(
  "/myorg",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) => myOrg(req, res, next)
);

router.delete(
  "/deleteOrg/:orgId",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) => deleteOrg(req, res, next)
);

router.get(
  "/myInviteOrg",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) =>
    allInvitations(req, res, next)
);

router.get(
  "/pending",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) =>
    pendingInvitations(req, res, next)
);

router.post(
  "/orgUpdate/:orgId",
  authMiddleware,
  (req: Request, res: Response, next: NextFunction) => updateOrg(req, res, next)
);

export default router;
