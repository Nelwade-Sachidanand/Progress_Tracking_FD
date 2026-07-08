import {
  CheckCircle2,
  ClipboardList,
  Clock3,
  RotateCcw,
  XCircle,
} from "lucide-react";

export default function AuthorizationSummaryCards({ auths = [] }) {
  const totalRequests = auths.length;

  const pendingRequests = auths.filter(
    (auth) => auth.status === "PENDING",
  ).length;

  const approvedRequests = auths.filter(
    (auth) => auth.status === "APPROVED",
  ).length;

  const rejectedRequests = auths.filter(
    (auth) => auth.status === "REJECTED",
  ).length;

  const rolledBackRequests = auths.filter(
    (auth) => auth.status === "ROLLED_BACK",
  ).length;

  const cards = [
    {
      title: "Total Requests",
      value: totalRequests,
      icon: ClipboardList,
      bg: "bg-purple-100",
      text: "text-purple-600",
    },
    {
      title: "Pending",
      value: pendingRequests,
      icon: Clock3,
      bg: "bg-orange-100",
      text: "text-orange-500",
    },
    {
      title: "Approved",
      value: approvedRequests,
      icon: CheckCircle2,
      bg: "bg-green-100",
      text: "text-green-600",
    },
    {
      title: "Rejected",
      value: rejectedRequests,
      icon: XCircle,
      bg: "bg-red-100",
      text: "text-red-600",
    },
    {
      title: "Rolled Back",
      value: rolledBackRequests,
      icon: RotateCcw,
      bg: "bg-yellow-100",
      text: "text-yellow-600",
    },
  ];

  return (
    <div
      className="
      grid
      gap-4
      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-2
      xl:grid-cols-5
      mt-[5px]
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

            p-3
            min-h-[120px]

            flex
            flex-col
          "
          >
            {/* Icon */}
            <div
              className={`
              h-11
              w-11
              rounded-xl
              flex
              items-center
              justify-center
              ${card.bg}
            `}
            >
              <Icon size={24} className={card.text} />
            </div>

            {/* Value & Title */}
            <div
              className="
              relative
              mt-[-20px]
              flex-1
              flex
              flex-col
              items-center
              justify-center
              text-center
            "
            >
              <h2
                className="
                text-3xl
                xl:text-[35px]
                font-bold
                text-[#142850]
                leading-none
              "
              >
                {card.value}
              </h2>

              <p
                className="
                mt-2
                text-sm
                xl:text-[16px]
                font-medium
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
