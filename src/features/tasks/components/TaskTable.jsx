import { Pencil, Trash2, MessageSquare } from "lucide-react";

export default function TaskTable({
  tasks = [],
  onEdit,
  onDelete,
  onRemark,
}) {
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


  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <table className="w-full">

        <thead className="bg-[#F8FAFC] border-b">

          <tr>
            <th className="p-4 text-left">#</th>

            <th className="px-4 py-3 text-left text-[14px] font-bold text-[#0F172A]">
              ACTIVITY / TASK
            </th>

            <th className="px-4 py-3 text-left text-[14px] font-bold text-[#0F172A]">
              PHASE
            </th>

            <th className="px-4 py-3 text-left text-[14px] font-bold text-[#0F172A]">
              MILESTONE
            </th>


            <th className="px-4 py-3 text-left text-[14px] font-bold text-[#0F172A] min-w-[120px]">
              START DATE
            </th>

            <th className="px-4 py-3 text-left text-[14px] font-bold text-[#0F172A] min-w-[120px]">
              END DATE
            </th>

            <th className="px-4 py-3 text-left text-[14px] font-bold text-[#0F172A]">
              PROGRESS
            </th>

            <th className="px-4 py-3 text-left text-[14px] font-bold text-[#0F172A]">
              STATUS
            </th>

            {["ADMIN", "MANAGEMENT USER", "IMPLEMENTATION USER"].includes(user?.role) &&
              <th className="px-4 py-3 text-left text-[14px] font-bold text-[#0F172A]">
                ACTIONS
              </th>
            }

            <th className="px-4 py-3 text-left text-[14px] font-bold text-[#0F172A]">
              REMARK
            </th>
          </tr>

        </thead>

        <tbody>

          {tasks.length > 0 ? (
            tasks.map((task, index) => (

              <tr
                key={`${task.activity}-${index}`}
                // key={task.id}
                className="
                border-t
                border-[#EAEFF5]
                hover:bg-[#F8FAFC]
                "
              >
                <td className="p-4">
                  {index + 1}
                </td>

                <td className="p-4">
                  <div>
                    <p className="text-[13px] font-semibold text-[#0F172A]">
                      {task.activity}
                    </p>

                    <p className="text-[11px] text-[#94A3B8] mt-1">
                      {task.task}
                    </p>
                  </div>
                </td>

                <td className="p-4">
                  <p className="text-[13px] font-semibold text-[#0F172A]">
                    {task.phase}
                  </p>

                </td>

                <td className="p-4">
                  <p className="text-[13px] font-semibold text-[#0F172A]">
                    {task.milestone}
                  </p>

                </td>

                <td className="p-4 whitespace-nowrap">
                  <p className="text-[13px] font-semibold text-[#0F172A]">
                    {task.startDate}
                  </p>
                </td>

                <td className="p-4 whitespace-nowrap">
                  <p className="text-[13px] font-semibold text-[#0F172A]">
                    {task.endDate}
                  </p>
                </td>

                {/* Progress */}
                <td className="p-4 min-w-[180px]">

                  <div className="flex items-center gap-3">

                    <div className="w-full bg-gray-200 rounded-full h-2">

                      <div
                        className="bg-[#6D4AFF] h-2 rounded-full"
                        style={{
                          width: `${task.progress}%`,
                        }}
                      />

                    </div>

                    <span className="text-sm font-medium">
                      {task.progress}%
                    </span>

                  </div>

                </td>

                {/* Status */}
                <td className="p-4">
                  <span
                    className={`
                    inline-block
                    min-w-[95px]
                    text-center
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    font-semibold
                    whitespace-nowrap
                    ${getStatusColor(task.status)}
                  `}
                  >
                    {task.status}
                  </span>
                </td>
                {/* Actions */}
                {["ADMIN", "MANAGEMENT USER", "IMPLEMENTATION USER"].includes(user?.role) && (
                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => onEdit?.(task)}
                        className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 cursor-pointer"
                      >
                        <Pencil
                          size={16}
                          className="text-blue-600"
                        />
                      </button>
                    </div>
                  </td>
                )}

                {/* Remark */}
                <td className="p-4">

                  <div className="flex justify-center">

                    <button
                      onClick={() => onRemark?.(task)}
                      className="p-2 rounded-lg bg-purple-50 hover:bg-purple-100 cursor-pointer"
                    >
                      <MessageSquare
                        size={16}
                        className="text-[#6D4AFF]"
                      />
                    </button>

                  </div>

                </td>

              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="10"
                className="text-center p-10 text-gray-500"
              >
                No Tasks Found
              </td>
            </tr>
          )}

        </tbody>

      </table>

    </div>
  );
}