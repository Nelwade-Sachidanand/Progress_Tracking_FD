import { X, KeyRound } from "lucide-react";
import { useState } from "react";

export default function ResetPasswordModal({
  isOpen,
  onClose,
  user,
  onReset,
}) {
  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!newPassword.trim()) {
      alert("Password is required");
      return;
    }

    if (
      newPassword !==
      confirmPassword
    ) {
      alert(
        "Passwords do not match"
      );
      return;
    }

    onReset?.(
      user,
      newPassword
    );

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
          "
        >
          <div className="flex items-center gap-2">
            <KeyRound
              size={20}
              className="text-[#2563EB]"
            />

            <h2 className="text-lg font-bold text-[#0F172A]">
              Reset Password
            </h2>
          </div>

          <button
            onClick={onClose}
            className="cursor-pointer"
          >
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
              text-slate-600
              mb-2
              "
            >
              Username
            </label>

            <input
              value={
                user?.username || ""
              }
              disabled
              className="
              w-full
              p-3
              rounded-xl
              border
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
              mb-2
              "
            >
              New Password
              <span className="text-red-500">
                *
              </span>
            </label>

            <input
              type="password"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(
                  e.target.value
                )
              }
              placeholder="Enter new password"
              className="
              w-full
              p-3
              rounded-xl
              border
              border-[#DCE3EE]
              outline-none
              focus:border-[#2563EB]
              "
            />
          </div>

          <div>
            <label
              className="
              block
              text-sm
              font-medium
              mb-2
              "
            >
              Confirm Password
              <span className="text-red-500">
                *
              </span>
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              placeholder="Confirm password"
              className="
              w-full
              p-3
              rounded-xl
              border
              border-[#DCE3EE]
              outline-none
              focus:border-[#2563EB]
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
          "
        >
          <button
            onClick={onClose}
            className="
            px-5
            py-2.5
            rounded-xl
            border
            cursor-pointer
            "
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="
            px-5
            py-2.5
            rounded-xl
            bg-[#2563EB]
            text-white
            font-medium
            cursor-pointer
            "
          >
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
}