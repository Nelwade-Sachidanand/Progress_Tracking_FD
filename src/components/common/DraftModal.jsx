import { FileClock } from "lucide-react";

export default function DraftModal({ open, onContinue, onDiscard }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40">
      <div className="w-[450px] rounded-2xl bg-white shadow-xl">
        <div className="border-b p-6 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
            <FileClock className="text-blue-600" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#0B1F59]">Draft Found</h2>

            <p className="text-sm text-slate-600 mt-1">
              A Previously Saved Draft Was Found.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 p-5">
          <button
            onClick={onDiscard}
            className="
              h-10
              px-5
              rounded-lg
              border
              border-slate-300
              hover:bg-slate-100
              cursor-pointer
            "
          >
            Discard Draft
          </button>

          <button
            onClick={onContinue}
            className="
              h-10
              px-5
              rounded-lg
              bg-[#2563EB]
              text-white
              hover:bg-blue-700
              cursor-pointer
            "
          >
            Continue Draft
          </button>
        </div>
      </div>
    </div>
  );
}
