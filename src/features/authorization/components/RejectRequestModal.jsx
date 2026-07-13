import { toast } from "react-toastify";

export default function RejectRequestModal({
    open,
    reason,
    setReason,
    onClose,
    onSubmit,
}) {
    if (!open) return null;

    return (
        <div
            className="
      fixed
      inset-0
      z-[10000]
      flex
      items-center
      justify-center
      bg-black/40
      backdrop-blur-sm
      p-4
    "
        >
            <div
                className="
        w-full
        max-w-md
        rounded-2xl
        border
        border-[#CDD7E3]
        bg-white
        shadow-2xl
      "
            >
                <div className="border-b border-[#CDD7E3] px-6 py-4">
                    <h2 className="text-xl font-bold text-[#142850]">
                        Reject Request
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Enter the reason for rejecting this request.
                    </p>
                </div>

                <div className="p-6">
                    <textarea
                        rows={5}
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Enter rejection reason..."
                        className="
            w-full
            rounded-xl
            border
            border-[#CDD7E3]
            p-3
            outline-none
            resize-none
            focus:border-[#2563EB]
          "
                    />
                </div>

                <div
                    className="
          flex
          justify-end
          gap-3
          border-t
          border-[#CDD7E3]
          px-6
          py-4
        "
                >
                    <button
                        onClick={onClose}
                        className="
            rounded-xl
            border
            border-[#CDD7E3]
            px-5
            py-2
            cursor-pointer
          "
                    >
                        Cancel
                    </button>

                    <button
                        onClick={() => {
                            if (!reason.trim()) {
                                toast.error("Please enter rejection reason");
                                return;
                            }

                            onSubmit();
                        }}
                        className="
            rounded-xl
            bg-red-600
            px-5
            py-2
            text-white
            hover:bg-red-700
            cursor-pointer
          "
                    >
                        Reject Request
                    </button>
                </div>
            </div>
        </div>
    );
}