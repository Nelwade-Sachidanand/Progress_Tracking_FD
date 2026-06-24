import { useState } from "react";
import { toast } from "react-toastify";
import { uploadExcel as uploadExcelService } from "../services/excelService";
import {useProjects} from "../../context/ProjectContext"

export const useExcel = () => {
    const [loading, setLoading] = useState(false);

    const { projects, fetchProjects } = useProjects();

    const uploadExcel = async (file) => {
        try {
            setLoading(true);

            const response = await uploadExcelService(file);

            if (response?.statusType === "S") {
                toast.success(response.statusDesc);
                await fetchProjects();
                return response;
            }

            toast.error(response?.statusDesc || "Excel upload failed");
            return null;
        } catch (error) {
            toast.error(
                error?.response?.data?.statusDesc ||
                "Excel upload failed"
            );
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        uploadExcel,
    };
};