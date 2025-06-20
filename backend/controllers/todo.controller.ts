import type { Request, Response } from "express";
import { validate as uuidValidate } from "uuid";
import Todo from "../models/todo.model.ts";
import { AsyncHandler } from "../utils/asyncHandler.ts";

interface AuthenticatedRequest<T = any> extends Request {
  id?: string;
  orgId?: string | null;
  body: T;
}

interface CreateTodoBody {
  title: string;
}
export const creatTodo = AsyncHandler(
  async (req: AuthenticatedRequest<CreateTodoBody>, res: Response) => {
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
  }
);

//Delete Todo
interface DeleteTodoBody {
  orgId?: string | null;
}
export const DeleteTodo = AsyncHandler(
  async (req: AuthenticatedRequest<DeleteTodoBody>, res: Response) => {
    const userId = req.id;
    const orgId = req.body?.orgId || null;
    const { id: todoId } = req.params;

    if (!todoId) {
      return res.status(400).json({ message: "Todo ID is required" });
    }

    if (!uuidValidate(todoId)) {
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

    if (userTodo.get("userId") !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    await userTodo.destroy();
    return res.status(200).json({ message: "Todo deleted successfully" });
  }
);

// Update Todo
interface UpdateTodoBody {
  title: string;
  orgId?: string | null;
}
export const updateTodo = AsyncHandler(
  async (req: AuthenticatedRequest<UpdateTodoBody>, res: Response) => {
    const { title, orgId } = req.body;
    const { id: todoId } = req.params;

    if (!uuidValidate(todoId)) {
      return res.status(400).json({ message: "Invalid UUID format" });
    }

    const TargetTodo = await Todo.findOne({
      where: { uuid: todoId, organizationId: orgId },
    });

    if (!TargetTodo) {
      return res.status(404).json({ message: "Todo Not Found" });
    }

    await Todo.update(
      { title },
      { where: { uuid: todoId, organizationId: orgId } }
    );

    return res.status(200).json({ message: "Todo Update Successfully" });
  }
);

// Get All Todos
export const getMeAllTodo = AsyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
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
  }
);
