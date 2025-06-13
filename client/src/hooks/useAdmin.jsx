import useAuth from "./useAuth";

const useAdmin = () => {
  const user = useAuth();
  return user && user.role === "admin";
};

export default useAdmin;
