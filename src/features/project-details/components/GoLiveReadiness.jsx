// import {
//   Cloud,
//   Database,
//   GraduationCap,
//   ClipboardCheck,
//   ShieldCheck,
//   CalendarDays,
// } from "lucide-react";
import { CalendarDays } from "lucide-react";

export default function GoLiveReadiness({
  project,
}) {
  const activities =
    project?.phases?.flatMap((phase) =>
      phase.milestones?.flatMap(
        (milestone) =>
          milestone.tasks?.flatMap(
            (task) =>
              task.subTasks?.flatMap(
                (subTask) =>
                  subTask.activities?.map(
                    (activity) => ({
                      ...activity,
                      milestoneName:
                        milestone.milestoneName,
                    })
                  ) || []
              ) || []
          ) || []
      ) || []
    ) || [];

const today = new Date();

const activeActivities =
  activities.filter(
    (activity) =>
      activity.plannedStartDate &&
      new Date(
        activity.plannedStartDate
      ) <= today
  );

const totalActivities =
  activeActivities.length;

const completedActivities =
  activeActivities.filter(
    (activity) =>
      activity.executionStatus ===
      "Completed"
  ).length;

const inProgressActivities =
  activeActivities.filter(
    (activity) =>
      activity.executionStatus ===
      "In Progress"
  ).length;

const delayedActivities =
  activeActivities.filter(
    (activity) =>
      activity.scheduleHealth ===
      "Delayed"
  ).length;

const notStartedActivities =
  activeActivities.filter(
    (activity) =>
      activity.executionStatus ===
        "Not Started" ||
      !activity.executionStatus
  ).length;

const overallReadiness =
  totalActivities > 0
    ? Math.round(
        (completedActivities /
          totalActivities) *
          100
      )
    : 0;
 const pendingActivities =
  activeActivities.filter(
    (activity) =>
      activity.executionStatus !==
      "Completed"
  );
 const readinessStatus =
  pendingActivities.length ===
  0
    ? "🟢 Ready For Go-Live"
    : overallReadiness >= 70
    ? "🟡 On Track"
    : overallReadiness >= 50
    ? "🟠 Attention Required"
    : "🔴 Delayed";

  const getMilestoneProgress = (
    keyword
  ) => {
   const milestoneActivities =
  activeActivities.filter(
    (activity) =>
      activity.milestoneName
        ?.toLowerCase()
        .includes(
          keyword.toLowerCase()
        )
  );

    if (
      milestoneActivities.length === 0
    )
      return 0;

    return Math.round(
      milestoneActivities.reduce(
        (sum, activity) =>
          sum +
          (activity.progress ||
            0),
        0
      ) /
        milestoneActivities.length
    );
  };

 
 

const targetGoLive =
  pendingActivities.length > 0
    ? pendingActivities
        .map(
          (activity) =>
            activity.plannedEndDate
        )
        .filter(Boolean)
        .sort()
        .at(-1)
    : "Ready For Go-Live";

const milestoneData =
  project?.phases?.flatMap(
    (phase) =>
      phase.milestones?.map(
        (milestone) => {

          const milestoneActivities =
            milestone.tasks?.flatMap(
              (task) =>
                task.subTasks?.flatMap(
                  (subTask) =>
                    subTask.activities || []
                ) || []
            ) || [];

          const activeMilestoneActivities =
            milestoneActivities.filter(
              (activity) =>
                activity.plannedStartDate &&
                new Date(
                  activity.plannedStartDate
                ) <= today
            );

          const progress =
            activeMilestoneActivities.length > 0
              ? Math.round(
                  activeMilestoneActivities.reduce(
                    (sum, activity) =>
                      sum +
                      (activity.progress || 0),
                    0
                  ) /
                    activeMilestoneActivities.length
                )
              : 0;

          return {
            title:
              milestone.milestoneName,
            value: progress,
          };
        }
      ) || []
  ) || [];

  return (
   <div
  className="
  bg-white
  rounded-2xl
  border
  border-[#E5EAF2]
  p-4
  lg:p-5
  "
>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-full bg-[#2563EB] text-white flex items-center justify-center text-sm font-bold">
          6
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
          Go-Live Readiness
        </h2>
      </div>

     <div
  className="
  grid
  grid-cols-1
  xl:grid-cols-[240px_1fr_280px]
  gap-6
  "
>

        {/* Overall Readiness */}

        <div className="flex justify-center items-center">
        <div
  className="
  relative
  w-[160px]
  h-[160px]
  sm:w-[180px]
  sm:h-[180px]
  lg:w-[190px]
  lg:h-[190px]
  "
>
            <svg
              className="w-full h-full rotate-[-90deg]"
              viewBox="0 0 120 120"
            >
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="#E9EDF5"
                strokeWidth="10"
              />

              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke={
                  overallReadiness >=
                  80
                    ? "#16A34A"
                    : overallReadiness >=
                      50
                    ? "#F59E0B"
                    : "#EF4444"
                }
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${
                  2 *
                  Math.PI *
                  52
                }`}
                strokeDashoffset={`${
                  2 *
                  Math.PI *
                  52 *
                  (1 -
                    overallReadiness /
                      100)
                }`}
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
             <h3
  className="
  text-[27px]
  sm:text-[36px]
  lg:text-[40px]
  font-bold
  text-[#0B1F59]
  "
>
                {
                  overallReadiness
                }
                %
              </h3>

              <p className="text-center text-[10px] font-medium text-[#334155] mt-2">
                Overall
                <br />
                Readiness
              </p>

              <span className="mt-3 px-4 py-1 rounded-full bg-[#FEE2E2] text-[#EF4444] text-[8px]
sm:text-[8.5px] font-semibold">
                {
                  readinessStatus
                }
              </span>
            </div>
          </div>
        </div>

        {/* Progress Bars */}

       <div
  className="
  space-y-4
  max-h-[450px]
  lg:max-h-[500px]
  overflow-y-auto
  pr-2
  "
>
          {milestoneData.map((item) => {

  const barColor =
    item.value >= 80
      ? "#16A34A"
      : item.value >= 50
      ? "#F59E0B"
      : "#cc3c3c";

  return (
    <div key={item.title}>

      <div className="flex items-center gap-4 mb-2">

        <div
          className="
          w-10
          h-10
          rounded-full
          flex
          items-center
          justify-center
          text-white
          text-sm
          font-bold
          shrink-0
          "
          style={{
            backgroundColor: barColor,
          }}
        >
          M
        </div>

        <div className="flex-1">

          <p
            className="
text-[12px]
lg:text-[13px]
            font-semibold
            text-[#0B1F59]
            truncate
            "
            title={item.title}
          >
            {item.title}
          </p>

          <div className="flex items-center gap-4 mt-2">

            <div className="flex-1">
              <div className="h-[8px] rounded-full bg-[#EEF2F7] overflow-hidden">

                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${item.value}%`,
                    backgroundColor: barColor,
                  }}
                />

              </div>
            </div>

            <span className="text-[12px] font-bold text-[#0B1F59] min-w-[40px] text-right">
              {item.value}%
            </span>

          </div>

        </div>

      </div>

    </div>
  );
})}
        </div>

        {/* Summary */}

       <div
  className="
  space-y-4
  w-full
  "
