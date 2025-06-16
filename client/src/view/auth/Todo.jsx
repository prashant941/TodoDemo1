import React, { useState, useEffect } from "react";
import useOrganizastion from "../../hooks/useOrganizastion";
import { useNavigate } from "react-router-dom";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import useAuth from "../../hooks/useAuth";
import { FaArrowAltCircleRight } from "react-icons/fa";

const Todo = () => {
  const { invitastionAll, getMyOrganizastion, createOrganizastion, orgs } =
    useOrganizastion();
  const { user } = useAuth();

  const navigastion = useNavigate();
  const [allOrganizations, setAllOrganizations] = useState([]);

  const {
    register: prgRegister,
    handleSubmit: orgHandleSubmit,
    reset: orgRest,
  } = useForm();

  useEffect(() => {
    (async () => {
      try {
        invitastionAll();
        const all = await getMyOrganizastion().unwrap();
        setAllOrganizations([...all].reverse());

        const orgId = localStorage.getItem("orgId");
        if (orgId) {
          navigastion(`/todo`);
        } else {
          navigastion("/switch");
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const orgSubmit = async (data) => {
    try {
      const created = await createOrganizastion(data).unwrap();
      toast.success("Organization created");
      orgRest();

      const response = await getMyOrganizastion().unwrap();
      setAllOrganizations([...response].reverse());
    } catch (error) {
      console.log(error);
      toast.error("Failed to create organization");
    }
  };

  const todoView = (id, name) => {
    if (!id) return;
    localStorage.setItem("orgId", id);
    localStorage.setItem("orgName", name);
    return navigastion(`/todo/`);
  };

  return (
    <div className="min-h-[88vh] flex items-center justify-center bg-gray-100 p-4">
      <h1 className="absolute top-36 left-1/2 transform -translate-x-1/2 text-4xl font-bold text-gray-800">
        Welcome Back <span className="text-blue-600">{user?.name}</span>
      </h1>

      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg overflow-hidden relative">
        <div className="absolute top-4 right-4">
          <Dialog>
            <DialogTrigger asChild>
              <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                New
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-center text-2xl">
                  Create Organization
                </DialogTitle>
                <DialogDescription>
                  Add your organization name. Click create to continue.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={orgHandleSubmit(orgSubmit)}>
                <div className="grid gap-4">
                  <div className="grid gap-3">
                    <label htmlFor="name">Organization Name</label>
                    <input
                      {...prgRegister("name")}
                      id="name"
                      name="name"
                      className="border-b-2 outline-none text-2xl font-bold"
                    />
                  </div>
                </div>
                <DialogFooter className="mt-7">
                  <DialogClose asChild>
                    <button
                      type="submit"
                      className="bg-[#1A73E8] text-white px-3.5 py-2 rounded-2xl shadow"
                    >
                      Create
                    </button>
                  </DialogClose>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-center">
            Organization Dashboard
          </h2>
        </div>

        <div className="p-6 max-h-64 overflow-y-auto">
          <h3 className="text-md font-bold mb-2 text-blue-700">
            Accepted Organizations
          </h3>
          <ul className="space-y-3">
            {orgs.length > 0 ? (
              orgs.map((org) => (
                <li key={org.id || org.organization?.id}>
                  <button
                    onClick={() =>
                      todoView(
                        org?.organization?.id || org.id,
                        org.organization?.name
                      )
                    }
                    className="w-full"
                  >
                    <div className="p-4 bg-gray-50 rounded-lg shadow hover:bg-gray-100 transition text-left">
                      <h3 className="text-lg font-medium">
                        {org.name || org.organization?.name}
                      </h3>
                    </div>
                  </button>
                </li>
              ))
            ) : (
              <li className="text-gray-500">
                No accepted organizations found.
              </li>
            )}
          </ul>
        </div>

        <hr className="border-t border-gray-300 mx-6 my-2" />

        {/* My Organizations */}
        <div className="p-6 max-h-64 overflow-y-auto">
          <h3 className="text-md font-bold mb-2 text-green-700">
            My Organizations
          </h3>
          <ul className="space-y-3">
            {allOrganizations.length > 0 ? (
              allOrganizations.map((org) => (
                <li
                  key={org.id}
                  className="p-4 bg-gray-100 rounded-lg shadow flex justify-between items-center hover:bg-gray-200 transition"
                >
                  <h3 className="text-lg font-medium">{org.name}</h3>
                  <div
                    className="flex items-center gap-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={() => todoView(org.id, org.name)}
                      className="p-1"
                    >
                      <FaArrowAltCircleRight
                        size={40}
                        className="cursor-pointer"
                      />
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <li className="text-gray-500">No organizations available.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Todo;
