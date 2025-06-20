import { DataTypes } from "sequelize";
import sequelize from "../config/database.ts";
import Todo from "./todo.model.ts";
import User from "./user.model.ts";
const Comment = sequelize.define("comment", {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  text: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

Todo.hasMany(Comment, { foreignKey: "todoId" });
Comment.belongsTo(Todo, { foreignKey: "todoId" });

User.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(User, { foreignKey: "userId" });

export default Comment;
