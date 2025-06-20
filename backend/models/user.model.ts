import sequelize from "../config/database.ts";
import { DataTypes } from "sequelize";

const User = sequelize.define(
  "user",
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otp: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    otpExpires:{
        type:DataTypes.DATE,
        allowNull:true,
    }
  },
  {
    timestamps: true,
    tableName: "user",
  }
);

export default User;
