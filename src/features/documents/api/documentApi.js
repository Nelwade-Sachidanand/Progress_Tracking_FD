import apiClient from "../../../services/apiClient";

const DOCUMENT_BASE = "/documents";

export const documentApi = {
  uploadDocument: (file, payload) => {
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

    // DEBUG (optional)
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    // ✅ Axios automatically handles multipart
    return apiClient.post(`${DOCUMENT_BASE}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};