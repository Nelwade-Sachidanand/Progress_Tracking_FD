import { useState } from "react";
import { toast } from "react-toastify";
import {updateMilestoneWeightages,} from "../services/milestoneService";

export const useMilestone = () => {
    const [loading, setLoading] =
        useState(false);

    const updateWeightages = async (
        payload
    ) => {
        try {
            setLoading(true);

            const response =
                await updateMilestoneWeightages(
                    payload
                );

            if (response.statusType === "S") {
                toast.success(response.statusDesc);

                return response;
            }

            toast.error(response.statusDesc);

            return null;
        } catch (error) {
            toast.error(error.response?.data?.statusDesc ||"Failed to update milestone weightages");

            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        updateWeightages,
        loading,
    };
};