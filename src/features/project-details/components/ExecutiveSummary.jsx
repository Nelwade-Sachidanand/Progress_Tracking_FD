import {
  AlertTriangle,
  CheckCircle2,
  CircleDashed,
  ClipboardList,
  ListTodo,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import CustomDropdown from "../../../components/common/CustomDropdown";
import MultiSelectDropdown from "../../../components/common/MultiSelectDropdown";
import DateInput from "../../../components/common/DateInput";

export default function ExecutiveSummary({ project }) {
  function SmallCard({ title, value, icon: Icon, color, bg, border }) {
    return (
      <div
        className="
        relative
        w-[170px]
        h-[78px]
        rounded-lg
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
          <Icon size={14} color={color} />
        </div>

        {/* Center Content */}
        <div className="h-full flex flex-col items-center justify-center">
          <h2 className="text-lg font-bold leading-none" style={{ color }}>
            {value}
          </h2>

          <p
            className="mt-2 text-xs font-semibold text-center"
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
  const [selectedMilestones, setSelectedMilestones] = useState([]);

  const [fromDate, setFromDate] = useState("");

  const [toDate, setToDate] = useState("");

  const [quickSelect, setQuickSelect] = useState("");

  const milestones =
    project?.phases
      ?.flatMap((phase) => phase.milestones || [])
      ?.map((milestone) => milestone.milestoneName) || [];

  const activities =
    project?.phases
      ?.flatMap((phase) => phase.milestones || [])
      ?.filter(
        (milestone) =>
          selectedMilestones.length === 0 ||
          selectedMilestones.includes(milestone.milestoneName),
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

  const notStartedActivities = activities.filter(
    (activity) => activity.executionStatus === "Not Yet Started",
  ).length;

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
    <div className="bg-white rounded-2xl border border-[#E5EAF2] p-5 ">
      {/* Header */}
      <div
        className="
    mb-5
    flex
    flex-col
    gap-5
    xl:flex-row
    xl:items-start
    xl:justify-between
  "
      >
        {/* ================= Left ================= */}
        <div className="flex items-center gap-3 shrink-0">
          <div
            className="
            h-7
            w-7
            rounded-full
            bg-[#2563EB]
            text-white
            flex
            items-center
            justify-center
            font-bold
            shrink-0
      "
          >
            2
          </div>

          <h2
            className="
        text-base
          sm:text-lg
          lg:text-xl
          font-bold
          text-[#0B1F59]
          mt-[-3px]
      "
          >
            Executive Summary
          </h2>
        </div>

        {/* ================= Right Filters ================= */}
        <div
          className="
      grid
      grid-cols-[300px_150px_150px_150px]
      gap-3
      items-end
      shrink-0
      mt-[-10px]
    "
        >
          {/* Milestone */}
          <MultiSelectDropdown
            label="Milestone Filter"
            placeholder="All Milestones"
            options={milestones}
            selected={selectedMilestones}
            onChange={setSelectedMilestones}
            width="w-full"
          />

          {/* Date Filter */}
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
      <div className="grid grid-cols-12 gap-4">
        {/* ================= LEFT : OVERALL PROGRESS ================= */}

        <div className="col-span-12 lg:col-span-4">
          <div
            className="
      relative
      w-[330px]
      h-[168px]
      rounded-lg
      border
      px-5
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
            <div className="h-full flex flex-col items-center justify-center">
              <h1
                className="text-[42px] font-bold leading-none"
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
        <div className="col-span-12 lg:col-span-7 flex flex-col gap-4">
          {/* Row 1 */}
          <div className="grid grid-cols-3 gap-2">
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
                (completedActivities / (totalActivities || 1)) * 100,
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
                (delayedActivities / (totalActivities || 1)) * 100,
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
