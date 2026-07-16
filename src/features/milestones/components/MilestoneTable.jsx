import { Save } from "lucide-react";

export default function MilestoneTable({
  milestones,
  onWeightageChange,
  onUpdate,
  loading,
}) {
  const getStatus = (progress) => {
    if (progress >= 100) {
      return {
        label: "Completed",
        className: "bg-green-100 text-green-700",
      };
    }

    if (progress > 0) {
      return {
        label: "In Progress",
        className: "bg-blue-100 text-blue-700",
      };
    }

    return {
      label: "Not Started",
      className: "bg-slate-100 text-slate-600",
    };
  };

  const totalWeightage = milestones.reduce(
    (sum, m) => sum + Number(m.weightage || 0),
    0,
  );

  const isValidWeightage = totalWeightage === 100;

  const user = JSON.parse(sessionStorage.getItem("user"));

  return (
    <div className="bg-white rounded-2xl border border-[#CDD7E3] p-5">
      {/* Header */}

      <div
        className="
    flex
    flex-col
    lg:flex-row
    lg:items-center
    lg:justify-between
    gap-4
    mb-5
    mt-[-5px]
  "
      >
        <div className="min-w-0">
          <h2
            className="
        text-lg
        sm:text-xl
        font-bold
        text-[#0B1F59]
      "
          >
            Milestone Weightage Management
          </h2>

          <p
            className="
        mt-1
        text-sm
        text-slate-600
      "
          >
            Update Milestone Weightages For The Selected Bank
          </p>
        </div>

        <div
          className="
      flex
      flex-col
      sm:flex-row
      sm:items-center
      gap-3
      lg:gap-5
      shrink-0
    "
        >
          <div
            className="
        text-sm
        font-semibold
        text-slate-600
        whitespace-nowrap
      "
          >
            Total Weightage :
            <span
              className={`ml-2 font-bold ${
                isValidWeightage ? "text-green-600" : "text-blue-600"
              }`}
            >
              {totalWeightage}%
            </span>
          </div>

          {user?.role !== "MANAGEMENT USER" && (
            <button
              onClick={onUpdate}
              disabled={loading || !isValidWeightage}
              className={`
          h-9
          sm:h-10
          px-5
          rounded-xl
          text-sm
          font-semibold
          flex
          items-center
          justify-center
          gap-2
          transition
          w-full
          sm:w-auto

          ${
            loading || !isValidWeightage
              ? "bg-slate-300 text-slate-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
          }
        `}
            >
              <Save size={16} />

              {loading ? "Updating..." : "Update Weightage"}
            </button>
          )}
        </div>
      </div>

      {/* Table */}

      <div className="overflow-x-auto rounded-2xl border border-[#CDD7E3]">
        <table className="w-full min-w-[650px]">
          <thead>
            <tr className="border-b border-[#CDD7E3] bg-blue-100"> 
              <th className="px-5 py-3 text-left text-sm lg:text-base font-semibold text-slate-700">
                Milestone
              </th>

              <th className="px-5 py-3 text-left text-sm lg:text-base font-semibold text-slate-700">
                Phase
              </th>

              <th className="w-[150px] lg:w-[180px] px-4 py-3 text-center text-sm lg:text-base font-semibold text-slate-700">
                Weightage (%)
              </th>

              <th className="w-[140px] lg:w-[180px] px-4 py-3 text-center text-sm lg:text-base font-semibold text-slate-700">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {milestones.length > 0 ? (
              milestones.map((milestone, index) => {
                const status = getStatus(milestone.progress);

                return (
                  <tr
                    key={milestone.id || index}
                    className="border-b border-[#CDD7E3]"
                  >
                    <td className="px-6 py-2">
                      <span
                        className="block truncate text-slate-700 text-sm xl:text-base font-semibold"
                        title={milestone.milestoneName}
                      >
                        {milestone.milestoneName}
                      </span>
                    </td>

                    <td className="px-5 py-2">
                      <span
                        className="block truncate text-slate-700 text-sm xl:text-base font-semibold"
                        title={milestone.phaseName}
                      >
                        {milestone.phaseName}
                      </span>
                    </td>

                    <td className="px-4 py-2">
                      <div className="flex justify-center">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={milestone.weightage}
                          onFocus={() => {
                            if (milestone.weightage === 0) {
                              onWeightageChange(index, "");
                            }
                          }}
                          onBlur={() => {
                            if (milestone.weightage === "") {
                              onWeightageChange(index, "0");
                            }
                          }}
                          onChange={(e) =>
                            onWeightageChange(index, e.target.value)
                          }
                          onWheel={(e) => e.target.blur()}
                          className="
                          h-8
                          w-20
                          sm:w-24
                          rounded-lg
                          border
                          border-[#CDD7E3]
                          text-center
                          text-sm
                          outline-none
                          focus:border-blue-500
                        "
                        />
                      </div>
                    </td>

                    <td className="px-4 py-2 text-center">
                      <span
                        className={`
                        inline-flex
                        items-center
                        justify-center
                        rounded-full
                        px-3
                        py-1
                        text-xs
                        font-semibold
                        whitespace-nowrap
                        ${status.className}
                      `}
                      >
                        {status.label}
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="py-10 text-center text-sm text-slate-500"
                >
                  No milestones found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-sm text-slate-600">
        * Total Weightage Must be Exactly <strong>100%</strong>.
      </p>
    </div>
  );
}
