import {
  Building2,
  CalendarDays,
  Flag,
  Briefcase,
  TriangleAlert,
  Users,
} from "lucide-react";
export default function ProjectOverview({
  project,


}) {
  const activities =
  project?.phases
    ?.flatMap((phase) =>
      phase.milestones || []
    )
    ?.flatMap((milestone) =>
      milestone.tasks || []
    )
    ?.flatMap((task) =>
      task.subTasks || []
    )
    ?.flatMap((subTask) =>
      subTask.activities || []
    ) || [];

const projectStartDate =
  activities.length > 0
    ? activities
        .map(
          (a) => a.plannedStartDate
        )
        .filter(Boolean)
        .sort()[0]
    : "-";

    const targetGoLive =
  activities.length > 0
    ? activities
        .map(
          (a) => a.plannedEndDate
        )
        .filter(Boolean)
        .sort()
        .at(-1)
    : "-";

    const projectStatus =
  activities.some(
    (activity) =>
      activity.scheduleHealth ===
      "Delayed"
  )
    ? "At Risk"
    : "On Track";
    const projectType =
  project?.projectName;
  return (
<div
  className="
  bg-white
  rounded-2xl
  border
  border-[#E5EAF2]
  p-4
  md:p-5
  lg:p-6
  "
>      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-full bg-[#2563EB] text-white flex items-center justify-center text-sm font-bold">
          1
        </div>

        <h2 className="text-[20px] font-bold text-[#0B1F59]">
          Project Overview
        </h2>
      </div>
<div
  className="
  grid
  grid-cols-1
  xl:grid-cols-2
  gap-6
  xl:gap-8
  "
>
        {/* Left */}

      <div
  className="
  flex
  flex-col
  sm:flex-row
  gap-4
  sm:gap-5
  "
>
          <div
  className="
  w-16
  h-16
  sm:w-20
  sm:h-20
  rounded-2xl
  bg-[#F3EEFF]
  flex
  items-center
  justify-center
  shrink-0
  "
>
            <Building2
              size={32}
              className="text-[#6D4AFF]"
            />
          </div>

          <div>
            <h3 className="
text-[18px]
sm:text-[20px]
lg:text-[21px]
font-bold
text-[#6D4AFF]
leading-tight
">
              {project?.projectName}
            </h3>

            <h2 className="
mt-2
text-[16px]
sm:text-[18px]
lg:text-[20px]
font-[690]
text-[#0B1F59]
leading-tight
">
              {project?.bankName}
            </h2>

            <div className="inline-flex mt-4 px-4 py-2 rounded-full bg-[#EEF2FF] text-[#475569] text-sm font-medium">
              {projectType}
            </div>

<div className="mt-5 lg:mt-8 flex items-start gap-3">
              <Users
                size={18}
                className="text-[#2563EB] mt-1"
              />

              <div>
                <p className="text-sm text-[#64748B]">
                  Project Manager
                </p>

                <p className="font-semibold text-[#0B1F59]">
                  {project?.projectManager}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right */}

<div
  className="
  grid
  grid-cols-1
  sm:grid-cols-2
  gap-5
  lg:gap-x-12
  lg:gap-y-6
  "
>
          <div className="flex gap-4">
            <CalendarDays
              className="text-[#7C3AED] w-5 h-5 lg:w-6 lg:h-6"
              
            />

            <div>
              <p className="text-sm text-[#64748B]">
                Start Date
              </p>

              <p className="font-semibold text-[#0B1F59] text-base">
                {projectStartDate}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Flag
              size={24}
              className="text-[#EF4444]"
            />

            <div>
              <p className="text-sm text-[#64748B]">
                Target Go-Live
              </p>

              <p className="font-semibold text-[#0B1F59] text-base">
                {targetGoLive}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Briefcase
              size={24}
              className="text-[#2563EB]"
            />

            <div>
              <p className="text-sm text-[#64748B]">
                Project Type
              </p>

              <p className="font-semibold text-[#0B1F59]">
                {projectType}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <TriangleAlert
              size={24}
              className="text-[#F59E0B]"
            />

            <div>
              <p className="text-sm text-[#64748B]">
                Project Status
              </p>

              <span
className="
inline-flex
mt-2
px-3
lg:px-4
py-1.5
rounded-full
bg-[#FEE2E2]
text-[#EF4444]
text-[12px]
lg:text-[13px]
font-semibold
">
                {projectStatus}
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}