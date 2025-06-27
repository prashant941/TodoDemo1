import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import {
  forgetPasswordAction,
  logoutAction,
  profileAction,
  resetPasswordAction,
  signInAction,
  signUpAction,
} from "../store/actions/auth.action";
import { clearMessageAction } from "../store/reducers/auth.reducer";
import type { AppDispatch, RootState } from "../store/index";
import type {
  SignInPayload,
  SignUpPayload,
  ResetPasswordPayload,
  ForgetPasswordPayload,
} from "../types/auth.types";

const useAuth = () => {
  const dispatch: AppDispatch = useDispatch();
  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  const { isError, isAuthenticated, isLoading, message, user } =
    useTypedSelector((state) => state.auth);

  const signUp = (body: SignUpPayload) => {
    return dispatch(signUpAction(body));
  };
  const signIn = (body: SignInPayload) => {
    return dispatch(signInAction(body));
  };
  const profile = () => dispatch(profileAction());
  const logout = () => dispatch(logoutAction());
  const forgetPassword = (body: ForgetPasswordPayload) =>
    dispatch(forgetPasswordAction(body));
  const resetPassword = (body: ResetPasswordPayload) =>
    dispatch(resetPasswordAction(body));
  const clearMessage = () => dispatch(clearMessageAction());

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
