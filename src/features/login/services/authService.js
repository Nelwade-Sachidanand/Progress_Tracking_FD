import apiClient from "../../../services/apiClient";

export const loginUser = async (username,password) => {

  const response = await apiClient.post("/user/login", {username,password,});

  return response.data;
}; 