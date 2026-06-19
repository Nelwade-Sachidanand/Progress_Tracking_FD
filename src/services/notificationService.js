import apiClient from "./apiClient";

export const getNotifications = async () => {
  const response = await apiClient.get("/notifications");

  return response.data;
};

export const getUnreadCount = async () => {
  const response = await apiClient.get("/notifications/count");

  return response.data;
};

export const markAsRead = async (id) => {
  const response = await apiClient.put(`/notifications/${id}/read`);

  return response.data;
};

export const markAllRead = async (id) => {
  const response = await apiClient.put("/notifications/read-all");

  return response.data;
};

