import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/axios";

export const createOrganizationAction = createAsyncThunk(
  "auth/Createorganization",
  async (arg, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await api.post("org", arg, { withCredentials: true });
      return fulfillWithValue(response?.data);
    } catch (error) {
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
    } catch (error) {
      return rejectWithValue(error?.responsse?.data);
    }
  }
);

export const deleteOrganizationAction = createAsyncThunk(
  "org/delete",
  async (arg, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await api.delete(`org/deleteOrg/${arg}`, {
        withCredentials: true,
      });
      return fulfillWithValue(response?.data);
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || "Delete Faild");
    }
  }
);

export const invitationAction = createAsyncThunk(
  "org/invitastion",
  async ({ id, email }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await api.post(
        `org/${id}/invite`,
        { email: email },
        {
          withCredentials: true,
        }
      );

      return fulfillWithValue(response?.data?.message || "Invite sent");
    } catch (error) {
      console.log(error);

      return rejectWithValue(error?.response?.data?.message);
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
    } catch (error) {
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
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const orgAccepteAction = createAsyncThunk(
  "org/accepte",
  async (arg, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await api.post("org/invite/respond", arg, {
        withCredentials: true,
      });
      return fulfillWithValue(response?.data);
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const allOrgTodoAction = createAsyncThunk(
  "org/todo",
  async (id, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await api.get(`todos/orgAllTodo/${id}`, {
        withCredentials: true,
      });
      return fulfillWithValue(response?.data?.reverse());
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const createTodoForOrgAction = createAsyncThunk(
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
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);
