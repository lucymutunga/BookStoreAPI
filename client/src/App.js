import "./App.css";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/HomePage/Home";
import User from "./components/user/User";
import Borrow from "./components/user/Borrow";
import Return from "./components/user/Return";
import History from "./components/user/History";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/user",
      element: <User />,
      children: [
        {
          path: "borrowbooks",
          element: <Borrow />,
        },
        {
          path: "returnbooks",
          element: <Return />,
        },
        {
          path: "mybooks",
          element: <History />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
