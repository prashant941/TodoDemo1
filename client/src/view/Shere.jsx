import React, { useEffect, useState } from "react";
import { IoShareSocialSharp } from "react-icons/io5";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useOrganizastion from "../hooks/useOrganizastion";
const Share = ({ orgId, onClose }) => {
  const { orgInvitation, message, clearMessage } = useOrganizastion();

  const [name, setName] = useState("");
  useEffect(() => {
    if (message && name.trim().length > 0) {
      clearMessage();
    }
  }, [name]);
  if (!orgId) {
    return;
  }
  const submitHandle = async () => {
    if (!name.trim()) {
      return alert("Email cannot be empty");
    }
    try {
      const response = await orgInvitation({ id: orgId, email: name }).unwrap();
      setName("");
      onClose();
    } catch (error) {}
  };

  return (
    <>
      {" "}
      <DialogContent className="max-w-md rounded-lg p-6 shadow-lg bg-white">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Share with Organization
          </DialogTitle>
          {message && (
            <div
              class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong class="font-bold">! </strong>
              <span class="block sm:inline">{message}.</span>
              <span class="absolute top-0 bottom-0 right-0 px-4 py-3"></span>
            </div>
          )}
          <DialogDescription className="text-sm text-gray-600 mb-4">
            Enter the email address of the person you want to share with.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="example@organization.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <button
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            onClick={submitHandle}
          >
            Share
          </button>
        </div>
      </DialogContent>
    </>
  );
};

export default Share;
