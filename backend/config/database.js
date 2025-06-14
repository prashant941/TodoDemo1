import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    logging: false,
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
  }
);

export default sequelize;
