import {
  AlertTriangle,
  ArrowRight,
  Building2,
  Calendar,
  CalendarDays,
  Clock3,
  Flag,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getProjectMetrics } from "../utils/projectMetrics";

export default function ProgressCard({ projects = [] }) {
  const navigate = useNavigate();

  const handleProjectSelect = (project) => {
    sessionStorage.setItem("selectedProjectId", project.id);
    sessionStorage.setItem("selectedProjectName", project.projectName);

    navigate("/project-details");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "On Track":
        return "text-green-600";

      case "At Risk":
        return "text-yellow-600";

      case "Delayed":
        return "text-red-600";

      default:
        return "text-slate-600";
    }
  };

  if (!projects.length) {
    return (
      <div
        className="
        bg-white
        rounded-2xl
        border
        border-[#CDD7E3]
        p-10
        text-center
        text-slate-500
      "
      >
        No Projects Found
      </div>
    );
  }

  return (
    <div className="mt-[-10px]">
      {/* <div className="flex items-center justify-between mb-6">
        <h2
          className="
          text-xl
          xl:text-2xl
          font-bold
          text-[#0B1F59]
        "
        >
          Projects
        </h2>

        <span
          className="
          text-sm
          text-slate-600
        "
        >
          {projects.length} Project
          {projects.length > 1 ? "s" : ""}
        </span>
      </div> */}
<div className="flex items-center justify-between mb-6">

  <h2 className="text-xl xl:text-2xl font-bold text-[#0B1F59]">
    Projects
  </h2>

  {/* ACTIVE PROJECT CHIP (LIKE IMAGE) */}
  <div className="
    bg-[#F0F4FF]
    border border-[#DDE6FF]
    text-[#2563EB]
    px-4 py-2
    rounded-xl
    text-sm
    font-semibold
    shadow-sm
  ">
   {projects.length} Project
          {projects.length > 1 ? "s" : ""}
  </div>

</div>
      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        2xl:grid-cols-3
        gap-6
        mt-[-10px]
      "
      >
        {projects.map((project) => {
          const metrics = getProjectMetrics(project);

          const progressColor =
            metrics.status === "Delayed"
              ? "#EF4444"
              : metrics.status === "At Risk"
                ? "#F59E0B"
                : "#22C55E";

          return (
            <div
              key={project.id}
              className="
              group
              bg-white
              rounded-2xl
              border
              border-[#CDD7E3]
              shadow-sm
              duration-300
              p-5
              min-h-[390px]
              flex
              flex-col
            "
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex gap-3 min-w-0">
                  <div
                    className="
                    h-12
                    w-12
                    rounded-2xl
                    bg-blue-50
                    flex
                    items-center
                    justify-center
                    shrink-0
                  "
                  >
                    <Building2 size={22} className="text-[#2563EB]" />
                  </div>

                  <div className="min-w-0">
                    <h3
                      className="
                      text-lg
                      2xl:text-xl
                      font-bold
                      text-slate-800
                      truncate
                    "
                    >
                      {project.projectName}
                    </h3>

                    <p
                      className="
                      text-sm
                      2xl:base
                      text-slate-600
                      truncate
                    "
                    >
                      {project.bankName}
                    </p>
                  </div>
                </div>

                <span
                  className={`
                  px-3
                  py-1
                  rounded-full
                  text-xs
                  2xl-text-sm
                  font-semibold
                  shrink-0
                  ${
                    metrics.status === "On Track"
                      ? "bg-green-100 text-green-700"
                      : metrics.status === "At Risk"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                  }
                `}
                >
                  {metrics.status}
                </span>
              </div>

              {/* Progress Section */}
              <div className="mt-6 flex items-center gap-5">
                <div className="relative h-24 w-24 shrink-0 ">
                  <svg className="h-24 w-24 -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      stroke="#E5E7EB"
                      strokeWidth="8"
                      fill="none"
                    />

                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      stroke={progressColor}
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray="264"
                      strokeDashoffset={
                        264 - (264 * metrics.overallProgress) / 100
                      }
                    />
                  </svg>

                  <div
                    className="
                    absolute
                    inset-0
                    flex
                    flex-col
                    items-center
                    justify-center
                  "
                  >
                    <span
                      className="
                      text-2xl
                      2xl:text-3xl
                      font-bold
                      text-slate-800
                    "
                    >
                      {metrics.overallProgress}%
                    </span>

                    <span
                      className="
                      text-[12px]
                      text-slate-600
                      font-semibold
                    "
                    >
                      Progress
                    </span>
                  </div>
                </div>

                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-green-600" />

                    <span className="text-sm text-slate-600 font-medium 2xl:text-base">
                      Start Date
                    </span>

                    <span className="ml-auto font-semibold text-slate-700">
                      {metrics.projectStartDate
                        ? new Date(metrics.projectStartDate)
                            .toLocaleDateString("en-GB")
                            .replace(/\//g, "-")
                        : "-"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarDays size={16} className="text-blue-600" />

                    <span className="text-sm text-slate-600 font-medium 2xl:text-base">
                      Go Live
                    </span>

                    <span className="ml-auto font-semibold text-slate-700">
                      {metrics.goLiveDate
                        ? new Date(metrics.goLiveDate)
                            .toLocaleDateString("en-GB")
                            .replace(/\//g, "-")
                        : "-"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock3 size={16} className="text-indigo-600" />

                    <span className="text-sm text-slate-600 font-medium 2xl:text-base">
                      Days Left
                    </span>

                    <span className="ml-auto font-semibold text-indigo-600">
                      {metrics.daysRemaining}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <AlertTriangle size={16} className="text-orange-500" />

                    <span className="text-sm text-slate-600 font-medium 2xl:text-base">
                      Delay
                    </span>

                    <span
                      className={`
                      ml-auto
                      font-semibold
                      ${
                        metrics.delayWeeks > 3
                          ? "text-red-600"
                          : metrics.delayWeeks > 1
                            ? "text-yellow-600"
                            : "text-green-600"
                      }
                    `}
                    >
                      {metrics.delayWeeks} weeks
                    </span>
                  </div>
                </div>
              </div>

              {/* Phase / Milestone */}
              <div
                className="
                mt-5
                rounded-2xl
                bg-slate-50
                p-4
              "
              >
                <div className="flex items-center gap-2">
                  <Flag size={16} className="text-blue-600" />

                  <span
                    className="
                    text-xs
                    2xl:text-sm
                    uppercase
                    tracking-wide
                    text-slate-600
                    font-medium
                  "
                  >
                    Current Phase
                  </span>
                </div>

                <p
                  className="
                  mt-2
                  font-semibold
                  text-slate-700
                  truncate
                "
                >
                  {metrics.currentPhase}
                </p>

                <p
                  className="
                  mt-1
                  text-sm
                  2xl:text-base
                  text-slate-600
                  truncate
                  font-medium
                "
                  title={metrics.currentMilestone}
                >
                  {metrics.currentMilestone}
                </p>
              </div>

              {/* Bottom Stats */}
              <div
                className="
                mt-4
                grid
                grid-cols-2
                gap-3
              "
              >
                <div
                  className="
                  rounded-xl
                  bg-blue-50
                  p-3
                  text-center
                "
                >
                  <p className="text-sm text-slate-600 font-medium 2xl:text-base">
                    Readiness
                  </p>

                  <p
                    className="
                    text-lg
                    font-bold
                    text-blue-600
                    2x:text-xl
                  "
                  >
                    {metrics.readiness}%
                  </p>
                </div>

                <div
                  className="
                  rounded-xl
                  bg-green-50
                  p-3
                  text-center
                "
                >
                  <p className="text-sm text-slate-600 font-medium 2xl:text-base">
                    Health
                  </p>

                  <p
                    className={`
                    text-sm
                    font-bold
                    2x:text-xl
                    ${getStatusColor(metrics.status)}
                    `}
                  >
                    {metrics.status}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-auto pt-5">
                <button
                  onClick={() => handleProjectSelect(project)}
                  className="
                  w-full
                  bg-[#2563EB]
                  hover:bg-[#1D4ED8]
                  text-white
                  py-3
                  rounded-2xl
                  font-medium
                  flex
                  items-center
                  justify-center
                  gap-2
                  transition-all
                  cursor-pointer
                "
                >
                  View Project Details
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
