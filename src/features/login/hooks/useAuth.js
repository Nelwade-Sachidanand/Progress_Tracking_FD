import { useState } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../services/authService";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);

  const login = async (username, password) => {
    try {
      setLoading(true);

      const response = await loginUser(username, password);

      if (response.statusType === "S") {
        toast.success(response.statusDesc);

        localStorage.setItem("user", JSON.stringify(response.details.user));

        sessionStorage.setItem("user", JSON.stringify(response.details.user));


        localStorage.setItem("projects", JSON.stringify(response.details.projects),);

        sessionStorage.setItem("projects", JSON.stringify(response.details.projects),);


        localStorage.setItem("accessToken", response.details.accessToken);

        sessionStorage.setItem("accessToken", response.details.accessToken);

        localStorage.setItem("refreshToken", response.details.refreshToken);

        sessionStorage.setItem("refreshToken", response.details.refreshToken);


        // console.log(response.details);

        return response;
      }

      toast.error(response.statusDesc);

      return null;
    } catch (error) {
      toast.error(error.response?.data?.statusDesc || "Backend is Not Responding");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};
