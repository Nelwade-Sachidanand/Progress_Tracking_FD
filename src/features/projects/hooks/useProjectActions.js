import { toast } from "react-toastify";
import { deleteProject as deleteProjectService } from "../services/projectService";
import { useState } from "react";
import { useProjects } from "../../../context/ProjectContext";

export default function useProjectActions() {

    const [loading,setLoading] = useState(false);

    const { fetchProjects } = useProjects();

    const deleteProject = async (projectId) => {

        const user = JSON.parse(sessionStorage.getItem("user"));

        try {
            setLoading(true);

            const response = await deleteProjectService(projectId);

            if (response?.statusType === "S") {
                toast.success(response.statusDesc);
                await fetchProjects(user.id);
                return response;
            }

            toast.error(response?.statusDesc || "Failed to delete project");
            return null;
        } catch (error) {
            toast.error(
                error?.response?.data?.statusDesc || "Failed to delete project"
            );
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        deleteProject,
    };
}