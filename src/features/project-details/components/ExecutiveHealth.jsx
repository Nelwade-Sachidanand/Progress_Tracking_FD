import {
  Target,
  TriangleAlert,
  TrendingUp,
  Shield,
} from "lucide-react";

export default function ExecutiveHealth({
  project,
  selectedMilestones,
}) {
const milestones =
  project?.phases
    ?.flatMap((phase) => phase.milestones || [])
    .filter(
      (milestone) =>
        selectedMilestones.length === 0 ||
        selectedMilestones.includes(milestone.milestoneId)
    ) || [];

const activities =
  milestones.flatMap(
    (milestone) =>
      milestone.tasks?.flatMap(
        (task) =>
          task.subTasks?.flatMap(
            (subTask) =>
              subTask.activities || []
          ) || []
      ) || []
  );

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

  

  const overallProgress =
    totalActivities > 0
      ? Math.round(
          activeActivities.reduce(
            (sum, activity) =>
              sum +
              (activity.progress || 0),
            0
          ) / totalActivities
        )
      : 0;
const totalMilestones = milestones.length;

const completedMilestones =
  milestones.filter((milestone) => {
    const milestoneActivities =
      milestone.tasks?.flatMap(
        (task) =>
          task.subTasks?.flatMap(
            (subTask) =>
              subTask.activities || []
          ) || []
      ) || [];

    return (
      milestoneActivities.length > 0 &&
      milestoneActivities.every(
        (activity) =>
          activity.executionStatus === "Completed"
      )
    );
  }).length;

const milestoneCompletion =
  totalMilestones > 0
    ? Math.round(
        (completedMilestones /
          totalMilestones) *
          100
      )
    : 0;
   // ------------------------------------
// Project Health
// ------------------------------------

const milestoneHealth = milestones.map((milestone) => {

  const milestoneActivities =
    milestone.tasks?.flatMap(task =>
      task.subTasks?.flatMap(subTask =>
        subTask.activities || []
      ) || []
    ) || [];

  if (milestoneActivities.length === 0) {
    return 0;
  }

  const progress = Math.round(
    milestoneActivities.reduce(
      (sum, activity) => sum + (activity.progress || 0),
      0
    ) / milestoneActivities.length
  );

  const completed =
    milestoneActivities.every(
      activity =>
        activity.executionStatus === "Completed"
    );

  const plannedEndDate =
    milestoneActivities
      .map(activity => activity.plannedEndDate)
      .filter(Boolean)
      .sort()
      .at(-1);

  const actualEndDate =
    milestoneActivities
      .map(activity => activity.actualEndDate)
      .filter(Boolean)
      .sort()
      .at(-1);

  // -------------------------
  // Scenario 1
  // Completed On Time
  // -------------------------

  if (
    completed &&
    actualEndDate &&
    new Date(actualEndDate) <= new Date(plannedEndDate)
  ) {
    return 100;
  }

  // -------------------------
  // Scenario 2
  // Completed Late
  // -------------------------

  if (
    completed &&
    actualEndDate &&
    new Date(actualEndDate) > new Date(plannedEndDate)
  ) {

    const delayDays = Math.ceil(
      (new Date(actualEndDate) -
        new Date(plannedEndDate)) /
      (1000 * 60 * 60 * 24)
    );

    if (delayDays <= 7) return 95;

    if (delayDays <= 15) return 90;

    return 80;
  }

  // -------------------------
  // Scenario 3
  // Not Completed
  // -------------------------

  return progress;

});

// Final Project Health

const projectHealth =
  milestoneHealth.length > 0
    ? Math.round(
        milestoneHealth.reduce(
          (sum, value) => sum + value,
          0
        ) / milestoneHealth.length
      )
    : 0;
 // Delayed Activities (Till Today Only)
const delayedActivities = activeActivities.filter(
  (activity) =>
    activity.scheduleHealth === "Delayed" ||
    activity.executionStatus === "Delayed"
).length;

// Risk Percentage
const delayedPercentage =
  totalActivities > 0
    ? Math.round(
        (delayedActivities / totalActivities) * 100
      )
    : 0;

// Risk Level
let riskLevel = "Low";

if (delayedPercentage >= 20) {
  riskLevel = "High";
} else if (delayedPercentage >= 10) {
  riskLevel = "Medium";
}

  const projectStartDate =
    activities
      .map(
        (activity) =>
          activity.plannedStartDate
      )
      .filter(Boolean)
      .sort()[0];

  const projectEndDate =
    activities
      .map(
        (activity) =>
          activity.plannedEndDate
      )
      .filter(Boolean)
      .sort()
      .at(-1);

  let timelineProgress = 0;

  if (
    projectStartDate &&
    projectEndDate
  ) {
    const start =
      new Date(projectStartDate);

    const end =
      new Date(projectEndDate);

    const totalDays =
      (end - start) /
      (1000 * 60 * 60 * 24);

    const elapsedDays =
      (today - start) /
      (1000 * 60 * 60 * 24);

    timelineProgress =
      Math.max(
        0,
        Math.min(
          100,
          Math.round(
            (elapsedDays /
              totalDays) *
              100
          )
        )
      );
  }


  // ----------------------------
// Delivery Confidence
// ----------------------------

// Schedule adherence (difference between actual progress and expected progress)
const scheduleVariance = Math.abs(
  overallProgress - timelineProgress
);

const scheduleScore = Math.max(
  0,
  100 - scheduleVariance
);

// Delay impact
const delayScore =
  totalActivities > 0
    ? Math.max(
        0,
        100 -
          Math.round(
            (delayedActivities /
              totalActivities) *
              100
          )
      )
    : 100;

// Final confidence score
const confidenceScore = Math.round(
  overallProgress * 0.4 +
  scheduleScore * 0.4 +
  delayScore * 0.2
);

// Confidence Label
const confidenceLevel =
  confidenceScore >= 85
    ? "HIGH"
    : confidenceScore >= 65
    ? "MEDIUM"
    : "LOW";

// Confidence Subtitle
const confidenceSubtitle =
  confidenceScore >= 85
    ? "Likely On Schedule"
    : confidenceScore >= 65
    ? "Needs Monitoring"
    : "Delivery At Risk";

const projectHealthLabel =
  projectHealth >= 95
    ? "Excellent"
    : projectHealth >= 80
    ? "Good"
    : projectHealth >= 60
    ? "Attention"
    : "Critical";

  const cards = [
    {
      title: "Project Health",
//value: `${overallProgress}%`,
value: `${projectHealth}%`,
      subtitle:
        projectHealthLabel,
      icon: Target,
      iconColor: "#2563EB",
bg:
  overallProgress >= 80
    ? "#F0FDF4"
    : overallProgress >= 60
    ? "#F0FDF4"
    : overallProgress >= 40
    ? "#FFF7ED"
    : "#FEF2F2",

border:
  overallProgress >= 80
    ? "#BBF7D0"
    : overallProgress >= 60
    ? "#BBF7D0"
    : overallProgress >= 40
    ? "#FED7AA"
    : "#FECACA",
      valueColor:
        overallProgress >= 60
          ? "#16A34A"
          : overallProgress >= 40
          ? "#F59E0B"
          : "#DC2626",
      subtitleColor:
        overallProgress >= 60
          ? "#16A34A"
          : overallProgress >= 40
          ? "#F59E0B"
          : "#DC2626",
    },

   {
  title: "Risk Level",

  value: riskLevel.toUpperCase(),

  subtitle: `${delayedActivities} of ${totalActivities} delayed`,

  icon: TriangleAlert,

  iconColor:
    riskLevel === "Low"
      ? "#16A34A"
      : riskLevel === "Medium"
      ? "#F59E0B"
      : "#DC2626",

  bg:
    riskLevel === "Low"
      ? "#F0FDF4"
      : riskLevel === "Medium"
      ? "#FFF7ED"
      : "#FEF2F2",

  border:
    riskLevel === "Low"
      ? "#BBF7D0"
      : riskLevel === "Medium"
      ? "#FED7AA"
      : "#FECACA",

  valueColor:
    riskLevel === "Low"
      ? "#16A34A"
      : riskLevel === "Medium"
      ? "#F59E0B"
      : "#DC2626",

  subtitleColor: "#64748B",
},

    

    {
  title: "Delivery Confidence",

  value: `${confidenceScore}%`,

  subtitle: confidenceSubtitle,

  icon: Shield,

  iconColor:
    confidenceLevel === "HIGH"
      ? "#16A34A"
      : confidenceLevel === "MEDIUM"
      ? "#F59E0B"
      : "#DC2626",

  bg:
    confidenceLevel === "HIGH"
      ? "#F0FDF4"
      : confidenceLevel === "MEDIUM"
      ? "#FFF7ED"
      : "#FEF2F2",

  border:
    confidenceLevel === "HIGH"
      ? "#BBF7D0"
      : confidenceLevel === "MEDIUM"
      ? "#FED7AA"
      : "#FECACA",

  valueColor:
    confidenceLevel === "HIGH"
      ? "#16A34A"
      : confidenceLevel === "MEDIUM"
      ? "#F59E0B"
      : "#DC2626",

  subtitleColor: "#64748B",
},
  ];

  return (
   <div
  className="
  bg-white
  rounded-2xl
  border
  border-[#CDD7E3]
  p-4
  lg:p-5
  "
>
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
          6
        </div>
          <h2
            className="
            text-base
            font-bold
            text-[#0B1F59]

            sm:text-lg
            lg:text-xl
          "
          >
          Executive Health
        </h2>
      </div>

 <div
  className="
  grid
  grid-cols-1
  md:grid-cols-2
  xl:grid-cols-3
  gap-4
"
>
        {cards.map((card) => {
          const Icon =
            card.icon;

          return (
            <div
  key={card.title}
  className="rounded-2xl border bg-white shadow-sm p-5 flex flex-col"
  style={{
    borderColor: card.border,
  }}
>
  {/* Header */}
  <div className="flex items-center gap-2">
<div
  className="w-9 h-9 rounded-full flex items-center justify-center"
  style={{
    background: `${card.iconColor}15`,
  }}
>
  <Icon
    size={18}
    color={card.iconColor}
  />
</div>
    <div>
     <h3 className="text-sm font-semibold text-[#0B1F59]">
  {card.title}
</h3>

      <span
  className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
  style={{
    background: `${card.valueColor}15`,
    color: card.valueColor,
  }}
>
  {card.subtitle}
</span>
    </div>
  </div>

  {/* Value */}
 <div className="mt-4 text-center">
  <h1
    className="text-3xl lg:text-3xl font-bold"
    style={{
      color: card.valueColor,
    }}
  >
    {card.value}
  </h1>
</div>

  {/* Progress */}
<div className="mt-4">
  <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden">
    <div
      className="h-full rounded-full"
      style={{
        width:
          card.title === "Project Health"
            ? `${projectHealth}%`
            : card.title === "Delivery Confidence"
            ? `${confidenceScore}%`
            : `${100 - delayedPercentage}%`,
        background: card.valueColor,
      }}
    />
  </div>
</div>

  {/* Footer */}
 <div className="mt-4 flex justify-between text-[11px] lg:text-xs text-slate-600">
  {/* <span>
    {completedActivities}/{totalActivities} Done
  </span> */}

  <span>
    {card.title === "Risk Level"
      ? `${delayedActivities} Delayed`
      : `${completedMilestones}/${totalMilestones} Milestones`}
  </span>
</div>
</div>
          );
        })}
      </div>
    </div>
  );
}