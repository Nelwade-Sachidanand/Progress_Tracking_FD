
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

function SmallCard({
  title,
  value,
  icon: Icon,
  color,
  bg,
  border,
}) {
  return (
    <div
      className="
        relative
     w-full
h-[78px]
        rounded-xl
        border
        shadow-sm
      "
      style={{
        backgroundColor: bg,
        borderColor: border,
        boxShadow: "0 6px 18px rgba(15,23,42,.06)",
      }}
    >
      {/* Icon */}
      <div
        className="
          absolute
          top-3
          left-3
          w-7
          h-7
          rounded-lg
          flex
          items-center
          justify-center
        "
        style={{
          backgroundColor: `${color}15`,
        }}
      >
        <Icon
          size={14}
          color={color}
        />
      </div>

      {/* Center Content */}
      <div className="h-full flex flex-col items-center justify-center">
        <h2
          className="text-[22px] font-bold leading-none"
          style={{ color }}
        >
          {value}
        </h2>

        <p
          className="mt-2 text-[11px] font-semibold text-center"
          style={{ color }}
        >
          {title}
        </p>
      </div>
    </div>
  );
}
 // const dropdownRef = useRef(null);
  const milestoneDropdownRef = useRef(null);
const dateDropdownRef = useRef(null);
  const [showDateDropdown, setShowDateDropdown] = useState(false);
const [selectedMilestones,
  setSelectedMilestones] =
  useState([]);

const [fromDate,
  setFromDate] =
  useState("");

const [toDate,
  setToDate] =
  useState("");

  const [quickSelect, setQuickSelect] =
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

// const handleMilestoneChange = (
//   milestone
// ) => {
//   setSelectedMilestones(
//     (prev) =>
//       prev.includes(milestone)
//         ? prev.filter(
//             (m) =>
//               m !== milestone
//           )
//         : [
//             ...prev,
//             milestone,
//           ]
//   );
// };


