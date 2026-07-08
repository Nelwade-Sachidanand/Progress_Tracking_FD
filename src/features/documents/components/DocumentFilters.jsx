import { ChevronDown, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function DocumentFilters({
  phases,
  milestones,
  tasks,
  subTasks,
  activities,

  selectedPhase,
  selectedMilestone,
  selectedTask,
  selectedSubTask,
  selectedActivity,
  selectedStatus,
  searchTerm,

  setSelectedStatus,
  setSearchTerm,
  setSelectedActivity,

  handlePhaseChange,
  handleMilestoneChange,
  handleTaskChange,
  handleSubTaskChange,
  onExportExcel,
  clearFilters,
}) {
  const [showMilestoneDropdown, setShowMilestoneDropdown] = useState(false);

  const milestoneRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        milestoneRef.current &&
        !milestoneRef.current.contains(event.target)
      ) {
        setShowMilestoneDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="
      bg-white
      border
      border-slate-200
      rounded-2xl
      shadow-sm
      p-5
      "
    >
      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        gap-4
        "
      >
        {/* Phase */}

        <div>
          <label
            className="
            block
            text-sm
            font-medium
            mb-2
            "
        
          >
            Phase
          </label>

          <select
            value={selectedPhase}
            onChange={(e) => handlePhaseChange(e.target.value)}
            className="
            w-full
            h-11
            rounded-xl
            border
            border-slate-300
            px-3
            outline-none
            focus:border-[#2563EB]
            text-sm
            cursor-pointer
            "
          >
            <option value="All Phases">All Phases</option>

            {phases.map((phase) => (
              <option key={phase} value={phase}>
                {phase}
              </option>
            ))}
          </select>
        </div>

        {/* Milestone */}

        <div className="relative" ref={milestoneRef}>
          <label
            className="
            block
            text-sm
            font-medium
            mb-2
            "
          >
            Milestone
          </label>

          <button
            type="button"
            onClick={() => setShowMilestoneDropdown(!showMilestoneDropdown)}
            className="
            w-full
            h-11
            border
            border-slate-300
            rounded-xl
            px-3
            flex
            items-center
            justify-between
            bg-white
            hover:border-[#2563EB]
            cursor-pointer
            text-sm
            "
          >
            <span className="truncate">
              {selectedMilestone.length === 0
                ? "All Milestones"
                : `${selectedMilestone.length} Selected`}
            </span>

            <ChevronDown size={18} />
          </button>

          {showMilestoneDropdown && (
            <div
              className="
              absolute
              z-50
              mt-2
              w-full
              bg-white
              border
              border-slate-200
              rounded-xl
              shadow-lg
              max-h-60
              overflow-y-auto
              "
            >
              {milestones.map((milestone) => (
                <label
                  key={milestone}
                  className="
                  flex
                  items-center
                  gap-3
                  px-4
                  py-2
                  cursor-pointer
                  hover:bg-slate-50
                  "
                >
                  <input
                    type="checkbox"
                    checked={selectedMilestone.includes(milestone)}
                    onChange={() => handleMilestoneChange(milestone)}
                  />

                  <span>{milestone}</span>
                </label>
              ))}
              <div
                className="
        border-t
        border-[#EEF2F7]
        p-3
        flex
        justify-end
        "
              >
                <button
                  type="button"
                  onClick={() => {
                    setSelectedMilestone([]);
                    setShowMilestoneDropdown(false);
                  }}
                  className="
    px-4
    py-2
    border
    border-[#DCE3EE]
    rounded-lg
    text-sm
    bg-red-50
    text-red-600
    border-red-200
    cursor-pointer
  "
                >
                  Clear
                </button>
              </div>
            </div>
          )}
        </div>
        {/* Task */}

        <div>
          <label
            className="
            block
            text-sm
            font-medium
            mb-2
            "
          >
            Task
          </label>

          <select
            value={selectedTask}
            onChange={(e) => handleTaskChange(e.target.value)}
            className="
            w-full
            h-11
            rounded-xl
            border
            border-slate-300
            px-3
            outline-none
            focus:border-[#2563EB]
            text-sm
            cursor-pointer
            "
          >
            <option value="All Tasks">All Tasks</option>

            {tasks.map((task) => (
              <option key={task} value={task}>
                {task}
              </option>
            ))}
          </select>
        </div>

        {/* Sub Task */}

        <div>
          <label
            className="
            block
            text-sm
            font-medium
            mb-2
            "
          >
            Sub Task
          </label>

          <select
            value={selectedSubTask}
            onChange={(e) => handleSubTaskChange(e.target.value)}
            className="
            w-full
            h-11
            rounded-xl
            border
            border-slate-300
            px-3
            outline-none
            focus:border-[#2563EB]
            text-sm
            cursor-pointer
            "
          >
            <option value="All Sub Tasks">All Sub Tasks</option>

            {subTasks.map((subTask) => (
              <option key={subTask} value={subTask}>
                {subTask}
              </option>
            ))}
          </select>
        </div>

        {/* Activity */}

        <div>
          <label
            className="
            block
            text-sm
            font-medium
            mb-2
            "
          >
            Activity
          </label>

          <select
            value={selectedActivity}
            onChange={(e) => setSelectedActivity(e.target.value)}
            className="
            w-full
            h-11
            rounded-xl
            border
            border-slate-300
            px-3
            outline-none
            focus:border-[#2563EB]
            text-sm
            cursor-pointer
            "
          >
            <option value="All Activities">All Activities</option>

            {activities.map((activity) => (
              <option key={activity} value={activity}>
                {activity}
              </option>
            ))}
          </select>
        </div>

        {/* Upload Status */}

        <div>
          <label
            className="
            block
            text-sm
            font-medium
            mb-2
            "
          >
            Upload Status
          </label>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="
            w-full
            h-11
            rounded-xl
            border
            border-slate-300
            px-3
            outline-none
            focus:border-[#2563EB]
            text-sm
            cursor-pointer
            "
          >
            <option value="All Status">All Status</option>

            <option value="Uploaded">Uploaded</option>

            <option value="Pending">Pending</option>
          </select>
        </div>
        {/* Search */}

       {/* Search */}
<div className="lg:col-span-2">
  <label className="block text-sm font-medium mb-2">
    Search
  </label>

  <div className="relative">
    <Search
      size={18}
      className="
        absolute
        left-4
        top-1/2
        -translate-y-1/2
        text-slate-400
      "
    />

    <input
      type="text"
      placeholder="Search Activity / File..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="
        w-full
        h-11
        pl-11
        pr-4
        rounded-xl
        border
        border-slate-300
        outline-none
        focus:border-[#2563EB]
        text-sm
      "
    />
  </div>
</div>

<div className="col-span-full flex justify-end mb-2">
  <button
    onClick={clearFilters}
    className="
      px-4
      py-2
      rounded-xl
      border
      border-red-200
      text-red-600
      bg-red-50
      hover:bg-red-100
      text-sm
      font-medium
      cursor-pointer
    "
  >
    Clear Filters
  </button>
</div>
      </div>
    </div>
  );
}
