import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function TaskFilters({


  phases = [],
  milestones = [],
  tasks = [],
  subTasks = [],
  activities = [],

  selectedPhase,
  selectedMilestone,
  selectedTask,
  selectedSubTask,
  selectedActivity,
  selectedStatus,
  searchTerm,

  setSelectedPhase,
  setSelectedMilestone,
  setSelectedTask,
  setSelectedSubTask,
  setSelectedActivity,
  setSelectedStatus,
  setSearchTerm,

  handleMilestoneChange,
}) {
  const [showMilestoneDropdown, setShowMilestoneDropdown] =
    useState(false);

  const milestoneDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        milestoneDropdownRef.current &&
        !milestoneDropdownRef.current.contains(
          event.target
        )
      ) {
        setShowMilestoneDropdown(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);
  return (
<div
  className="
  bg-white
  rounded-2xl
  border
  border-gray-200
  p-4
  lg:p-5
  mb-6
  "
>

      {/* Filters Row */}
  <div
  className="
  grid
  grid-cols-1
  sm:grid-cols-2
  xl:grid-cols-5
  gap-4
  mb-4
  "
>

        {/* Phase */}
        <select
          className="w-full bg-white border border-slate-300 outline-none focus:border-blue-500 rounded-xl p-3 text-sm cursor-pointer"
          value={selectedPhase}
          onChange={(e) =>
            setSelectedPhase(e.target.value)
          }
        >
          <option>All Phases</option>

          {phases.map((phase) => (
            <option key={phase}>
              {phase}
            </option>
          ))}
        </select>

        {/* Milestone Multi Select */}

        <div
          className="relative w-full"
          ref={milestoneDropdownRef}
        >
          <button
            type="button"
            onClick={() =>
              setShowMilestoneDropdown(
                !showMilestoneDropdown
              )
            }
            className="
    w-full
    h-11
    px-4
    border
    border-[#DCE3EE]
    rounded-xl
    bg-white
    flex
    items-center
    justify-between
    text-sm
    cursor-pointer
    border-slate-300 outline-none focus:border-blue-500
    "
          >
            <span>
              {selectedMilestone.length === 0
                ? "Select Milestones"
                : `Milestones (${selectedMilestone.length})`}
            </span>

            <ChevronDown
              size={18}
              className={`transition-transform ${showMilestoneDropdown
                ? "rotate-180"
                : ""
                }`}
            />
          </button>

          {showMilestoneDropdown && (
            <div
              className="
      absolute
      top-full
      left-0
      mt-2
w-full
min-w-[280px]
max-w-[350px]
      bg-white
      border
      border-[#DCE3EE]
      rounded-2xl
      shadow-xl
      z-50
      overflow-hidden
      
      "
            >
              <div
                className="
        max-h-[240px]
        overflow-y-auto
        p-2
        "
              >
                {milestones.map((milestone) => (
                  <label
                    key={milestone}
                    className="
            flex
            items-center
            gap-3
            px-3
            py-2.5
            rounded-xl
            cursor-pointer
            hover:bg-[#F5F3FF]
            "
                  >
                    <input
                      type="checkbox"
                      checked={selectedMilestone.includes(
                        milestone
                      )}
                      onChange={() =>
                        handleMilestoneChange(
                          milestone
                        )
                      }
                      className="
              h-4
              w-4
              accent-[#6D4AFF]
              "
                    />

                    <span>{milestone}</span>
                  </label>
                ))}
              </div>

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
        <select
          className="w-full bg-white border border-slate-300 outline-none focus:border-blue-500 rounded-xl p-3 text-sm cursor-pointer"
          value={selectedTask}
          onChange={(e) =>
            setSelectedTask(e.target.value)
          }
        >
          <option>All Tasks</option>

          {tasks.map((task) => (
            <option key={task}>
              {task}
            </option>
          ))}
        </select>

        {/* Sub Task */}
        <select
          className="w-full bg-white border border-slate-300 outline-none focus:border-blue-500 rounded-xl p-3 text-sm cursor-pointer"
          value={selectedSubTask}
          onChange={(e) =>
            setSelectedSubTask(e.target.value)
          }
        >
          <option>All Sub Tasks</option>

          {subTasks.map((subTask) => (
            <option key={subTask}>
              {subTask}
            </option>
          ))}
        </select>

        {/* Activity */}
        <select
          className="w-full bg-white border border-slate-300 outline-none focus:border-blue-500 rounded-xl p-3 text-sm cursor-pointer "
          value={selectedActivity}
          onChange={(e) =>
            setSelectedActivity(e.target.value)
          }
        >
          <option>All Activities</option>

          {activities.map((activity) => (
            <option key={activity}>
              {activity}
            </option>
          ))}
        </select>

      </div>

      {/* Search + Status */}
     <div
  className="
  flex
  flex-col
  lg:flex-row
  gap-4
  "
>



        <select
          value={selectedStatus}
          onChange={(e) =>
            setSelectedStatus(e.target.value)
          }
          className="
          w-full
lg:w-[220px]
          bg-white
          border
          border-slate-300
            outline-none
            focus:border-blue-500
          rounded-xl
          p-3
          text-sm
          cursor-pointer
          "
        >
          <option>All Status</option>
          <option>Completed</option>
          <option>In Progress</option>
          <option>Delayed</option>
          <option>Not Started</option>
        </select>

        <input
          type="text"
          placeholder="Search activity, task, milestone..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          className="
w-full
lg:flex-1
bg-white
border
border-gray-200
rounded-xl
p-3
text-sm
border-slate-300
outline-none
focus:border-blue-500
"
        />

      </div>

    </div>
  );
}