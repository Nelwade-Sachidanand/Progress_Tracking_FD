import {
  ClipboardList,
  CheckCircle2,
  AlertTriangle,
  MinusCircle,
} from "lucide-react";

export default function TaskSummaryCards({
  total,
  completed,
  delayed,
  notStarted,
}) {
  const cards = [
  {
    title: "Total Tasks",
    value: total,
    icon: ClipboardList,
    bg: "#EFF6FF",
    iconBg: "#DCEAFE",
    color: "#2563EB",
    subtitle: "All tasks",
  },
  {
    title: "Completed",
    value: completed,
    icon: CheckCircle2,
    bg: "#F0FDF4",
    iconBg: "#DDF7E7",
    color: "#16A34A",
    subtitle: "Completed tasks",
  },
  {
    title: "Delayed",
    value: delayed,
    icon: AlertTriangle,
    bg: "#FEF2F2",
    iconBg: "#FFE3E3",
    color: "#EF4444",
    subtitle: "Delayed tasks",
  },
  {
    title: "Not Started",
    value: notStarted,
    icon: MinusCircle,
    bg: "#F8FAFC",
    iconBg: "#ECECF1",
    color: "#64748B",
    subtitle: "Pending tasks",
  },
];

  return (
    
  <div
  className="
  grid
  grid-cols-1
  sm:grid-cols-2
  xl:grid-cols-4
  gap-4
  lg:gap-5
  mb-6
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
border-[#E7EDF5]
p-4
lg:p-5
"
        style={{
          backgroundColor: card.bg,
        }}
      >
        <div
  className="
  flex
  items-center
  gap-3
  lg:gap-4
  "
>

          <div
            className="
w-12
h-12
lg:w-14
lg:h-14
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
             size={22}
              style={{
                color: card.color,
              }}
            />
          </div>

          <div>
            <p className="
text-[#0B1F59]
font-semibold
text-[14px]
lg:text-[16px]
">
              {card.title}
            </p>

            <h2
              className="
text-[30px]
sm:text-[36px]
lg:text-[42px]
font-bold
leading-none
mt-2
"
              style={{
                color: card.color,
              }}
            >
              {card.value}
            </h2>

            <p className="
text-[#64748B]
text-[12px]
lg:text-sm
mt-2
lg:mt-3
">
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