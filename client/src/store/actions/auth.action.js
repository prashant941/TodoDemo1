import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/axios";

export const signUpAction = createAsyncThunk(
  "auth/signup",
  async (arg, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await api.post("auth/sign-up", arg);

      return fulfillWithValue(response?.data?.message);
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

export const signInAction = createAsyncThunk(
  "auth/signin",
  async (arg, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await api.post("auth/sign-in", arg, {
        withCredentials: true,
      });

      return fulfillWithValue({
        message: response?.data.message || "Faild",
        status: response?.status,
        data: response?.data,
      });
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Login Faild",
        status: error.response?.status || 500,
      });
    }
  }
);

export const profileAction = createAsyncThunk(
  "auth/me",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await api.get("user/me", {
        withCredentials: true,
      });
      return fulfillWithValue(response?.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const logoutAction = createAsyncThunk(
  "auth/logout",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await api.post("user/logout", _, {
        withCredentials: true,
      });
      return fulfillWithValue(response?.data?.message);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const forgetPasswordAction = createAsyncThunk(
  "auth/forgetpassword",
  async (arg, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await api.post("auth/forget-password", arg);
      return fulfillWithValue(response?.data);
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const resetPasswordAction = createAsyncThunk(
  "auth/resetpassword",
  async (arg, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await api.put("auth/reset-password", arg);

      return fulfillWithValue(response?.data);
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);
