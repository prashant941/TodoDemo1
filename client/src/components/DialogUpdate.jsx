import React, { useState, useEffect } from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import useTodo from "../hooks/useTodo";

const DialogUpdate = ({ todo }) => {
  const [title, setTitle] = useState(todo.title);
  const { todoUpdate, getAllTodo } = useTodo();

  // Update state when todo changes
  useEffect(() => {
    setTitle(todo.title);
  }, [todo]);

  // Handle submit
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    await todoUpdate({ id: todo.uuid, data: { title } });
    getAllTodo(); // refresh the list after update
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit Todo</DialogTitle>
      </DialogHeader>

      <form onSubmit={handleUpdate}>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="title" className="text-sm font-medium">
              Todo Title
            </label>
            <input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border px-3 py-2 rounded text-sm w-full"
              placeholder="Enter new title"
            />
          </div>
        </div>

        <DialogFooter>
          {/* Cancel Button */}
          <DialogClose asChild>
            <button
              type="button"
              className="border px-4 py-2 rounded text-sm hover:bg-gray-100"
            >
              Cancel
            </button>
          </DialogClose>

          <DialogClose asChild>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
            >
              Save Changes
            </button>
          </DialogClose>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default DialogUpdate;
