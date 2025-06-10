import { Sequelize } from "sequelize";
import { Organization } from "../models/organization.js";
import User from "../models/user.model.js";
import { UserOrganization } from "../models/userorganization.js";
import { AsyncHandler } from "../utils/asyncHandler.js";
import { validate } from "uuid";
export const createOrganization = AsyncHandler(async (req, res) => {
  const { name } = req.body;
  const userID = req.id;

  const org = await Organization.create({
    name,
    createdBy: userID,
  });

  await UserOrganization.create({
    userId: userID,
    organizationId: org.id,
    role: "admin",
    status: "accepted",
  });

  res.status(201).json(org);
});

export const sendInvite = AsyncHandler(async (req, res) => {
  const { email } = req.body;
  const { orgId } = req.params;

  const adminEntry = await UserOrganization.findOne({
    where: {
      userId: req.id,
      organizationId: orgId,
      role: "admin",
      status: "accepted",
    },
  });
  if (!adminEntry) return res.status(403).json({ message: "Not authorized" });
  const invitedUser = await User.findOne({ where: { email } });

  if (!invitedUser) return res.status(404).json({ message: "User Not Found" });

  const existingInvite = await UserOrganization.findOne({
    where: { userId: invitedUser.uuid, organizationId: orgId },
  });

  if (existingInvite) {
    return res.status(400).json({ message: "User Already Invited Or Member" });
  }

  await UserOrganization.create({
    userId: invitedUser.uuid,
    organizationId: orgId,
    role: "viwers",
    status: "pending",
  });

  res.status(200).json({ message: "Invite sent" });
});

export const respondInvite = AsyncHandler(async (req, res) => {
  const { orgId, action } = req.body;

  const invite = await UserOrganization.findOne({
    where: { userId: req.id, organizationId: orgId, status: "pending" },
  });

  if (!invite) return res.status(404).json({ error: "Invite not found" });

  if (action === "accept") {
    invite.status = "accepted";
    await invite.save();
    return res.status(200).json({ message: "Invite accepted" });
  } else if (action === "reject") {
    invite.status = "rejected";
    await invite.save();
    return res.status(200).json({ message: "Invite rejected" });
  } else {
    return res.status(400).json({ error: "Invalid action" });
  }
});

export const allInvitastion = AsyncHandler(async (req, res) => {
  const userId = req.id;
  const OrganizationData = await UserOrganization.findAll({
    where: {
      userId,
      status: "accepted",
      role: { [Sequelize.Op.ne]: "admin" },
    },
    include: [
      {
        model: Organization,
        as: "organization",
        attributes: ["id", "name"],
      },
    ],
  });

  return res.json(OrganizationData);
});
export const myOrg = AsyncHandler(async (req, res) => {
  const id = req.id;

  const allOrg = await Organization.findAll({
    where: { createdBy: id },
  });
  if (!allOrg) {
    return res.status(404).json({ message: "Not Found" });
  }
  res.status(200).json(allOrg);
});

export const deleteOrg = AsyncHandler(async (req, res) => {
  const userId = req.id;
  const { orgId } = req.params;
  if (!validate(orgId))
    return res.status(400).json({ message: "Id Not Valid" });
  const oneOrganization = await Organization.findOne({
    where: { id: orgId, createdBy: userId },
  });
  if (!oneOrganization)
    return res.status(404).json({ message: "Organization not Found !" });
  await oneOrganization.destroy();
  return res.status(200).json({ message: "Delete Sucessfully" });
});
export const pendingInvitastion = AsyncHandler(async (req, res) => {
  const userId = req.id;
  const OrganizationData = await UserOrganization.findAll({
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
  res.status(200).json(OrganizationData);
});
