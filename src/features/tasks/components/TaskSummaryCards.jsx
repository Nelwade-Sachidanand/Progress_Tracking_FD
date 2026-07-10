import {
  AlertTriangle,
  CheckCircle2,
  ClipboardList,
  MinusCircle,
} from "lucide-react";

export default function TaskSummaryCards({
  total,
  completed,
  delayed,
  notStarted,
  inProgress,
}) {
  const cards = [
    {
      title: "Total Tasks",
      value: total,
      icon: ClipboardList,
      bg: "#EFF6FF",
      iconBg: "#DCEAFE",
      color: "#2563EB",
    },
    {
      title: "Completed",
      value: completed,
      icon: CheckCircle2,
      bg: "#F0FDF4",
      iconBg: "#DDF7E7",
      color: "#16A34A",
    },
    {
      title: "Delayed",
      value: delayed,
      icon: AlertTriangle,
      bg: "#FEF2F2",
      iconBg: "#FFE3E3",
      color: "#EF4444",
    },
    {
      title: "In Progress",
      value: inProgress,
      icon: MinusCircle,
      bg: "#EFF6FF",
      iconBg: "#DBEAFE",
      color: "#2563EB",
    },
    {
      title: "Not Started",
      value: notStarted,
      icon: MinusCircle,
      bg: "#F8FAFC",
      iconBg: "#ECECF1",
      color: "#64748B",
    },
  ];

  return (
    <div
      className="
      grid
      gap-4
      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-3
      xl:grid-cols-5
      mt-[-3px]
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
            border-slate-200
            bg-white
            shadow-sm

            p-4
            min-h-[130px]

            flex
            flex-col
          "
          >
            {/* Icon */}
            <div
              className="
              h-11
              w-11
              rounded-xl
              flex
              items-center
              justify-center
            "
              style={{
                backgroundColor: card.iconBg,
              }}
            >
              <Icon
                size={22}
                style={{
                  color: card.color,
                }}
              />
            </div>

            {/* Value & Title */}
            <div className="relative mt-[-18px] flex flex-1 flex-col items-center justify-center text-center">
              <h2
                className="
                text-3xl
                xl:text-[36px]
                font-bold
                leading-none
              "
                style={{
                  color: card.color,
                }}
              >
                {card.value}
              </h2>

              <p
                className="
                mt-2
                text-sm
                xl:text-[16px]
                font-semibold
                text-slate-500
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
 