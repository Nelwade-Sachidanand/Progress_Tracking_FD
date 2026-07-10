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
        grid
        grid-cols-1
        gap-6

        xl:grid-cols-[1.6fr_1fr]
        2xl:grid-cols-[1.8fr_1fr]

        xl:gap-8
      "
      >
        {/* LEFT */}

        <div
          className="
          flex
          flex-col
          gap-5

          sm:flex-row
          sm:items-start
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

          {/* Project Details */}

          <div className="min-w-0 flex-1 space-y-4">
            {/* Project Name */}

            <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-center">
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
                truncate
                font-bold
                text-[#6D4AFF]

                text-base
                sm:text-lg
                xl:text-xl
                2xl:text-2xl
              "
                title={project?.projectName}
              >
                {project?.projectName}
              </h3>
            </div>

            {/* Bank Name */}

            <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-center">
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
                truncate
                font-semibold
                text-[#0B1F59]

                text-sm
                sm:text-base
                xl:text-base
                2xl:text-xl
              "
                title={project?.bankName}
              >
                {project?.bankName}
              </h3>
            </div>

            {/* Project Manager */}

            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
              <div className="flex items-center gap-2">
                <Users
                  size={18}
                  className="shrink-0 text-[#2563EB]"
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
              </div>

              <h3
                className="
                truncate
                font-semibold
                text-[#0B1F59]

                text-sm
                sm:text-base
                xl:text-base
                2xl:text-xl
              "
                title={project?.projectManager}
              >
                {project?.projectManager}
              </h3>
            </div>
          </div>
        </div>

        {/* RIGHT */}

        <div
          className="
          grid
          grid-cols-2
          gap-4

          sm:grid-cols-3

          xl:grid-cols-2
          2xl:grid-cols-2

          xl:mt-[-50px]
        "
        >
          {/* Project Start */}

          <div
            className="
      flex
      items-center
      gap-3

      rounded-xl
      border
      border-[#CDD7E3]
      bg-white

      p-4
      shadow-sm
    "
          >
            <div
              className="
        flex
        h-10
        w-10
        shrink-0
        items-center
        justify-center

        rounded-lg
        bg-[#F5F3FF]

        sm:h-11
        sm:w-11
      "
            >
              <CalendarDays
                size={18}
                className="text-[#7C3AED]"
              />
            </div>

            <div className="min-w-0 flex-1">
              <p
                className="
          text-xs
          font-medium
          text-slate-600

          sm:text-sm
        "
              >
                Project Start
              </p>

              <p
                className="
          mt-1
          truncate

          text-sm
          font-semibold
          text-[#0B1F59]

          sm:text-base
        "
              >
                {formatDate(projectStartDate)}
              </p>
            </div>
          </div>

          {/* Go Live */}

          <div
            className="
      flex
      items-center
      gap-3

      rounded-xl
      border
      border-[#CDD7E3]
      bg-white

      p-4
      shadow-sm
    "
          >
            <div
              className="
        flex
        h-10
        w-10
        shrink-0
        items-center
        justify-center

        rounded-lg
        bg-[#FEF2F2]

        sm:h-11
        sm:w-11
      "
            >
              <Flag
                size={18}
                className="text-[#EF4444]"
              />
            </div>

            <div className="min-w-0 flex-1">
              <p
                className="
          text-xs
          font-medium
          text-slate-600

          sm:text-sm
        "
              >
                Target Go-Live
              </p>

              <p
                className="
          mt-1
          truncate

          text-sm
          font-semibold
          text-[#0B1F59]

          sm:text-base
        "
              >
                {formatDate(targetGoLive)}
              </p>
            </div>
          </div>

          {/* Status */}

          <div
            className="
      flex
      items-center
      gap-3

      rounded-xl
      border
      border-[#CDD7E3]
      bg-white

      p-4
      shadow-sm

      sm:col-span-1
      xl:col-span-1
    "
          >
            <div
              className="
        flex
        h-10
        w-10
        shrink-0
        items-center
        justify-center

        rounded-lg
        bg-[#FEF3C7]

        sm:h-11
        sm:w-11
      "
            >
              <TriangleAlert
                size={18}
                className="text-[#F59E0B]"
              />
            </div>

            <div className="min-w-0 flex-1">
              <p
                className="
          text-xs
          font-medium
          text-slate-600

          sm:text-sm
        "
              >
                Project Status
              </p>

              <span
                className={`
          mt-2
          inline-flex
          rounded-full
          px-3
          py-1

          text-xs
          font-semibold

          ${projectStatus === "On Track"
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
