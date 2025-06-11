import { createBrowserRouter } from "react-router";
import App from "../App";
import MainLayout from "../layouts/MainLayout";
import Home from "../Pages/home/Home";
import Blogs from "../Pages/blogs/Blogs";
import CategoryPage from "../Pages/category/CategoryPage";
import Search from "../Pages/search/Search";
import ShopPage from "../Pages/shop/ShopPage";
import Login from "../Components/Login";
import Register from "../Components/Register";
import ErrorBoundary from "../Components/ErrorBoundary";
import SingleProduct from "../Pages/shop/ProducDetails/SingleProduct";
const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { path: "/", Component: Home },
      { path: "/categories/:categoryName", Component: CategoryPage },
      { path: "/blogs", Component: Blogs },
      { path: "/search", Component: Search },
      // { path: "/shop", Component: ShopPage, errorElement: ErrorBoundary },
      {
        path: "/shop",
        element: (
          <ErrorBoundary>
            <ShopPage />
          </ErrorBoundary>
        ),
      },
      { path: "/shop/:id", Component: SingleProduct },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
]);

export default router;
