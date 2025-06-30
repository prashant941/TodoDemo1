import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  forgetPasswordAction,
  logoutAction,
  profileAction,
  resetPasswordAction,
  signInAction,
  signUpAction,
} from "../actions/auth.action";
import type { IAuthState, IUserProfile } from "../../types/auth.types";

const initialState: IAuthState = {
  user: {},
  isAuthenticated: false,
  isLoading: false,
  isError: false,
  message: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearMessageAction: (state) => {
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    // sign-up
    builder.addCase(signUpAction.pending, (state) => {
      state.isLoading = "signUp";
      state.isError = false;
      state.message = "";
      state.isAuthenticated = false;
    });
    builder.addCase(
      signUpAction.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.message = action.payload || "Sign-up successfully";
        state.isLoading = false;
        state.isAuthenticated = false;
      }
    );
    builder.addCase(
      signUpAction.rejected,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Signup failed";
      }
    );

    // sign-in
    builder.addCase(signInAction.pending, (state) => {
      state.isLoading = "signIn";
      state.message = "";
      state.isError = false;
    });
    builder.addCase(
      signInAction.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.user = action.payload.data.data;
        state.isError = false;
        state.isAuthenticated = true;
      }
    );
    builder.addCase(
      signInAction.rejected,
      (state, action: PayloadAction<any>) => {
        state.isError = true;
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.message = action.payload?.message || "Sign-in failed";
      }
    );

    // Profile
    builder.addCase(profileAction.pending, (state) => {
      state.isLoading = "profile";
      state.user = null;
      state.isAuthenticated = false;
    });
    builder.addCase(
      profileAction.fulfilled,
      (state, action: PayloadAction<IUserProfile>) => {
        state.isAuthenticated = true;
        state.isLoading = false;
        state.user = action.payload;
      }
    );
    builder.addCase(profileAction.rejected, (state) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.user = null;
    });

    // Logout
    builder.addCase(logoutAction.pending, (state) => {
      state.isAuthenticated = true;
    });
    builder.addCase(logoutAction.fulfilled, (state) => {
      state.isAuthenticated = false;
      state.isError = false;
      state.user = null;
    });
    builder.addCase(logoutAction.rejected, (state) => {
      state.isAuthenticated = true;
    });

    // Forget Password
    builder.addCase(forgetPasswordAction.pending, (state) => {
      state.isLoading = "forgetpassword";
      state.isAuthenticated = false;
    });
    builder.addCase(forgetPasswordAction.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(forgetPasswordAction.rejected, (state) => {
      state.isLoading = false;
    });

    // Reset Password
    builder.addCase(resetPasswordAction.pending, (state) => {
      state.isLoading = "resetPassword";
      state.isAuthenticated = false;
      state.message = "";
    });
    builder.addCase(
      resetPasswordAction.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.message = action.payload.message;
      }
    );
    builder.addCase(
      resetPasswordAction.rejected,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.message = action.payload;
      }
    );
  },
});

export default authSlice.reducer;
export const { clearMessageAction } = authSlice.actions;
