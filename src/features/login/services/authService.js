import apiClient from "../../../services/apiClient";

export const loginUser = async (username,password) => {

  const response = await apiClient.post("/user/login", {username,password,});

  return response.data;
}; 

export const forgotPassword = async (username) => {
  const response = await apiClient.post(
    `/user/forgotPassword`,
    null,
    {
      params: {
        username,
      },
    }
  );

  return response.data;
};
 
export const logoutUser = async () => {
  const response = await apiClient.post("/user/logout");
  return response.data;
};