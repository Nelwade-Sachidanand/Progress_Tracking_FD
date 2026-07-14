import { use, useState } from "react";
import { toast } from "react-toastify";
import { updateMilestoneWeightages, } from "../services/milestoneService";
import { useProjects } from "../../../context/ProjectContext";

export const useMilestone = () => {
    const [loading, setLoading] =
        useState(false);

    const { fetchProjects } = useProjects();

    const user = JSON.parse(sessionStorage.getItem("user"));

    const updateWeightages = async (payload) => {
        try {
            setLoading(true);

            const response =
                await updateMilestoneWeightages(payload);

            if (response.statusType === "S") {
                toast.success(response.statusDesc);
                await fetchProjects(user.id);
                return response;
            }

            toast.error(response.statusDesc);

            return null;
        } catch (error) {
            toast.error(error.response?.data?.statusDesc || "Failed to update milestone weightages");

            throw error;
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 3000);
        }
    };

    return {
        updateWeightages,
        loading,
    };
};