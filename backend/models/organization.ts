import sequelize from "../config/database.ts";
import { DataTypes } from "sequelize";
import User from "./user.model.ts";
import Todo from "./todo.model.ts";
export const Organization = sequelize.define("organization", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdBy: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

Organization.hasMany(Todo, { foreignKey: "organizationId" });
Todo.belongsTo(Organization, { foreignKey: "orAganizationId" });

Organization.belongsToMany(User, {
  through: "UserOrganization",
  foreignKey: "organizationId",
});
User.belongsToMany(Organization, {
  through: "UserOrganization",
  foreignKey: "userId",
});
