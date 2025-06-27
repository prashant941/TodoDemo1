import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../schema/auth.schema";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";

import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";
import { SignInPayload } from "../../types/auth.types";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const { isAuthenticated, isError, isLoading, signIn } = useAuth();
  const [message, setMessage] = useState("");
  const isOpen = true;

  const onSubmit = async (Data: SignInPayload) => {
    const result = await signIn(Data);
    const { message, status } = result.payload as {
      message: string;
      status: number;
    };

    if (status === 200) {
      setMessage("");
      toast.success(message);
    } else {
      setMessage(message);
    }
  };

  return (
    <>
      {isOpen && (
        <DialogContent className="sm:max-w-md rounded-lg shadow-xl p-6 bg-white">
          <DialogHeader className="relative">
            <DialogTitle className="text-center text-3xl font-semibold text-gray-800 mb-4">
              Login
            </DialogTitle>
            {message && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <strong className="font-bold"> ! </strong>
                <span className="block sm:inline">{message}.</span>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3"></span>
              </div>
            )}
          </DialogHeader>

          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  {...register("email")}
                  id="email"
                  type="email"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  {...register("password")}
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  Remember me
                </label>
                <Link
                  to="/forget-password"
                  className="text-blue-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <DialogFooter className="mt-6">
              <button
                type="submit"
                className={`w-full px-4 h-12 text-white ${
                  isLoading === "signIn"
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-800"
                }  rounded-md transition`}
                disabled={isLoading === "signIn"}
              >
                {isLoading === "signIn" ? <Loader /> : "Login"}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      )}
    </>
  );
};

export default LoginForm;
