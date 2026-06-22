import {
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
} from "lucide-react";

export default function MilestoneJourney({
  project,
}) {
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

  const milestones =
    project?.phases?.flatMap((phase) =>
      phase.milestones?.map(
        (milestone, index) => {
          const activities =
            milestone.tasks?.flatMap(
              (task) =>
                task.subTasks?.flatMap(
                  (subTask) =>
                    subTask.activities ||
                    []
                ) || []
            ) || [];

          const totalActivities =
            activities.length;

          const totalProgress =
            activities.reduce(
              (sum, activity) =>
                sum +
                (activity.progress ||
                  0),
              0
            );

          const avgProgress =
            totalActivities > 0
              ? Math.round(
                  totalProgress /
                    totalActivities
                )
              : 0;

          const completed =
            activities.every(
              (activity) =>
                activity.executionStatus ===
                "Completed"
            );

          const inProgress =
            activities.some(
              (activity) =>
                activity.executionStatus ===
                "In Progress"
            );

          const status = completed
            ? "Completed"
            : inProgress
            ? "In Progress"
            : "Not Started";

          return {
            name:
              milestone.milestoneName,
            percentage: `${avgProgress}%`,
            progress:
              avgProgress,
            status,
            active:
              status ===
              "In Progress",
            icon:
              icons[
                index %
                  icons.length
              ],
          };
        }
      ) || []
    );

  return (
    <div className="bg-white rounded-2xl border border-[#E5EAF2] p-4 mt-4">

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

        <h2 className="text-[16px] font-bold text-[#0B1F59]">
          Milestone Journey
        </h2>
      </div>

      <div className="relative">

       <div className="overflow-x-auto pb-2">
<div
      className="
      absolute
      top-5
      left-16
      border-t-2
      border-dashed
      border-[#D6DCE8]
      "
      style={{
        width: `${milestones.length * 140}px`,
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
      style={{
        gridTemplateColumns: `repeat(${Math.max(
          milestones.length,
          1
        )}, 140px)`,
      }}
    >
          {milestones.map(
            (
              milestone,
              index
            ) => {
              const Icon =
                milestone.icon;

              return (
                <div
                  key={index}
                  className="flex flex-col items-center text-center"
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
                      milestone.active
                        ? "border-[#2563EB]"
                        : "border-[#E5EAF2]"
                    }
                  `}
                  >
                    <Icon
                      size={18}
                      className={
                        milestone.active
                          ? "text-[#2563EB]"
                          : "text-[#64748B]"
                      }
                    />
                  </div>

      <p
  className="
  mt-4
  text-[11px]
  font-semibold
  text-[#0B1F59]
  h-[42px]
  overflow-hidden
  text-ellipsis
  "
  title={milestone.name}
>
  {milestone.name}
</p>

                  <p
                    className={`
                    mt-3
                    text-[14px]
                    font-bold
                    ${
                      milestone.active
                        ? "text-[#2563EB]"
                        : "text-[#0B1F59]"
                    }
                  `}
                  >
                    {
                      milestone.percentage
                    }
                  </p>

                  <p
                    className={`
                    text-[10px]
                    mt-1
                    ${
                      milestone.active
                        ? "text-[#2563EB]"
                        : "text-[#94A3B8]"
                    }
                  `}
                  >
                    {
                      milestone.status
                    }
                  </p>

                </div>
              );
            }
          )}

        </div>
</div>


      </div>

    </div>
  );
}