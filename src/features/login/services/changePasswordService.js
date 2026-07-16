import apiClient from "../../../services/apiClient";

export const changeTemporaryPassword = async (request) => {
  const response = await apiClient.put(
    "/user/changeTemporaryPassword",
    request,
  );

  return response.data;
};