import { AlertTriangle, CircleCheckBig, Clock3 } from "lucide-react";

export default function PortfolioProgress({ data }) {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        border
        border-slate-100
        shadow-sm
        mt-[-10px]
        p-4
        xl:p-5
        2xl:p-6
      "
    >
      <div
        className="
          flex
          flex-col
          xl:flex-row
          xl:items-center
          xl:justify-between

          gap-6
          xl:gap-8
        "
      >
        {/* Progress Section */}

        <div className="flex-1">
          <h3
            className="
              font-semibold
              text-[#142850]

              text-[16px]
              xl:text-[18px]
              2xl:text-[22px]
              2xl:font-semibold
              2xl:tracking-wide
            "
          >
            Overall Portfolio Progress
          </h3>

          <div
            className="
              flex
              items-center

              gap-4
              xl:gap-5

              mt-4
            "
          >
            {/* Progress Bar */}

            <div
              className="
                flex-1

                h-4
                xl:h-5

                rounded-full
                bg-slate-200
                overflow-hidden
              "
            >
              <div
                className="
                  h-full
                  rounded-full

                  bg-gradient-to-r
                  from-[#1144A8]
                  via-[#2563EB]
                  to-[#2B78FF]
                "
                style={{
                  width: `${data?.overallProgress || 0}%`,
                }}
              />
            </div>

            {/* Percentage */}

            <span
              className="
                font-bold
                text-[#2563EB]

                text-[34px]
                xl:text-[44px]
                2xl:text-[52px]

                leading-none
              "
            >
              {data?.overallProgress || 0}%
            </span>
          </div>
        </div>

        {/* Summary */}

        <div
          className="
            flex
            flex-wrap
            xl:flex-nowrap

            gap-6
            xl:gap-8
            2xl:gap-12
          "
        >
          {/* Completed */}

          <div className="flex items-center gap-3">
            <div
              className="
                w-11
                h-11

                xl:w-12
                xl:h-12

                rounded-full
                bg-green-50

                flex
                items-center
                justify-center
              "
            >
              <CircleCheckBig size={24} className="text-green-600" />
            </div>

            <div>
              <h4
                className="
                  font-bold
                  text-[#142850]

                  text-[20px]
                  xl:text-[24px]
                  2xl:text-[28px]
                "
              >
                {data?.completedMilestones || 0}
              </h4>

              <p
                className="
                  text-[13px]
                  xl:text-[14px]
                  2xl:text-[15px]
                  text-[#475467]
                  font-semibold
                  2xl:tracking-wide
                "
              >
                Completed
              </p>

              <p
                className="
                  text-[12px]
                  xl:text-[13px]
                  2xl:text-[15px]
                  text-[#667085]
                  font-semibold
                  2xl:tracking-wide
                "
              >
                Milestones
              </p>
            </div>
          </div>

          {/* In Progress */}

          <div className="flex items-center gap-3">
            <div
              className="
                w-11
                h-11

                xl:w-12
                xl:h-12

                rounded-full
                bg-blue-50

                flex
                items-center
                justify-center
              "
            >
              <Clock3 size={24} className="text-blue-600" />
            </div>

            <div>
              <h4
                className="
                  font-bold
                  text-[#142850]

                  text-[20px]
                  xl:text-[24px]
                  2xl:text-[28px]
                "
              >
                {data?.inProgressMilestones || 0}
              </h4>

              <p
                className="
                  text-[13px]
                  xl:text-[14px]
                  2xl:text-[15px]
                  text-[#475467]
                  font-semibold
                "
              >
                In Progress
              </p>

              <p
                className="
                  text-[12px]
                  xl:text-[13px]
                  2xl:text-[15px]
                  text-[#667085]
                  font-semibold
                  2xl:tracking-wide
                "
              >
                Milestones
              </p>
            </div>
          </div>

          {/* Delayed */}

          <div className="flex items-center gap-3">
            <div
              className="
                w-11
                h-11

                xl:w-12
                xl:h-12

                rounded-full
                bg-orange-50

                flex
                items-center
                justify-center
                
              "
            >
              <AlertTriangle size={24} className="text-orange-600" />
            </div>

            <div>
              <h4
                className="
                  font-bold
                  text-[#142850]

                  text-[20px]
                  xl:text-[24px]
                  2xl:text-[28px]
                "
              >
                {data?.delayedMilestones || 0}
              </h4>

              <p
                className="
                  text-[13px]
                  xl:text-[14px]
                  2xl:text-[16px]
                  text-[#475467]
                  font-semibold
                "
              >
                Delayed
              </p>

              <p
                className="
                  text-[12px]
                  xl:text-[13px]
                  2xl:text-[15px]
                  text-[#667085]
                  font-semibold
                  2xl:tracking-wide
                "
              >
                Milestones
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
