import { Eye, EyeOff, KeyRound, Lock } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import useChangePassword from "../hooks/useChangePassword";
import { useNavigate } from "react-router-dom";

export default function ChangePasswordForm() {

    const navigate = useNavigate();

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [submitting, setSubmitting] = useState(false);

    const { changePassword, loading } = useChangePassword();

    const user = JSON.parse(sessionStorage.getItem("user"));

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!currentPassword.trim()) {
            toast.error("Temporary password is required.");
            return;
        }

        if (!newPassword.trim()) {
            toast.error("New password is required.");
            return;
        }

        if (!confirmPassword.trim()) {
            toast.error("Confirm password is required.");
            return;
        }

        if (newPassword.length < 8) {
            toast.error("Password must be at least 8 characters.");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/.test(newPassword)) {
            toast.error("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",);
            return false;
        }

        try {
            setSubmitting(true);

            // Call change password API here

            console.log({ newPassword, confirmPassword, });

            const user = JSON.parse(sessionStorage.getItem("user"));

            const response = await changePassword({
                userId: user.id,
                currentPassword,
                newPassword,
                confirmPassword,
            });

            if (response) {
                sessionStorage.clear();
                navigate("/", {
                    replace: true,
                });
            }
        } catch (error) {
            
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
                <div className="border-b px-6 py-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                            <KeyRound className="h-6 w-6 text-blue-600" />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-slate-800">
                                Change Password
                            </h2>

                            <p className="text-sm text-slate-500">
                                You are using a temporary password.
                            </p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 p-6">

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Temporary Password
                        </label>

                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />

                            <input
                                type={showCurrentPassword ? "text" : "password"}
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                placeholder="Enter Temporary Password"
                                className="w-full h-10 rounded-lg border border-slate-300 py-3 pl-10 pr-12 outline-none transition focus:border-blue-500"
                            />

                            <button
                                type="button"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                className="absolute right-3 top-3 text-slate-500 cursor-pointer"
                            >
                                {showCurrentPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                ) : (
                                    <Eye className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* New Password */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            New Password
                        </label>

                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />

                            <input
                                type={showNewPassword ? "text" : "password"}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter New Password"
                                className="w-full h-10 rounded-lg border border-slate-300 py-3 pl-10 pr-12 outline-none transition focus:border-blue-500"
                            />

                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute right-3 top-3 text-slate-500 cursor-pointer"
                            >
                                {showNewPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                ) : (
                                    <Eye className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Confirm Password
                        </label>

                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />

                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm New Password"
                                className="w-full h-10 rounded-lg border border-slate-300 py-3 pl-10 pr-12 outline-none transition focus:border-blue-500"
                            />

                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-3 text-slate-500 cursor-pointer"
                            >
                                {showConfirmPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                ) : (
                                    <Eye className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700">
                        Your temporary password will become invalid after you create a new
                        password.
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-10 rounded-lg bg-blue-600 py-2 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400 cursor-pointer"
                    >
                        {loading ? "Changing Password..." : "Change Password"}
                    </button>
                </form>
            </div>
        </div>
    );
}