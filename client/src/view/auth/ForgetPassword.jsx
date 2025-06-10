import React, { useState } from "react";
import { baseUrl } from "../../components/baseUrl";
import { toast } from "sonner";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/auth";
const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const navigastion = useNavigate();
  const { forgetPassword, isLoading } = useAuth();
  const submitHandle = async (e) => {
    e.preventDefault();
    try {
      const { message } = await forgetPassword({ email }).unwrap();
      toast(message);
      navigastion("/reset-password");
    } catch (error) {
      setMessage(error);
    }
  };
  return (
    <div className="min-h-[750px] flex items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-600 px-4">
      <div className="w-full max-w-md bg-white text-gray-800 rounded-2xl shadow-lg p-8 ">
        <h1 className="text-3xl font-semibold text-center mb-6">
          Reset Your Password
        </h1>
        {message && <span className="text-red-500">**{message}</span>}

        <form className="space-y-6" onSubmit={submitHandle}>
          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="email">
              Email address
            </label>
            <input
              type="email"
              id="email"
              required
              onChange={(e) => {
                setEmail(e.target.value);
                {
                  message ? setMessage("") : "";
                }
              }}
              autoFocus
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading === "forgetpassword"}
            className={`w-full h-12 ${
              isLoading === "forgetpassword"
                ? "bg-[#b1caff] cursor-not-allowed"
                : "bg-blue-600"
            }    text-white font-semibold py-3 rounded-lg transition duration-300`}
          >
            {isLoading === "forgetpassword" ? <Loader /> : "Send OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
