import React, { useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import useTodo from "../../hooks/useTodo";
import DialogUpdate from "../../components/DialogUpdate";
import useOrganizastion from "../../hooks/useOrganizastion";
import { useState } from "react";

const Todo = () => {
  const { createOrganizastion, pendingOrg, orgAccepte } = useOrganizastion();
  const { register, handleSubmit, reset } = useForm();
  const [bellCount, setBellCount] = useState();

  const {
    register: prgRegister,
    handleSubmit: orgHandleSubmit,
    reset: orgRest,
  } = useForm();
  const {
    createTodo,
    getAllTodo,
    todos,
    OptimisticAddTodo,
    removeTodos,
    deleteTodo: Tododelete,
  } = useTodo();

  const onSubmit = async (TodoData) => {
    reset();
    OptimisticAddTodo(TodoData);
    await createTodo(TodoData);
    getAllTodo();
  };

  const deleteTodo = (id) => {
    removeTodos(id);
    Tododelete({ id, orgId: null });
  };
  const orgSubmit = async (data) => {
    orgRest();
    try {
      await createOrganizastion(data).unwrap();
      toast.success("created");
    } catch (error) {
      toast.error(error);
    }
  };

  const accepteRequest = async (id) => {
    await orgAccepte({ orgId: id, action: "accept" });
    setBellCount((prev) =>
      prev.filter((items, i) => items?.organization?.id !== id)
    );
    toast.success("invitation accepted");
  };
  useEffect(() => {
    getAllTodo();
    (async () => {
      try {
        const data = await pendingOrg().unwrap();
        setBellCount(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="w-[80%] bg-[#F6F7FF] mx-auto min-h-[700px]">
      <div className="h-60 bg-[#614484] m-3 rounded-2xl shadow-2xl shadow-amber-300 relative">
        <span className="absolute -right-10 text-2xl">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button variant="outline">
                <FaBell className="cursor-pointer" />
                <div className="w-4 h-4 text-[15px] text-white bg-red-500 rounded-full relative -top-3 -right-4 flex items-center justify-center">
                  {bellCount?.length}
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-96 p-4 bg-white shadow-lg rounded-md"
              align="start"
            >
              {bellCount?.length > 0 ? (
                bellCount?.map((item, i) => {
                  return (
                    <div
                      key={i}
                      className="flex items-center justify-between  mb-6"
                    >
                      <div className="text-sm text-gray-700">
                        🔔 You have a new organization request from{" "}
                        <span className="font-semibold">
                          {item?.organization?.name}
                        </span>
                        .
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <button className="text-sm px-3 py-1 bg-gray-100 rounded hover:bg-gray-200">
                          Ignore
                        </button>
                        <button
                          onClick={() => accepteRequest(item?.organization?.id)}
                          className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          Accept
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center">No Request</div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </span>
        \
        <h1 className="text-white font-bold text-5xl text-center pt-9">
          Todo List
        </h1>
        <Dialog>
          <DialogTrigger asChild>
            <button className="absolute right-7 top-8 bg-[#1A73E8] px-6 py-2 text-white rounded-2xl cursor-pointer">
              Add Organization
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
                <Link
                  to={"/all-Organization"}
                  className="bg-[#1ae892] inline-block text-black px-3.5 py-2 rounded-2xl shadow mr-4"
                >
                  Show All Organizations
                </Link>
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

      <div className="bg-white h-52 -m-32 relative z-10 w-[80%] rounded-3xl flex items-center justify-center shadow-xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full text-center">
          <input
            {...register("title")}
            type="text"
            className="border-b-2 w-2/3 text-2xl font-bold border-black outline-none"
            placeholder="What would you like to do?"
            autoFocus
          />
        </form>
      </div>

      <div className="bg-white p-8 min-h-52 m-40 w-[80%] rounded-3xl shadow-xl mx-auto">
        <table className="table-auto w-full text-left">
          <thead>
            <tr className="text-gray-700 border-b">
              <th className="pb-2">List</th>
              <th className="pb-2">Status</th>
              <th className="pb-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos?.map((todo) => (
              <tr key={todo.id} className="border-t">
                <td className="py-2">{todo.title}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-white text-sm ${
                      todo.status === "Completed"
                        ? "bg-green-400"
                        : "bg-gray-400"
                    }`}
                  >
                    {todo.status}Completed
                  </span>
                </td>
                <td className="flex gap-2 py-2">
                  <button
                    onClick={() => deleteTodo(todo.uuid)}
                    className="inline-flex items-center justify-center p-2 rounded-md bg-red-100 text-red-600 hover:bg-red-200 transition"
                    title="Delete"
                  >
                    <FaTrash size={16} />
                  </button>

                  <Dialog>
                    <DialogTrigger asChild>
                      <button
                        className="inline-flex items-center justify-center p-2 rounded-md bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                        title="Edit"
                      >
                        <MdEdit size={18} />
                      </button>
                    </DialogTrigger>
                    <DialogUpdate todo={todo} />
                  </Dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Todo;
