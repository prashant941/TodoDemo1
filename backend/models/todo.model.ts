import { DataTypes } from "sequelize";
import sequelize from "../config/database.ts";
import User from "./user.model.ts";

const Todo = sequelize.define("Todo", {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

User.hasMany(Todo, { foreignKey: "userId" });
Todo.belongsTo(User, { foreignKey: "userId" });


export default Todo;
