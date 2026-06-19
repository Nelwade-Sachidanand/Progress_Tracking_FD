import apiClient from "../../../services/apiClient";

export const getAuditLogs = async () => {
  const response = await apiClient.get("/audit/getAllAudit");

  return response.data;
};