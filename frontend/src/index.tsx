import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/error/ErrorPage";
import { Login } from "./pages/login/Login";
import Register from "./pages/register/Register";
import UpdatePassword from "./pages/updatepassword/UpdatePassword";

// 设置路由路径
const routes = [
  {
    path: "/",
    element: <div>index</div>,
    errorElement: <ErrorPage />,
  },
  {
    path: "login",
    element: <Login />,
  },

  {
    path: "register",
    element: <Register />,
  },
  {
    path: "updatePassword",
    element: <UpdatePassword />,
  },
];
// 生成实际路由
const router = createBrowserRouter(routes);
// 渲染应用
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<RouterProvider router={router} />);

reportWebVitals();
