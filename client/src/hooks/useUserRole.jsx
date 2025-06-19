// src/features/auth/hooks/useUserRole.js
import { useSelector } from "react-redux";
import { useGetUserByIdQuery } from "../redux/features/auth/authApi";


const useUserRole = () => {
  const userId = useSelector((state) => state.auth.user?._id); // Assuming you store user ID in auth slice
//   console.log("User ID from Redux:", userId);
  const { data, isLoading, error } = useGetUserByIdQuery(userId, {
    skip: !userId,
  });
    if (isLoading) {
        console.log("Loading user role...");
    }
//   console.log("Data from API:", data?.data);

  const role = data?.data?.role || null;
  console.log("User role from API:", role);
  return {
    role,
    isAdmin: role === "admin",
    isUser: role === "user",
    isLoading,
    error,
  };
};

export default useUserRole;
