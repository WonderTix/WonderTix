import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  return true;
  //TODO auth function
};

export default function Auth() {
  const isLoggedIn = useAuth();

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />
};