import apiClient from "../../../services/apiClient";

export const getProjectsByUserId = async (userId) => {
    const response = await apiClient.get(
        `/projects/user/${userId}/projects`
    );

    return response.data;
};