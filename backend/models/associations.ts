// associations.js
import User from "./user.model.js";
import { Organization } from "./organization.js";
import Todo from "./todo.model.js";
import { UserOrganization } from "./userorganization.js";

Organization.hasMany(Todo, { foreignKey: "organizationId" });
Todo.belongsTo(Organization, { foreignKey: "organizationId" });

Organization.belongsToMany(User, {
  through: UserOrganization,
  foreignKey: "organizationId",
});
User.belongsToMany(Organization, {
  through: UserOrganization,
  foreignKey: "userId",
});

Organization.belongsTo(User, {
  foreignKey: "createdBy",
  as: "creator",
});

UserOrganization.belongsTo(Organization, {
  foreignKey: "organizationId",
  as: "organization",
});

export { User, Organization, Todo, UserOrganization };
