import { useDispatch, useSelector } from "react-redux";
import {
  forgetPasswordAction,
  logoutAction,
  profileAction,
  resetPasswordAction,
  signInAction,
  signUpAction,
} from "../store/actions/auth.action";
import { clearMessageAction } from "../store/reducers/auth.reducer";

const useAuth = () => {
  const dispatch = useDispatch();
  const { isError, isAuthenticated, isLoading, message, user } = useSelector(
    (state) => state.auth
  );

  const signUp = (body) => {
    return dispatch(signUpAction(body));
  };
  const signIn = (body) => {
    return dispatch(signInAction(body));
  };
  const profile = () => {
    return dispatch(profileAction());
  };
  const logout = () => {
    return dispatch(logoutAction());
  };
  const forgetPassword = (body) => {
    return dispatch(forgetPasswordAction(body));
  };
  const resetPassword = (body) => {
    return dispatch(resetPasswordAction(body));
  };
  const clearMessage = () => {
    return dispatch(clearMessageAction());
  };
  return {
    signUp,
    isError,
    isAuthenticated,
    isLoading,
    message,
    user,
    signIn,
    profile,
    logout,
    forgetPassword,
    resetPassword,
    clearMessage,
  };
};

export default useAuth;
