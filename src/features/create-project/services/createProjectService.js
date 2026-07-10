import apiClient from "../../../services/apiClient";

export const createProject = async (payload) => {
  // console.log(JSON.stringify(payload, null, 2));
  const response = await apiClient.post("/project-information/create", payload);

  return response.data;
};

export const getProjectInformation = async (bankName, projectName) => {
  const response = await apiClient.get(
    "/project-information/getProjectInformation",
    {
      params: {
        bankName,
        projectName,
      },
    },
  );

  return response.data;
};

export const updateProjectInformation = async (payload) => {
  const response = await apiClient.put(
    `/project-information/update`,
    payload,
  );

  return response.data;
};
