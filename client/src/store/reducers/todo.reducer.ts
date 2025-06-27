import { createSlice } from "@reduxjs/toolkit";
import { getAllTodoAction } from "../actions/todo.actions";
type Todo = {
  uuid: string;
  title: string;
};
type TodoState = {
  todos: Todo[];
  loading:string
};

const initialState:TodoState = {
  todos: [],
  loading: "",
};
const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodoOptimistic: (state, action) => {
      state.todos.push(action.payload);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.uuid !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllTodoAction.pending, (state) => {
      state.loading = "alltodos";
    });
    builder.addCase(getAllTodoAction.fulfilled, (state, action) => {
      state.loading = "";
      state.todos = action.payload;
    });
    builder.addCase(getAllTodoAction.rejected, (state) => {
      state.loading = "";
      state.todos = [];
    });
  },
});
export default todoSlice.reducer;
export const { addTodoOptimistic, removeTodo } = todoSlice.actions;
