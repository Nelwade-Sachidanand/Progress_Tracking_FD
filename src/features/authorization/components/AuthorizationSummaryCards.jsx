import { CheckCircle2, ClipboardList, Clock3, XCircle } from "lucide-react";

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
  ];

  return (
    <div
      className="
      grid
      grid-cols-1
      sm:grid-cols-2
      xl:grid-cols-4
      gap-5
      "
    >
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="
            bg-white
            rounded-3xl
            border
            border-slate-200
            p-6
            shadow-sm
            "
          >
            <div className="flex items-center gap-4">
              <div
                className={`
                h-14
                w-14
                rounded-2xl
                flex
                items-center
                justify-center
                ${card.bg}
                `}
              >
                <Icon size={28} className={card.text} />
              </div>

              <div>
                <h2 className="text-3xl font-bold text-[#142850]">
                  {card.value}
                </h2>

                <p
                  className="text-slate-500 2xl:text-[17px]
                  2xl:font-medium
                  2xl:tracking-wide"
                >
                  {card.title}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
