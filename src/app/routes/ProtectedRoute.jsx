import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const token = sessionStorage.getItem("accessToken");
  const user = JSON.parse(sessionStorage.getItem("user"));

  //   console.log("Token:", token);
  //   console.log("Role:", user?.role);
  //   console.log("Allowed Roles:", allowedRoles);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    console.log("Access Denied");

    if (user?.role === "USER") {
      return <Navigate to="/project-details" replace />;
    }

    return <Navigate to="/dashboard" replace />;
  }

  console.log("Access Granted");
  return <Outlet />;
};
export default ProtectedRoute;
