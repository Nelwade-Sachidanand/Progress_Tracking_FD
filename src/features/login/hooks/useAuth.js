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

        const user = {
          ...response.details.user,
          forcePasswordChange: response.details.forcePasswordChange,
        };

        sessionStorage.setItem("user", JSON.stringify(user));

        sessionStorage.setItem("accessToken", response.details.accessToken);
        
        return response;
      }

      else toast.error(response.statusDesc);

      return null;
    } catch (error) {
      toast.error(
        error.response?.data?.statusDesc || "Backend is Not Responding",
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};
