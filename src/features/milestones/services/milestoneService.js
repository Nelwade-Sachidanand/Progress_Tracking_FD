import apiClient from "../../../services/apiClient";

export const updateMilestoneWeightages = async (payload) => {
  const response = await apiClient.put("/projects/milestone-weightages",payload
  );

  return response.data;
};