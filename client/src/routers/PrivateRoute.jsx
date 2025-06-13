import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
