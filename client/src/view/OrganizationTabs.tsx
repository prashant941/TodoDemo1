import React, { useState, useEffect } from "react";
import useOrganizastion from "../hooks/useOrganizastion";
import { MdDelete } from "react-icons/md";
import { FaShare } from "react-icons/fa";
import { toast } from "sonner";
import { Link } from "react-router-dom";
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
} from "../components/ui/dialog";

const OrganizationTabs = () => {
  const navigastion = useNavigate();
  const {
    getMyOrganizastion,
    deleteOrg,
    orgInvitation,
    invitastionAll,
    setOrgname: toSetOrgName,
  } = useOrganizastion();

  const [activeTab, setActiveTab] = useState("all");
  const [allOrganizations, setAllOrganizations] = useState<{organization:{id:string,name:string},name:string,id:string}[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [orgName, setOrgname] = useState<{id:string,name:string}>({id:"",name:""});
  const [email, setEmail] = useState<string>("");
  const [message, setErr] = useState<string>("");
  const [acceptedOrganizations, setAcceptedOrganizations] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getMyOrganizastion().unwrap();
        setAllOrganizations(response?.reverse());
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleDelete = async (orgId: string) => {
    try {
      await deleteOrg(orgId);
      const response = await getMyOrganizastion().unwrap();
      setAllOrganizations(response?.reverse());
    } catch (error) {
      console.log("Error deleting organization: ", error);
    }
  };

  const handleShare = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await orgInvitation({
        id: orgName.id,
        email: email,
      }).unwrap();
      toast.success(response);
      setDialogOpen(false);
    } catch (error: any) {
      setErr(error);
      console.log(error);
      setDialogOpen(true);
    }

    setEmail("");
  };

  const orgHandle = (id:string, name:string) => {
    if (!id) return;
    toSetOrgName(name);
    navigastion(`./todo/${id}`);
  };
  useEffect(() => {
    (async () => {
      try {
        const data = await invitastionAll().unwrap();
        setAcceptedOrganizations(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const displayedOrganizations =
    activeTab === "accepted" ? acceptedOrganizations : allOrganizations;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("all")}
          className={`flex-1 py-3 text-center font-medium transition-all duration-200 ${
            activeTab === "all"
              ? "border-b-4 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-blue-500"
          }`}
        >
          My Organizations
        </button>
        <button
          onClick={() => setActiveTab("accepted")}
          className={`flex-1 py-3 text-center font-medium transition-all duration-200 ${
            activeTab === "accepted"
              ? "border-b-4 border-blue-500 text-blue-600"
              : "text-gray-500 hover:text-blue-500"
          }`}
        >
          Accepted Organizations
        </button>
      </div>

      <div className="space-y-4">
        {displayedOrganizations.length === 0 ? (
          <p className="text-gray-400 text-center">
            No organizations to display.
          </p>
        ) : (
          displayedOrganizations.map((org, index) => {
            const name =
              activeTab === "accepted" ? org.organization?.name : org.name;
            const id = activeTab === "accepted" ? org.organization?.id : org.id;

            return (
              <div
                key={id}
                className="p-4 border rounded-lg flex justify-between items-center hover:shadow-md transition-shadow"
                onClick={() => orgHandle(org?.organization?.id, name)}
              >
                <h3 className="text-lg font-semibold">{name}</h3>
                {!org?.organization && (
                  <span className="flex items-center gap-5">
                    <MdDelete
                      fontSize={"22px"}
                      color="red"
                      className="cursor-pointer"
                      onClick={() => handleDelete(id)}
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
                          onClick={() => {
                            setOrgname({ name, id });
                            setEmail("");
                            setDialogOpen(true);
                            setErr("");
                          }}
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
                                {orgName?.name || "N/A"}
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
                  </span>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default OrganizationTabs;
