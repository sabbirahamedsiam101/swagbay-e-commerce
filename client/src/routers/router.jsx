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
        // User routes
      { index: true, Component: DashboardHome }, 
      { path: "profile", Component: Profile },
      { path: "payments", Component: Payments },
      { path: "orders", Component: Orders },

      // Admin routes
      { path: "admin", Component: AdminHome },
      { path: "manage-products", Component: ManageProducts },
      { path: "manage-orders", Component: ManageOrders },
      { path: "add-new-post", Component: AddNewPost },
    ],
  },
]);

export default router;
