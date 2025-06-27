import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/axios";

export const createOrganizationAction = createAsyncThunk<string, object>(
  "auth/Createorganization",
  async (arg, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await api.post("org", arg, { withCredentials: true });
      return fulfillWithValue(response?.data);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const getMyOrganizationAction = createAsyncThunk(
  "org/myorg",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await api.get("org/myorg", { withCredentials: true });

      return fulfillWithValue(response?.data);
    } catch (error: any) {
      return rejectWithValue(error?.responsse?.data);
    }
  }
);

export const deleteOrganizationAction = createAsyncThunk<string, string>(
  "org/delete",
  async (arg, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await api.delete(`org/deleteOrg/${arg}`, {
        withCredentials: true,
      });
      return fulfillWithValue(response?.data);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || "Delete Faild");
    }
  }
);

export const invitationAction = createAsyncThunk<
  string,
  { id: string; email: string },
  {
    rejectValue: string;
  }
>(
  "org/invitastion",
  async ({ id, email }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await api.post(
        `org/${id}/invite`,
        { email },
        { withCredentials: true }
      );
      return fulfillWithValue(
        response?.data?.message || ("Invite sent" as string)
      );
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || ("Something went wrong" as string)
      );
    }
  }
);

export const invitastionAllOrgAction = createAsyncThunk(
  "/org/invitastionAllOrg",
  async (arg, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await api.get("org/myInviteOrg", {
        withCredentials: true,
      });

      return fulfillWithValue(response?.data);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const pendingOrgAction = createAsyncThunk(
  "org/pending",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await api.get("org/pending", { withCredentials: true });
      return fulfillWithValue(response?.data);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const orgAccepteAction = createAsyncThunk<string, {}>(
  "org/accepte",
  async (arg, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await api.post("org/invite/respond", arg, {
        withCredentials: true,
      });
      return fulfillWithValue(response?.data);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const allOrgTodoAction = createAsyncThunk(
  "org/todo",
  async (id: string, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await api.get(`todos/orgAllTodo/${id}`, {
        withCredentials: true,
      });
      return fulfillWithValue(response?.data?.reverse());
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const createTodoForOrgAction = createAsyncThunk<
  string,
  { id: string; title: string }
>(
  "org/createTodo",
  async ({ id, title }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await api.post(
        `todos/todo/${id}`,
        { title },
        {
          withCredentials: true,
        }
      );
      return fulfillWithValue(response?.data);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const updateOrgAction = createAsyncThunk(
  "org/update",
  async (
    { id, name }: { id: string; name: string },
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const response = await api.post(
        `org/orgUpdate/${id}`,
        { name },
        { withCredentials: true }
      );
      return fulfillWithValue(response?.data);
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);
