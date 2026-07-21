import apiClient from "../../../services/apiClient";

export const getAuthRequests = async () => {
  const response = await apiClient.get("/activity-request/pending");

  return response.data;
};

export const getAllAuthRequests = async () => {
  const response = await apiClient.get("/activity-request/getAllRequests");

  return response.data;
};

export const getActivityUpdateRequestById = async (requestId) => {
  const response = await apiClient.get(
    `/activity-request/activityUpdateRequest/${requestId}`
  );

  return response.data;
};

export const getProjectNames = async (projectIds) => {
  const response = await apiClient.post("/projects/getNames", { projectIds });

  return response.data;
};

export const approveRequest = async (requestId) => {
  // console.log("request ID :", requestId);
  const response = await apiClient.post(
    `/activity-request/approve/${requestId}`,
  );

  return response.data;
};

export const rejectRequest = async (requestId, reason) => {
  const response = await apiClient.post(
    `/activity-request/reject/${requestId}?reason=${encodeURIComponent(reason)}`,
  );

  return response.data;
};

export const approveSelectedRequests = async (requestIds) => {
  const response = await apiClient.post(
    "/activity-request/approve-selected",
    requestIds,
  );

  return response.data;
};

export const rejectSelectedRequests = async (requestIds, reason) => {
  const response = await apiClient.post("/activity-request/reject-selected", {
    requestIds,
    reason,
  });

  return response.data;
};

export const rollbackRequest = async (requestId, password, reason) => {
  const response = await apiClient.post(
    `/authorization/rollback/${requestId}`,
    {
      password,
      reason,
    },
  );
  return response.data;
};
