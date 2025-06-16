import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Loader from "../../components/Loader";
import useAuth from "../../hooks/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../schema/auth.schema";

const Registrastion = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const { signUp, isLoading, message, clearMessage } = useAuth();

  const onSubmit = async (data) => {
    try {
      localStorage.removeItem("orgId");
      await signUp(data).unwrap();
      toast.success("sign-up successfully");
      reset();
    } catch (error) {
      console.log("Register Faild");
    }
  };

  return (
    <DialogContent className="sm:max-w-md rounded-lg shadow-xl p-6 bg-white">
      <DialogHeader>
        <DialogTitle className="text-center text-3xl font-semibold text-gray-800 mb-4">
          Registration
        </DialogTitle>
        {message?.message && (
          <div
            class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong class="font-bold">Faild !</strong>
            <span class="block sm:inline">{message?.message}.</span>
            <span class="absolute top-0 bottom-0 right-0 px-4 py-3"></span>
          </div>
        )}
      </DialogHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              {...register("name", { required: true })}
              id="name"
              type="text"
              placeholder="Your full name"
              onChange={() => clearMessage()}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              {...register("email", { required: true })}
              id="email"
              type="email"
              placeholder="you@example.com"
              onChange={() => clearMessage()}
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
              {...register("password", { required: true })}
              id="password"
              type="password"
              onChange={() => clearMessage()}
              placeholder="••••••••"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        <DialogFooter className="mt-6">
          <button
            type="submit"
            className={`w-full px-4 h-12 text-white ${
              isLoading === "signUp"
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-800"
            } rounded-md transition`}
            disabled={isLoading === "signUp"}
          >
            {isLoading === "signUp" ? <Loader /> : "Register"}
          </button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default Registrastion;
