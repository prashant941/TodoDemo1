import express from "express"
import type { Request, Response, NextFunction } from "express";
import { validate } from "uuid";
import { authMiddleware } from "../middleware/auth.middleware.ts";
import Comment from "../models/comment.model.ts";
import Todo from "../models/todo.model.ts";
import { AsyncHandler } from "../utils/asyncHandler.ts";
import User from "../models/user.model.ts";

const router = express.Router();

// Extend Express Request to include `id` from authMiddleware
interface AuthRequest extends Request {
  id?: string;  // userId added by authMiddleware
}

// POST /commant/:id - Add comment to a todo
router.post(
  "/commant/:id",
  authMiddleware,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.id;
      const { text } = req.body;
      const todoId = req.params.id;

      if (!validate(todoId)) {
        return res.status(400).json({ message: "Id Format wrong" });
      }

      const todoExists = await Todo.findOne({ where: { uuid: todoId } });
      if (!todoExists) {
        return res.status(404).json({ message: "Todo Not Found" });
      }

      if (!userId || !todoId || !text) {
        return res.status(400).json({ message: "All fields are required" });
      }

      await Comment.create({ text, userId, todoId });

      return res.status(200).json({ message: "Comment Added" });
    } catch (error) {
      next(error);
    }
  }
);

// GET /todos/:todoId/comments - Get comments for a todo
router.get(
  "/todos/:todoId/comments",
  AsyncHandler(async (req: Request, res: Response) => {
    const { todoId } = req.params;

    const comments = await Comment.findAll({
      where: { todoId },
      include: [
        {
          model: User,
          attributes: ["uuid", "name", "email"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json(comments);
  })
);

export default router;
