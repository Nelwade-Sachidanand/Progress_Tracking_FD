import { toast } from "react-toastify";

export default function RollbackRequestModal({
    open,
    reason,
    setReason,
    password,
    setPassword,
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
                overflow-hidden
                "
            >
                {/* Header */}
                <div className="border-b border-[#CDD7E3] px-6 py-4">
                    <h2 className="text-xl font-bold text-[#142850]">
                        Rollback Changes
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Confirm rollback by providing a reason and your password.
                    </p>
                </div>

                {/* Body */}
                <div className="space-y-4 p-6">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Rollback Reason
                        </label>

                        <textarea
                            rows={4}
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Enter rollback reason..."
                            className="
                            w-full
                            rounded-xl
                            border
                            border-[#CDD7E3]
                            p-3
                            resize-none
                            outline-none
                            focus:border-[#2563EB]
                        "
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Admin Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter admin password"
                            className="
                            h-10
                            w-full
                            rounded-xl
                            border
                            border-[#CDD7E3]
                            px-3
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
                    items-center
                    justify-end
                    gap-3
                    border-t
                    border-[#CDD7E3]
                    bg-slate-50
                    px-6
                    py-4
                "
                >
                    <button
                        type="button"
                        onClick={onClose}
                        className="
                        rounded-xl
                        border
                        border-[#CDD7E3]
                        bg-white
                        px-5
                        py-2
                        text-sm
                        font-medium
                        text-slate-700
                        transition
                        hover:bg-slate-100
                        cursor-pointer
                        "
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            if (!reason.trim()) {
                                toast.error("Please enter rollback reason");
                                return;
                            }

                            if (!password.trim()) {
                                toast.error("Please enter admin password");
                                return;
                            }

                            onSubmit();
                        }}
                        className="
                        rounded-xl
                        bg-orange-600
                        px-5
                        py-2
                        text-sm
                        font-medium
                        text-white
                        transition
                        hover:bg-orange-700
                        cursor-pointer
                        "
                    >
                        Confirm Rollback
                    </button>
                </div>
            </div>
        </div>
    );
}