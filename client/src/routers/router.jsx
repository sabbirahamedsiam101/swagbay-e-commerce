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
import DashboardLayout from "../layouts/DashboardLayout";
import AdminHome from "../Pages/Dashboard/Admin/AdminHome";
import ManageProducts from "../Pages/Dashboard/Admin/ManageProducts/ManageProducts";
import ManageOrders from "../Pages/Dashboard/Admin/ManageOrders";
import AddNewPost from "../Pages/Dashboard/Admin/AddNewPost";
import DashboardHome from "../Pages/Dashboard/User/DashboardHome";
import Profile from "../Pages/Dashboard/User/Profile";
import Payments from "../Pages/Dashboard/User/Payments";
import Orders from "../Pages/Dashboard/User/Orders";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import UpdateProdcut from "../Pages/Dashboard/Admin/ManageProducts/UpdateProduct";
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
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      // ✅ Protected route for all logged-in users
      {
        index: true,
        element: (
          <PrivateRoute>
            <DashboardHome />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "payments",
        element: (
          <PrivateRoute>
            <Payments />
          </PrivateRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <PrivateRoute>
            <Orders />
          </PrivateRoute>
        ),
      },

      // 👑 Admin-only routes
      {
        path: "admin",
        element: (
          <AdminRoute>
            <AdminHome />
          </AdminRoute>
        ),
      },
      {
        path: "manage-products",
        element: (
          <AdminRoute>
            <ManageProducts />
          </AdminRoute>
        ),
      },
      {
        path: "manage-products/update-product/:id",
        element: (
          <AdminRoute>
            <UpdateProdcut />
          </AdminRoute>
        ),
      },
      {
        path: "manage-orders",
        element: (
          <AdminRoute>
            <ManageOrders />
          </AdminRoute>
        ),
      },
      {
        path: "add-new-post",
        element: (
          <AdminRoute>
            <AddNewPost />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
