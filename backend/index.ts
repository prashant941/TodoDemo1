import express from "express";
import type { Application } from "express";
import dotenv from "dotenv";
import sequelize from "./config/database.ts";
import userRouter from "./routes/user.routes.ts";
import Todorouter from "./routes/todo.routes.ts";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.routes.ts";
import commentRoute from "./routes/comment.routes.ts";
import orgRouting from "./routes/org.Routes.ts";
import cors from "cors";

dotenv.config();

const app: Application = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("DB IS Connected");
  } catch (error) {
    console.error("DB Connection Error:", error);
  }
})();

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/todos", Todorouter);
app.use("/api/v1", commentRoute);
app.use("/api/v1/org", orgRouting);

app.listen(8001, () => {
  console.log("Server is running on port 8001");
});
