import {
  Briefcase,
  HardHat,
  ShieldCheck,
  UserCheck,
  Users,
} from "lucide-react";
const UserStatsCards = ({ users = [] }) => {
  const totalUsers = users.length;

  const activeUsers = users.filter((user) => user.status).length;

  const admins = users.filter(
    (user) => user.role === "ADMIN" || user.role === "SUPER_ADMIN",
  ).length;

  const implementationUsers = users.filter(
    (user) => user.role === "IMPLEMENTATION USER",
  ).length;

  const managementUsers = users.filter(
    (user) => user.role === "MANAGEMENT USER",
  ).length;

  const stats = [
    {
      icon: Users,
      value: totalUsers,
      title: "Total Users",
      bg: "bg-purple-100",
      color: "text-purple-600",
    },
    {
      icon: UserCheck,
      value: activeUsers,
      title: "Active Users",
      bg: "bg-green-100",
      color: "text-green-600",
    },
    {
      icon: ShieldCheck,
      value: admins,
      title: "Administrators",
      bg: "bg-red-100",
      color: "text-red-500",
    },
    {
      icon: HardHat,
      value: implementationUsers,
      title: "Implementation Users",
      bg: "bg-yellow-100",
      color: "text-yellow-500",
    },
    {
      icon: Briefcase,
      value: managementUsers,
      title: "Management Users",
      bg: "bg-blue-100",
      color: "text-blue-500",
    },
  ];

  return (
    <div
      className="
      grid
      grid-cols-2
      sm:grid-cols-3
      xl:grid-cols-5
      gap-5
      mt-[-10px]
    "
    >
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="
            bg-white
            rounded-2xl
            border
            border-[#CDD7E3]
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

              ${item.bg}
            `}
            >
              <Icon className={`${item.color} w-5 h-5`} />
            </div>

            {/* Value & Title */}
            <div className="relative mt-[-30px] flex-1 flex flex-col items-center justify-center text-center">
              <h2
                className="
                text-xl
                2xl:text-[37px]
                xl:text-[35px]
                font-bold
                text-[#142850]
                leading-none
              "
              >
                {item.value}
              </h2>

              <p
                className="
                mt-2
                text-sm
                xl:text-[16px]
                2xl:text-[18px]
                font-medium
                text-slate-600
                leading-snug
              "
              >
                {item.title}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserStatsCards;
