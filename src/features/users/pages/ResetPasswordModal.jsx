import { KeyRound, X } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ResetPasswordModal({ isOpen, onClose, user, onReset }) {
  const [tempPassword, setTempPassword] = useState("");
  const [showTempPassword, setShowTempPassword] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!tempPassword.trim()) {
      toast.error("Password is required");
      return;
    }

    if (tempPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return false;
    }

    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/.test(tempPassword)
    ) {
      toast.error(
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      );
      return false;
    }

    onReset?.(user, tempPassword);

    setTempPassword("");
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

            <h2 className="text-lg font-bold text-[#0F172A]">Generate Temprary Password</h2>
          </div>

          <button onClick={onClose} className="cursor-pointer hover:text-red-500 transition">
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
              mb-2
              block
              text-sm
              font-medium
              text-slate-700
            "
            >
              Temp Password
              <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <input
                type={showTempPassword ? "text" : "password"}
                value={tempPassword}
                onChange={(e) => setTempPassword(e.target.value)}
                placeholder="Enter Temporary Password"
                className="
                h-9
                w-full
                rounded-lg
                border
                border-[#B8C4D1]
                p-3
                pr-10
                outline-none
                placeholder:text-slate-500
                focus:border-blue-500
              "
              />

              <button
                type="button"
                onClick={() => setShowTempPassword(!showTempPassword)}
                className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-slate-500
                hover:text-slate-700
                cursor-pointer
              "
              >
                {showTempPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>
          {/* <div>
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
          </div> */}
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
