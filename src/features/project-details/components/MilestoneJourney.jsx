import {
  Bug,
  ClipboardCheck,
  Database,
  FileText,
  Flag,
  GraduationCap,
  Laptop,
  Pencil,
  Rocket,
  Server,
} from "lucide-react";

export default function MilestoneJourney({ project }) {
  const icons = [
    Flag,
    FileText,
    Pencil,
    Laptop,
    Bug,
    GraduationCap,
    Database,
    Server,
    ClipboardCheck,
    Rocket,
  ];

  const milestones = project?.phases?.flatMap(
    (phase) =>
      phase.milestones?.map((milestone, index) => {
        const activities =
          milestone.tasks?.flatMap(
            (task) =>
              task.subTasks?.flatMap((subTask) => subTask.activities || []) ||
              [],
          ) || [];
        const totalActivities = activities.length;

        const completedActivities = activities.filter(
          (activity) => activity.executionStatus === "Completed",
        ).length;

        const inProgressActivities = activities.filter(
          (activity) => activity.executionStatus === "In Progress",
        ).length;

        const avgProgress =
          totalActivities > 0
            ? Math.round((completedActivities / totalActivities) * 100)
            : 0;

        let status = "Not Started";

        if (completedActivities === totalActivities && totalActivities > 0) {
          status = "Completed";
        } else if (completedActivities > 0 || inProgressActivities > 0) {
          status = "In Progress";
        }
        // const totalActivities =
        //   activities.length;

        // const totalProgress =
        //   activities.reduce(
        //     (sum, activity) =>
        //       sum +
        //       (activity.progress ||
        //         0),
        //     0
        //   );

        // const avgProgress =
        //   totalActivities > 0
        //     ? Math.round(
        //         totalProgress /
        //           totalActivities
        //       )
        //     : 0;

        // const completed =
        //   activities.every(
        //     (activity) =>
        //       activity.executionStatus ===
        //       "Completed"
        //   );

        // const inProgress =
        //   activities.some(
        //     (activity) =>
        //       activity.executionStatus ===
        //       "In Progress"
        //   );

        // const status = completed
        //   ? "Completed"
        //   : inProgress
        //   ? "In Progress"
        //   : "Not Started";

        return {
          name: milestone.milestoneName,
          percentage: `${avgProgress}%`,
          progress: avgProgress,
          status,
          active: status === "In Progress",
          icon: icons[index % icons.length],
        };
      }) || [],
  );

  return (
    <div
      className="
  bg-white
  rounded-2xl
  border
  border-[#E5EAF2]
  p-3
  sm:p-4
  lg:p-5
  mt-4
  "
    >
      <div className="flex items-center gap-3 mb-8">
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
          3
        </div>

        <h2
          className="
  text-[15px]
  sm:text-[16px]
  lg:text-[18px]
  xl:text-[20px]
  font-bold
  text-[#0B1F59]
  "
        >
          Milestone Journey
        </h2>
      </div>

      <div className="relative overflow-hidden">
        <div
          className="
  overflow-x-auto
  pb-3
  scrollbar-thin
  "
        >
          <div
            className="
      absolute
     top-[22px]
left-[80px]
      border-t-2
      border-dashed
      border-[#D6DCE8]
      "
            cursor-pointer
            style={{
              width: `${milestones.length * 160}px`,
            }}
          />

          <div
            className="
      relative
      z-10
      grid
      gap-3
      min-w-max
      "
            cursor-pointer
            style={{
              gridTemplateColumns: `repeat(${Math.max(
                milestones.length,
                1,
              )}, minmax(140px, 140px))`,
            }}
          >
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;

              return (
                <div
                  key={index}
                  className="
flex
flex-col
items-center
text-center
px-2
"
                >
                  <div
                    className={`
                    w-11
                    h-11
                    rounded-full
                    flex
                    items-center
                    justify-center
                    bg-white
                    border-2
                    ${
                      milestone.active ? "border-[#2563EB]" : "border-[#E5EAF2]"
                    }
                  `}
                  >
                    <Icon
                      size={18}
                      className={
                        milestone.active ? "text-[#2563EB]" : "text-[#64748B]"
                      }
                    />
                  </div>

                  <p
                    className="
mt-4
text-[10px]
sm:text-[11px]
lg:text-[12px]
font-semibold
text-[#0B1F59]
leading-4
h-[48px]
overflow-hidden
break-words
"
                    cursor-pointer
                    title={milestone.name}
                  >
                    {milestone.name}
                  </p>

                  <p
                    className={`
                    mt-3
                  text-[13px]
                  lg:text-[14px]
                    font-bold
                    ${milestone.active ? "text-[#2563EB]" : "text-[#0B1F59]"}
                  `}
                  >
                    {milestone.percentage}
                  </p>

                  <p
                    className={`
text-[9px]
lg:text-[10px]
                    mt-1
                    ${milestone.active ? "text-[#2563EB]" : "text-[#94A3B8]"}
                  `}
                  >
                    {milestone.status}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
