import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { AuthContext } from "./auth-provider";
import FullPageLoader from "@templates/full-page-loader.template";


export const ProtectedRoute = () => {
  const { currentUser, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <FullPageLoader />;
  } else if (!currentUser || currentUser === "Guest") {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};
