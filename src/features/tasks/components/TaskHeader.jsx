import { Plus } from "lucide-react";

export default function TaskHeader() {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1B2559]">
        {/* <h1 className="text-[42px] font-bold text-[#0B1F5E]"> */}
        {/* <h1 className="text-4xl font-bold"> */}
          All Tasks
        </h1>

        <p className="text-gray-500 mt-1">
          View and manage all project tasks
        </p>
      </div>

      <button className="bg-[#6D4AFF] text-white px-5 py-3 rounded-xl flex items-center gap-2">
        <Plus size={18} />
        Add Task
      </button>
    </div>
  );
}