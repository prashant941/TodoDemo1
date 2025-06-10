import express from "express";
import {
  creatTodo,
  DeleteTodo,
  getMeAllTodo,
  updateTodo,
} from "../controllers/todo.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { OrganizationAsscess } from "../middleware/organizastion access.js";
const router = express.Router();

router.get("/getUserTodos", authMiddleware, getMeAllTodo);
router.get(
  "/orgAllTodo/:orgId",
  authMiddleware,
  OrganizationAsscess,
  getMeAllTodo
);
router.route("/todo").post(authMiddleware, creatTodo);
router
  .route("/todo/:orgId")
  .post(authMiddleware, OrganizationAsscess, creatTodo);
router.route("/delete/:id").delete(authMiddleware, DeleteTodo);
router.route("/update/:id").put(authMiddleware, updateTodo);

export default router;
