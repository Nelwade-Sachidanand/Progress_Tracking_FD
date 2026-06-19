import {
  Cloud,
  Database,
  GraduationCap,
  ClipboardCheck,
  ShieldCheck,
  CalendarDays,
} from "lucide-react";

export default function GoLiveReadiness() {
  const readinessData = [
    {
      title: "Infrastructure Readiness",
      value: 20,
      color: "#2563EB",
      icon: Cloud,
      iconBg: "#EEF4FF",
      iconColor: "#2563EB",
    },
    {
      title: "Data Migration Readiness",
      value: 0,
      color: "#6366F1",
      icon: Database,
      iconBg: "#EEF2FF",
      iconColor: "#6366F1",
    },
    {
      title: "Training Readiness",
      value: 0,
      color: "#EF4444",
      icon: GraduationCap,
      iconBg: "#FEF2F2",
      iconColor: "#EF4444",
    },
    {
      title: "UAT Readiness",
      value: 0,
      color: "#16A34A",
      icon: ClipboardCheck,
      iconBg: "#F0FDF4",
      iconColor: "#16A34A",
    },
    {
      title: "Compliance & Audit Readiness",
      value: 0,
      color: "#2563EB",
      icon: ShieldCheck,
      iconBg: "#EFF6FF",
      iconColor: "#2563EB",
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#E5EAF2] p-5">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="
          w-8
          h-8
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
          6
        </div>

        <h2 className="text-[20px] font-bold text-[#0B1F59]">
          Go-Live Readiness
        </h2>
      </div>

      {/* Content */}
      <div className="grid grid-cols-[240px_1fr_280px] gap-6">
        {/* Circular Readiness */}
        <div className="flex justify-center items-center">
          <div className="relative w-[190px] h-[190px]">
            <svg
              className="w-full h-full rotate-[-90deg]"
              viewBox="0 0 120 120"
            >
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="#E9EDF5"
                strokeWidth="10"
              />

              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="#EF4444"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 52}`}
                strokeDashoffset={`${
                  2 * Math.PI * 52 * (1 - 0.04)
                }`}
              />
            </svg>

            <div
              className="
              absolute
              inset-0
              flex
              flex-col
              items-center
              justify-center
              "
            >
              <h3
                className="
                text-[40px]
                font-bold
                leading-none
                text-[#0B1F59]
                "
              >
                4%
              </h3>

              <p
                className="
                text-center
                text-[11px]
                font-medium
                text-[#334155]
                mt-2
                "
              >
                Overall
                <br />
                Readiness
              </p>

              <span
                className="
                mt-3
                px-4
                py-1
                rounded-full
                bg-[#FEE2E2]
                text-[#EF4444]
                text-[10px]
                font-semibold
                "
              >
                Critical
              </span>
            </div>
          </div>
        </div>

        {/* Progress Items */}
        <div className="space-y-6">
          {readinessData.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.title}>
                <div className="flex items-center gap-4 mb-2">
                  <div
                    className="
                    w-10
                    h-10
                    rounded-full
                    flex
                    items-center
                    justify-center
                    "
                    style={{
                      backgroundColor: item.iconBg,
                    }}
                  >
                    <Icon
                      size={18}
                      color={item.iconColor}
                    />
                  </div>

                  <div className="flex-1">
                    <p
                      className="
                      text-[14px]
                      font-semibold
                      text-[#0B1F59]
                      "
                    >
                      {item.title}
                    </p>

                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex-1">
                        <div
                          className="
                          h-[8px]
                          rounded-full
                          bg-[#EEF2F7]
                          overflow-hidden
                          "
                        >
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${item.value}%`,
                              backgroundColor:
                                item.color,
                            }}
                          />
                        </div>
                      </div>

                      <span
                        className="
                        text-[14px]
                        font-bold
                        text-[#0B1F59]
                        min-w-[40px]
                        text-right
                        "
                      >
                        {item.value}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Cards */}
        <div className="space-y-4">
          {/* Readiness Summary */}
          <div
            className="
            bg-[#F8FAFF]
            border
            border-[#E8EDF5]
            rounded-2xl
            overflow-hidden
            "
          >
            <div className="px-5 py-4 bg-[#F4F7FD]">
              <h3
                className="
                text-[15px]
                font-bold
                text-[#0B1F59]
                "
              >
                Readiness Summary
              </h3>
            </div>

            <div className="p-5 space-y-4">
              <div className="flex justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-[#16A34A]" />
                  <span className="text-sm">
                    Completed
                  </span>
                </div>

                <span className="font-bold">
                  7
                </span>
              </div>

              <div className="flex justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-[#2563EB]" />
                  <span className="text-sm">
                    In Progress
                  </span>
                </div>

                <span className="font-bold">
                  1
                </span>
              </div>

              <div className="flex justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                  <span className="text-sm">
                    Not Started
                  </span>
                </div>

                <span className="font-bold">
                  91
                </span>
              </div>

              <div className="border-t pt-4 flex justify-between">
                <span
                  className="
                  font-semibold
                  text-[#334155]
                  "
                >
                  Total Activities
                </span>

                <span className="font-bold">
                  99
                </span>
              </div>
            </div>
          </div>

          {/* Target Go Live */}
          <div
            className="
            bg-[#F8FAFF]
            border
            border-[#E8EDF5]
            rounded-2xl
            p-5
            "
          >
            <div className="flex gap-4">
              <CalendarDays
                size={26}
                className="text-[#4F46E5]"
              />

              <div>
                <p
                  className="
                  text-sm
                  font-semibold
                  text-[#334155]
                  "
                >
                  Target Go-Live
                </p>

                <h3
                  className="
                  text-[18px]
                  font-bold
                  text-[#0B1F59]
                  mt-1
                  "
                >
                  30 Sep 2026
                </h3>

                <p
                  className="
                  text-[#2563EB]
                  text-sm
                  font-semibold
                  mt-1
                  "
                >
                  77 days to go
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}