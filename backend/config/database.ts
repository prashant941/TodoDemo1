import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const {
  DB_NAME,
  DB_USER,
  DB_PASS,
  DB_DIALECT,
  DB_HOST,
} = process.env;

if (!DB_NAME || !DB_USER || !DB_PASS || !DB_DIALECT || !DB_HOST) {
  throw new Error("Database environment variables are not fully defined.");
}

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  logging: false,
  dialect: DB_DIALECT as any, 
  host: DB_HOST,
});

export default sequelize;
