
import {createBrowserRouter,} from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Components/Home/Home";
import Register from "../Components/AuthPage/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/", 
        element: <Home></Home>,
      },
      {
        path: "/register", 
        element: <Register></Register>,
      }
    ]
  },
]);