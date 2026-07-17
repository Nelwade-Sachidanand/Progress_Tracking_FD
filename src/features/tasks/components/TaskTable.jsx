import { MessageSquare, Pencil } from "lucide-react";
export default function TaskTable({ tasks = [], onEdit, onDelete, onRemark }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";

      case "In Progress":
        return "bg-blue-100 text-blue-700";

      case "Delayed":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const user = JSON.parse(sessionStorage.getItem("user"));

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-GB").replace(/\//g, "-");
  };

  return (
    <div className="mt-5 overflow-hidden rounded-2xl border border-[#CDD7E3] bg-white shadow-sm">
      <div className="overflow-x-auto xl:overflow-visible">
        <table className="w-full min-w-[1100px] xl:min-w-full table-fixed">
          <thead>
            <tr className="border-b border-[#CDD7E3] bg-blue-100">
              <th className="w-[60px] px-3 py-4 text-left text-base font-semibold text-slate-600 whitespace-nowrap">
                Sr. No.
              </th>

              <th className="w-[22%] px-4 py-4 text-left text-base font-semibold text-slate-600">
                Activity / Task
              </th>

              <th className="w-[22%] px-4 py-4 text-left text-base font-semibold text-slate-600">
                Phase / Milestone
              </th>

              <th className="w-[15%] px-4 py-4 text-left text-base font-semibold text-slate-600">
                Date
              </th>

              <th className="w-[13%] px-4 py-4 text-left text-base font-semibold text-slate-600">
                Progress
              </th>

              <th className="w-[10%] px-4 py-4 text-left text-base font-semibold text-slate-600">
                Status
              </th>

              {["ADMIN", "MANAGEMENT USER", "IMPLEMENTATION USER"].includes(
                user?.role,
              ) && (
                  <th className="w-[60px] px-4 py-4 text-center text-base font-semibold text-slate-600">
                    Edit
                  </th>
                )}

              <th className="w-[80px] px-4 py-4 text-center text-base font-semibold text-slate-600">
                Remark
              </th>
            </tr>
          </thead>

          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <tr
                  key={`${task.activity}-${index}`}
                  className="
          border-b
          border-[#CDD7E3]
        "
                >
                  {/* Sr */}
                  <td className="px-5 py-2">
                    <span className="text-sm font-medium text-slate-700">
                      {index + 1}
                    </span>
                  </td>

                  {/* Activity */}
                  <td className="px-4 py-2">
                    <div>
                      <p
                        className="truncate text-sm font-semibold text-slate-700"
                        title={task.activity}
                      >
                        {task.activity}
                      </p>

                      <p
                        className="truncate text-sm text-slate-600"
                        title={task.task}
                      >
                        {task.task}
                      </p>
                    </div>
                  </td>

                  {/* Phase + Milestone */}
                  <td className="px-4 py-2">
                    <p
                      className="truncate text-sm font-medium text-slate-700"
                      title={task.phase}
                    >
                      {task.phase}
                    </p>

                    <p
                      className="truncate text-sm text-slate-600"
                      title={task.milestone}
                    >
                      {task.milestone}
                    </p>
                  </td>

                  {/* Dates */}
                  <td className="px-4 py-2">
                    <div className="space-y-1 text-sm">
                      {task.startDate && (
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-slate-600">Start:</span>
                          <span className="text-slate-700">
                            {formatDate(task.startDate)}
                          </span>
                        </div>
                      )}

                      {task.endDate && (
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-slate-600">End:</span>
                          <span className="text-slate-700">
                            {formatDate(task.endDate)}
                          </span>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Progress */}
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      <div className="h-2 flex-1 rounded-full bg-slate-200">
                        <div
                          className="h-2 rounded-full bg-[#6D4AFF]"
                          style={{
                            width: `${task.progress}%`,
                          }}
                        />
                      </div>

                      <span className="w-8 text-right text-sm font-semibold text-slate-700">
                        {task.progress}%
                      </span>
                    </div>
                  </td>

                  {/* Status */}
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
              ${getStatusColor(task.status)}
            `}
                    >
                      {task.status}
                    </span>
                  </td>

                  {/* Edit */}
                  {["ADMIN", "MANAGEMENT USER", "IMPLEMENTATION USER"].includes(
                    user?.role,
                  ) && (
                      <td className="px-4 py-2">
                        <div className="flex justify-center">
                          <button
                            onClick={() => onEdit?.(task)}
                            title="Edit"
                            className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  bg-blue-50
                  text-blue-600
                  transition
                  hover:bg-blue-100
                  cursor-pointer
                "
                          >
                            <Pencil size={15} />
                          </button>
                        </div>
                      </td>
                    )}

                  {/* Remark */}
                  <td className="px-4 py-2">
                    <div className="flex justify-center">
                      <button
                        onClick={() => onRemark?.(task)}
                        title="Remark"
                        className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-lg
                bg-purple-50
                text-purple-600
                transition
                hover:bg-purple-100
                cursor-pointer
              "
                      >
                        <MessageSquare size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={
                    ["ADMIN", "MANAGEMENT USER", "IMPLEMENTATION USER"].includes(
                      user?.role,
                    )
                      ? 8
                      : 7
                  }
                  className="py-14 text-center text-sm text-slate-500"
                >
                  No Tasks Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
