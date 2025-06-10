import express from "express";
import { validate } from "uuid";
import { authMiddleware } from "../middleware/auth.middleware.js";
import Comment from "../models/comment.model.js";
import Todo from "../models/todo.model.js";
import { AsyncHandler } from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
const router = express.Router();
router.post("/commant/:id", authMiddleware, async (req, res) => {
  const userId = req.id;
  const { text } = req.body;
  const { id: todoId } = req.params;
  if (!validate(todoId)) {
    return res.status(400).json({ message: "Id Formate wrong" });
  }

  const todoExites = await Todo.findOne({ where: { uuid: todoId } });
  if (!todoExites) {
    return res.status(404).json({ message: "Todo Not Found" });
  }
  if (!userId || !todoId || !text) {
    return res.status(400).json({ message: "All Feild Is Required" });
  }
  await Comment.create({ text, userId, todoId });
  res.status(200).json({ message: "Commant Added" });
});

router.get(
  "/todos/:todoId/comments",
  AsyncHandler(async (req, res) => {
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
