import { createBrowserRouter } from "react-router-dom";

import { AppLayout } from "./pages/_layouts/app";
import { NotFound } from "./pages/404";
import Dashboard from "./pages/dashboard";
import { Error } from "./pages/error";
import Posts from "./pages/posts";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/posts",
        element: <Posts />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
