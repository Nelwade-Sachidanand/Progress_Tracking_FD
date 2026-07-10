import apiClient from "../../../services/apiClient";

export const getAllProjectInformation = async () => {
  const response = await apiClient.get("/project-information/all");
  return response.data;
};

export const getProjectInfoById = async (id) => {
  const response = await apiClient.get(`/project-information/${id}`);
  return response.data;
};