import { X } from "lucide-react";

function ActiveFilters({
  milestones = [],
  selectedPhase,
  selectedMilestone,
  selectedTask,
  selectedSubTask,
  selectedActivity,
  selectedStatus,

  setSelectedPhase,
  setSelectedMilestone,
  setSelectedTask,
  setSelectedSubTask,
  setSelectedActivity,
  setSelectedStatus,

  clearFilters,
}) {
  const filters = [];
  if (selectedPhase) {
    filters.push({
      type: "phase",
      label: `Phase: ${selectedPhase}`,
    });
  }

  (selectedMilestone || []).forEach((milestoneId) => {
    const milestone = milestones.find((m) => m.value === milestoneId);

    filters.push({
      type: "milestone",
      value: milestoneId,
      label: `Milestone: ${milestone?.label ?? milestoneId}`,
    });
  });

  if (selectedTask) {
    filters.push({
      type: "task",
      label: `Task: ${selectedTask}`,
    });
  }

  if (selectedStatus) {
    filters.push({
      type: "status",
      label: `Status: ${selectedStatus}`,
    });
  }

  if (selectedSubTask) {
    filters.push({
      type: "subTask",
      label: `Sub Task: ${selectedSubTask}`,
    });
  }

  if (selectedActivity) {
    filters.push({
      type: "activity",
      label: `Activity: ${selectedActivity}`,
    });
  }

  if (filters.length === 0) return null;

  return (
    <div className="mb-4 mt-4">
      {/* Active Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-2 whitespace-nowrap text-sm font-semibold text-slate-600">
          Active Filters :
        </span>

        {filters.map((filter, index) => (
          <div
            key={index}
            className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-blue-200
            bg-blue-50
            px-3
            py-1.5
            text-sm
            text-blue-700
          "
          >
            <span>{filter.label}</span>

            <button
              type="button"
              onClick={() => {
                if (filter.type === "phase") {
                  setSelectedPhase("");
                }

                if (filter.type === "milestone") {
                  setSelectedMilestone((prev) =>
                    prev.filter((m) => m !== filter.value),
                  );
                }

                if (filter.type === "task") {
                  setSelectedTask("");
                }

                if (filter.type === "status") {
                  setSelectedStatus("");
                }
                if (filter.type === "subTask") {
                  setSelectedSubTask("");
                }

                if (filter.type === "activity") {
                  setSelectedActivity("");
                }
              }}
              className="
              flex
              h-5
              w-5
              items-center
              justify-center
              rounded-full
              transition
              hover:bg-blue-100
              cursor-pointer
            "
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Clear All */}
      <div className="mt-3 flex justify-end">
        <button
          type="button"
          onClick={clearFilters}
          className="
          h-9
          rounded-xl
          border
          border-red-200
          bg-red-50
          px-4
          text-sm
          text-red-600
          transition
          hover:bg-red-100
          cursor-pointer
        "
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
}

export default ActiveFilters;
