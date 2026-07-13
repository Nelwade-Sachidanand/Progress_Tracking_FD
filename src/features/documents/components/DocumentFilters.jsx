import { ChevronDown, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import CustomDropdown from "../../../components/common/CustomDropdown";
import MultiSelectDropdown from "../../../components/common/MultiSelectDropdown";
import SearchInput from "../../../components/common/SearchInput";


export default function DocumentFilters({
  phases,
  milestones,
  tasks,
  subTasks,
  activities,

  selectedPhase,
  selectedMilestone,
  setSelectedMilestone,
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
      mt-3
      rounded-2xl
      border
      border-[#CDD7E3]
      bg-white
      p-4
      lg:p-5
    "
    >
      {/* First Row */}
      <div
        className="
        grid
        grid-cols-1
        gap-4

        sm:grid-cols-2

        xl:grid-cols-4
      "
      >
        {/* Phase */}
        <CustomDropdown
          label="Phase"
          placeholder="All Phases"
          value={selectedPhase}
          onChange={handlePhaseChange}
          options={phases.map((phase) => ({
            label: phase,
            value: phase,
          }))}
        />

        {/* Milestone */}
        <MultiSelectDropdown
          label="Milestone"
          placeholder="All Milestones"
          options={milestones}
          selected={selectedMilestone}
          onChange={setSelectedMilestone}
          width="w-full"
          dropdownWidth="w-[350px]"
        />

        {/* Task */}
        <CustomDropdown
          label="Task"
          placeholder="All Tasks"
          value={selectedTask}
          onChange={handleTaskChange}
          options={tasks.map((task) => ({
            label: task,
            value: task,
          }))}
        />

        {/* Sub Task */}
        <CustomDropdown
          label="Sub Task"
          placeholder="All Sub Tasks"
          value={selectedSubTask}
          onChange={handleSubTaskChange}
          options={subTasks.map((subTask) => ({
            label: subTask,
            value: subTask,
          }))}
        />
      </div>

      {/* Second Row */}
      <div
        className="
        mt-4
        grid
        grid-cols-1
        gap-4

        sm:grid-cols-2

        xl:grid-cols-12
      "
      >
        {/* Upload Status */}
        <div className="xl:col-span-2">
          <CustomDropdown
            label="Upload Status"
            placeholder="All Status"
            value={selectedStatus}
            onChange={setSelectedStatus}
            options={[
              {
                label: "Uploaded",
                value: "Uploaded",
              },
              {
                label: "Pending",
                value: "Pending",
              },
            ]}
          />
        </div>

        {/* Activity */}
        <div className="xl:col-span-4">
          <CustomDropdown
            label="Activity"
            placeholder="All Activities"
            value={selectedActivity}
            onChange={setSelectedActivity}
            options={activities.map((activity) => ({
              label: activity,
              value: activity,
            }))}
          />
        </div>

        {/* Search */}
        <div className="xl:col-span-4">
          <SearchInput
            label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Activity / File..."
          />
        </div>

        {/* Clear Button */}
        <div
          className="
          xl:col-span-2
          flex
          items-end
        "
        >
          <button
            onClick={clearFilters}
            className="
            h-9
            w-full
            rounded-lg
            border
            border-red-200
            bg-red-50
            px-4
            text-sm
            font-medium
            text-red-600
            transition
            hover:bg-red-100
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
