import apiClient from "../../../services/apiClient";

export const getUsers = async () => {
  const response = await apiClient.get("/user/getAllUsers");

  return response.data;
};

export const getProjectNames = async (projectIds) => {
  const response = await apiClient.post("/projects/getNames", { projectIds });

  return response.data;
};

export const registerUser = async (userData) => {
  const response = await apiClient.post("/user/register", userData);

  return response.data;
};

export const updateUser = async (userData) => {
  const response = await apiClient.put("/user/updateUser", userData);

  return response.data;
};

export const deleteUser = async (userId) => {
  const response = await apiClient.delete(`/user/deleteUser/${userId}`);

  return response.data;
};

export const resetPassword = async (userId, temporaryPassword) => {
  const response = await apiClient.put(
    "/user/generateTemporaryPassword",
    null,
    {
      params: {
        userId,
        temporaryPassword,
      },
    }
  );

  return response.data;
};
