import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth.reducer";
import todoReducer from "./reducers/todo.reducer";
import orgReducer from "./reducers/org.reducer";

export const appStore = configureStore({
  reducer: {
    auth: authReducer,
    todo: todoReducer,
    org: orgReducer,
  },
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;