import { useState } from "react";
import { toast } from "react-toastify";
import { changeTemporaryPassword } from "../services/changePasswordService";

export default function useChangePassword() {
    const [loading, setLoading] = useState(false);

    const changePassword = async (request) => {
        try {
            setLoading(true);

            const response = await changeTemporaryPassword(request);

            if (response.statusType === "S") {
                toast.success(response.statusDesc);
                return response;
            }

            toast.error(response.statusDesc);
            return null;
        } catch (error) {
            toast.error(
                error.response?.data?.statusDesc || "Backend is not responding",
            );
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        changePassword,
        loading,
    };
}