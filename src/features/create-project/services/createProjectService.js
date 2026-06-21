import apiClient from "../../../services/apiClient";

export const createProject = async (payload) => {
  // console.log(JSON.stringify(payload, null, 2));
  const response = await apiClient.post("/project-information/create", payload);

  return response.data;
};
