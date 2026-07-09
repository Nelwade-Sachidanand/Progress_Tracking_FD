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
        bg-white
        rounded-2xl
        border
        border-slate-200
        p-5
        lg:p-6
        2xl:p-7
      "
    >
      {/* Header */}

      <div className="flex items-center gap-3 mb-7">
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
          1
        </div>

        {/* <h2
          className="
            text-xl
            lg:text-2xl
            2xl:text-[30px]
            font-bold
            text-[#0B1F59]
            mt-[-2px]
          "
        > */}
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
          Project Overview
        </h2>
      </div>

      {/* Main Layout */}

      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-[1.6fr_1fr]
          2xl:grid-cols-[1.8fr_1fr]
          gap-6
          2xl:gap-8
          items-start
        "
      >
        {/* LEFT */}

        <div
          className="
            flex
            flex-col
            sm:flex-row
            gap-5
            2xl:gap-6
          "
        >
          {/* Project Icon */}

          <div
            className="
              h-9
              w-9
              2xl:h-12
              2xl:w-12

              rounded-xl

              bg-[#F5F7FF]
              border
              border-slate-200

              flex
              items-center
              justify-center

              shrink-0
            "
          >
            <Building2 size={25} className="text-[#6D4AFF]" />
          </div>

          {/* Project Details */}

          <div className="flex-1 min-w-0 space-y-4">
            {/* Project Name */}

            <div className="flex flex-wrap items-center gap-2">
              <span
                className="
                  text-[15px]
                  xl:text-base
                  2xl:text-xl
                  font-medium
                  text-slate-600
                "
              >
                Project Name:
              </span>

              <h3
                className="
                  min-w-0
                  truncate

                  text-base
                  xl:text-lg
                  2xl:text-xl

                  font-bold
                  text-[#6D4AFF]
                "
                title={project?.projectName}
              >
                {project?.projectName}
              </h3>
            </div>

            {/* Bank Name */}

            <div className="flex flex-wrap items-center gap-2">
              <span
                className="
                  text-sm
                  xl:text-base
                  2xl:text-xl
                  font-medium
                  text-slate-600
                "
              >
                Bank Name:
              </span>

              <h3
                className="
                  min-w-0
                  truncate

                  text-sm
                  xl:text-base
                  2xl:text-xl

                  font-semibold
                  text-[#0B1F59]
                "
                title={project?.bankName}
              >
                {project?.bankName}
              </h3>
            </div>

            {/* Project Manager */}

            <div className="flex flex-wrap items-center gap-2">
              <Users size={18} className="text-[#2563EB] shrink-0" />

              <span
                className="
                  text-sm
                  xl:text-base
                  2xl:text-xl
                  font-medium
                  text-slate-600
                "
              >
                Project Manager:
              </span>

              <h3
                className="
                  min-w-0
                  truncate

                  text-sm
                  xl:text-base
                  2xl:text-xl

                  font-semibold
                  text-[#0B1F59]
                "
                title={project?.projectManager}
              >
                {project?.projectManager}
              </h3>
            </div>
          </div>
        </div>

        {/* RIGHT */}

        {/* RIGHT */}
        <div className="position-relative grid grid-cols-2 gap-3 w-full mt-[-50px]">
          {/* Start Date */}
          <div
            className="
      bg-white
      border
      border-slate-200
      rounded-lg
      shadow-sm

      p-3
      xl:p-4

      flex
      items-center
      gap-3
    "
          >
            <div
              className="
        h-9
        w-9
        xl:h-10
        xl:w-10
        rounded-lg
        bg-[#F5F3FF]
        flex
        items-center
        justify-center
        shrink-0
      "
            >
              <CalendarDays size={18} className="text-[#7C3AED] 2xl:h-6 2xl:w-6" />
            </div>

            <div className="flex-1 min-w-0">
              <p
                className="
          text-xs
          xl:text-sm
          2xl:text-base
          font-medium
          text-slate-600
          leading-tight
        "
              >
                Project Start
              </p>

              <p
                className="
          mt-1
          text-sm
          xl:text-base
          font-medium
          text-[#0B1F59]
          truncate
        "
              >
                {formatDate(projectStartDate)}
              </p>
            </div>
          </div>

          {/* Go Live */}
          <div
            className="
      bg-white
      border
      border-slate-200
      rounded-lg
      shadow-sm

      p-3
      xl:p-4

      flex
      items-center
      gap-3
    "
          >
            <div
              className="
        h-9
        w-9
        xl:h-10
        xl:w-10
        rounded-lg
        bg-[#FEF2F2]
        flex
        items-center
        justify-center
        shrink-0
      "
            >
              <Flag size={18} className="text-[#EF4444] 2xl:h-6 2xl:w-6" />
            </div>

            <div className="flex-1 min-w-0">
              <p
                className="
          text-xs
          xl:text-sm
          2xl:text-base
          font-medium
          text-slate-600
          leading-tight
        "
              >
                Target Go-Live
              </p>

              <p
                className="
          mt-1
          text-sm
          xl:text-base
          font-medium
          text-[#0B1F59]
          truncate
        "
              >
                {formatDate(targetGoLive)}
              </p>
            </div>
          </div>

          {/* Status */}
          <div
            className="
      bg-white
      border
      border-slate-200
      rounded-lg
      shadow-sm

      p-3
      xl:p-4

      flex
      items-center
      gap-3
    "
          >
            <div
              className="
        h-9
        w-9
        xl:h-10
        xl:w-10
        rounded-lg
        bg-[#FEF3C7]
        flex
        items-center
        justify-center
        shrink-0
      "
            >
              <TriangleAlert size={18} className="text-[#F59E0B] 2xl:h-6 2xl:w-6" />
            </div>

            <div className="flex-1 min-w-0">
              <p
                className="
          text-xs
          xl:text-sm
          2xl:text-base
          font-medium
          text-slate-600
          leading-tight
        "
              >
                Project Status
              </p>

              <span
                className={`
          inline-flex
          mt-1
          px-2.5
          py-1
          rounded-full
          text-[10px]
          xl:text-xs
          2xl:text-sm
          font-semibold
          whitespace-nowrap
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
    </div>
  );
}
