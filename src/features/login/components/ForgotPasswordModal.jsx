import { AlertCircle, Send, User, X } from "lucide-react";
import { useState } from "react";

export default function ForgotPasswordModal({
  isOpen,
  onClose,
  onSubmit,
}) {
  const [username, setUsername] = useState("");
  const [reason, setReason] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

 const handleSubmit = async () => {
  if (!username.trim()) return;

  try {
    if (onSubmit) {
      const success = await onSubmit({
        username,
      });

      if (success) {
        setSubmitted(true);
      }
    }
  } catch (error) {
    console.error(error);
  }
};

  const handleClose = () => {
    setUsername("");
    setReason("");
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-[420px] rounded-2xl bg-white shadow-2xl">

        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute right-5 top-5 text-slate-500 hover:text-red-500 transition cursor-pointer"
        >
          <X size={22} />
        </button>

        {!submitted ? (
          <>
            {/* Header */}
            <div className="border-b border-slate-200 p-6">
              <h2 className="text-xl font-bold text-[#081D5C]">
                Forgot Password
              </h2>

              <p className="mt-1 text-sm leading-5 text-slate-600">
                Enter your Username below to Submit a Password Reset Request.
                Your Administrator will Review the Request and Reset your
                Password if Approved.
              </p>
            </div>

            {/* Body */}
            <div className="px-8 py-6">

              {/* Username */}
              <label className="mb-2 block font-semibold text-[#081D5C]">
                Username <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  size={20}
                />

                <input
                  type="text"
                  placeholder="Enter Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-10 w-full rounded-lg border border-[#CDD7E3] pl-12 pr-4 py-2.5 outline-none focus:border-blue-500"
                />
              </div>

              {/* Reason */}
              {/* <label className="mt-4 mb-2 block font-semibold text-[#081D5C]">
                Reason (Optional)
              </label>

              <textarea
                rows={4}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Forgot my password..."
                className="w-full rounded-lg border border-[#CDD7E3] p-3 outline-none resize-none focus:border-blue-500"
              /> */}

              {/* Info */}
              <div className="mt-4 flex gap-3 rounded-xl border border-blue-200 bg-blue-50 p-3">
                <AlertCircle
                  className="mt-0.5 text-blue-600 flex-shrink-0"
                  size={20}
                />

                <p className="text-sm leading-6 text-slate-700">
                  Password Reset Requests are Handled Only by Authorized
                  Administrators.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 border-t border-slate-200 px-8 py-5">

              <button
                onClick={handleClose}
                className="rounded-lg border border-slate-300 px-5 py-2.5 font-medium text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                disabled={!username.trim()}
                className="flex items-center gap-2 rounded-lg bg-[#2563EB] px-5 py-2.5 font-semibold text-white hover:bg-[#1D4ED8] disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
              >
                <Send size={18} />
                Send Request
              </button>

            </div>
          </>
        ) : (
          <>
            {/* Success */}
            <div className="px-8 py-10 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <Send
                  className="text-green-600"
                  size={34}
                />
              </div>

              <h2 className="mt-4 text-2xl font-bold text-[#081D5C]">
                Request Submitted
              </h2>

              <p className="mt-4 text-slate-600 leading-7">
                Your password reset request has been submitted successfully.
                <br />
                The administrator will review your request and contact you
                shortly.
              </p>

              <button
                onClick={handleClose}
                className="mt-8 rounded-lg bg-[#2563EB] px-8 py-3 font-semibold text-white hover:bg-[#1D4ED8] cursor-pointer"
              >
                Close
              </button>

            </div>
          </>
        )}
      </div>
    </div>
  );
}