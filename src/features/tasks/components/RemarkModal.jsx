import { X } from "lucide-react";

export default function RemarkModal({
  isOpen,
  onClose,
  task,
  remark,
  setRemark,
  onSave,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl w-[500px] p-6">

        <div className="flex justify-between items-center mb-4">

          <h2 className="text-xl font-semibold">
            Task Remark
          </h2>

          <button className="cursor-pointer" onClick={onClose}>
            <X />
          </button>

        </div>

        <div className="mb-4">

          <label className="block mb-2 font-medium">
            Activity
          </label>

          <input
            value={task?.activity || ""}
            disabled
            className="w-full border rounded-lg p-3 bg-gray-100 border-slate-300 outline-none focus:border-blue-500"
          />

        </div>

        <div>

          <label className="block mb-2 font-medium">
            Remark
          </label>

          <textarea
            rows="5"
            value={remark}
            onChange={(e) =>
              setRemark(e.target.value)
            }
            className="w-full border rounded-lg p-3 border-slate-300 outline-none focus:border-blue-500"
            placeholder="Enter remark..."
          />

        </div>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="border px-5 py-2 rounded-lg cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={onSave}
            className="bg-[#6D4AFF] text-white px-5 py-2 rounded-lg cursor-pointer"
          >
            Save Remark
          </button>

        </div>

      </div>

    </div>
  );
}