import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import User from "./user.model.js";
import Todo from "./todo.model.js";
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
Todo.belongsTo(Organization, { foreignKey: "organizationId" });

Organization.belongsToMany(User, {
  through: "UserOrganization",
  foreignKey: "organizationId",
});
User.belongsToMany(Organization, {
  through: "UserOrganization",
  foreignKey: "userId",
});
