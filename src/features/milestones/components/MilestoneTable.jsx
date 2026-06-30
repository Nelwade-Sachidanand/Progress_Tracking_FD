import { Save } from "lucide-react";

// import {updateMilestoneWeightages} from "../services/milestoneService";

export default function MilestoneTable({
  milestones,
  onWeightageChange,
  onUpdate,
  loading,
}) {
  const getStatus = (progress) => {
    if (progress >= 100)
      return {
        label: "Completed",
        className: "bg-green-100 text-green-700",
      };

    if (progress > 0)
      return {
        label: "In Progress",
        className: "bg-blue-100 text-blue-700",
      };

    return {
      label: "Not Started",
      className: "bg-slate-100 text-slate-600",
    };
  };

  const totalWeightage = milestones.reduce(
    (sum, milestone) => sum + (Number(milestone.weightage) || 0),
    0,
  );

  const isValidWeightage = totalWeightage === 100;

  const user = JSON.parse(sessionStorage.getItem("user"));

  return (
    <div
      className="
            bg-white
            border
            border-[#E2E8F0]
            rounded-2xl
            p-4
            xl:p-6
            2xl:p-8
            shadow-sm
            "
    >
      {/* Header */}

      <div
        className="
                flex
                flex-col
                lg:flex-row
                lg:items-center
                lg:justify-between
                gap-4
                mb-6
                "
      >
        <div>
          <h2
            className="
                        text-xl
                        xl:text-2xl
                        2xl:text-3xl
                        font-bold
                        text-[#0B1F59]
                        "
          >
            Milestone Weightage Management
          </h2>

          <p
            className="
                        text-sm
                        xl:text-base
                        text-slate-500
                        mt-1
                          "
          >
            Update milestone weightages for the selected bank
          </p>
        </div>

        <div
          className="
          flex
          justify-end
          mt-2
        "
        >
          <div
            className="
            px-5
            py-3
          "
          >
            <h4
              className="
            text-[#0B1F59]
            text-base
            xl:text-lg
            2xl:text-xl
            font-semibold
            tracking-wide
          "
            >
              Total Weightage :
              <span
                className="
                ml-2
                text-blue-600
                font-bold
              "
              >
                {totalWeightage}%
              </span>
            </h4>
          </div>
        </div>

        {user?.role !== "MANAGEMENT USER" && (
          <button
            onClick={onUpdate}
            disabled={loading || !isValidWeightage}
            className={`
          h-11
          xl:h-12
          px-5
          xl:px-6
          rounded-xl
          text-sm
          xl:text-base
          font-medium
          flex
          items-center
          gap-2
          transition
          self-start
          lg:self-auto

          ${
            loading || !isValidWeightage
              ? "bg-slate-300 text-slate-500 cursor-not-allowed"
              : "bg-[#2563EB] hover:bg-[#1D4ED8] text-white cursor-pointer"
          }
        `}
          >
            <Save size={18} />

            {loading ? "Updating..." : "Update Weightage"}
          </button>
        )}
      </div>

      {/* Table */}

      <div
        className="
                border
                border-[#E2E8F0]
                rounded-2xl
                overflow-hidden
                overflow-x-auto
                "
      >
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="bg-[#F8FAFC]">
              <th className="w-[50%] px-4 py-4 text-left text-sm font-semibold text-[#0B1F59]">
                Milestone Name
              </th>

              <th className="w-[20%] px-4 py-4 text-center text-sm font-semibold text-[#0B1F59]">
                Weightage (%)
              </th>

              <th className="w-[15%] px-4 py-4 text-center text-sm font-semibold text-[#0B1F59]">
                Status
              </th>

              {/* <th className="w-[15%] px-4 py-4 text-center text-sm font-semibold text-[#0B1F59]">
                                Save
                            </th> */}
            </tr>
          </thead>

          <tbody>
            {milestones.map((milestone, index) => {
              const status = getStatus(milestone.progress);

              return (
                <tr
                  key={milestone.id || index}
                  className="
                                        border-t
                                        border-[#E2E8F0]
                                        hover:bg-slate-50
                                        "
                >
                  <td
                    className="
                                            px-4
                                            py-4
                                            text-sm
                                            xl:text-base
                                            text-[#0B1F59]
                                            font-medium
                                        "
                  >
                    <div
                      className="
                                                max-w-[500px]
                                                truncate
                                                "
                      title={milestone.milestoneName}
                    >
                      {milestone.milestoneName}
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex justify-center">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={milestone.weightage}
                        onChange={(e) =>
                          onWeightageChange(index, e.target.value)
                        }
                        className="
                                                    w-[80px]
                                                    xl:w-[100px]
                                                    2xl:w-[120px]
                                                    h-10
                                                    xl:h-11
                                                    rounded-lg
                                                    border
                                                    border-[#CBD5E1]
                                                    px-3
                                                    text-center
                                                    outline-none
                                                    focus:border-[#2563EB]
                                                    focus:ring-2
                                                    focus:ring-blue-100
                                                "
                      />
                    </div>
                  </td>

                  <td className="text-center">
                    <span
                      className={`
                                                inline-flex
                                                items-center
                                                px-3
                                                py-1
                                                rounded-full
                                                text-xs
                                                font-medium
                                                ${status.className}
                                            `}
                    >
                      {status.label}
                    </span>
                  </td>
                </tr>
              );
            })}

            {/* <WeightageSummary milestones={milestones} /> */}
          </tbody>
        </table>
      </div>

      <p
        className="
                mt-4
                text-sm
                text-slate-500
                "
      >
        * Total weightage must equal 100%
      </p>
    </div>
  );
}
