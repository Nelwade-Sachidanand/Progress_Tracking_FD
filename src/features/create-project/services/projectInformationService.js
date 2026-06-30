import apiClient from "../../../services/apiClient";

export const getAllProjectInformation = async () => {
  const response = await apiClient.get("/project-information/all");
  return response.data;
};
