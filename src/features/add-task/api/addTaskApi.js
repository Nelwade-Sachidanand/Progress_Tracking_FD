import apiClient from "../../../services/apiClient";

export const createActivity = async (payload) => {
  const response = await apiClient.post("/activity/create", payload);

  return response.data;
};
