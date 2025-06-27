import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import type { AppDispatch, RootState } from "../store"; // adjust the path if needed
import {
  createTodoAction,
  deleteTodoAction,
  getAllTodoAction,
  updateTodo,
} from "../store/actions/todo.actions";
import { addTodoOptimistic, removeTodo } from "../store/reducers/todo.reducer";
import { allOrgTodoAction } from "../store/actions/orgnizastion.action";
import { orgInterface } from "../types/org.types";

const useTodo = () => {
  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  const { todos } = useTypedSelector((state) => state.todo);
  const dispatch: AppDispatch = useDispatch();

  const createTodo = (body: {}) => {
    return dispatch(createTodoAction(body));
  };
  const getAllTodo = () => {
    return dispatch(getAllTodoAction());
  };
  const OptimisticAddTodo = (body: object) => {
    return dispatch(addTodoOptimistic(body));
  };
  const deleteTodo = ({ id, orgId }: orgInterface) => {
    return dispatch(deleteTodoAction({ id, orgId: orgId! }));
  };
  const removeTodos = (id: string) => {
    return dispatch(removeTodo(id));
  };
  const todoUpdate = ({
    id,
    data,
  }: {
    id: string;
    data: { title: string; orgId: string };
  }) => {
    return dispatch(updateTodo({ id, data }));
  };
  const orgTodo = (id: string): any => {
    return dispatch(allOrgTodoAction(id));
  };
  return {
    createTodo,
    getAllTodo,
    todos,
    OptimisticAddTodo,
    deleteTodo,
    removeTodos,
    todoUpdate,
    orgTodo,
  };
};
export default useTodo;
