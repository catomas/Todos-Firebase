import { FaEdit, FaRegTrashAlt } from "react-icons/fa";

export const Todo = ({ todo, toggleComplete, editTodo, deleteTodo }) => {
  const createdDate = new Date(
    todo.createdDate.seconds * 1000 +
      Math.floor(todo.createdDate.nanoseconds / 1000000)
  );
  return (
    <li
      className={
        todo.status
          ? `flex flex-col  bg-slate-400 p-4 my-2  line-through`
          : `flex flex-col bg-slate-200 p-4 my-2 `
      }
    >
      <div className=" flex justify-between w-full">
        <div className="flex flex-col">
          <div>
            <input
              onChange={() => toggleComplete(todo)}
              type="checkbox"
              className=" cursor-pointer "
              checked={todo.status ? "checked" : ""}
            />
            <span
              onClick={() => toggleComplete(todo)}
              className="ml-2 cursor-pointer"
            >
              {todo.title}
            </span>
          </div>
          <p className=" text-xs text-start italic">"{todo.description}"</p>
        </div>
        <div className="flex flex-col text-center justify-end items-end gap-2">
          <div className="flex gap-2">
            <button
              onClick={() => editTodo(todo)}
              className=" text-blue-400 mt-2 "
            >
              {<FaEdit />}
            </button>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-500 mt-2"
            >
              {<FaRegTrashAlt />}
            </button>
          </div>
          <p className=" italic text-xs">
            {createdDate.toLocaleString("en-GB")}
          </p>
        </div>
      </div>
    </li>
  );
};
