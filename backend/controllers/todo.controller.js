import Todo from "../models/todo.model.js";
import { v4 as validate } from "uuid";
import { AsyncHandler } from "../utils/asyncHandler.js";

export const creatTodo = AsyncHandler(async (req, res) => {
  const { title } = req.body;
  const organizationId = req.orgId;
  const userId = req.id;
  if (!userId || !title) {
    return res.status(400).json({ message: "All Field is Required" });
  }
  const CreateTodo = await Todo.create({
    userId,
    title,
    organizationId: organizationId || null,
  });
  if (!CreateTodo) {
    return res.status(400).json({ message: "No Insert Todo" });
  }
  res.status(200).json({ message: "Created" });
});

export const DeleteTodo = AsyncHandler(async (req, res) => {
  const userId = req.id;
  const orgId = req.body?.orgId || null;
  const { id: todoId } = req.params;

  if (!todoId) {
    return res.status(400).json({ message: "Todo ID is required" });
  }

  if (!validate(todoId)) {
    return res.status(400).json({ message: "Invalid UUID format" });
  }

  if (orgId) {
    const orgTodo = await Todo.findOne({
      where: { uuid: todoId, organizationId: orgId },
    });

    if (!orgTodo) {
      return res
        .status(404)
        .json({ message: "Todo not found in organization" });
    }

    await orgTodo.destroy();
    return res
      .status(200)
      .json({ message: "Organization Todo deleted successfully" });
  }

  const userTodo = await Todo.findOne({ where: { uuid: todoId } });

  if (!userTodo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  if (userTodo.userId !== userId) {
    return res.status(403).json({ message: "Access denied" });
  }

  await userTodo.destroy();
  return res.status(200).json({ message: "Todo deleted successfully" });
});

export const updateTodo = AsyncHandler(async (req, res) => {
  const userId = req.id;
  const { title } = req.body;

  const { id: todoId } = req.params;
  if (!validate(todoId)) {
    return res.status(400).json({ message: "Invalid UUID format" });
  }
  const TargetTodo = await Todo.findOne({ where: { uuid: todoId } });
  if (!TargetTodo) {
    return res.status(404).json({ message: "Todo Not Found" });
  }
  if (TargetTodo.userId !== userId) {
    return res.status(402).json({ message: "Not Access" });
  }
  await Todo.update({ title }, { where: { uuid: todoId } });
  return res.status(200).json({ message: "Todo Update Successfully" });
});

export const getMeAllTodo = AsyncHandler(async (req, res) => {
  const userId = req.id;
  const organizationId = req.orgId;
  if (!organizationId) {
    const AllTodos = await Todo.findAll({
      where: { userId, organizationId: null },
      order: [["createdAt", "ASC"]],
    });
    return res.status(200).json(AllTodos);
  }
  const AllTodos = await Todo.findAll({ where: { organizationId } });
  res.status(200).json(AllTodos);
});