>

          <div className="bg-[#F8FAFF] border border-[#E8EDF5] rounded-2xl overflow-hidden">
            <div className="px-5 py-4 bg-[#F4F7FD]">
              <h3 className="text-[15px] font-bold text-[#0B1F59]">
                Readiness Summary
              </h3>
            </div>

            <div className="p-5 space-y-4">

              <div className="flex justify-between">
                <span>
                  Completed
                </span>
                <span className="font-bold">
                  {
                    completedActivities
                  }
                </span>
              </div>

              <div className="flex justify-between">
                <span>
                  In Progress
                </span>
                <span className="font-bold">
                  {
                    inProgressActivities
                  }
                </span>
              </div>

              <div className="flex justify-between">
                <span>
                  Not Started
                </span>
                <span className="font-bold">
                  {
                    notStartedActivities
                  }
                </span>
              </div>

              <div className="border-t pt-4 flex justify-between">
                <span className="font-semibold">
                  Total Activities
                </span>

                <span className="font-bold">
                  {
                    totalActivities
                  }
                </span>
              </div>

            </div>
          </div>

          <div className="bg-[#F8FAFF] border border-[#E8EDF5] rounded-2xl p-5">
           <div
  className="
  flex
  flex-col
  sm:flex-row
  gap-3
  sm:gap-4
  "
>
              <CalendarDays
                size={26}
                className="text-[#4F46E5]"
              />

              <div>
                <p className="text-sm font-semibold text-[#334155]">
                  Target Go-Live
                </p>

                <h3 className="text-[18px] font-bold text-[#0B1F59] mt-1">
                  {
                    targetGoLive
                  }
                </h3>

                {/* <p className="text-[#2563EB] text-sm font-semibold mt-1">
                  {daysToGo} days
                  to go
                </p> */}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}