import type { Request, Response } from "express";
import { Op } from "sequelize";
import { Organization } from "../models/organization.ts";
import User from "../models/user.model.ts";
import { UserOrganization } from "../models/userorganization.ts";
import { AsyncHandler } from "../utils/asyncHandler.ts";
import { validate as uuidValidate } from "uuid";

interface AuthRequest extends Request {
  id?: string;
}

export const createOrganization = AsyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { name }: { name: string } = req.body;
    const userID = req.id;

    if (!name || !userID) {
      return res.status(400).json({ message: "Invalid request" });
    }

    const org = await Organization.create({
      name,
      createdBy: userID,
    });

    await UserOrganization.create({
      userId: userID,
      organizationId: org.get("id"),
      role: "admin",
      status: "accepted",
    });

    res.status(201).json(org);
  }
);

export const sendInvite = AsyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { email } = req.body;
    const { orgId } = req.params;
    const userId = req.id;

    if (!email || !orgId || !userId) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const adminEntry = await UserOrganization.findOne({
      where: {
        userId,
        organizationId: orgId,
        role: "admin",
        status: "accepted",
      },
    });

    if (!adminEntry) return res.status(403).json({ message: "Not authorized" });

    const invitedUser = await User.findOne({ where: { email } });

    if (!invitedUser)
      return res.status(404).json({ message: "User not found" });

    const existingInvite = await UserOrganization.findOne({
      where: { userId: invitedUser.get("uuid"), organizationId: orgId },
    });

    if (existingInvite) {
      return res
        .status(400)
        .json({ message: "User already invited or a member" });
    }

    await UserOrganization.create({
      userId: invitedUser.get("uuid"),
      organizationId: orgId,
      role: "viewer",
      status: "pending",
    });

    res.status(200).json({ message: "Invite sent" });
  }
);

export const respondInvite = AsyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { orgId, action } = req.body;
    const userId = req.id;

    if (!["accept", "reject"].includes(action)) {
      return res.status(400).json({ message: "Invalid action." });
    }

    const [updatedCount] = await UserOrganization.update(
      { status: action },
      {
        where: {
          userId,
          organizationId: orgId,
          status: "pending",
        },
      }
    );

    if (updatedCount === 0) {
      return res
        .status(404)
        .json({ message: "Invite not found or already responded." });
    }

    return res.status(200).json({ message: `Invite ${action}ed` });
  }
);

export const allInvitations = AsyncHandler(
  async (req: AuthRequest, res: Response) => {
    const userId = req.id;

    const organizations = await UserOrganization.findAll({
      where: {
        userId: userId,
        status: "accept",
        role: "viewer",
      },
      include: [
        {
          model: Organization,
          as: "organization",
          attributes: ["id", "name"],
        },
      ],
    });

    res.status(200).json(organizations);
  }
);

export const pendingInvitations = AsyncHandler(
  async (req: AuthRequest, res: Response) => {
    const userId = req.id;

    const pending = await UserOrganization.findAll({
      where: {
        userId,
        status: "pending",
      },
      include: [
        {
          model: Organization,
          as: "organization",
          attributes: ["id", "name"],
        },
      ],
    });

    res.status(200).json(pending);
  }
);

export const myOrg = AsyncHandler(async (req: AuthRequest, res: Response) => {
  const id = req.id;

  const allOrgs = await Organization.findAll({
    where: { createdBy: id },
  });

  if (!allOrgs || allOrgs.length === 0) {
    return res.status(404).json({ message: "No organizations found" });
  }

  res.status(200).json(allOrgs);
});

export const deleteOrg = AsyncHandler(
  async (req: AuthRequest, res: Response) => {
    const userId = req.id;
    const { orgId } = req.params;

    if (!uuidValidate(orgId)) {
      return res.status(400).json({ message: "Invalid organization ID" });
    }

    const organization = await Organization.findOne({
      where: { id: orgId, createdBy: userId },
    });

    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }

    await organization.destroy();
    res.status(200).json({ message: "Deleted successfully" });
  }
);

export const updateOrg = AsyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { orgId } = req.params;
    const userId = req.id;
    const { name } = req.body;

    if (!uuidValidate(orgId)) {
      return res.status(400).json({ message: "Invalid organization ID" });
    }

    const organization = await Organization.findOne({
      where: { id: orgId, createdBy: userId },
    });

    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }

    organization.set("name", name);
    await organization.save();

    res.status(200).json(organization);
  }
);
