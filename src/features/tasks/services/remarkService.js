import apiClient from "../../../services/apiClient";

export const addRemark = async (payload) => {
  const response = await apiClient.post("/activity/add/remark", payload);

  return response.data;
};
