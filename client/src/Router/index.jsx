import { createBrowserRouter } from "react-router-dom";

import LandingPage1 from "../pages/landing-page";
import About from "../pages/about-as";
import Service from "../pages/service";
import ForgetPassword from "../pages/Auth/forget-password";
import ResetPassword from "../view/auth/ResetPassword";
import ChangePassword from "../pages/Auth/change-password";
import Todo from "../pages/todo-dasbord";
import PublicLayout from "../layout/PublicLayout";
import PrivateLayout from "../layout/PrivateLayout";
import OrganizationTabs from "../pages/organization";
import OrganizationTodo from "../view/OrganizationTodo";

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <LandingPage1 /> },
      { path: "about", element: <About /> },
      { path: "service", element: <Service /> },
      { path: "forget-password", element: <ForgetPassword /> },
      { path: "reset-password", element: <ResetPassword /> },
      { path: "change-password", element: <ChangePassword /> },
    ],
  },
  {
    element: <PrivateLayout />,
    children: [
      { path: "todo", element: <Todo /> },
      {
        path: "all-Organization",
        element: <OrganizationTabs />,
        children: [
          {
            path: "todo/:id",
            element: <OrganizationTodo />,
          },
        ],
      },
    ],
  },
]);

export default router;
