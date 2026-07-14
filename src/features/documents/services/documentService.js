import apiClient from "../../../services/apiClient";

const DOCUMENT_BASE = "/documents";

export const uploadDocument = async (file, payload) => {
  const formData = new FormData();

  formData.append("file", file);

  formData.append("projectId", payload.projectId);
  formData.append("projectName", payload.projectName);
  formData.append("bankName", payload.bankName);
  formData.append("phaseId", payload.phaseId);
  formData.append("milestoneId", payload.milestoneId);
  formData.append("taskId", payload.taskId);
  formData.append("subTaskId", payload.subTaskId);
  formData.append("activityId", payload.activityId);

  const response = await apiClient.post(`${DOCUMENT_BASE}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const getAllDocuments = async (projectId) => {
  console.log("id : ", projectId);
  const response = await apiClient.get(`${DOCUMENT_BASE}/getAll/${projectId}`);

  return response.data;
};

export const downloadDocument = async (documentId) => {
  const response = await apiClient.get(
    `${DOCUMENT_BASE}/download/${documentId}`,
    {
      responseType: "blob",
    },
  );

  return response;
};
