import { useDispatch, useSelector } from "react-redux";
import {
  createTodoAction,
  deleteTodoAction,
  getAllTodoAction,
  updateTodo,
} from "../Store/actions/todo.actions";
import { addTodoOptimistic, removeTodo } from "../Store/reducers/todo.reducer";
import { data } from "react-router-dom";
import { allOrgTodoAction } from "../Store/actions/orgnizastion.action";

const useTodo = () => {
  const { todos } = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  const createTodo = (body) => {
    return dispatch(createTodoAction(body));
  };
  const getAllTodo = () => {
    return dispatch(getAllTodoAction());
  };
  const OptimisticAddTodo = (body) => {
    return dispatch(addTodoOptimistic(body));
  };
  const deleteTodo = ({ id, orgId }) => {
    return dispatch(deleteTodoAction({ id, orgId }));
  };
  const removeTodos = (id) => {
    return dispatch(removeTodo(id));
  };
  const todoUpdate = ({ id, data }) => {
    return dispatch(updateTodo({ id, data }));
  };
  const orgTodo = (id) => {
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
