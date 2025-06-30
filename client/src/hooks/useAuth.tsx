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
  ISignInPayload,
  ISignUpPayload,
  IResetPasswordPayload,
  IForgetPasswordPayload,
} from "../types/auth.types";

const useAuth = () => {
  const dispatch: AppDispatch = useDispatch();
  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  const { isError, isAuthenticated, isLoading, message, user } =
    useTypedSelector((state) => state.auth);

  const signUp = (body: ISignUpPayload) => {
    return dispatch(signUpAction(body));
  };
  const signIn = (body: ISignInPayload) => {
    return dispatch(signInAction(body));
  };
  const profile = () => dispatch(profileAction());
  const logout = () => dispatch(logoutAction());
  const forgetPassword = (body: IForgetPasswordPayload) =>
    dispatch(forgetPasswordAction(body));
  const resetPassword = (body: IResetPasswordPayload) =>
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