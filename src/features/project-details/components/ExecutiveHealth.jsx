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

  const weeklyTrend =
    overallProgress -
    timelineProgress;

  const trendLabel =
    weeklyTrend > 0
      ? "Ahead of Plan"
      : weeklyTrend < 0
      ? "Behind Plan"
      : "Stable";

  const confidenceScore =
    totalActivities > 0
      ? Math.round(
          (completedActivities /
            totalActivities) *
            100
        )
      : 0;

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
      value:
        riskLevel.toUpperCase(),
      subtitle: `${delayedActivities} delayed activities`,
      icon: TriangleAlert,
      iconColor: "#F59E0B",
      bg:
  riskLevel === "High"
    ? "#FEF2F2"
    : riskLevel ===
      "Medium"
    ? "#FFF7ED"
    : "#F0FDF4",

border:
  riskLevel === "High"
    ? "#FECACA"
    : riskLevel ===
      "Medium"
    ? "#FED7AA"
    : "#BBF7D0",
      valueColor:
        riskLevel === "High"
          ? "#DC2626"
          : riskLevel ===
            "Medium"
          ? "#F59E0B"
          : "#16A34A",
      subtitleColor:
        "#64748B",
    },

    {
      title: "Weekly Trend",
      value: `${
        weeklyTrend > 0
          ? "+"
          : ""
      }${weeklyTrend}%`,
      subtitle: trendLabel,
      icon: TrendingUp,
      iconColor: "#6366F1",
     bg:
  weeklyTrend > 0
    ? "#F0FDF4"
    : weeklyTrend < 0
    ? "#FEF2F2"
    : "#F8FAFC",

border:
  weeklyTrend > 0
    ? "#BBF7D0"
    : weeklyTrend < 0
    ? "#FECACA"
    : "#CBD5E1",
      valueColor:
        weeklyTrend >= 0
          ? "#16A34A"
          : "#DC2626",
      subtitleColor:
        "#64748B",
    },

    {
      title:
        "Confidence Score",
      value: `${confidenceScore}%`,
      subtitle:
        confidenceScore >= 80
          ? "High Confidence"
          : confidenceScore >=
            60
          ? "Moderate Confidence"
          : "Low Confidence",
      icon: Shield,
      iconColor: "#3B82F6",
      bg:
  confidenceScore >= 80
    ? "#F0FDF4"
    : confidenceScore >= 60
    ? "#FFF7ED"
    : "#FEF2F2",

border:
  confidenceScore >= 80
    ? "#BBF7D0"
    : confidenceScore >= 60
    ? "#FED7AA"
    : "#FECACA",
      valueColor:
        confidenceScore >= 60
          ? "#16A34A"
          : "#DC2626",
      subtitleColor:
        "#64748B",
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
  sm:grid-cols-2
  xl:grid-cols-4
  gap-4
  "
>
        {cards.map((card) => {
          const Icon =
            card.icon;

          return (
            <div
              key={card.title}
              className="
              rounded-2xl
              border
             px-4
              py-4
            lg:px-5
             lg:py-5
             min-h-[130px]
             lg:min-h-[150px]
              "
              style={{
                borderColor:
                  card.border,
                backgroundColor:
                  card.bg,
              }}
            >
            <div
  className="
  flex
  items-center
  justify-center
  gap-2
  lg:gap-3
  "
><Icon
  size={20}
  className="lg:w-6 lg:h-6"
  style={{
    color: card.iconColor,
  }}
/>

             <span
  className="
  text-[12px]
  lg:text-[13px]
  font-semibold
  text-[#0B1F59]
  text-center
  "
>
                  {card.title}
                </span>
              </div>

              <div className="mt-6 text-center">
                <h3
                  className="
                 text-[24px]
                 sm:text-[26px]
                 lg:text-[30px]
                  font-bold
                  leading-none
                  "
                  style={{
                    color:
                      card.valueColor,
                  }}
                >
                  {card.value}
                </h3>

                <p
                  className="
                  mt-4
                  text-[11px]
                  sm:text-[12px]
                  lg:text-[13px]
                  font-medium
                  "
                  cursor-pointer
                  style={{
                    color:
                      card.subtitleColor,
                  }}
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