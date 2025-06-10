import React from "react";
import Router from "./Router";
import { RouterProvider } from "react-router-dom";
import router from "./Router";

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
