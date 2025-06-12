import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth.reducer";
import todoSlice from "./reducers/todo.reducer";
import orgSlice from "./reducers/org.reducer";
export const appStore = configureStore({
  reducer: {
    auth: authReducer,
    todo: todoSlice,
    org: orgSlice,
  },
});
