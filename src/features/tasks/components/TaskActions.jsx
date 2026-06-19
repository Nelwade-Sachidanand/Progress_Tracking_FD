import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TaskActions() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between mb-6">

      {/* Left Buttons */}
      <div className="flex gap-3">
        <button className="bg-[#6D4AFF] text-white px-4 py-2.5 rounded-xl text-sm font-medium">
          Generate Report
        </button>

        <button className="bg-[#10B981] text-white px-4 py-2.5 rounded-xl text-sm font-medium">
          Export Excel
        </button>

        <button className="bg-[#2563EB] text-white px-4 py-2.5 rounded-xl text-sm font-medium">
          Print Report
        </button>
      </div>

      {/* Right Button */}
      <button
        onClick={() => navigate("add-task")}
        className="
          bg-[#6D4AFF]
          hover:bg-[#5B3DF4]
          text-white
          px-5
          py-2.5
          rounded-xl
          flex
          items-center
          gap-2
          font-medium
          shadow-sm
          cursor-pointer
        "
      >
        <Plus size={18} />
        Add Task
      </button>

    </div>
  );
}