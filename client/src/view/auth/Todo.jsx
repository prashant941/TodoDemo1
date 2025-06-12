import React, { useState, useEffect } from "react";
import useOrganizastion from "../../hooks/useOrganizastion";
import { Link } from "react-router-dom";
import { FaShare } from "react-icons/fa";
import Swal from "sweetalert2";
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
import { MdDelete } from "react-icons/md";
import { toast } from "sonner";
import useAuth from "../../hooks/useAuth";
const Todo = () => {
  const {
    invitastionAll,
    getMyOrganizastion,
    createOrganizastion,
    deleteOrg,
    orgInvitation,
    setOrgname: toSetOrgName,
    orgs,
  } = useOrganizastion();
  const { user } = useAuth();

  const navigastion = useNavigate();
  const [acceptedOrganizations, setAcceptedOrganizations] = useState([]);
  const [allOrganizations, setAllOrganizations] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [message, setErr] = useState();
  const [orgName, setOrgname] = useState(null);

  const [email, setEmail] = useState("");

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

        setAllOrganizations(all);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const orgSubmit = async (data) => {
    orgRest();
    try {
      await createOrganizastion(data).unwrap();
      toast.success("Organization created");
      const response = await getMyOrganizastion().unwrap();
      setAllOrganizations(response?.reverse());
    } catch (error) {
      toast.error("Failed to create organization");
    }
  };
  const deleteHandle = async (orgId) => {
    try {
      await deleteOrg(orgId);
      const response = await getMyOrganizastion().unwrap();
      setAllOrganizations(response?.reverse());
    } catch (error) {
      console.log("Error deleting organization: ", error);
    }
  };
  const handleDelete = async (orgId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteHandle(orgId);

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };
  const handleShare = async (e) => {
    e.preventDefault();

    try {
      const response = await orgInvitation({
        id: orgName.id,
        email: email,
      }).unwrap();
      toast.success(response);
      setDialogOpen(false);
    } catch (error) {
      setErr(error);
      console.log(error);
      setDialogOpen(true);
    }

    setEmail("");
  };
  const todoView = (id, name) => {

    if (!id) return;

    toSetOrgName(name);
    navigastion(`./todo/${id}`);
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
          <h3 className="text-md font-bold mb-2  text-blue-700">
            Accepted Organizations
          </h3>
          <ul className="space-y-3">
            {orgs.length > 0 ? (
              orgs.map((org) => (
                <button
                  onClick={() =>
                    todoView(
                      org?.organization?.id || org.id,
                      org.organization?.name
                    )
                  }
                  className="w-full"
                  key={org.id || org.organization?.id}
                >
                  <li
                    key={org.id || org.organization?.id}
                    className="p-4 bg-gray-50 rounded-lg shadow hover:bg-gray-100 transition"
                  >
                    <h3 className="text-lg text-left font-medium">
                      {org.name || org.organization?.name}
                    </h3>
                  </li>
                </button>
              ))
            ) : (
              <li className="text-gray-500">
                No accepted organizations found.
              </li>
            )}
          </ul>
        </div>

        <hr className="border-t border-gray-300 mx-6 my-2" />

        <div className="p-6 max-h-64 overflow-y-auto">
          <h3 className="text-md font-bold mb-2 text-green-700">
            My Organizations
          </h3>
          <ul className="space-y-3">
            {allOrganizations.length > 0 ? (
              allOrganizations.map((org) => (
                <li
                  key={org.id}
                  className="p-4 bg-gray-100 rounded-lg shadow flex justify-between items-center hover:bg-gray-200 transition cursor-pointer"
                  onClick={() => todoView(org.id, org.name)}
                >
                  <h3 className="text-lg font-medium">{org.name}</h3>

                  <div
                    className="flex items-center gap-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MdDelete
                      fontSize={"22px"}
                      color="red"
                      className="cursor-pointer"
                      onClick={() => handleDelete(org?.id)}
                    />

                    <Dialog
                      open={dialogOpen}
                      onOpenChange={(val) => {
                        setDialogOpen(val);
                        setErr("");
                      }}
                    >
                      <DialogTrigger asChild>
                        <button
                          type="button"
                          onClick={() => {
                            setOrgname({ name: org.name, id: org.id });
                            setEmail("");
                            setDialogOpen(true);
                            setErr("");
                          }}
                          className="p-1"
                        >
                          <FaShare className="cursor-pointer" />
                        </button>
                      </DialogTrigger>

                      <DialogContent className="sm:max-w-[425px]">
                        <form onSubmit={handleShare}>
                          <DialogHeader>
                            <DialogTitle>Share via Email</DialogTitle>
                            <h2>
                              Share this organization:{" "}
                              <span className="font-bold text-blue-600">
                                {org.name}
                              </span>
                            </h2>
                            <DialogDescription>
                              Enter the email address to share the organization.
                            </DialogDescription>
                          </DialogHeader>

                          <div className="grid gap-4">
                            <div className="grid gap-3">
                              <label htmlFor="email">Email</label>
                              {message && (
                                <div
                                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                                  role="alert"
                                >
                                  <strong className="font-bold">Failed!</strong>
                                  <span className="block sm:inline">
                                    {message}.
                                  </span>
                                </div>
                              )}
                              <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => {
                                  setEmail(e.target.value);
                                  setErr("");
                                }}
                                placeholder="Enter recipient's email"
                                required
                                className="border p-2 rounded"
                              />
                            </div>
                          </div>

                          <DialogFooter className="flex gap-20 mt-4">
                            <DialogClose asChild>
                              <button
                                type="button"
                                className="border px-4 py-2 rounded text-gray-600"
                              >
                                Cancel
                              </button>
                            </DialogClose>
                            <button
                              type="submit"
                              className="bg-blue-500 text-white p-2 px-4 cursor-pointer rounded"
                            >
                              Share
                            </button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
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
