import apiClient from "../../../services/apiClient";

export const exportExcelReport = async (
  reportRequest
) => {
  const response = await apiClient.post(
    "/reports/generate/report",
    reportRequest,
    {
      responseType: "blob",
    }
  );

  return response.data;
};