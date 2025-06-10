import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/database.js";
import userRouter from "./routes/user.routes.js";
import Todorouter from "./routes/todo.routes.js";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.routes.js";
import commentRoute from "./routes/comment.routes.js";
import orgRouting from "./routes/org.Routes.js";
import cors from "cors";
dotenv.config();
const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());
app.use(cookieParser());
(async () => {
  try {
    await sequelize.authenticate();
    sequelize.sync({ alter: true });
    console.log("DB IS Connected");
  } catch (error) {
    console.log("Db Connections Error");
  }
})();
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/todos", Todorouter);
app.use("/api/v1", commentRoute);
app.use("/api/v1/org", orgRouting);
app.listen(8001, () => {
  console.log("Server is runing");
});
