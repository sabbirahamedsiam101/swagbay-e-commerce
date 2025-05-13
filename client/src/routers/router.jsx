import { createBrowserRouter } from "react-router";
import App from "../App";
import MainLayout from "../layouts/MainLayout";
import Home from "../Pages/home/Home";
import Blogs from "../Pages/Blogs/Blogs";
import CategoryPage from "../Pages/Category/CategoryPage";
const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { path: "/", Component: Home },
      { path: "/categories/:categoryName", Component: CategoryPage },
      { path: "/blogs", Component: Blogs },
    ],
  },
]);

export default router;
