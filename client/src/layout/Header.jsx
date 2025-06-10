import React from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import LoginForm from "../components/LoginForm";
import Registrastion from "../components/Registrastion";
// import {
//   apiSlice,
//   useLogoutUserMutation,
// } from "../Store/Services/userApliSlice";
import { Link } from "react-router-dom";
import useAuth from "../hooks/auth";
import { toast } from "sonner";
const Header = () => {
  // const [logoutUser, { isSuccess }] = useLogoutUserMutation();
  const NavList = ["Home", "About", "Service"];
  const { isAuthenticated: isUser, logout } = useAuth();
  const Logout = async () => {
    const { payload } = await logout();
    toast.success(payload);
  };
  return (
    <>
      <header className="bg-sky-500 flex justify-between items-center text-white">
        <div className="w-32">
          <img className="w-full" src="logo.png" alt="" />
        </div>
        <nav>
          <ul className="flex gap-7 mr-16 text-[20px] items-center">
            {NavList.map((items, i) => (
              <Link
                to={`${
                  items.toLowerCase() === "home"
                    ? "/"
                    : `/${items.toLowerCase()}`
                }`}
              >
                <li key={i} className="cursor-pointer">
                  {items}
                </li>
              </Link>
            ))}
            {!isUser ? (
              <>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">
                      Register
                    </button>
                  </DialogTrigger>
                  <Registrastion />
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <button className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">
                      Login
                    </button>
                  </DialogTrigger>
                  <LoginForm />
                </Dialog>
              </>
            ) : (
              <>
                <button
                  className="bg-red-500 px-2 cursor-pointer py-1 rounded-3xl outline-none border-none "
                  onClick={Logout}
                >
                  logout
                </button>
              </>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
