import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./Header";

const PrivateLayout = () => {
  const isUser = useSelector((state) => state.auth.isAuthenticated);
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
