import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/axios";

export const createTodoAction = createAsyncThunk<string,object>(
  "todo/create",
  async (arg, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await api.post("todos/todo", arg, {
        withCredentials: true,
      });
      return fulfillWithValue(response?.data?.message);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAllTodoAction = createAsyncThunk(
  "todo/get",
  async (arg, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await api.get("todos/getUserTodos", {
        withCredentials: true,
      });
      return fulfillWithValue(response?.data?.slice()?.reverse());
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteTodoAction = createAsyncThunk(
  "todo/delete",
  async (
    { id, orgId }: { id: string; orgId: string },
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const response = api.delete(`todos/delete/${id}`, {
        withCredentials: true,
        data: orgId || null,
      });
      return fulfillWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateTodo = createAsyncThunk(
  "todo/update",
  async ({ id, data }:{id:string,data:{}}, { fulfillWithValue, rejectWithValue }) => {
    try {
      console.log("🚀 ~ id:", id);
      console.log("🚀 ~ data:", data);

      const response = await api.put(`todos/update/${id}`, data, {
        withCredentials: true,
      });
      return fulfillWithValue(response?.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
