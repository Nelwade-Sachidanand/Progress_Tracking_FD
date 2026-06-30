import { Building2, Flag } from "lucide-react";


export default function ActivityStatusOverview({
  project,
}) {
  const activities =
    project?.phases?.flatMap((phase) =>
      phase.milestones?.flatMap((milestone) =>
        milestone.tasks?.flatMap((task) =>
          task.subTasks?.flatMap((subTask) =>
            subTask.activities?.map(
              (activity) => ({
                ...activity,
                phaseName:
                  phase.phaseName,
                milestoneName:
                  milestone.milestoneName,
                taskName:
                  task.taskName,
                subTaskName:
                  subTask.subTaskName,
              })
            ) || []
          ) || []
        ) || []
      ) || []
    ) || [];
    
const today = new Date();

const upcomingActivities =
  activities.filter((activity) => {
    if (!activity.plannedStartDate) return false;

    return (
      new Date(activity.plannedStartDate) > today
    );
  });
  const delayedActivities =
    activities.filter(
      (activity) =>
        activity.scheduleHealth ===
          "Delayed" ||
        activity.executionStatus ===
          "Delayed"
    );

  return (
    <div className="bg-white rounded-2xl border border-[#E5EAF2] p-5">

      {/* Header */}
      <div className="flex items-center gap-3 mb-5">

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
          4
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
          Activity Status Overview
        </h2>

      </div>

      <div
  className="
  grid
  grid-cols-1
  lg:grid-cols-2
  gap-4
  "
>

        {/* Upcoming Activities */}

        <div
 className="
bg-white
border
border-[#E9EEF5]
rounded-xl
overflow-hidden
min-h-[350px]
lg:h-[420px]
flex
flex-col
"
>

        
          <div
  className="
  flex
  items-center
  justify-between
  px-4
  py-3
  bg-[#EFF6FF]
  border-b
  border-[#DBEAFE]
  "
>
  <div className="flex items-center gap-3">

    <Building2
      size={15}
      className="text-[#2563EB]"
    />

    <span className="text-[14px] font-semibold text-[#2563EB]">
      Upcoming Activities ({upcomingActivities.length})
    </span>

  </div>
</div>

          <div
  className="
  flex-1
  overflow-y-auto
  "
>
  {upcomingActivities.map(
    (activity, index) => (
      <div
        key={index}
        className="
        flex
        items-center
        justify-between
        px-4
        py-3
        border-b
        border-[#F1F5F9]
        "
        cursor-pointer
      >
        <div>
        <p
  className="
  text-[12px]
  lg:text-[13px]
  text-[#334155]
  font-medium
  break-words
  "
>
            {activity.activityName}
          </p>

         <p
  className="
  text-[10px]
  lg:text-[11px]
  text-[#94A3B8]
  break-words
  "
>
            {activity.milestoneName}
          </p>
        </div>

        <span
          className="
          px-2
          py-0.5
          rounded-full
          bg-[#DBEAFE]
          text-[#2563EB]
          text-[10px]
          font-semibold
          "
        >
          Upcoming
        </span>
      </div>
    )
  )}

  {upcomingActivities.length ===
    0 && (
    <div className="flex items-center justify-center h-full text-sm text-slate-500">
      No upcoming activities
    </div>
  )}
</div>

         

        </div>

        {/* Delayed Activities */}

        <div
  className="
  bg-white
  border
  border-[#E9EEF5]
  rounded-xl
  overflow-hidden
  h-[420px]
  flex
  flex-col
  "
>

          <div
            className="
            flex
            items-center
            justify-between
            px-4
            py-3
            bg-[#FFF5F5]
            border-b
            border-[#FEE2E2]
            "
          >

            <div className="flex items-center gap-3">

              <Flag
                size={15}
                className="text-[#EF4444]"
              />

              <span className="text-[14px] font-semibold text-[#EF4444]">
                Delayed Activities (
                {delayedActivities.length}
                )
              </span>

            </div>

          </div>

          <div
  className="
  flex-1
  overflow-y-auto
  "
>
  {delayedActivities.map(
    (activity, index) => (
      <div
        key={index}
        className="
        flex
        items-center
        justify-between
        px-4
        py-3
        border-b
        border-[#F1F5F9]
        "
      >
        <div>
          <p className="text-[13px] text-[#334155] font-medium">
            {activity.activityName}
          </p>

          <p className="text-[11px] text-[#94A3B8]">
            {activity.milestoneName}
          </p>
        </div>

        <span
          className="
          px-2
          py-0.5
          rounded-full
          bg-[#FEE2E2]
          text-[#EF4444]
          text-[10px]
          font-semibold
          "
        >
          Delayed
        </span>
      </div>
    )
  )}

  {delayedActivities.length ===
    0 && (
    <div className="flex items-center justify-center h-full text-sm text-slate-500">
      No delayed activities
    </div>
  )}
</div>


        </div>

      </div>

    </div>
  );
}