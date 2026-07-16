import {
  Target,
  TriangleAlert,
  TrendingUp,
  Shield,
} from "lucide-react";

export default function ExecutiveHealth({
  project,
  selectedMilestones,
})  {
  const activities =
  project?.phases
    ?.flatMap((phase) => phase.milestones || [])
    .filter(
      (milestone) =>
        selectedMilestones.length === 0 ||
        selectedMilestones.includes(milestone.milestoneId)
    )
    .flatMap((milestone) => milestone.tasks || [])
    .flatMap((task) => task.subTasks || [])
    .flatMap((subTask) => subTask.activities || []) || [];

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

  const delayedActivities =
    activeActivities.filter(
      (activity) =>
        activity.scheduleHealth ===
          "Delayed" ||
        activity.executionStatus ===
          "Delayed"
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

  const riskPercentage =
    totalActivities > 0
      ? Math.round(
          (delayedActivities /
            totalActivities) *
            100
        )
      : 0;

  const riskLevel =
    riskPercentage >= 20
      ? "High"
      : riskPercentage >= 10
      ? "Medium"
      : "Low";

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

  

  const confidenceScore =
  totalActivities > 0
    ? Math.round(
        (completedActivities /
          totalActivities) *
          100
      )
    : 0;

const deliveryConfidence =
  confidenceScore >= 80
    ? "HIGH"
    : confidenceScore >= 60
    ? "MEDIUM"
    : "LOW";

const deliverySubtitle =
  confidenceScore >= 80
    ? "Likely On Schedule"
    : confidenceScore >= 60
    ? "Minor Delays Expected"
    : "Delivery At Risk";


  const projectHealthLabel =
    overallProgress >= 80
      ? "Excellent"
      : overallProgress >= 60
      ? "Good"
      : overallProgress >= 40
      ? "Attention"
      : "Critical";

  const cards = [
    {
  title: "Project Health",
  value: `${overallProgress}%`,
  status: projectHealthLabel,
  subtitle: "Overall milestone progress",

  icon: Target,

  iconColor: "#16A34A",

  bg:
    overallProgress >= 80
      ? "#F0FDF4"
      : overallProgress >= 60
      ? "#EFF6FF"
      : overallProgress >= 40
      ? "#FFF7ED"
      : "#FEF2F2",

  border:
    overallProgress >= 80
      ? "#BBF7D0"
      : overallProgress >= 60
      ? "#BFDBFE"
      : overallProgress >= 40
      ? "#FED7AA"
      : "#FECACA",

  valueColor:
    overallProgress >= 80
      ? "#16A34A"
      : overallProgress >= 60
      ? "#2563EB"
      : overallProgress >= 40
      ? "#F59E0B"
      : "#DC2626",

  statusColor:
    overallProgress >= 80
      ? "#16A34A"
      : overallProgress >= 60
      ? "#2563EB"
      : overallProgress >= 40
      ? "#F59E0B"
      : "#DC2626",
},

    {
  title: "Risk Level",

  value: riskLevel.toUpperCase(),

  status: `${delayedActivities} Critical Activities`,

  subtitle: "Based on active activities",

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

  statusColor:
    riskLevel === "Low"
      ? "#16A34A"
      : riskLevel === "Medium"
      ? "#F59E0B"
      : "#DC2626",
},

    

    {
  title: "Delivery Confidence",

  value: deliveryConfidence,

  status: deliverySubtitle,

  subtitle: "Project delivery forecast",

  icon: Shield,

  iconColor:
    confidenceScore >= 80
      ? "#2563EB"
      : confidenceScore >= 60
      ? "#F59E0B"
      : "#DC2626",

  bg:
    confidenceScore >= 80
      ? "#EFF6FF"
      : confidenceScore >= 60
      ? "#FFF7ED"
      : "#FEF2F2",

  border:
    confidenceScore >= 80
      ? "#BFDBFE"
      : confidenceScore >= 60
      ? "#FED7AA"
      : "#FECACA",

  valueColor:
    confidenceScore >= 80
      ? "#2563EB"
      : confidenceScore >= 60
      ? "#F59E0B"
      : "#DC2626",

  statusColor:
    confidenceScore >= 80
      ? "#2563EB"
      : confidenceScore >= 60
      ? "#F59E0B"
      : "#DC2626",
},
  ];

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
  text-base sm:text-lg lg:text-xl font-bold text-[#0B1F59]
  "
>
          Executive Health
        </h2>
      </div>

  <div
  className="
    grid
    grid-cols-1
    md:grid-cols-3
    gap-3
  "
>
        {cards.map((card) => {
          const Icon =
            card.icon;

          return (
<div
  key={card.title}
  className="
    relative
    rounded-xl
    border
    px-4
    py-4
    min-h-[120px]
    shadow-sm
  "
  style={{
    backgroundColor: card.bg,
    borderColor: card.border,
  }}
>
  {/* Icon */}

 <div
  className="
    absolute
    left-4
    top-4
    h-10
    w-10
    rounded-lg
    flex
    items-center
    justify-center
  "
  style={{
    backgroundColor: `${card.iconColor}15`,
  }}
>
  <Icon
    size={20}
    color={card.iconColor}
  />

    
  </div>

  {/* Content */}
<div className="text-center mt-6">

  <p
    className="
      text-[12px]
      font-semibold
      text-[#0B1F59]
    "
  >
    {card.title}
  </p>

  <h2
    className="
      mt-2
      text-[28px]
      font-bold
      leading-none
    "
    style={{
      color: card.valueColor,
    }}
  >
    {card.value}
  </h2>

  <p
    className="
      mt-2
      text-[14px]
      font-semibold
    "
    style={{
      color: card.statusColor,
    }}
  >
    {card.status}
  </p>

  <p
    className="
      mt-1
      text-[11px]
      text-slate-500
    "
  >
    {card.subtitle}
  </p>

</div>
</div>
          );
        })}
      </div>
    </div>
  );
}