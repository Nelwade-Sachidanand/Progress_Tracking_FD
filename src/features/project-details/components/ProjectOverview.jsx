import {
  Building2,
  CalendarDays,
  Flag,
  TriangleAlert,
  Users,
} from "lucide-react";

export default function ProjectOverview({ project }) {
  const activities =
    project?.phases
      ?.flatMap((phase) => phase.milestones || [])
      ?.flatMap((milestone) => milestone.tasks || [])
      ?.flatMap((task) => task.subTasks || [])
      ?.flatMap((subTask) => subTask.activities || []) || [];

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";

    const date = new Date(dateStr);

    if (isNaN(date)) return "-";

    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();

    return `${dd}-${mm}-${yyyy}`;
  };

  const projectStartDate =
    activities.length > 0
      ? activities
        .map((a) => a.plannedStartDate)
        .filter(Boolean)
        .sort()[0]
      : "-";

  const targetGoLive =
    activities.length > 0
      ? activities
        .map((a) => a.plannedEndDate)
        .filter(Boolean)
        .sort()
        .at(-1)
      : "-";

  const projectStatus = activities.some(
    (activity) => activity.scheduleHealth === "Delayed",
  )
    ? "At Risk"
    : "On Track";

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
      2xl:p-7
    "
    >
      {/* Header */}

      <div className="mb-6 flex items-center gap-2">
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
          1
        </div>

        <h2
          className="
          text-base
          font-bold
          text-[#0B1F59]

          sm:text-lg
          lg:text-xl
          xl:text-xl
          2xl:text-[28px]
        "
        >
          Project Overview
        </h2>
      </div>

      

      {/* Main Layout */}

<div
  className="
    flex
    flex-col
    gap-8

    xl:flex-row
    xl:justify-between
    xl:items-start
  "
>

  {/* Left Side */}
<div
  className="
    flex
    flex-col
    gap-5

    sm:flex-row
    sm:items-start

    flex-1
  "
>
    {/* Project Icon */}
    <div
      className="
        flex
        h-11
        w-11
        shrink-0
        items-center
        justify-center
        rounded-xl
        border
        border-[#CDD7E3]
        bg-[#F5F7FF]

        sm:h-12
        sm:w-12

        xl:h-10
        xl:w-10
      "
    >
      <Building2
        size={24}
        className="text-[#6D4AFF]"
      />
    </div>

    {/* Details */}
    <div
  className="
    space-y-4
    min-w-0
    flex-1
  "
>

      {/* Project Name */}
      <div
  className="
    flex
    flex-col
    gap-1

    sm:flex-row
    sm:items-center
  "
>
        <span
          className="
            text-sm
            font-medium
            text-slate-600

            xl:text-base
            2xl:text-lg
          "
        >
          Project Name:
        </span>

        <h3
          className="
            font-bold
            text-[#6D4AFF]

            text-base
            sm:text-lg
            xl:text-xl
            2xl:text-2xl
          "
        >
          {project?.projectName}
        </h3>
      </div>

      {/* Bank */}
   <div
  className="
    flex
    flex-col
    gap-1

    sm:flex-row
    sm:items-center
  "
>
        <span
          className="
            text-sm
            font-medium
            text-slate-600

            xl:text-base
            2xl:text-lg
          "
        >
          Bank Name:
        </span>

        <h3
          className="
            font-semibold
            text-[#0B1F59]

            text-sm
            sm:text-base
            xl:text-base
            2xl:text-xl
          "
        >
          {project?.bankName}
        </h3>
      </div>

      {/* PM */}
    <div
  className="
    flex
    flex-col
    gap-1

    sm:flex-row
    sm:items-center
  "
>

        <Users
          size={18}
          className="text-[#2563EB]"
        />

        <span
          className="
            text-sm
            font-medium
            text-slate-600

            xl:text-base
            2xl:text-lg
          "
        >
          Project Manager:
        </span>

        <h3
          className="
            font-semibold
            text-[#0B1F59]

            text-sm
            sm:text-base
            xl:text-base
            2xl:text-xl
          "
        >
          {project?.projectManager}
        </h3>

      </div>

    </div>
  </div>

  {/* Right Side */}
 <div
  className="
    grid
    grid-cols-1
    gap-4

    sm:grid-cols-2

    xl:grid-cols-1
    xl:min-w-[320px]
  "
>

    {/* Project Start */}
    <div
  className="
    flex
    items-center
    gap-3
    flex-wrap
  "
>

      <CalendarDays
        size={18}
        className="text-[#7C3AED]"
      />

      <span
        className="
          text-sm
          font-medium
          text-slate-600

          xl:text-base
        "
      >
        Project Start:
      </span>

      <span
        className="
          font-semibold
          text-[#0B1F59]

          text-sm
          xl:text-base
        "
      >
        {formatDate(projectStartDate)}
      </span>

    </div>

    {/* Go Live */}
   <div
  className="
    flex
    items-center
    gap-3
    flex-wrap
  "
>

      <Flag
        size={18}
        className="text-[#EF4444]"
      />

      <span
        className="
          text-sm
          font-medium
          text-slate-600

          xl:text-base
        "
      >
        Target Go-Live:
      </span>

      <span
        className="
          font-semibold
          text-[#0B1F59]

          text-sm
          xl:text-base
        "
      >
        {formatDate(targetGoLive)}
      </span>

    </div>

    {/* Status */}
  <div
  className="
    flex
    items-center
    gap-3
    flex-wrap
  "
>

      <TriangleAlert
        size={18}
        className={
          projectStatus === "On Track"
            ? "text-green-600"
            : "text-red-600"
        }
      />

      <span
        className="
          text-sm
          font-medium
          text-slate-600

          xl:text-base
        "
      >
        Project Status:
      </span>

      <span
        className={`
          inline-flex
          rounded-full
          px-3
          py-1
          text-xs
          font-semibold

          ${
            projectStatus === "On Track"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }
        `}
      >
        {projectStatus}
      </span>

    </div>

  </div>

</div>
    </div>
  );
}
