import { Calendar, ClipboardList, FolderOpen, User } from "lucide-react";

export default function AuditSummaryCards({ auditLogs = [] }) {
  const totalLogs = auditLogs.length;

  const userLogs = auditLogs.filter((log) => log.entityType === "USER").length;

  const projectLogs = auditLogs.filter(
    (log) => log.entityType === "PROJECT",
  ).length;

  const todayLogs = auditLogs.filter((log) => {
    const today = new Date().toDateString();

    return new Date(log.modifiedDate).toDateString() === today;
  }).length;

  const cards = [
    {
      title: "Total Logs",
      value: totalLogs,
      icon: ClipboardList,
      bg: "bg-purple-50",
      text: "text-purple-600",
    },
    {
      title: "User Logs",
      value: userLogs,
      icon: User,
      bg: "bg-green-50",
      text: "text-green-600",
    },
    {
      title: "Project Logs",
      value: projectLogs,
      icon: FolderOpen,
      bg: "bg-blue-50",
      text: "text-blue-600",
    },
    {
      title: "Today Logs",
      value: todayLogs,
      icon: Calendar,
      bg: "bg-orange-50",
      text: "text-orange-600",
    },
  ];

  return (
    <div
      className="
      grid
      gap-5
      grid-cols-1
      sm:grid-cols-2
      xl:grid-cols-4
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
                <h2
                  className="
                  text-[32px]
                  font-bold
                  text-[#142850]
                  leading-none
                  "
                >
                  {card.value}
                </h2>

                <p
                  className="
                  text-[15px]
                  text-slate-500
                  mt-1
                  2xl:text-[17px]
                  2xl:font-medium
                  2xl:tracking-wide
                  "
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
