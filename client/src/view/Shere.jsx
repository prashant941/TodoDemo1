import React from "react";
import { IoShareSocialSharp } from "react-icons/io5";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
const Share = ({ orgId }) => {
  console.log("🚀 ~ Share ~ orgId:", orgId);
  if (!orgId) {
    return;
  }

  return (
    <>
      {" "}
      <DialogContent className="max-w-md rounded-lg p-6 shadow-lg bg-white">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Share with Organization
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600 mb-4">
            Enter the email address of the person you want to share with.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="example@organization.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
            Share
          </button>
        </div>
      </DialogContent>
    </>
  );
};

export default Share;
