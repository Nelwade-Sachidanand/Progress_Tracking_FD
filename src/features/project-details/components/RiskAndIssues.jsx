import {
  AlertTriangle,
  CircleAlert,
  Link2,
  Flag,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
export default function RiskAndIssues({
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
                    activity => ({
                      ...activity,

                      phaseId: phase.phaseId,
                      phaseName: phase.phaseName,

                      milestoneId: milestone.milestoneId,
                      milestoneName: milestone.milestoneName,

                      taskId: task.taskId,
                      taskName: task.taskName,

                      subTaskId: subTask.subTaskId,
                      subTaskName: subTask.subTaskName,

                      activityId: activity.activityId,
                    })
                  ) || []
              ) || []
          ) || []
      ) || []
    ) || [];
  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [modalTitle, setModalTitle] =
    useState("");

  const [modalData, setModalData] =
    useState([]);

  const today = new Date();


  const user = JSON.parse(sessionStorage.getItem("user"));
  const role = user?.role;



  const startOfWeek = new Date(today);
  startOfWeek.setHours(0, 0, 0, 0);

  const day = startOfWeek.getDay();
  const diff = day === 0 ? -6 : 1 - day; // Monday

  startOfWeek.setDate(startOfWeek.getDate() + diff);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  const currentWeekActivities = activities.filter((activity) => {
    if (
      activity.executionStatus === "Completed" ||
      !activity.plannedStartDate ||
      !activity.plannedEndDate
    ) {
      return false;
    }

    const start = new Date(activity.plannedStartDate);
    const end = new Date(activity.plannedEndDate);

    return (
      start <= endOfWeek &&
      end >= startOfWeek
    );
  });

  const getDelayDays = (plannedEndDate) => {
    if (!plannedEndDate) return 0;

    const endDate = new Date(plannedEndDate);

    return Math.max(
      0,
      Math.floor(
        (today - endDate) /
        (1000 * 60 * 60 * 24)
      )
    );
  };

  const getRiskDetails = (activity) => {
    const start = new Date(activity.plannedStartDate);
    const end = new Date(activity.plannedEndDate);

    const progress = Number(activity.progress || 0);

    // Completed
    if (activity.executionStatus === "Completed") {
      return {
        level: "Low",
        color: "bg-green-100 text-green-700",
        reason: "Completed"
      };
    }

    // Planned End Date Crossed
    if (
      today > end &&
      activity.executionStatus !== "Completed"
    ) {
      return {
        level: "Critical",
        color: "bg-red-100 text-red-700",
        reason: "Planned end date crossed"
      };
    }

    // Current week but not started yet
    if (
      today >= start &&
      today <= end &&
      activity.executionStatus === "Not Started"
    ) {
      return {
        level: "Low",
        color: "bg-blue-100 text-blue-700",
        reason: "Planned for current week"
      };
    }

    // High
    if (
      activity.executionStatus === "In Progress" &&
      progress < 50
    ) {
      return {
        level: "High",
        color: "bg-orange-100 text-orange-700",
        reason: "Progress below 50%"
      };
    }

    // Medium
    if (
      activity.executionStatus === "In Progress" &&
      progress >= 50 &&
      progress < 80
    ) {
      return {
        level: "Medium",
        color: "bg-yellow-100 text-yellow-700",
        reason: "Progress between 50% and 79%"
      };
    }

    // Low
    return {
      level: "Low",
      color: "bg-green-100 text-green-700",
      reason: "On Track"
    };
  };

  const riskActivities = currentWeekActivities.filter(
    (activity) => getRiskDetails(activity) !== null
  );
  const escalationActivities = activities.filter((activity) => {
    // Ignore completed activities
    if (activity.executionStatus === "Completed") {
      return false;
    }

    // Planned start date is mandatory
    if (!activity.plannedStartDate) {
      return false;
    }

    const plannedStart = new Date(activity.plannedStartDate);

    // Previous week activities only
    const previousWeekActivity = plannedStart < startOfWeek;

    // Only not started activities
    const notStarted =
      activity.executionStatus === "Not Started" ||
      !activity.executionStatus;

    // Progress should be 0
    const zeroProgress = Number(activity.progress || 0) === 0;

    return (
      previousWeekActivity &&
      notStarted &&
      zeroProgress
    );
  });
  const getEscalationDetails = (activity) => {
    const start = new Date(activity.plannedStartDate);

    const pendingDays = Math.max(
      0,
      Math.floor(
        (today - start) / (1000 * 60 * 60 * 24)
      )
    );

    return {
      level: "High",
      color: "bg-orange-100 text-orange-700",
      reason: `Pending from previous week (${pendingDays} days)`,
    };
  };
  const dependencyActivities = [];

  for (let i = 1; i < activities.length; i++) {
    const previous = activities[i - 1];
    const current = activities[i];

    // Ignore completed current activity
    if (current.executionStatus === "Completed") {
      continue;
    }

    // Planned start date is mandatory
    if (!current.plannedStartDate) {
      continue;
    }

    const plannedStart = new Date(current.plannedStartDate);

    // Ignore future activities
    if (plannedStart > today) {
      continue;
    }

    // Current activity should not have started
    const notStarted =
      current.executionStatus === "Not Started" ||
      !current.executionStatus;

    if (!notStarted) {
      continue;
    }

    // Previous activity must not be completed
    if (previous.executionStatus === "Completed") {
      continue;
    }

    // Same workflow hierarchy
    if (
      previous.phaseId === current.phaseId &&
      previous.milestoneId === current.milestoneId &&
      previous.taskId === current.taskId &&
      previous.subTaskId === current.subTaskId
    ) {
      dependencyActivities.push({
        ...current,
        blockedBy: previous.activityName,
      });
    }
  }
  const getDependencyDetails = (activity) => {
    const pendingDays = Math.max(
      0,
      Math.floor(
        (today - new Date(activity.plannedStartDate)) /
        (1000 * 60 * 60 * 24)
      )
    );

    return {
      status: "Blocked",
      color: "bg-red-100 text-red-700",
      action: `Complete "${activity.blockedBy}"`,
      reason: `Pending for ${pendingDays} day(s)`
    };
  };

  const openRiskActivities = activities.filter((activity) => {
    if (activity.executionStatus === "Completed") {
      return false;
    }

    const plannedEndDate = activity.plannedEndDate
      ? new Date(activity.plannedEndDate)
      : null;

    return (
      activity.scheduleHealth === "Delayed" ||
      (plannedEndDate && plannedEndDate < today)
    );
  });

  const getOpenRiskDetails = (activity) => {
    const delay = getDelayDays(activity.plannedEndDate);

    if (activity.executionStatus === "Completed") {
      return {
        status: "Closed",
        color: "bg-green-100 text-green-700",
        risk: "Completed",
        action: "-"
      };
    }

    if (delay >= 14) {
      return {
        status: "Open",
        color: "bg-red-100 text-red-700",
        risk: "Delayed",
        action: "Review recovery plan"
      };
    }

    if (delay > 0) {
      return {
        status: "Open",
        color: "bg-orange-100 text-orange-700",
        risk: "End date crossed",
        action: "Follow up with owner"
      };
    }

    return {
      status: "Under Monitoring",
      color: "bg-blue-100 text-blue-700",
      risk: "On schedule",
      action: "Continue monitoring"
    };
  };

  const cards = [
    {
      value: riskActivities.length,
      title: "Critical Risks",
      subtitle: "",
      activities: riskActivities,
      icon: AlertTriangle,
      iconBg: "#EF4444",
      textColor: "#DC2626",
      bg: "#FFF8F8",
      border: "#FEE2E2",
      linkColor: "#DC2626",
    },

    ...(role === "ADMIN"
      ? [
        {
          value: escalationActivities.length,
          title: "Escalations",
          subtitle: "",
          activities: escalationActivities,
          icon: CircleAlert,
          iconBg: "#F59E0B",
          textColor: "#B45309",
          bg: "#FFFDF7",
          border: "#FDE7C3",
          linkColor: "#B45309",
        },
      ]
      : []),

    {
      value: dependencyActivities.length,
      title: "Dependencies",
      subtitle: "",
      activities: dependencyActivities,
      icon: Link2,
      iconBg: "#2563EB",
      textColor: "#2563EB",
      bg: "#F8FAFF",
      border: "#E3EBFF",
      linkColor: "#2563EB",
    },


  ];
  return (
    <div className="bg-white rounded-2xl border border-[#E5EAF2] p-5">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className="
          w-7 h-7
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
          5
        </div>

        <h2
          className="
  text-base sm:text-lg lg:text-xl font-bold text-[#0B1F59]
  "
        >
          Risks & Issues
        </h2>
      </div>

      {/* Cards */}
      <div
        className={`
    grid
    grid-cols-1
    md:grid-cols-2
    gap-4
    ${cards.length === 3
            ? "xl:grid-cols-3"
            : "xl:grid-cols-2"
          }
  `}
      >
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="
    rounded-xl
    border
    bg-white
    px-5
    py-4
    flex
    items-center
    justify-between
    transition-all
    hover:shadow-md
    min-h-[100px]
  "
              style={{
                backgroundColor: card.bg,
                borderColor: card.border,
              }}
            >
              {/* Left Section */}
              <div className="flex items-center gap-4 flex-1">
                {/* Icon */}
                <div
                  className="
        w-11
        h-11
        rounded-full
        flex
        items-center
        justify-center
        shrink-0
      "
                  style={{
                    backgroundColor: card.iconBg,
                  }}
                >
                  <Icon size={15} color="white" />
                </div>

                {/* Content */}
                <div className="min-w-0">
                  <div
                    className="text-[25px] font-bold leading-none"
                    style={{
                      color: card.textColor,
                    }}
                  >
                    {card.value}
                  </div>

                  <h3 className="mt-1 text-base font-bold text-[#0B1F59]">
                    {card.title}
                  </h3>

                  <p className="mt-1 text-sm text-[#64748B]">
                    {card.subtitle}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="mx-6 h-14 w-px bg-[#E5EAF2]" />

              {/* Right Section */}
              <button
                onClick={() => {
                  setModalTitle(card.title);
                  setModalData(card.activities);
                  setIsModalOpen(true);
                }}
                className="
      flex
      items-center
      gap-2
      text-sm
      font-semibold
      whitespace-nowrap
      transition
      hover:opacity-80
    "
                style={{
                  color: card.linkColor,
                }}
              >
                View Details
                <ArrowRight size={15} />
              </button>
            </div>
          );
        })}
      </div>
      {isModalOpen && (
        <div
          className="
fixed
inset-0
z-[9999]
bg-black/50
backdrop-blur-sm
flex
items-center
justify-center
p-3
sm:p-5
"
        >

          <div
            className="
bg-white
rounded-2xl
shadow-2xl
w-full
max-w-[98%]
sm:max-w-4xl
xl:max-w-6xl
max-h-[90vh]
overflow-hidden
"
          >

            <div
              className="
px-6
py-4
bg-[#F8FAFC]
border-b
border-slate-200
flex
justify-between
items-center
"
            >
              <h2 className="text-xl font-bold text-[#0F172A]">
                {modalTitle}
              </h2>

              <button
                onClick={() =>
                  setIsModalOpen(false)
                }
                className="
w-9
h-9
rounded-lg
hover:bg-slate-100
text-slate-500
hover:text-slate-800
transition
cursor-pointer

"
              >
                ×
              </button>

            </div>

            <div
              className="
overflow-auto
max-h-[72vh]
"
            >
              <table
                className="
min-w-[850px]
w-full
"
              >

                <thead
                  className="
bg-[#F8FAFC]
sticky
top-0
z-10
"
                >

                  <tr>

                    <th
                      className="
px-4
py-3
text-left
text-sm
font-semibold
text-[#334155]
border-b
border-slate-200
"
                    >
                      Activity
                    </th>


                    <th
                      className="
px-4
py-3
text-left
text-sm
font-semibold
text-[#334155]
border-b
border-slate-200
"
                    >
                      Milestone
                    </th>


                    <th
                      className="
px-4
py-3
text-left
text-sm
font-semibold
text-[#334155]
border-b
border-slate-200
"
                    >
                      Progress
                    </th>


                    <th
                      className="
px-4
py-3
text-left
text-sm
font-semibold
text-[#334155]
border-b
border-slate-200
"
                    >
                      Status
                    </th>


                    <th
                      className="
px-4
py-3
text-left
text-sm
font-semibold
text-[#334155]
border-b
border-slate-200
"
                    >
                      Planned End
                    </th>
                    {modalTitle === "Critical Risks" && (
                      <>
                        <th
                          className="
      px-4
      py-3
      text-left
      text-sm
      font-semibold
      text-[#334155]
      border-b
      border-slate-200
      "
                        >
                          Risk Level
                        </th>

                        <th
                          className="
      px-4
      py-3
      text-left
      text-sm
      font-semibold
      text-[#334155]
      border-b
      border-slate-200
      "
                        >
                          Reason
                        </th>
                      </>
                    )}
                    {modalTitle === "Escalations" && (
                      <>
                        <th className="
      px-4
      py-3
      text-left
      text-sm
      font-semibold
      text-[#334155]
      border-b
      border-slate-200
      ">
                          Risk Level
                        </th>

                        <th className="
      px-4
      py-3
      text-left
      text-sm
      font-semibold
      text-[#334155]
      border-b
      border-slate-200
      ">
                          Reason
                        </th>
                      </>
                    )}
                    {modalTitle === "Dependencies" && (
                      <>
                        <th
                          className="
      px-4
      py-3
      text-left
      text-sm
      font-semibold
      text-[#334155]
      border-b
      border-slate-200
      "
                        >
                          Blocked By
                        </th>

                        <th
                          className="
      px-4
      py-3
      text-left
      text-sm
      font-semibold
      text-[#334155]
      border-b
      border-slate-200
      "
                        >
                          Dependency Status
                        </th>


                      </>
                    )}


                  </tr>

                </thead>

                {/* <tbody> */}

                {/* {modalData.map(
              (

                activity,
                index
              ) => (
                <tr
                  key={index}
                 className="border-b border-slate-100 hover:bg-[#FAFAFA] transition"
                > */}

                <tbody>
                  {modalData.map((activity, index) => {

                    const risk = getRiskDetails(activity);
                    const escalation = getEscalationDetails(activity);
                    const dependency = getDependencyDetails(activity);
                    const openRisk = getOpenRiskDetails(activity);
                    return (
                      <tr
                        key={index}
                        className="border-b border-slate-100 hover:bg-[#FAFAFA] transition"
                      >

                        <td className="px-4 py-3 text-sm text-[#475569]">
                          {
                            activity.activityName
                          }
                        </td>

                        <td className="px-4 py-3 text-sm text-[#475569]">
                          {
                            activity.milestoneName
                          }
                        </td>

                        <td className="px-4 py-3 text-sm text-[#475569]">
                          <span className="font-semibold text-[#2563EB]">
                            {activity.progress}%
                          </span>

                        </td>
                        <td className="px-4 py-3 text-sm text-[#475569]">

                          <span
                            className={`

inline-flex
items-center
justify-center
rounded-full
px-3
py-1
text-xs
font-semibold

${activity.executionStatus === "Completed"
                                ? "bg-green-100 text-green-700"
                                : activity.executionStatus === "Delayed"
                                  ? "bg-red-100 text-red-700"
                                  : activity.executionStatus === "In Progress"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-slate-100 text-slate-600"
                              }
`}
                          >

                            {activity.executionStatus}

                          </span>

                        </td>
                        {/* <td className="p-3">
                    {
                      activity.executionStatus
                    }
                  </td> */}

                        <td className="p-3">
                          {activity.plannedEndDate
                            ? new Date(activity.plannedEndDate).toLocaleDateString("en-GB").replace(/\//g, "-")
                            : "-"}
                        </td>

                        {modalTitle === "Critical Risks" && (
                          <>
                            <td className="px-4 py-3">
                              <span
                                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${risk.color}`}
                              >
                                {risk.level}
                              </span>
                            </td>

                            <td className="px-4 py-3 text-sm text-[#475569]">
                              {risk.reason}
                            </td>
                          </>
                        )}
                        {modalTitle === "Escalations" && (
                          <>
                            <td>
                              <span
                                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${escalation.color}`}
                              >
                                {escalation.level}
                              </span>
                            </td>

                            <td>
                              {escalation.reason}
                            </td>
                          </>
                        )}
                        {modalTitle === "Dependencies" && (
                          <>
                            <td className="px-4 py-3 text-sm text-[#475569]">
                              {activity.blockedBy || "-"}
                            </td>

                            <td className="px-4 py-3">
                              <span
                                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${dependency.color}`}
                              >
                                {dependency.status}
                              </span>
                            </td>


                          </>
                        )}



                        {/* </tr>
              )
            )} */}
                      </tr>
                    );
                  })}



                </tbody>

              </table>

            </div>

          </div>

        </div>
      )}
    </div>
  );
}