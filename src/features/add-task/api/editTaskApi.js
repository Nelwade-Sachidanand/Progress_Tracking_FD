import apiClient from "../../../services/apiClient";

export const updateActivity = async (payload) => {
  const response = await apiClient.put(
    "/dashboard/update/activity/request",
    payload,
  );

  return response.data;
};
