import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useTodo from "../hooks/useTodo";
import useOrganizastion from "../hooks/useOrganizastion";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import Swal from "sweetalert2";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import DialogUpdate from "../components/DialogUpdate";

const OrganizationTodo = () => {
  const { id: orgId } = useParams();
  const [todoData, setTodoData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const { orgname, createTodoForOrg } = useOrganizastion();
  const { orgTodo, deleteTodo } = useTodo();

  useEffect(() => {
    (async () => {
      try {
        const data = await orgTodo(orgId).unwrap();
        setTodoData(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [orgId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTodoForOrg({ id: orgId, title: inputValue });
    const data = await orgTodo(orgId).unwrap();
    setTodoData(data);
    setInputValue("");
  };
  const deleteHandle = (id) => {
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
        deleteTodo({ id, orgId });
        setTodoData((prev) => prev.filter((item) => item.uuid !== id));

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="w-full bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">{orgname} Todo</h2>
      <form
        className="flex flex-col items-center space-y-4"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="What would you like to do?"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-2/3 px-4 py-2 border-b-2 text-lg font-medium outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition"
        >
          Add Todo
        </button>
      </form>
      <div className="bg-white p-8 min-h-52 my-20 w-[80%] rounded-3xl shadow-xl mx-auto">
        <table className="table-auto w-full text-left">
          <thead>
            <tr className="text-gray-700 border-b">
              <th className="pb-2">List</th>
              <th className="pb-2">Status</th>
              <th className="pb-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {todoData?.length > 0
              ? todoData?.map((todo) => (
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
                        {todo.status}
                      </span>
                    </td>
                    <td className="flex gap-2 py-2">
                      <button
                        className="inline-flex items-center justify-center p-2 rounded-md bg-red-100 text-red-600 hover:bg-red-200 transition"
                        title="Delete"
                        onClick={() => deleteHandle(todo.uuid)}
                      >
                        <FaTrash size={16} />
                      </button>

                      <button
                        className="inline-flex items-center justify-center p-2 rounded-md bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                        title="Edit"
                      >
                        <Dialog>
                          <DialogTrigger asChild>
                            <button
                              className="inline-flex items-center justify-center p-2 rounded-md bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                              title="Edit"
                            >
                              <MdEdit size={18} />
                            </button>
                          </DialogTrigger>
                          <DialogUpdate
                            todo={todo}
                            orgId={orgId}
                            setTodoData={setTodoData}
                          />
                        </Dialog>
                      </button>
                    </td>
                  </tr>
                ))
              : "No Todo Created"}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrganizationTodo;
