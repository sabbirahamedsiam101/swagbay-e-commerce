import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const AdminRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);

  if (!user || user.role !== "admin") {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default AdminRoute;
