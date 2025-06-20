import { createSlice } from "@reduxjs/toolkit";
import {
  forgetPasswordAction,
  logoutAction,
  profileAction,
  resetPasswordAction,
  signInAction,
  signUpAction,
} from "../actions/auth.action";

const initialState = {
  user: "",
  isAuthenticated: false,
  isLoading: "",
  isError: false,
  message: "",
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearMessageAction: (state) => {
      state.message = null;
    },
  },
  // sign-up

  extraReducers: (builder) => {
    builder.addCase(signUpAction.pending, (state) => {
      state.isLoading = "signUp";
      state.isError = false;
      state.message = "";
      state.isAuthenticated = false;
    });
    builder.addCase(signUpAction.fulfilled, (state, action) => {
      state.message = action.payload || "Sign-up sucessfully";
      state.isLoading = "";
      state.isAuthenticated = false;
    });
    builder.addCase(signUpAction.rejected, (state, action) => {
      state.isLoading = "";
      state.isError = true;
      state.message = action.payload || "Signup failed";
    });

    // sign-in
    builder.addCase(signInAction.pending, (state) => {
      state.isLoading = "signIn";
      state.message = "";
      state.isError = false;
    });
    builder.addCase(signInAction.fulfilled, (state, action) => {
      console.log("SignIn Action Payload:", action.payload);

      state.isLoading = "";
      state.message = action.payload.message;
      state.user = action?.payload?.data?.data;
      state.isError = false;
      state.isAuthenticated = true;
    });
    builder.addCase(signInAction.rejected, (state) => {
      state.isError = true;
      state.isLoading = "";
      state.user = null;
      state.isAuthenticated = false;
    });
    //Profile

    builder.addCase(profileAction.pending, (state) => {
      state.isLoading = "profile";
      state.user = null;
      state.isAuthenticated = false;
    });
    builder.addCase(profileAction.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = "";
      state.user = action.payload;
    });
    builder.addCase(profileAction.rejected, (state) => {
      state.isAuthenticated = false;
      state.isLoading = "";
      state.data = null;
    });

    //logout

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

    // forgetPassword

    builder.addCase(forgetPasswordAction.pending, (state, action) => {
      state.isLoading = "forgetpassword";
      state.isAuthenticated = false;
    });
    builder.addCase(forgetPasswordAction.fulfilled, (state, action) => {
      state.isLoading = "";
    });
    builder.addCase(forgetPasswordAction.rejected, (state, action) => {
      state.isLoading = "";
    });

    //reset-password

    builder.addCase(resetPasswordAction.pending, (state) => {
      state.isLoading = "resetPassword";
      state.isAuthenticated = false;
      state.message = "";
    });
    builder.addCase(resetPasswordAction.fulfilled, (state, action) => {
      state.isLoading = "";
      state.isAuthenticated = false;
      state.message = action.payload.message;
    });
    builder.addCase(resetPasswordAction.rejected, (state, action) => {
      state.isLoading = "";
      state.message = action.payload;
    });
  },
});

export default authSlice.reducer;
export const { clearMessageAction } = authSlice.actions;
