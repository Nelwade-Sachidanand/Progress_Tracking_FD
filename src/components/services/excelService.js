import apiClient from "../../services/apiClient";

export const uploadExcel = async (file) => {
    const formData = new FormData();

    formData.append("file", file);

    const response = await apiClient.post(
        "/excel/upload",
        formData,
        {
            headers: { 
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};