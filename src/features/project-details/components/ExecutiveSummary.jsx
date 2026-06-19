
import {
  useState,
  useEffect,
  useRef,
} from "react";
import {
  CircleDashed,
  ListTodo,
  CheckCircle2,
  AlertTriangle,
  ClipboardList,
} from "lucide-react";

export default function ExecutiveSummary({
  project,
}){
  const dropdownRef = useRef(null);
const [selectedMilestones,
  setSelectedMilestones] =
  useState([]);

const [fromDate,
  setFromDate] =
  useState("");

const [toDate,
  setToDate] =
  useState("");

const [showMilestoneDropdown,
  setShowMilestoneDropdown] =
  useState(false);

  const milestones =
  project?.phases
    ?.flatMap(
      (phase) =>
        phase.milestones || []
    )
    ?.map(
      (milestone) =>
        milestone.milestoneName
    ) || [];

const handleMilestoneChange = (
  milestone
) => {
  setSelectedMilestones(
    (prev) =>
      prev.includes(milestone)
        ? prev.filter(
            (m) =>
              m !== milestone
          )
        : [
            ...prev,
            milestone,
          ]
  );
};

const activities =
  project?.phases
    ?.flatMap(
      (phase) =>
        phase.milestones || []
    )
    ?.filter(
      (milestone) =>
        selectedMilestones
          .length === 0 ||
        selectedMilestones.includes(
          milestone.milestoneName
        )
    )
    ?.flatMap(
      (milestone) =>
        milestone.tasks || []
    )
    ?.flatMap(
      (task) =>
        task.subTasks || []
    )
    ?.flatMap(
      (subTask) =>
        subTask.activities || []
    )
    ?.filter(
      (activity) => {

        if (
          fromDate &&
          activity.plannedStartDate <
            fromDate
        ) {
          return false;
        }

        if (
          toDate &&
          activity.plannedStartDate >
            toDate
        ) {
          return false;
        }

        return true;
      }
    ) || [];

  const totalActivities =
    activities.length;

  const completedActivities =
    activities.filter(
      (activity) =>
        activity.executionStatus ===
        "Completed"
    ).length;

  const delayedActivities =
    activities.filter(
      (activity) =>
        activity.scheduleHealth ===
        "Delayed"
    ).length;

  const openActivities =
    activities.filter(
      (activity) =>
        activity.executionStatus !==
        "Completed"
    ).length;

  const overallProgress =
    totalActivities > 0
      ? Math.round(
          activities.reduce(
            (sum, activity) =>
              sum +
              (activity.progress || 0),
            0
          ) / totalActivities
        )
      : 0;
      useEffect(() => {
  const handleClickOutside = (
    event
  ) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(
        event.target
      )
    ) {
      setShowMilestoneDropdown(
        false
      );
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
  const cards = [
  {
    title: "Overall Progress",
    value: `${overallProgress}%`,
    subText: "Average progress",
    icon: CircleDashed,
    iconColor: "#2563EB",
    bg: "#F8FBFF",
    border: "#E5EDF8",
  },

  {
    title: "Total Activities",
    value: totalActivities,
    subText: "All activities",
    icon: ListTodo,
    iconColor: "#D97706",
    bg: "#FFFDF8",
    border: "#F5E8C7",
  },

  {
    title: "Completed",
    value: completedActivities,
    subText: `${Math.round(
      (completedActivities /
        (totalActivities || 1)) *
        100
    )}% of total`,
    icon: CheckCircle2,
    iconColor: "#16A34A",
    bg: "#F8FFFB",
    border: "#DDF7E7",
  },

  {
    title: "Delayed",
    value: delayedActivities,
    subText: `${Math.round(
      (delayedActivities /
        (totalActivities || 1)) *
        100
    )}% of total`,
    icon: AlertTriangle,
    iconColor: "#EF4444",
    bg: "#FFF9F9",
    border: "#FFE3E3",
  },

  {
    title: "Open / Remaining",
    value: openActivities,
    subText: `${Math.round(
      (openActivities /
        (totalActivities || 1)) *
        100
    )}% of total`,
    icon: ClipboardList,
    iconColor: "#6D4AFF",
    bg: "#FCFAFF",
    border: "#ECE5FF",
  },
];

  return (
    <div className="bg-white rounded-2xl border border-[#E5EAF2] p-5 ">

      {/* Header */}
      <div className="flex items-center justify-between mb-5">

        <div className="flex items-center gap-3">
          <div
            className="
            w-8 h-8
            rounded-full
            bg-[#2563EB]
            text-white
            flex
            items-center
            justify-center
            text-sm
            font-bold
            "
          >
            2
          </div>

          <h2 className="text-[20px] font-bold text-[#0B1F59]">
            Executive Summary
          </h2>
        </div>

        <div className="flex items-center gap-3">
<div
  className="relative"
  ref={dropdownRef}
>

  <button
    type="button"
    onClick={() =>
      setShowMilestoneDropdown(
        !showMilestoneDropdown
      )
    }
    className="
    h-11
    w-[220px]
    px-4
    rounded-xl
    border
    border-[#E5EAF2]
    bg-white
    flex
    items-center
    justify-between
    text-sm
    "
  >
    <span>
      {selectedMilestones.length
        ? `${selectedMilestones.length} Selected`
        : "All Milestones"}
    </span>

    <span>▼</span>
  </button>

  {showMilestoneDropdown && (
    <div
      className="
      absolute
      top-full
      left-0
      mt-2
      w-full
      bg-white
      border
      border-[#E5EAF2]
      rounded-xl
      shadow-lg
      z-50
      max-h-64
      overflow-y-auto
      "
    >

      {/* All Milestones */}

      <label
        className="
        flex
        items-center
        gap-3
        px-4
        py-3
        border-b
        font-medium
        "
      >
        <input
          type="checkbox"
          checked={
            selectedMilestones.length ===
            0
          }
          onChange={() =>
            setSelectedMilestones([])
          }
        />

        All Milestones
      </label>

      {milestones.map(
        (milestone) => (
          <label
            key={milestone}
            className="
            flex
            items-center
            gap-3
            px-4
            py-3
            hover:bg-[#F8FAFC]
            cursor-pointer
            "
          >
            <input
              type="checkbox"
              checked={selectedMilestones.includes(
                milestone
              )}
              onChange={() =>
                handleMilestoneChange(
                  milestone
                )
              }
            />

            {milestone}
          </label>
        )
      )}
    </div>
  )}

</div>

        <input
  type="date"
  value={fromDate}
  onChange={(e) =>
    setFromDate(
      e.target.value
    )
  }
  className="
  h-11
  px-4
  rounded-xl
  border
  border-[#E5EAF2]
  text-sm
  "
/>

<span className="font-bold">
  →
</span>

<input
  type="date"
  value={toDate}
  onChange={(e) =>
    setToDate(
      e.target.value
    )
  }
  className="
  h-11
  px-4
  rounded-xl
  border
  border-[#E5EAF2]
  text-sm
  "
/>
<button
  type="button"
  onClick={() => {
    setSelectedMilestones([]);
    setFromDate("");
    setToDate("");
  }}
  className="
  h-11
  px-4
  rounded-xl
  border
  border-[#E5EAF2]
  bg-white
  text-sm
  font-medium
  hover:bg-[#F8FAFC]
  "
>
  Clear
</button>
        </div>

      </div>

      {/* Cards */}
      <div className="grid grid-cols-5 gap-4">

        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
  key={card.title}
  className="
  rounded-2xl
  border
  p-4
  min-h-[170px]
  "
  style={{
    backgroundColor: card.bg,
    borderColor: card.border,
  }}
>
  <div
    className="
    w-12
    h-12
    rounded-full
    flex
    items-center
    justify-center
    mb-3
    "
    style={{
      backgroundColor: `${card.iconColor}15`,
    }}
  >
    <Icon
      size={22}
      style={{
        color: card.iconColor,
      }}
    />
  </div>

  <h3
    className="
    text-[34px]
    font-bold
    leading-none
    "
    style={{
      color: card.iconColor,
    }}
  >
    {card.value}
  </h3>

  <p
    className="
    mt-2
    text-[15px]
    font-semibold
    "
    style={{
      color: card.iconColor,
    }}
  >
    {card.title}
  </p>

  <div className="mt-4">
    <span className="text-xs text-[#64748B]">
      {card.subText}
    </span>

    {card.extra && (
      <span className="ml-2 text-green-600 text-xs font-semibold">
        {card.extra}
      </span>
    )}
  </div>
</div>
          );
        })}

      </div>

    </div>
  );
}