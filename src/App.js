import { Todos } from "./components/todos/Todos";
import Login from "./components/auth/Login";
import { useRoutes } from "react-router-dom";
import Register from "./components/auth/Register";
import { AuthProvider } from "./context/authContext";

function App() {
  const routesArray = [
    {
      path: "*",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/todos",
      element: <Todos />,
    },
  ];

  let routes = useRoutes(routesArray);
  return (
    <AuthProvider>
      <div className="w-full h-screen flex flex-col">{routes}</div>
    </AuthProvider>
  );
}

export default App;
