import express from "express";
import {
  creatTodo,
  DeleteTodo,
  getMeAllTodo,
  updateTodo,
} from "../controllers/todo.controller.ts";
import { authMiddleware } from "../middleware/auth.middleware.ts";
import { OrganizationMiddleware } from "../middleware/organizastion.middleware.ts";

const router = express.Router();

// Add types to middleware handlers and route handlers
router.get("/getUserTodos", authMiddleware, getMeAllTodo);

router.get(
  "/orgAllTodo/:orgId",
  authMiddleware,
  OrganizationMiddleware,
  getMeAllTodo
);

router.post("/todo", authMiddleware, creatTodo);

router.post("/todo/:orgId", authMiddleware, OrganizationMiddleware, creatTodo);

router.delete("/delete/:id", authMiddleware, DeleteTodo);

router.put("/update/:id", authMiddleware, updateTodo);

export default router;
