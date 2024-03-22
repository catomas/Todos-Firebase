import { Link, Navigate } from "react-router-dom";
import { doSignOut } from "../../firebase/auth";

export const TopMenu = ({ user }) => {
  return (
    <>
      {user ? (
        <div className=" sticky mb-6 top-0 z-10 w-full bg-white   bg-white/90 backdrop-blur-lg px-4  ">
          <div className="flex  justify-between items-center w-full mx-auto max-w-screen-xl">
            {/* Logo */}
            <div className=" text-2xl py-2">
              <Link to="/">
                <span className={` antialiased font-bold`}>Todos</span>
                <span> | App </span>
              </Link>
            </div>

            <div className=" mx-auto  ">Welcome {user.email}</div>
            <button
              onClick={doSignOut}
              className="bg-red-500 text-white rounded-lg p-2 hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};
