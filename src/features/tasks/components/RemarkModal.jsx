import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import { updateActivity } from "../../add-task/api/editTaskApi";

export default function RemarkModal({
  isOpen,
  onClose,
  task,
  onRemarkSaved,
}) {
  const [remark, setRemark] =
    useState("");

  useEffect(() => {
    setRemark(task?.remark || "");
  }, [task]);

  if (!isOpen) return null;

  const handleSave = async () => {
    try {
      const payload = {
        projectId:
          task?.projectId,

        projectName:
          task?.projectName,

        phaseName:
          task?.phase,

        milestoneName:
          task?.milestone,

        taskName:
          task?.task,

        subTaskName:
          task?.subTask,

        activityName:
          task?.activity,

        owner:
          task?.owner,

        plannedStartDate:
          task?.plannedStartDate,

        plannedEndDate:
          task?.plannedEndDate,

        actualStartDate:
          task?.actualStartDate,

        actualEndDate:
          task?.actualEndDate,

        estimatedPeriodWeek:
          task?.estimatedPeriodWeek,

        progress:
          task?.progress,

        executionStatus:
          task?.status,

        scheduleHealth:
          task?.scheduleHealth,

        remark: remark,
      };

      console.log(
        "Remark Update Payload:",
        payload
      );

      const response =
        await updateActivity(
          payload
        );

      if (
        response?.statusType ===
        "S"
      ) {
        toast.success(
          response.statusDesc ||
            "Remark updated successfully"
        );

        onRemarkSaved?.(
          task?.id,
          remark
        );

        onClose();
      } else {
        toast.error(
          response?.statusDesc ||
            "Failed to update remark"
        );
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data
          ?.statusDesc ||
          "Failed to update remark"
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-[500px] p-6">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Task Remark
          </h2>

          <button
            onClick={onClose}
            className="cursor-pointer"
          >
            <X />
          </button>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">
            Activity
          </label>

          <input
            value={
              task?.activity || ""
            }
            disabled
            className="
              w-full
              border
              rounded-lg
              p-3
              bg-gray-100
            "
          />
        </div>

        {/* <div>
          <label className="block mb-2 font-medium">
            Remark
          </label>

          <textarea
            rows="5"
            value={remark}
            onChange={(e) =>
              setRemark(
                e.target.value
              )
            }
            className="
              w-full
              border
              rounded-lg
              p-3
              border-slate-300
              outline-none
              focus:border-blue-500
            "
            placeholder="Enter remark..."
          />
        </div> */
        }
        <div className="space-y-4">

  {/* Existing Remark */}
  <div>
    <label className="block mb-2 font-medium text-slate-700">
      Existing Remark
    </label>

    <div
      className="
      min-h-[90px]
      p-3
      rounded-xl
      border
      border-slate-200
      bg-slate-50
      text-sm
      text-slate-600
      whitespace-pre-wrap
      "
    >
      Existing remark will appear here...
    </div>
  </div>

  {/* New Remark */}
  <div>
    <label className="block mb-2 font-medium text-slate-700">
      Latest Remark
      <span className="text-red-500 ml-1">
        *
      </span>
    </label>

    <textarea
      rows="4"
      value={remark}
      onChange={(e) =>
        setRemark(e.target.value)
      }
      className="
      w-full
      border
      rounded-xl
      p-3
      border-slate-300
      outline-none
      focus:border-[#6D4AFF]
      "
      placeholder="Enter remark..."
    />
  </div>

</div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="
              border
              px-5
              py-2
              rounded-lg
              cursor-pointer
            "
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="
              bg-[#6D4AFF]
              text-white
              px-5
              py-2
              rounded-lg
              cursor-pointer
            "
          >
            Save Remark
          </button>
        </div>

      </div>
    </div>
  );
}