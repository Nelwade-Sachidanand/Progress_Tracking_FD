import { useEffect, useState } from "react";
import {
  getUsers,
  registerUser,
  updateUser as updateUserService,
  getProjectNames,
  deleteUser as deleteUserApi
} from "../services/userService";
import { toast } from "react-toastify";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const userResponse = await getUsers();

      const users = userResponse.details || [];

      // console.log(users);

      const uniqueProjectIds = [
        ...new Set(users.flatMap((user) => user.projectIds || [])),
      ];

      let projectMap = {};

      if (uniqueProjectIds.length > 0) {
        const projectResponse = await getProjectNames(uniqueProjectIds);

        projectMap = projectResponse.details || {};
      }

      // console.log(projectMap);

      const usersWithProjectNames = users.map((user) => ({
        ...user,
        projectNames: (user.projectIds || []).map((projectId) => projectMap[projectId]),
      }));

      setUsers(usersWithProjectNames);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (userData) => {
    try {
      setLoading(true);

      const response = await registerUser(userData);

      if (response?.statusType === "S") {
        toast.success(response.statusDesc);
        return response;
      }

      toast.error(response?.statusDesc || "Failed to create user");
      return null;
    } catch (error) {
      toast.error(
        error?.response?.data?.statusDesc || "Failed to create user"
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateUserData = async (userData) => {
    try {
      setLoading(true);

      const response = await updateUserService(userData);

      if (response?.statusType === "S") {
        toast.success(response.statusDesc);
        return response;
      }

      toast.error(response?.statusDesc || "Failed to update user");
      return null;
    } catch (error) {
      toast.error(
        error?.response?.data?.statusDesc || "Failed to update user"
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    try {
      setLoading(true);

      const response = await deleteUserApi(userId);

      if (response?.statusType === "S") {
        toast.success(response.statusDesc);
        return response;
      }

      toast.error(response?.statusDesc || "Failed to delete user");
      return null;
    } catch (error) {
      toast.error(
        error?.response?.data?.statusDesc || "Failed to delete user"
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    fetchUsers,
    createUser,
    updateUser: updateUserData,
    deleteUser,
  };
};