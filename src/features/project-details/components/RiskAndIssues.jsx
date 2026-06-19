import {
  AlertTriangle,
  CircleAlert,
  Link2,
  Flag,
  ArrowRight,
} from "lucide-react";

export default function RiskAndIssues() {
  const cards = [
    {
      value: "48",
      title: "Critical Risks / Issues",
      subtitle: "Require immediate attention",
      icon: AlertTriangle,
      iconBg: "#EF4444",
      textColor: "#DC2626",
      bg: "#FFF8F8",
      border: "#FEE2E2",
      linkColor: "#DC2626",
    },
    {
      value: "48",
      title: "Escalations",
      subtitle: "Pending escalations",
      icon: CircleAlert,
      iconBg: "#F59E0B",
      textColor: "#B45309",
      bg: "#FFFDF7",
      border: "#FDE7C3",
      linkColor: "#B45309",
    },
    {
      value: "12",
      title: "Dependencies",
      subtitle: "Pending dependencies",
      icon: Link2,
      iconBg: "#2563EB",
      textColor: "#2563EB",
      bg: "#F8FAFF",
      border: "#E3EBFF",
      linkColor: "#2563EB",
    },
    {
      value: "08",
      title: "Open Risks",
      subtitle: "Active open risks",
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
  min-h-[180px]
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
      <Icon
        size={18}
        color="white"
      />
    </div>

    <h3
      className="
      text-[28px]
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
      text-[16px]
      font-bold
      text-[#0B1F59]
      leading-6
      "
    >
      {card.title}
    </h4>

    <p
      className="
      text-[13px]
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
    </div>
  );
}