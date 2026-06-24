import { X } from "lucide-react";

function ActiveFilters({
  selectedPhase,
  selectedMilestone,
  selectedTask,
  selectedStatus,

  setSelectedPhase,
  setSelectedMilestone,
  setSelectedTask,
  setSelectedStatus,

  clearFilters,
}){
  const filters = [];
if (
  selectedPhase &&
  selectedPhase !== "All Phases"
) {
  filters.push({
    type: "phase",
    label: `Phase: ${selectedPhase}`,
  });
}

selectedMilestone.forEach((milestone) => {
  filters.push({
    type: "milestone",
    value: milestone,
    label: `Milestone: ${milestone}`,
  });
});
  

  if (
    selectedTask &&
    selectedTask !== "All Tasks"
  ) {
filters.push({
  type: "task",
  label: `Task: ${selectedTask}`
});
  }

  if (
    selectedStatus &&
    selectedStatus !== "All Status"
  ) {
filters.push({
  type: "status",
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
    <X
  size={14}
  className="cursor-pointer"
  onClick={() => {
    if (filter.type === "phase") {
      setSelectedPhase("All Phases");
    }

if (filter.type === "milestone") {
  setSelectedMilestone(
    selectedMilestone.filter(
      (item) => item !== filter.value
    )
  );
}

    if (filter.type === "task") {
      setSelectedTask("All Tasks");
    }

    if (filter.type === "status") {
      setSelectedStatus("All Status");
    }
  }}
/>
          </div>
        ))}
      </div>

      <button
        onClick={clearFilters}
        className="border border-gray-200 px-4 py-2    
         bg-red-50
    text-red-600
    border-red-200
    cursor-pointer
    rounded-xl 
    text-sm"
      >
        Clear All Filters
      </button>
    </div>
  );
}

export default ActiveFilters;