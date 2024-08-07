import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function GuestGuard() {
  const authContext = useContext(AuthContext);

  if (authContext?.authTokens) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
