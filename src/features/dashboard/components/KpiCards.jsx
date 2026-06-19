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
        gap-5
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-3
        2xl:grid-cols-6
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
              border-slate-200
              shadow-sm

              px-5
              py-4

              xl:px-6
              xl:py-5

              min-h-[118px]
              xl:min-h-[128px]

              transition-all
              hover:shadow-md
            "
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div
                className={`
                  h-10
                  w-10

                  xl:h-12
                  xl:w-12

                  rounded-xl
                  flex
                  items-center
                  justify-center
                  shrink-0
                  2xl:h-15
                  2xl:w-15

                  ${colors[card.color]}
                `}
              >
                <Icon
                  className="
                    w-5
                    h-5

                    xl:w-6
                    xl:h-6
                  "
                />
              </div>

              {/* Content */}
              <div className="flex-1">
                <p
                  className="
                    text-[13px]
                    xl:text-[15px]
                    font-semibold
                    text-slate-500
                    leading-tight
                    2xl:text-[18px]
                    2xl:font-medium
                    2xl:tracking-wide
                  "
                >
                  {card.title}
                </p>

                <h3
                  className="
                    text-[30px]
                    xl:text-[38px]
                    font-bold
                    text-[#142850]
                    leading-none
                    mt-1
                  "
                >
                  {card.value}
                </h3>

                <p
                  className={`
                    text-[12px]
                    xl:text-[14px]
                    font-semibold
                    mt-2
                    2xl:text-[16px]
                    2xl:font-medium
                    2xl:tracking-wide
                    ${colors[card.color].split(" ")[1]}
                  `}
                >
                  {card.subtitle}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
