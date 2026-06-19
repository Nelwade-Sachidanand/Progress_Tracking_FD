import {
  Target,
  TriangleAlert,
  TrendingUp,
  Shield,
} from "lucide-react";

export default function ExecutiveHealth() {
  const cards = [
    {
      title: "Project Health",
      value: "4%",
      subtitle: "Critical",
      icon: Target,
      iconColor: "#2563EB",
      bg: "#F8FAFF",
      border: "#E7EDF8",
      valueColor: "#EF4444",
      subtitleColor: "#EF4444",
    },
    {
      title: "Risk Level",
      value: "HIGH",
      subtitle: "48 critical delays",
      icon: TriangleAlert,
      iconColor: "#F59E0B",
      bg: "#FFFDF8",
      border: "#F5E8C7",
      valueColor: "#DC2626",
      subtitleColor: "#64748B",
    },
    {
      title: "Weekly Trend",
      value: "-92%",
      subtitle: "vs last week",
      icon: TrendingUp,
      iconColor: "#6366F1",
      bg: "#F8FAFF",
      border: "#E7EDF8",
      valueColor: "#DC2626",
      subtitleColor: "#64748B",
    },
    {
      title: "Confidence Score",
      value: "23%",
      subtitle: "Low confidence",
      icon: Shield,
      iconColor: "#3B82F6",
      bg: "#F8FAFF",
      border: "#E7EDF8",
      valueColor: "#DC2626",
      subtitleColor: "#64748B",
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#E5EAF2] p-5">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className="
          w-8
          h-8
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
          7
        </div>

        <h2 className="text-[20px] font-bold text-[#0B1F59]">
          Executive Health
        </h2>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="
              rounded-2xl
              border
              px-5
              py-5
              min-h-[150px]
              bg-white
              "
              style={{
                borderColor: card.border,
                backgroundColor: card.bg,
              }}
            >
              {/* Icon + Title */}
         <div className="flex items-center justify-center gap-3">

                <Icon
                  size={24}
                  style={{
                    color: card.iconColor,
                  }}
                />

                <span
                  className="
                  text-[13px]
                  font-semibold
                  text-[#0B1F59]
                  "
                >
                  {card.title}
                </span>
              </div>

              {/* Value */}
              <div className="mt-6 text-center">
                <h3
                  className="
                  text-[30px]
                  font-bold
                  leading-none
                  "
                  style={{
                    color: card.valueColor,
                  }}
                >
                  {card.value}
                </h3>

                <p
                  className="
                  mt-4
                  text-[13px]
                  font-medium
                  "
                  style={{
                    color: card.subtitleColor,
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