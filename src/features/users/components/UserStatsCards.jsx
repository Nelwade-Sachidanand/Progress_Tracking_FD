import { Check, Shield, UserRound, Users } from "lucide-react";

const UserStatsCards = ({ users = [] }) => {
  const totalUsers = users.length;

  const activeUsers = users.filter((user) => user.active).length;

  const admins = users.filter(
    (user) => user.role === "ADMIN" || user.role === "SUPER_ADMIN",
  ).length;

  const implementationUsers = users.filter(
    (user) => user.role === "IMPLEMENTATION_USER",
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
      icon: Check,
      value: activeUsers,
      title: "Active Users",
      bg: "bg-green-100",
      color: "text-green-600",
    },
    {
      icon: Shield,
      value: admins,
      title: "Administrators",
      bg: "bg-red-100",
      color: "text-red-500",
    },
    {
      icon: UserRound,
      value: implementationUsers,
      title: "Implementation User",
      bg: "bg-yellow-100",
      color: "text-yellow-500",
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
      "
    >
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="
            bg-white
            rounded-3xl
            p-4
            lg:p-5
            shadow-sm
            border
            border-[#E8EDF5]
            "
          >
            <div className="flex items-center gap-3 lg:gap-4">
              <div
                className={`
                w-12 h-12
                lg:w-14 lg:h-14
                rounded-2xl
                flex
                items-center
                justify-center
                ${item.bg}
                `}
              >
                <Icon size={24} className={item.color} />
              </div>

              <div className="min-w-0">
                <h3
                  className="
                  text-[18px]
                  lg:text-[20px]
                  font-[700]
                  text-[#0F172A]
                  2xl:text-[24px]
                  2xl:font-semibold
                  2xl:tracking-wide
                  2xl:font-[900]
                  "
                >
                  {item.value}
                </h3>

                <p
                  className="
                  text-[13px]
                  lg:text-[14px]
                  text-[#64748B]
                  2xl:text-[17px]
                  2xl:font-medium
                  2xl:tracking-wide
                  "
                >
                  {item.title}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserStatsCards;