const handleMilestoneChange = (milestone) => {
  setSelectedMilestones((prev) =>
    prev.includes(milestone)
      ? prev.filter((m) => m !== milestone)
      : [...prev, milestone]
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

  const inProgressActivities = activities.filter(
  (activity) => activity.executionStatus === "In Progress"
).length;

const notStartedActivities = activities.filter(
  (activity) =>
    activity.executionStatus === "Not Yet Started"
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
  const handleClickOutside = (event) => {
    if (
      milestoneDropdownRef.current &&
      !milestoneDropdownRef.current.contains(event.target)
    ) {
      setShowMilestoneDropdown(false);
    }

    if (
      dateDropdownRef.current &&
      !dateDropdownRef.current.contains(event.target)
    ) {
      setShowDateDropdown(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () =>
    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );
}, []);
const handleQuickSelect = (
  type
) => {
  const today = new Date();

  let start = new Date();
  let end = new Date();

  switch (type) {
    case "Today":
      break;

    case "Week":
      start.setDate(
        today.getDate() - 7
      );
      break;

    case "Month":
      start.setMonth(
        today.getMonth() - 1
      );
      break;

    case "Quarter":
      start.setMonth(
        today.getMonth() - 3
      );
      break;

    case "Half-Yearly":
      start.setMonth(
        today.getMonth() - 6
      );
      break;

    case "Year":
      start.setFullYear(
        today.getFullYear() - 1
      );
      break;

    default:
      return;
  }

  setFromDate(
    start
      .toISOString()
      .split("T")[0]
  );

  setToDate(
    end
      .toISOString()
      .split("T")[0]
  );

  setQuickSelect(type);
};

const clearDateFilter = () => {
  setSelectedMilestones([]);
  setFromDate("");
  setToDate("");
  setQuickSelect("");
};
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

  // {
  //   title: "Open / Remaining",
  //   value: openActivities,
  //   subText: `${Math.round(
  //     (openActivities /
  //       (totalActivities || 1)) *
  //       100
  //   )}% of total`,
  //   icon: ClipboardList,
  //   iconColor: "#6D4AFF",
  //   bg: "#FCFAFF",
  //   border: "#ECE5FF",
  // },
];

  return (
    <div className="bg-white rounded-2xl border border-[#E5EAF2] p-5 ">

      {/* Header */}
     <div
  className="
  flex
  flex-col
  xl:flex-row
  xl:items-center
  xl:justify-between
  gap-4
  mb-5
  "
>
        <div className="flex items-center gap-3">
          <div
            className="
            w-8 h-
              min-w-8
  min-h-8
  shrink-0

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

        <h2
  className="
  text-[16px]
  sm:text-[18px]
  lg:text-[20px]
  font-bold
  text-[#0B1F59]
  "
>
            Executive Summary
          </h2>
        </div>

       <div
  className="
  flex
  flex-col
  lg:flex-row
  gap-3
  w-full
  xl:w-auto
  "
>


 <div
  className="relative"
  ref={milestoneDropdownRef}
>

  {/* LABEL */}
  <p className="text-xs font-semibold text-[#0B1F59] mb-1">
    Milestone Filter
  </p>

  {/* BUTTON ROW */}
  <div className="flex items-center gap-2">

    {/* DROPDOWN BUTTON */}
    <button
      onClick={() =>
        setShowMilestoneDropdown(!showMilestoneDropdown)
      }
      className="
        h-10
        w-[350px]
        px-3
        rounded-lg
        border
        border-[#E5EAF2]
        bg-white
        flex
        items-center
        justify-between
        text-sm
         cursor-pointer
      "
    >
     <span className="truncate">
  {selectedMilestones.length === 0
    ? "All Milestones"
    : selectedMilestones.length === milestones.length
      ? "All Milestones"
      : selectedMilestones.length <= 2
        ? selectedMilestones.join(", ")
        : `${selectedMilestones.slice(0, 2).join(", ")} +${selectedMilestones.length - 2}`}
</span>

      <span>▼</span>
    </button>

    

  </div>

 {showMilestoneDropdown && (
  <div className="
    absolute
    top-full
    left-0
    mt-2
    w-[350px]
    bg-white
    border
    rounded-lg
    shadow-lg
    z-50
    max-h-50
    overflow-y-auto
  ">

    {/* ALL MILESTONES */}
    <label className="
      flex items-center gap-2 px-3 py-2 text-sm border-b hover:bg-slate-50
    ">
 <input
  type="checkbox"
  checked={selectedMilestones.length === milestones.length}
  onChange={() =>
    setSelectedMilestones(
      selectedMilestones.length === milestones.length
        ? []
        : [...milestones]
    )
  }
/>
      All Milestones
    </label>

    {/* MILESTONE LIST */}
    {milestones.map((milestone) => (
  <label
    key={milestone}
    className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-slate-100"
  >
    <input
      type="checkbox"
      checked={selectedMilestones.includes(milestone)}
      onChange={() => handleMilestoneChange(milestone)}
    />

    <span>{milestone}</span>
  </label>
))}

    {/* CLEAR BUTTON (INSIDE DROPDOWN) */}
    <div className="border-t px-2 py-2 sticky bottom-0 bg-white">
      <button
        onClick={() => setSelectedMilestones([])}
        className="
          w-full
          py-2
          text-sm
          text-red-600
          hover:bg-red-50
          rounded
        "
      >
        Clear Selection
      </button>
    </div>

  </div>
)}
</div>


<div className="flex flex-col lg:flex-row gap-3 items-start lg:items-center">

  {/* DATE FILTER LABEL */}
<div className="flex flex-col gap-1">

  <p className="text-xs font-semibold text-[#0B1F59]">
    Date Filter
  </p>

  {/* QUICK SELECT */}
  <div className="relative" ref={dateDropdownRef}>

    <button
      onClick={() => setShowDateDropdown(!showDateDropdown)}
      className="
        h-10
        w-[180px]
        px-3
        rounded-lg
        border
        border-[#E5EAF2]
        bg-white
        text-sm
        flex
        items-center
        justify-between
        cursor-pointer
      "
    >
      <span>
        {quickSelect ? quickSelect : "Quick Select"}
      </span>
      <span>▼</span>
    </button>

    {/* DROPDOWN */}
   {showDateDropdown && (
<div
  className="
    absolute
    top-full
    left-0
    mt-2
    w-[220px]
    max-h-48
    bg-white
    border
    border-[#E5EAF2]
    rounded-lg
    shadow-lg
    z-50
    overflow-y-auto
  "
>
    <div className="px-4 py-3 border-b bg-slate-50">
      <p className="text-sm font-semibold text-[#0B1F59]">
        Quick Select
      </p>
    </div>

    {[
      "Today",
      "Week",
      "Month",
      "Quarter",
      "Half-Yearly",
      "Year",
    ].map((item) => (
      <button
        key={item}
        onClick={() => {
          handleQuickSelect(item);
          setShowDateDropdown(false);
        }}
        className={`
          w-full
          text-left
          px-4
          py-3
          text-sm
          hover:bg-slate-100
          transition-colors
          ${
            quickSelect === item
              ? "bg-blue-50 text-blue-700 font-semibold"
              : ""
          }
        `}
      >
        {item}
      </button>
    ))}

    <div className="border-t p-2">
      <button
        onClick={() => {
          clearDateFilter();
          setShowDateDropdown(false);
        }}
        className="
          w-full
          rounded-lg
          py-2
          text-sm
          text-red-600
          hover:bg-red-50
        "
      >
        Clear Filter
      </button>
    </div>
  </div>
)}
  </div>

</div>

  {/* DATE RANGE LABELS */}
<div className="flex items-end gap-2">

  <div className="flex flex-col">
    <p className="text-[12px] text-[#0B1F59] font-semibold">From</p>
    <input
      type="date"
      value={fromDate}
      onChange={(e) => setFromDate(e.target.value)}
      className="h-10 px-3 rounded-lg border text-xs   border-[#E5EAF2]"
    />
  </div>

  <div className="flex flex-col">
    <p className="text-[12px] text-[#0B1F59] font-semibold">To</p>
    <input
      type="date"
      value={toDate}
      onChange={(e) => setToDate(e.target.value)}
      className="h-10 px-3 rounded-lg border text-xs   border-[#E5EAF2]"
    />
  </div>

</div>

  

</div>
        </div>

      </div>

      {/* Cards */}
     {/* Cards */}
<div className="grid grid-cols-12 gap-3">

  {/* ================= LEFT : OVERALL PROGRESS ================= */}
 <div className="col-span-12 lg:col-span-3 flex">
 <div
  className="
      relative
      w-full
      h-[168px]
      rounded-xl
      border
      px-6
      py-4
      shadow-lg
    "
    style={{
      backgroundColor: "#F8FBFF",
      borderColor: "#E5EDF8",
      boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
    }}
  >
    {/* Top Left Icon */}
    <div
      className="
        absolute
        top-5
        left-5
        w-12
        h-12
        rounded-xl
        flex
        items-center
        justify-center
      "
      style={{
        backgroundColor: "#2563EB15",
      }}
    >
      <CircleDashed size={24} color="#2563EB" />
    </div>

    {/* Center Content */}
  <div className="h-full flex flex-col items-center justify-center gap-3">
      <h1
        className="text-[52px] font-bold leading-none"
        style={{ color: "#2563EB" }}
      >
        {overallProgress}%
      </h1>

      <p
        className="mt-2 text-[16px] font-semibold"
        style={{ color: "#2563EB" }}
      >
        Overall Progress
      </p>
    </div>
  </div>
</div>

  {/* ================= RIGHT ================= */}
<div className="col-span-12 lg:col-span-9 flex flex-col gap-3">

    {/* Row 1 */}
  <div className="grid grid-cols-3 gap-3">

      {/* Total */}
      <SmallCard
       
        title="Total Activities"
         value={totalActivities}
        icon={ListTodo}
        color="#D97706"
        bg="#FFFDF8"
        border="#F5E8C7"
      />

      {/* Completed */}
      <SmallCard
        title="Completed"
        value={completedActivities}
        subText={`${Math.round(
          (completedActivities / (totalActivities || 1)) * 100
        )}% of total`}
        icon={CheckCircle2}
        color="#16A34A"
        bg="#F8FFFB"
        border="#DDF7E7"
      />

      {/* Delayed */}
      <SmallCard
        title="Delayed"
        value={delayedActivities}
        subText={`${Math.round(
          (delayedActivities / (totalActivities || 1)) * 100
        )}% of total`}
        icon={AlertTriangle}
        color="#EF4444"
        bg="#FFF9F9"
        border="#FFE3E3"
      />

    </div>

    {/* Row 2 */}
    <div className="grid grid-cols-3 gap-4">

  <SmallCard
    title="In Progress"
    value={inProgressActivities}
    icon={CircleDashed}
    color="#2563EB"
    bg="#F8FBFF"
    border="#E5EDF8"
  />

  <SmallCard
    title="Not Yet Started"
    value={notStartedActivities}
    icon={ClipboardList}
    color="#6D4AFF"
    bg="#FCFAFF"
    border="#ECE5FF"
  />

</div>

  </div>

</div>

    </div>
  );
}