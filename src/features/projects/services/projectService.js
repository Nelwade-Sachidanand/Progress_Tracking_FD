import apiClient from "../../../services/apiClient";

export const deleteProject = async (projectId) => {
  const response = await apiClient.delete(`/projects/delete/${projectId}`);
  return response.data;
};