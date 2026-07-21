import {
  AlertTriangle,
  CheckCircle2,
  CircleDashed,
  ClipboardList,
  BadgeCheck,
  ChartNoAxesCombined,
  Clock3,
  ListTodo,
  Gauge,
  TrendingUp,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import CustomDropdown from "../../../components/common/CustomDropdown";
import MultiSelectDropdown from "../../../components/common/MultiSelectDropdown";
import DateInput from "../../../components/common/DateInput";

export default function ExecutiveSummary({ 
   project,
    selectedMilestones,
    setSelectedMilestones,
}) {
  function SmallCard({
    title,
    value,
    subText,
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
        min-h-[110px]
        rounded-xl
        border
        border-[#CDD7E3]
        px-5
        py-4
        shadow-sm
      "
        style={{
          backgroundColor: bg,
          borderColor: border,
        }}
      >
        {/* Icon */}

        <div
          className="
          absolute
          left-4
          top-4
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
        "
          style={{
            backgroundColor: `${color}15`,
          }}
        >
          <Icon size={18} color={color} />
        </div>

        {/* Content */}

        <div className="flex h-full flex-col items-center justify-center">
          <h2
            className="
            text-3xl
            font-bold
            leading-none
          "
            style={{ color }}
          >
            {value}
          </h2>

          <p
            className="
            mt-2
            text-base
            font-semibold
            text-center
          "
            style={{ color }}
          >
            {title}
          </p>
        </div>
      </div>
    );
  }
  // const dropdownRef = useRef(null);
  const dateDropdownRef = useRef(null);
  const [showDateDropdown, setShowDateDropdown] = useState(false);
//  const [selectedMilestones, setSelectedMilestones] = useState([]);

  const [fromDate, setFromDate] = useState("");

  const [toDate, setToDate] = useState("");

  const [quickSelect, setQuickSelect] = useState("");

  const milestones =
    project?.phases
      ?.flatMap((phase) => phase.milestones || [])
      ?.map((milestone) => ({
        label: milestone.milestoneName,
        value: milestone.milestoneId,
      })) || [];

  const activities =
    project?.phases
      ?.flatMap((phase) => phase.milestones || [])
      ?.filter(
        (milestone) =>
          selectedMilestones.length === 0 ||
          selectedMilestones.includes(milestone.milestoneId),
      )
      ?.flatMap((milestone) => milestone.tasks || [])
      ?.flatMap((task) => task.subTasks || [])
      ?.flatMap((subTask) => subTask.activities || [])
      ?.filter((activity) => {
        if (fromDate && activity.plannedStartDate < fromDate) {
          return false;
        }

        if (toDate && activity.plannedStartDate > toDate) {
          return false;
        }

        return true;
      }) || [];

  const totalActivities = activities.length;

  const completedActivities = activities.filter(
    (activity) => activity.executionStatus === "Completed",
  ).length;

  const delayedActivities = activities.filter(
    (activity) => activity.scheduleHealth === "Delayed",
  ).length;

  const inProgressActivities = activities.filter(
    (activity) => activity.executionStatus === "In Progress",
  ).length;

 const today = new Date().toISOString().split("T")[0];

const notStartedActivities = activities.filter((activity) => {
  // Already completed or in progress should not be counted
  if (activity.executionStatus !== "Not Started") {
    return false;
  }

  // Count only activities whose planned start date has not yet arrived
  return (
    activity.plannedStartDate &&
    activity.plannedStartDate >= today
  );
}).length;

  const overallProgress =
    totalActivities > 0
      ? Math.round(
        activities.reduce(
          (sum, activity) => sum + (activity.progress || 0),
          0,
        ) / totalActivities,
      )
      : 0;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dateDropdownRef.current &&
        !dateDropdownRef.current.contains(event.target)
      ) {
        setShowDateDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleQuickSelect = (type) => {
    const today = new Date();

    let start = new Date();
    let end = new Date();

    switch (type) {
      case "Today":
        break;

      case "Week":
        start.setDate(today.getDate() - 7);
        break;

      case "Month":
        start.setMonth(today.getMonth() - 1);
        break;

      case "Quarter":
        start.setMonth(today.getMonth() - 3);
        break;

      case "Half-Yearly":
        start.setMonth(today.getMonth() - 6);
        break;

      case "Year":
        start.setFullYear(today.getFullYear() - 1);
        break;

      default:
        return;
    }

    setFromDate(start.toISOString().split("T")[0]);

    setToDate(end.toISOString().split("T")[0]);

    setQuickSelect(type);
  };

  const clearDateFilter = () => {
    setSelectedMilestones([]);
    setFromDate("");
    setToDate("");
    setQuickSelect("");
  };

  return (
    <div
      className="
      rounded-2xl
      border
      border-[#CDD7E3]
      bg-white
      p-4
      sm:p-5
      lg:p-6
    "
    >
      {/* Header */}

      <div
        className="
        mb-4
        flex
        flex-col
        gap-5

        xl:flex-row
        xl:items-start
        xl:justify-between
      "
      >
        {/* Left */}

        <div className="flex items-center gap-2">
          <div
            className="
          flex
          h-7
          w-7
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-[#2563EB]
          text-sm
          font-bold
          text-white

          sm:h-7
          sm:w-7
        "
          >
            2
          </div>

          <h2
            className="
            text-base
            font-bold
            text-[#0B1F59]

            sm:text-lg
            lg:text-xl
          "
          >
            Executive Summary
          </h2>
        </div>

        {/* Filters */}

        <div
          className="
          grid
          w-full
          grid-cols-1
          gap-4

          sm:grid-cols-2
          xl:w-auto
          xl:grid-cols-[250px_170px_160px_160px]
        "
        >
          {/* Milestone */}

          <MultiSelectDropdown
            label="Milestone Filter"
            placeholder="All Milestones"
            options={milestones}
            selected={selectedMilestones}
            // onChange={setSelectedMilestones}
            onChange={(value) => {
              setSelectedMilestones(value);
            }}
            width="w-full"
            dropdownWidth="w-[350px]"
          />

          {/* Quick Filter */}

          <CustomDropdown
            label="Date Filter"
            placeholder="Quick Select"
            value={quickSelect}
            onChange={(value) => {
              if (value) {
                handleQuickSelect(value);
              } else {
                clearDateFilter();
              }
            }}
            options={[
              { label: "Today", value: "Today" },
              { label: "Week", value: "Week" },
              { label: "Month", value: "Month" },
              { label: "Quarter", value: "Quarter" },
              { label: "Half-Yearly", value: "Half-Yearly" },
              { label: "Year", value: "Year" },
            ]}
          />

          <DateInput
            label="From"
            value={fromDate}
            max={toDate || undefined}
            onChange={(e) => setFromDate(e.target.value)}
          />

          <DateInput
            label="To"
            value={toDate}
            min={fromDate || undefined}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
      </div>

      {/* Cards */}

      <div
        className="
        grid
        grid-cols-1
        gap-5

        lg:grid-cols-12
      "
      >
        {/* ================= LEFT ================= */}

        <div className="lg:col-span-4">
          <div
            className="
        relative
        flex
        h-full
        min-h-[240px]
        flex-col
        justify-between

        rounded-xl
        border-1
        border-[#CDD7E3]
        px-6
        py-5
        shadow-sm
      "
            style={{
              backgroundColor: "#F8FBFF",
              borderColor: "#E5EDF8",
            }}
          >
            {/* Icon */}

            <div
              className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-xl
        "
              style={{
                backgroundColor: "#2563EB15",
              }}
            >
              <ChartNoAxesCombined
                size={24}
                color="#2563EB"
              />
            </div>

            {/* Progress */}

            <div className="text-center">
              <h1 className="text-5xl font-bold text-[#2563EB]">
                {overallProgress}%
              </h1>

              <p className="mt-2 text-lg font-semibold text-[#2563EB]">
                Overall Progress
              </p>
            </div>

            {/* Progress Bar */}

            <div>
              <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-[#2563EB] transition-all duration-500"
                  style={{
                    width: `${overallProgress}%`,
                  }}
                />
              </div>

              <p className="mt-3 text-center text-sm text-slate-500">
                {overallProgress}% of total activities completed
              </p>
            </div>
          </div>
        </div>

        {/* ================= RIGHT ================= */}

        <div className="lg:col-span-8">
          <div className="flex h-full flex-col justify-between gap-5">
            {/* Row 1 */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <SmallCard
                title="Total Activities"
                value={totalActivities}
                icon={ListTodo}
                color="#D97706"
                bg="#FFFDF8"
                border="#F5E8C7"
              />

              <SmallCard
                title="Completed"
                value={completedActivities}
                subText={`${Math.round(
                  (completedActivities / (totalActivities || 1)) * 100,
                )}% of total`}
                icon={BadgeCheck}
                color="#16A34A"
                bg="#F8FFFB"
                border="#DDF7E7"
              />

              <SmallCard
                title="Delayed"
                value={delayedActivities}
                subText={`${Math.round(
                  (delayedActivities / (totalActivities || 1)) * 100,
                )}% of total`}
                icon={AlertTriangle}
                color="#EF4444"
                bg="#FFF9F9"
                border="#FFE3E3"
              />
            </div>

            {/* Row 2 */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <SmallCard
                title="In Progress"
                value={inProgressActivities}
                subText={`${Math.round(
                  (inProgressActivities / (totalActivities || 1)) * 100,
                )}% of total`}
                icon={TrendingUp}
                color="#2563EB"
                bg="#F8FBFF"
                border="#E5EDF8"
              />

              <SmallCard
                title="Not Started"
                value={notStartedActivities}
                subText={`${Math.round(
                  (notStartedActivities / (totalActivities || 1)) * 100,
                )}% of total`}
                icon={Clock3}
                color="#6D4AFF"
                bg="#FCFAFF"
                border="#ECE5FF"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
