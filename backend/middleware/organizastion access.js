import { validate } from "uuid";
import { UserOrganization } from "../models/userorganization.js";
import { Organization } from "../models/organization.js";

export const OrganizationAsscess = async (req, res, next) => {
  try {
    const { orgId } = req.params;
    const userId = req.id;

    if (!validate(orgId)) {
      return res.status(400).json({ message: "id Note formate" });
    }
    const whosCreateOrg = await Organization.findOne({ uuid: orgId });
    if (!whosCreateOrg) return res.status(404).json({ message: "Not Found " });

    const userOrg = await UserOrganization.findOne({
      where: { userId: userId, status: "accepted" },
    });
    if (!userOrg) {
      return res.status(404).json({ message: "Not Access This Organization" });
    }

    req.id = userId;
    req.orgId = orgId;
    next();
  } catch (error) {
    console.log(error);
  }
};
