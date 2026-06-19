import apiClient from "../../../services/apiClient";

export const getAuthRequests = async () => {
  const response = await apiClient.get("/activity-request/pending");

  return response.data;
};

export const getAllAuthRequests = async () => {
  const response = await apiClient.get("/activity-request/getAllRequests");

  return response.data;
}

export const getProjectNames = async (projectIds) => {
  const response = await apiClient.post("/projects/getNames", { projectIds });

  return response.data;
}

export const approveRequest = async (projectId) => {
  const response = await apiClient.post(`/activity-request/approve/${projectId}`);

  return response.data;
};

export const rejectRequest = async (requestId,reason) => {
  const response = await apiClient.post(`/activity-request/reject/${requestId}?reason=${encodeURIComponent(reason)}`);

  return response.data;
};