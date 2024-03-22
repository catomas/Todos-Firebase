import { useEffect, useState } from "react";
import { AiFillEdit, AiOutlinePlus } from "react-icons/ai";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { Todo } from "./Todo";
import { db } from "../../firebase/firebase";
import { useAuth } from "../../context/authContext";
import { Navigate } from "react-router-dom";
import { TopMenu } from "../nabvar/TopMenu";
import { useForm } from "react-hook-form";

export const Todos = () => {
  const [todos, setTodos] = useState([]);
  const { currentUser } = useAuth();
  const [addTodoBtn, setAddTodoBtn] = useState(true);
  const [editTodoId, setEditTodoId] = useState("");
  const [filter, setFilter] = useState("all");

  const {
    register,
    handleSubmit,
    reset,
    setValue,

    formState: { errors },
  } = useForm();

  // Create a new todo in firebase
  const createdTodo = async (data) => {
    await addDoc(collection(db, "users", currentUser.uid, "todos"), {
      title: data.title,
      description: data.description,
      status: false,
      createdDate: new Date(),
    });

    // Clear form fields
    reset();
  };

  // Read todos from firebase
  useEffect(() => {
    if (!currentUser) return;

    const q = query(collection(db, "users", currentUser.uid, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ id: doc.id, ...doc.data() });
      });
      setTodos(todosArr);
    });

    return () => unsubscribe();
  }, [currentUser]);

  // Update todo status in firebase
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "users", currentUser.uid, "todos", todo.id), {
      status: !todo.status,
    });
  };

  // Delete todo from firebase
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "users", currentUser.uid, "todos", id));
  };

  // Edit todo
  const editTodo = async (todo) => {
    setValue("title", todo.title);
    setValue("description", todo.description);
    setEditTodoId(todo.id);
    setAddTodoBtn(false);
  };

  const updateTodo = async (data) => {
    await updateDoc(doc(db, "users", currentUser.uid, "todos", editTodoId), {
      title: data.title,
      description: data.description,
    });
    setAddTodoBtn(true);
    reset();
  };

  // Cancel edit
  const cancelEdit = () => {
    setAddTodoBtn(true);
    reset();
  };

  const changeFilter = (newFilter) => {
    setFilter(newFilter);
  };

  let filteredTodos;
  switch (filter) {
    case "completed":
      filteredTodos = todos.filter((todo) => todo.status);
      break;
    case "notCompleted":
      filteredTodos = todos.filter((todo) => !todo.status);
      break;
    default:
      filteredTodos = todos;
  }

  return (
    <>
      {currentUser ? (
        <>
          <TopMenu user={currentUser} />
          <div className="w-full m-auto ">
            <div className=" bg-slate-100 max-w-[800px] w-full m-auto rounded-md shadow-xl p-4">
              {!addTodoBtn && (
                <button onClick={cancelEdit} className=" text-red-400">
                  Cancel Edit
                </button>
              )}

              <form
                onSubmit={handleSubmit(addTodoBtn ? createdTodo : updateTodo)}
                className="flex flex-col gap-2 m-6 "
              >
                <input
                  type="text"
                  placeholder="Title"
                  {...register("title", { required: true })}
                  className="border-2 border-gray-300 rounded-lg p-2 text-xl w-full"
                />
                <span className="text-red-500">
                  {errors.title && "Title is required"}
                </span>
                <textarea
                  type="text"
                  {...register("description", { required: true })}
                  placeholder="Description"
                  className="border-2 border-gray-300 rounded-lg p-2 text-xl"
                />
                <span className=" text-red-500">
                  {errors.description && "Description is required"}
                </span>

                {addTodoBtn ? (
                  <button
                    type="submit"
                    className=" bg-indigo-500 text-white rounded-lg p-2 flex text-center justify-center items-center gap-2 hover:bg-indigo-600 text-xl"
                  >
                    <AiOutlinePlus size={20} />
                    Add Todo
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="bg-blue-500 text-white rounded-lg p-2 flex text-center justify-center items-center gap-2 hover:bg-blue-600 text-xl"
                  >
                    <AiFillEdit size={20} />
                    Edit Todo
                  </button>
                )}
              </form>

              <div className="  border-2 flex justify-center p-2   gap-4 mb-4 ">
                <button
                  className={`text-sm  px-2 hover:text-indigo-600 ${
                    filter === "all" ? "text-indigo-500 underline " : ""
                  }`}
                  onClick={() => changeFilter("all")}
                >
                  All
                </button>
                <button
                  className={`text-sm  px-2 hover:text-indigo-600 ${
                    filter === "completed" ? "text-indigo-500 underline " : ""
                  }`}
                  onClick={() => changeFilter("completed")}
                >
                  Completed
                </button>
                <button
                  className={`text-sm  px-2 hover:text-indigo-600 ${
                    filter === "notCompleted"
                      ? "text-indigo-500 underline "
                      : ""
                  }`}
                  onClick={() => changeFilter("notCompleted")}
                >
                  Not Completed
                </button>
              </div>

              <ul>
                {filteredTodos.map((todo, index) => (
                  <Todo
                    key={index}
                    todo={todo}
                    toggleComplete={toggleComplete}
                    deleteTodo={deleteTodo}
                    editTodo={editTodo}
                  />
                ))}
              </ul>
              <p className="text-center">
                {filteredTodos.length === 0 && "No todos found"}
                {filteredTodos.length > 0 &&
                  `Total todos: ${filteredTodos.length}`}
              </p>
            </div>
          </div>
        </>
      ) : (
        <Navigate to="/login" replace={true} />
      )}
    </>
  );
};
