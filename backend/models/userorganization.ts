import sequelize from "../config/database.ts";
import { DataTypes } from "sequelize";
import { Organization } from "./organization.ts";

export const UserOrganization = sequelize.define("UserOrganization", {
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
  },
  organizationId: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
  },
  role: DataTypes.STRING,
  status: DataTypes.STRING, 
});

UserOrganization.belongsTo(Organization, {
  foreignKey: "organizationId",
  as: "organization",
});