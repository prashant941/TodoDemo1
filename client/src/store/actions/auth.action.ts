import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/axios";
import type {
  ISignUpPayload,
  ISignInPayload,
  IResetPasswordPayload,
  IForgetPasswordPayload,
  IAuthResponse,
  IUserProfile,
} from "../../types/auth.types";

export const signUpAction = createAsyncThunk<string, ISignUpPayload>(
  "auth/signup",
  async (arg, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await api.post("auth/sign-up", arg);
      return fulfillWithValue(response.data.message);
    } catch (error: any) {
      console.log("============ action Errpor", error?.response?.data?.message);

      return rejectWithValue(error?.response?.data?.message || error.message);
    }
  }
);

export const signInAction = createAsyncThunk<IAuthResponse, ISignInPayload>(
  "auth/signin",
  async (arg, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await api.post("auth/sign-in", arg, {
        withCredentials: true,
      });

      return fulfillWithValue({
        message: response.data.message || "Failed",
        status: response.status,
        data: response.data,
      });
    } catch (error: any) {
      return rejectWithValue({
        message: error.response?.data?.message || "Login Failed",
        status: error.response?.status || 500,
      });
    }
  }
);

export const profileAction = createAsyncThunk<IUserProfile>(
  "auth/me",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await api.get("user/me", {
        withCredentials: true,
      });
      return fulfillWithValue(response.data);
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const logoutAction = createAsyncThunk<string>(
  "auth/logout",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await api.post("user/logout", _, {
        withCredentials: true,
      });
      return fulfillWithValue(response.data.message);
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const forgetPasswordAction = createAsyncThunk<
  any,
  IForgetPasswordPayload
>("auth/forgetpassword", async (arg, { fulfillWithValue, rejectWithValue }) => {
  try {
    const response = await api.post("auth/forget-password", arg);
    return fulfillWithValue(response.data);
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message);
  }
});

export const resetPasswordAction = createAsyncThunk<any, IResetPasswordPayload>(
  "auth/resetpassword",
  async (arg, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await api.put("auth/reset-password", arg);
      return fulfillWithValue(response.data);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
