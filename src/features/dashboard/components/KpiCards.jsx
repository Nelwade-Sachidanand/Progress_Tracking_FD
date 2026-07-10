import {
  BriefcaseBusiness,
  CircleCheckBig,
  CircleX,
  Landmark,
  PieChart,
  Rocket,
} from "lucide-react";

export default function KpiCards({ data }) {
  const cards = [
    {
      title: "Total Banks",
      value: data.totalBanks,
      subtitle: "Active",
      icon: Landmark,
      color: "blue",
    },
    {
      title: "Active Projects",
      value: data.totalProjects,
      subtitle: "Across All Products",
      icon: BriefcaseBusiness,
      color: "purple",
    },
    {
      title: "Overall Progress",
      value: `${data.overallProgress}%`,
      subtitle: "Portfolio Progress",
      icon: PieChart,
      color: "green",
    },
    {
      title: "Go-Live This Year",
      value: data.upcomingGoLive,
      subtitle: "Upcoming",
      icon: Rocket,
      color: "orange",
    },
    {
      title: "On Track Projects",
      value: data.onTrackProjects,
      subtitle: "Healthy",
      icon: CircleCheckBig,
      color: "emerald",
    },
    {
      title: "At Risk / Delayed",
      value: data.delayedProjects,
      subtitle: "Attention",
      icon: CircleX,
      color: "red",
    },
  ];

  const colors = {
    blue: "bg-blue-50 text-[#2563EB]",
    purple: "bg-purple-50 text-[#9333EA]",
    green: "bg-emerald-50 text-[#10B981]",
    orange: "bg-orange-50 text-[#F97316]",
    emerald: "bg-green-50 text-[#16A34A]",
    red: "bg-red-50 text-[#EF4444]",
  };

  return (
    <div
      className="
      grid
      gap-4
      grid-cols-2
      sm:grid-cols-3
      lg:grid-cols-3
      xl:grid-cols-6
      mt-[-10px]
    "
    >
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="
      bg-white
      rounded-2xl
      border
      border-[#CDD7E3]
      shadow-sm

      p-2
      min-h-[140px]

      flex
      flex-col
    "
          >
            {/* Icon - Top Left */}
            <div
              className={`
        h-11
        w-11
        rounded-xl
        flex
        items-center
        justify-center

        ${colors[card.color]}
      `}
            >
              <Icon className="w-5 h-5" />
            </div>

            {/* Value & Title */}
            <div className="position-relative mt-[-20px] flex-1 flex flex-col items-center justify-center text-center">
              <h3
                className="
          text-xl
          xl:text-[35px]
          2xl:text-[37px]
          font-bold
          text-[#142850]
          leading-none
        "
              >
                {card.value}
              </h3>

              <p
                className="
          mt-2
          text-sm
          xl:text-[16px]
          2xl:text-[18px]
          font-semibold
          text-slate-600
          leading-snug
        "
              >
                {card.title}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
