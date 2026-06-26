import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const token = sessionStorage.getItem("accessToken");
  const user = JSON.parse(sessionStorage.getItem("user"));

  if (!token) {
    return <Outlet />;
  }

  if (user?.role === "USER") {
    return <Navigate to="/project-details" replace />;
  }

  return <Navigate to="/dashboard" replace />;
};

export default PublicRoute;
