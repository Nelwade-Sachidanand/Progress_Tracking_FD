import {
  AlertTriangle,
  CircleAlert,
  Link2,
  Flag,
  ArrowRight,
} from "lucide-react";
import { useState} from "react";
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
  const [isModalOpen, setIsModalOpen] =
  useState(false);

const [modalTitle, setModalTitle] =
  useState("");

const [modalData, setModalData] =
  useState([]);

const today = new Date();


const user = JSON.parse(sessionStorage.getItem("user"));
const role = user?.role;



const criticalRiskActivities = activities.filter((activity) => {
  if (
    !activity.plannedEndDate ||
    activity.executionStatus === "Completed"
  ) {
    return false;
  }

  const endDate = new Date(activity.plannedEndDate);

  const delayedDays = Math.floor(
    (today - endDate) / (1000 * 60 * 60 * 24)
  );

  return (
    delayedDays >= 7 &&
    Number(activity.progress || 0) < 80
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
  const delay = getDelayDays(activity.plannedEndDate);
  const progress = Number(activity.progress || 0);

  if (activity.executionStatus === "Completed") {
    return {
      level: "On Track",
      color: "bg-green-100 text-green-700",
      reason: "Completed"
    };
  }

  if (delay >= 14 && progress < 80) {
    return {
      level: "Critical",
      color: "bg-red-100 text-red-700",
      reason: `Delayed by ${delay} days`
    };
  }

  if (delay > 0) {
    return {
      level: "High",
      color: "bg-orange-100 text-orange-700",
      reason: "End date crossed"
    };
  }

  if (
    activity.executionStatus === "Not Started" &&
    activity.plannedStartDate &&
    new Date(activity.plannedStartDate) < today
  ) {
    return {
      level: "Pending Start",
      color: "bg-yellow-100 text-yellow-700",
      reason: "Start date crossed"
    };
  }

  return {
    level: "On Track",
    color: "bg-green-100 text-green-700",
    reason: "On schedule"
  };
};


const escalationActivities =
  activities.filter(
    (activity) =>
      activity.plannedEndDate &&
      new Date(
        activity.plannedEndDate
      ) < today &&
      activity.executionStatus !==
        "Completed"
  );

const dependencyActivities = [];

for (let i = 1; i < activities.length; i++) {
  const previous = activities[i - 1];
  const current = activities[i];

  if (
    previous.phaseName === current.phaseName &&
    previous.milestoneName === current.milestoneName &&
    previous.taskName === current.taskName &&
    previous.subTaskName === current.subTaskName &&
    previous.executionStatus !== "Completed" &&
    (current.executionStatus === "Not Started" ||
      !current.executionStatus)
  ) {
    dependencyActivities.push({
      ...current,
      blockedBy: previous.activityName,
    });
  }
}
const getDependencyDetails = (activity) => {
  return {
    status: "Blocked",
    color: "bg-red-100 text-red-700",
    action: activity.blockedBy
      ? `Complete "${activity.blockedBy}"`
      : "-"
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
// const cards = [
//   {
//     value: criticalRiskActivities.length,
//     title: "Critical Risks / Issues",
//     subtitle: "Require immediate attention",
//     activities: criticalRiskActivities,
//     icon: AlertTriangle,
//     iconBg: "#EF4444",
//     textColor: "#DC2626",
//     bg: "#FFF8F8",
//     border: "#FEE2E2",
//     linkColor: "#DC2626",
//   },

//   {
//     value: escalationActivities.length,
//     title: "Escalations",
//     subtitle: "Past due activities",
//     activities: escalationActivities,
//     icon: CircleAlert,
//     iconBg: "#F59E0B",
//     textColor: "#B45309",
//     bg: "#FFFDF7",
//     border: "#FDE7C3",
//     linkColor: "#B45309",
//   },

//   {
//     value: dependencyActivities.length,
//     title: "Dependencies",
//     subtitle: "Pending dependencies",
//     activities: dependencyActivities,
//     icon: Link2,
//     iconBg: "#2563EB",
//     textColor: "#2563EB",
//     bg: "#F8FAFF",
//     border: "#E3EBFF",
//     linkColor: "#2563EB",
//   },

//   {
//     value: openRiskActivities.length,
//     title: "Open Risks",
//     subtitle: "Active open risks",
//     activities: openRiskActivities,
//     icon: Flag,
//     iconBg: "#10B981",
//     textColor: "#059669",
//     bg: "#F8FFFC",
//     border: "#DDF7EC",
//     linkColor: "#059669",
//   },
// ];
const cards = [
  {
    value: criticalRiskActivities.length,
    title: "Critical Risks / Issues",
    subtitle: "Require immediate attention",
    activities: criticalRiskActivities,
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
          subtitle: "Past due activities",
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
    subtitle: "Pending dependencies",
    activities: dependencyActivities,
    icon: Link2,
    iconBg: "#2563EB",
    textColor: "#2563EB",
    bg: "#F8FAFF",
    border: "#E3EBFF",
    linkColor: "#2563EB",
  },

  {
    value: openRiskActivities.length,
    title: "Open Risks",
    subtitle: "Active open risks",
    activities: openRiskActivities,
    icon: Flag,
    iconBg: "#10B981",
    textColor: "#059669",
    bg: "#F8FFFC",
    border: "#DDF7EC",
    linkColor: "#059669",
  },
];
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
          5
        </div>

        <h2 className="text-[20px] font-bold text-[#0B1F59]">
          Risks & Issues
        </h2>
      </div>

      {/* Cards */}
<div
  className="
  grid
  grid-cols-1
  sm:grid-cols-2
  xl:grid-cols-4
  gap-4
  "
>
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
  key={card.title}
className="
rounded-2xl
border
p-4
lg:p-5
min-h-[170px]
lg:min-h-[190px]
flex
flex-col
"
  style={{
    backgroundColor: card.bg,
    borderColor: card.border,
  }}
>

  {/* Icon + Value */}
  <div className="flex items-center gap-4 mb-5">
    <div
     className="
w-10
h-10
lg:w-11
lg:h-11
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
      <Icon
        size={18}
        color="white"
      />
    </div>

    <h3
      className="
     text-[22px]
sm:text-[24px]
lg:text-[30px]
      font-bold
      leading-none
      "
      style={{
        color: card.textColor,
      }}
    >
      {card.value}
    </h3>
  </div>

  {/* Center Content */}
  <div className="flex-1 text-center">
    <h4
      className="
      text-[15px]
sm:text-[16px]
lg:text-[18px]
      font-bold
      text-[#0B1F59]
      leading-6
      "
    >
      {card.title}
    </h4>

    <p
      className="
     text-[12px]
lg:text-[13px]
      text-[#64748B]
      mt-2
      "
    >
      {card.subtitle}
    </p>
  </div>

  {/* Divider */}
  <div className="border-t border-[#E8EDF5] my-4" />

  {/* Footer */}
  <button
  onClick={() => {
    setModalTitle(card.title);
    setModalData(
      card.activities
    );
    setIsModalOpen(true);
  }}
  className="
  flex
  items-center
  justify-center
  gap-2
  text-sm
  font-semibold
  "
  style={{
    color: card.linkColor,
  }}
>
  View Details
  <ArrowRight size={14} />
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
{modalTitle === "Critical Risks / Issues" && (
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
">Risk Level</th>
    <th className="
px-4
py-3
text-left
text-sm
font-semibold
text-[#334155]
border-b
border-slate-200
">Reason</th>
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
      Next Action
    </th>
  </>
)}

{modalTitle === "Open Risks" && (
  <>
    <th  className="
      px-4
      py-3
      text-left
      text-sm
      font-semibold
      text-[#334155]
      border-b
      border-slate-200
      ">Risk Status</th>
    <th  className="
      px-4
      py-3
      text-left
      text-sm
      font-semibold
      text-[#334155]
      border-b
      border-slate-200
      ">Current Risk</th>
    <th  className="
      px-4
      py-3
      text-left
      text-sm
      font-semibold
      text-[#334155]
      border-b
      border-slate-200
      ">Recommended Action</th>
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

${
activity.executionStatus==="Completed"
? "bg-green-100 text-green-700"
: activity.executionStatus==="Delayed"
? "bg-red-100 text-red-700"
: activity.executionStatus==="In Progress"
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
                    {
                      activity.plannedEndDate
                    }
                  </td>

          {modalTitle === "Critical Risks / Issues" && (
  <>
    <td>
      <span
        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${risk.color}`}
      >
        {risk.level}
      </span>
    </td>

    <td>{risk.reason}</td>
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

    <td className="px-4 py-3 text-sm text-slate-600 font-medium">
      {dependency.action}
    </td>
  </>
)}

{modalTitle === "Open Risks" && (
  <>
    <td>
      <span
        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${openRisk.color}`}
      >
        {openRisk.status}
      </span>
    </td>

    <td>{openRisk.risk}</td>

    <td>{openRisk.action}</td>
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