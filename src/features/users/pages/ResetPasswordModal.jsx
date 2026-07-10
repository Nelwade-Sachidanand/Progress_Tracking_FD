import { KeyRound, X } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ResetPasswordModal({ isOpen, onClose, user, onReset }) {
  const [newPassword, setNewPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!newPassword.trim()) {
      toast.error("Password is required");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return false;
    }

    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/.test(newPassword)
    ) {
      toast.error(
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      );
      return false;
    }

    onReset?.(user, newPassword, confirmPassword);

    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div
      className="
      fixed
      inset-0
      bg-black/50
      flex
      items-center
      justify-center
      z-50
      px-4
      "
    >
      <div
        className="
        bg-white
        rounded-2xl
        w-full
        max-w-md
        shadow-xl
        "
      >
        {/* Header */}
        <div
          className="
          flex
          items-center
          justify-between
          px-6
          py-4
          border-b
          border-[#CDD7E3]
          "
        >
          <div className="flex items-center gap-2">
            <KeyRound size={20} className="text-[#2563EB]" />

            <h2 className="text-lg font-bold text-[#0F172A]">Reset Password</h2>
          </div>

          <button onClick={onClose} className="cursor-pointer">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="mb-5">
            <label
              className="
              block
              text-sm
              font-medium
              text-slate-700
              mb-2
              "
            >
              Username
            </label>

            <input
              value={user?.username || ""}
              disabled
              className="
              h-9
              w-full
              p-3
              rounded-lg
              border
              border-[#B8C4D1]
              bg-slate-100
              "
            />
          </div>

          <div className="mb-5">
            <label
              className="
              block
              text-sm
              font-medium
              text-slate-700
              mb-2
              "
            >
              New Password
              <span className="text-red-500">*</span>
            </label>

            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="
              w-full
              p-3
              h-9
              rounded-lg
              border
              border-[#B8C4D1]
              outline-none
              focus:border-blue-500
              placeholder:text-slate-500
              "
            />
          </div>

          <div>
            <label
              className="
              block
              text-sm
              font-medium
              text-slate-700
              mb-2
              "
            >
              Confirm Password
              <span className="text-red-500">*</span>
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              className="
              w-full
              p-3
              h-9
              rounded-lg
              border
              border-[#B8C4D1]
              outline-none
              focus:border-blue-500
              placeholder:text-slate-500
              "
            />
          </div>
        </div>

        {/* Footer */}
        <div
          className="
          flex
          justify-end
          gap-3
          px-6
          py-4
          border-t
          border-[#CDD7E3]
          "
        >
          <button
            onClick={onClose}
            className="
            px-5
            py-2
            rounded-xl
            border
            border-[#CDD7E3]
            cursor-pointer
            h-10
            "
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="
            px-5
            py-2
            rounded-xl
            bg-[#2563EB]
            text-white
            font-medium
            cursor-pointer
            h-10
            "
          >
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
}
