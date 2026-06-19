import { Building2, Flag } from "lucide-react";

export default function ActivityStatusOverview() {
  const upcomingActivities = [
    "Core Module + Functions",
    "UPI IMPS NACH",
    "ATM POS",
    "Third Party Vendor",
    "Settlement GL Transactions",
    "Timeout reversal process",
  ];

  const delayedActivities = [
    "Steering committee formation",
    "Define escalation matrix",
    "Define approval hierarchy",
    "Define timelines & milestones",
    "Resource allocation",
    "Risk identification",
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
          4
        </div>

        <h2 className="text-[20px] font-bold text-[#0B1F59]">
          Activity Status Overview
        </h2>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 gap-4">
        {/* Upcoming Activities */}
        <div
          className="
          bg-white
          border
          border-[#E9EEF5]
          rounded-xl
          overflow-hidden
          "
        >
          <div
            className="
            flex
            items-center
            justify-between
            px-4
            py-3
            bg-[#F6F7FF]
            border-b
            border-[#EEF2F7]
            "
          >
            <div className="flex items-center gap-3">
              <Building2
                size={15}
                className="text-[#6D4AFF]"
              />

              <span className="text-[14px] font-semibold text-[#334155]">
                Upcoming Activities (39)
              </span>
            </div>
          </div>

          {upcomingActivities.map((activity) => (
            <div
              key={activity}
              className="
              flex
              items-center
              justify-between
              px-4
              py-3
              border-b
              border-[#F1F5F9]
              "
            >
              <p className="text-[13px] text-[#334155] font-medium">
                {activity}
              </p>

              <span
                className="
                px-2
                py-0.5
                rounded-full
                bg-[#F2EEFF]
                text-[#8B5CF6]
                text-[10px]
                font-semibold
                "
              >
                Upcoming
              </span>
            </div>
          ))}

          <div className="px-5 py-4">
            <button className="text-[#2563EB] text-sm font-semibold">
              + 33 more
            </button>
          </div>
        </div>

        {/* Delayed Activities */}
        <div
          className="
          bg-white
          border
          border-[#E9EEF5]
          rounded-xl
          overflow-hidden
          "
        >
          <div
            className="
            flex
            items-center
            justify-between
            px-4
            py-3
            bg-[#FFF5F5]
            border-b
            border-[#FEE2E2]
            "
          >
            <div className="flex items-center gap-3">
              <Flag
                size={15}
                className="text-[#EF4444]"
              />

              <span className="text-[14px] font-semibold text-[#EF4444]">
                Delayed Activities (48)
              </span>
            </div>

            <span className="text-[13px] font-semibold text-[#EF4444]">
              +42 more
            </span>
          </div>

          {delayedActivities.map((activity) => (
            <div
              key={activity}
              className="
              flex
              items-center
              justify-between
              px-4
              py-3
              border-b
              border-[#F1F5F9]
              "
            >
              <p className="text-[13px] text-[#334155] font-medium">
                {activity}
              </p>

              <span className="text-[#EF4444] text-[13px] font-semibold">
                0%
              </span>
            </div>
          ))}

          <div className="px-5 py-4">
            <button className="text-[#EF4444] text-sm font-semibold">
              + 42 more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}