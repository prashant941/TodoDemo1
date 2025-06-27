import React, { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "../../components/ui/input-otp";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const OtpInputComponent = () => {
  const [otp, setOtp] = useState<string>("");
  const [errorMessage, setErrMessage] = useState<string>();
  const { resetPassword, isLoading, message, clearMessage } = useAuth();

  const navigastion = useNavigate();

  const handleVerifyClick = async () => {
    localStorage.setItem("otp", otp);
    try {
      const response = await resetPassword({ otp: otp }).unwrap();
      setErrMessage("");
      toast.success(response?.message);

      navigastion("/change-password");
    } catch (error: any) {
      setErrMessage(error);``
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 mt-10">
      <h1 className="text-4xl m-14">Enter OTP</h1>
      {errorMessage && (
        <div
          id="alert-2"
          className="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <svg
            className="shrink-0 w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div className="ms-3 text-sm font-medium">{message}</div>
        </div>
      )}
      <InputOTP
        maxLength={6}
        value={otp}
        onChange={(value) => {
          setOtp(value);
          {
            message && clearMessage();
          }
        }}
        className="flex items-center space-x-4"
      >
        <InputOTPGroup className="flex space-x-2">
          <InputOTPSlot
            index={0}
            className="w-12 h-14 text-2xl text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all"
          />
          <InputOTPSlot
            index={1}
            className="w-12 h-14 text-2xl text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all"
          />
          <InputOTPSlot
            index={2}
            className="w-12 h-14 text-2xl text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all"
          />
        </InputOTPGroup>

        <InputOTPSeparator className="mx-2 text-xl font-bold text-gray-400">
          –
        </InputOTPSeparator>

        <InputOTPGroup className="flex space-x-2">
          <InputOTPSlot
            index={3}
            className="w-12 h-14 text-2xl text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all"
          />
          <InputOTPSlot
            index={4}
            className="w-12 h-14 text-2xl text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all"
          />
          <InputOTPSlot
            index={5}
            className="w-12 h-14 text-2xl text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all"
          />
        </InputOTPGroup>
      </InputOTP>
      <button
        onClick={handleVerifyClick}
        className={`${
          isLoading === "resetPassword"
            ? "bg-[#b7caf3] cursor-not-allowed"
            : "bg-blue-600"
        }  text-white px-6 py-2 rounded-lg`}
        disabled={isLoading === "resetPassword"}
      >
        Verify OTP
      </button>
    </div>
  );
};

export default OtpInputComponent;
