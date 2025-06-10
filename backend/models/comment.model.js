import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Todo from "./todo.model.js";
import User from "./user.model.js";
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
