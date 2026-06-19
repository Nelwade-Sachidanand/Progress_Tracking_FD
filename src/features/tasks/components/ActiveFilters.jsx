import { X } from "lucide-react";

function ActiveFilters({
  selectedMilestone,
  selectedTask,
  selectedStatus,
  clearFilters,
}) {
  const filters = [];

  if (selectedMilestone?.length > 0) {
    filters.push({
      label: `Milestone: ${selectedMilestone.join(", ")}`
    });
  }

  if (
    selectedTask &&
    selectedTask !== "All Tasks"
  ) {
    filters.push({
      label: `Task: ${selectedTask}`
    });
  }

  if (
    selectedStatus &&
    selectedStatus !== "All Status"
  ) {
    filters.push({
      label: `Status: ${selectedStatus}`
    });
  }

  if (filters.length === 0) return null;

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-semibold text-[#64748B] uppercase">
          Active Filters:
        </span>

        {filters.map((filter, index) => (
          <div
            key={index}
            className="bg-[#F3F0FF] text-[#6D4AFF] px-3 py-1 rounded-full text-sm flex items-center gap-2"
          >
            {filter.label}
            <X size={14} />
          </div>
        ))}
      </div>

      <button
        onClick={clearFilters}
        className="border border-gray-200 px-4 py-2 rounded-xl text-sm"
      >
        Clear All Filters
      </button>
    </div>
  );
}

export default ActiveFilters;