import apiClient from "../../../services/apiClient";

export const updateActivity = async (payload) => {
  const response = await apiClient.put("/activity/update/request", payload);

  return response.data;
};
