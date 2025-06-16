import React, { useEffect, useState } from "react";
import useOrganizastion from "../hooks/useOrganizastion";
import Swal from "sweetalert2";
import { IoShareSocialSharp } from "react-icons/io5";
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
import Share from "./Shere";

const OrganizationTable = () => {
  const { getMyOrganizastion, deleteOrg, updateOrg } = useOrganizastion();
  const [data, setData] = useState([]);
  const [editOrgId, setEditOrgId] = useState(null);
  const [orgName, setOrgName] = useState("");
  const [orgId, setOrgId] = useState("");
  useEffect(() => {
    (async () => {
      try {
        const result = await getMyOrganizastion().unwrap();
        setData(result);
      } catch (error) {
        console.error("Failed to fetch organizations:", error);
      }
    })();
  }, []);

  const deleteHandle = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteOrg(id);
        setData((prev) => prev.filter((org) => org.id !== id));
        Swal.fire("Deleted!", "Organization deleted.", "success");
      }
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!orgName.trim()) {
      return Swal.fire(
        "Validation",
        "Organization name cannot be empty.",
        "warning"
      );
    }

    try {
      await updateOrg({ id: editOrgId, name: orgName }).unwrap();
      setData((prev) =>
        prev.map((org) =>
          org.id === editOrgId ? { ...org, name: orgName } : org
        )
      );

      setEditOrgId(null);
      setOrgName("");

      Swal.fire("Updated!", "Organization updated successfully.", "success");
    } catch (error) {
      console.error("Update failed:", error);
      Swal.fire("Error", "Failed to update organization.", "error");
    }
  };
  const shareHandle = (id) => {
    setOrgId(id);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-md overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-700">
            Manage Organizations
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-50 border-b text-left">
              <tr>
                <th className="px-6 py-3 font-medium">Organization Name</th>
                <th className="px-6 py-3 font-medium">Actions</th>
                <th className="px-6 py-3 font-medium">Share</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.length > 0 ? (
                data.map((org) => (
                  <tr key={org.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">{org.name}</td>

                    <td className="px-6 py-4">
                      <div className="flex space-x-4 items-center">
                        <Dialog>
                          <DialogTrigger asChild>
                            <button
                              className="text-blue-600 hover:text-blue-800 font-medium"
                              onClick={() => {
                                setEditOrgId(org.id);
                                setOrgName(org.name);
                              }}
                            >
                              ✏️ Edit
                            </button>
                          </DialogTrigger>

                          {editOrgId === org.id && (
                            <DialogContent className="sm:max-w-[425px]">
                              <form onSubmit={handleUpdate}>
                                <DialogHeader>
                                  <DialogTitle>Edit Organization</DialogTitle>
                                  <DialogDescription>
                                    Change the organization name and save.
                                  </DialogDescription>
                                </DialogHeader>

                                <div className="grid gap-4 py-4">
                                  <div className="grid gap-2">
                                    <label htmlFor="org-name">
                                      Organization Name
                                    </label>
                                    <input
                                      id="org-name"
                                      name="name"
                                      type="text"
                                      className="border p-2 rounded"
                                      value={orgName}
                                      onChange={(e) =>
                                        setOrgName(e.target.value)
                                      }
                                      required
                                    />
                                  </div>
                                </div>

                                <DialogFooter>
                                  <DialogClose asChild>
                                    <button
                                      type="button"
                                      className="border px-4 py-2 rounded"
                                    >
                                      Cancel
                                    </button>
                                  </DialogClose>

                                  <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded"
                                  >
                                    Save changes
                                  </button>
                                </DialogFooter>
                              </form>
                            </DialogContent>
                          )}
                        </Dialog>

                        <button
                          className="text-red-600 hover:text-red-800 font-medium"
                          onClick={() => deleteHandle(org.id)}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Dialog>
                        <DialogTrigger>
                          <IoShareSocialSharp
                            size={25}
                            className="cursor-pointer text-gray-600 hover:text-blue-600 transition-colors"
                            onClick={() => {
                              shareHandle(org.id);
                            }}
                          />
                        </DialogTrigger>
                        <Share orgId={orgId} />
                      </Dialog>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500">
                    No organizations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrganizationTable;
