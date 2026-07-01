import apiClient from "../../../services/apiClient";

const DOCUMENT_BASE = "/documents";

export const uploadDocument = async (file, payload) => {
  const formData = new FormData();

  formData.append("file", file);

  formData.append("projectId", payload.projectId);
  formData.append("projectName", payload.projectName);
  formData.append("bankName", payload.bankName);
  formData.append("phaseName", payload.phaseName);
  formData.append("milestoneName", payload.milestoneName);
  formData.append("taskName", payload.taskName);
  formData.append("subTaskName", payload.subTaskName);
  formData.append("activityName", payload.activityName);

  const response = await apiClient.post(`${DOCUMENT_BASE}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const getAllDocuments = async () => {
  const response = await apiClient.get(`${DOCUMENT_BASE}/getAll`);

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
