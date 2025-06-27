import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import Header from "./Header";
import { RootState } from "../store";

const PrivateLayout = () => {
  const useSelectoHook: TypedUseSelectorHook<RootState> = useSelector;
  const isUser = useSelectoHook((state) => state.auth.isAuthenticated);
  console.log(isUser);

  if (!isUser) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default PrivateLayout;
