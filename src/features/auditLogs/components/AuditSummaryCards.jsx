import {
  CalendarDays,
  ClipboardCheck,
  Database,
  FolderKanban,
  User,
} from "lucide-react";

export default function AuditSummaryCards({ auditLogs = [] }) {
  const totalLogs = auditLogs.length;

  const userLogs = auditLogs.filter((log) => log.entityType === "USER").length;

  const activityLogs = auditLogs.filter(
    (log) => log.entityType === "ACTIVITY",
  ).length;

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
      icon: Database,
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
      title: "Activity Logs",
      value: activityLogs,
      icon: ClipboardCheck,
      bg: "bg-blue-50",
      text: "text-blue-600",
    },
    {
      title: "Project Logs",
      value: projectLogs,
      icon: FolderKanban,
      bg: "bg-yellow-50",
      text: "text-yellow-600",
    },
    {
      title: "Today's Logs",
      value: todayLogs,
      icon: CalendarDays,
      bg: "bg-orange-50",
      text: "text-orange-600",
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
            {/* Icon - Top Left */}
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
            <div className="relative mt-[-20px] flex-1 flex flex-col items-center justify-center text-center">
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
