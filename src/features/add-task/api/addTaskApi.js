import apiClient from "../../../services/apiClient";

export const createActivity = async (
  payload
) => {
  const response =
    await apiClient.post(
      "/dashboard/create/activity",
      payload
    );

  return response.data;
};