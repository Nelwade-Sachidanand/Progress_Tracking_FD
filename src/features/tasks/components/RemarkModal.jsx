import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useProjects } from "../../../context/ProjectContext";
import { addRemark } from "../services/remarkService";

export default function RemarkModal({ isOpen, onClose, task, onRemarkSaved }) {
  const [existingRemark, setExistingRemark] = useState("");
  const [latestRemark, setLatestRemark] = useState("");

  const user = JSON.parse(sessionStorage.getItem("user"));
  const { fetchProjects } = useProjects();

  useEffect(() => {
    setExistingRemark(task?.remark || "");
    setLatestRemark("");
  }, [task]);

  if (!isOpen) return null;

  const handleSave = async () => {
    console.log("task : ", task);
    try {
      // const payload = {
      //   projectId: task?.projectId,

      //   projectName: task?.projectName,

      //   phaseName: task?.phase,

      //   milestoneName: task?.milestone,

      //   taskName: task?.task,

      //   subTaskName: task?.subTask,

      //   activityName: task?.activity,

      //   remark: latestRemark,
      // };
const payload = {
  projectId: task?.projectId,
  projectName: task?.projectName,

  phaseId: task?.phaseId,
  phaseName: task?.phaseName,

  milestoneId: task?.milestoneId,
  milestoneName: task?.milestoneName,

  taskId: task?.taskId,
  taskName: task?.taskName,

  subTaskId: task?.subTaskId,
  subTaskName: task?.subTaskName,

  activityId: task?.activityId,
  activityName: task?.activityName,

  remark: latestRemark,
};
      console.log("payload : ", payload);
      const response = await addRemark(payload);

      if (response?.statusType === "S") {
        toast.success(response.statusDesc);

        await fetchProjects(user.id);

        onRemarkSaved?.(task?.id, latestRemark);
        setExistingRemark("");
        setLatestRemark("");

        onClose();
      } else {
        toast.error(response?.statusDesc || "Failed to update remark");
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.statusDesc || "Failed to update remark",
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-[500px] p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Task Remark</h2>

          <button onClick={onClose} className="cursor-pointer">
            <X />
          </button>
        </div>

        <div className="mb-4">
          <label htmlFor="activity" className="block mb-2 font-medium">
            Activity
          </label>

          <input
            id="activity"
            value={task?.activity || ""}
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

        <div className="space-y-4">
          {/* Existing Remark */}
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
            {existingRemark || "No remarks available"}
          </div>

          {/* New Remark */}
          <div>
            <label className="block mb-2 font-medium text-slate-700">
              Latest Remark
              <span className="text-red-500 ml-1">*</span>
            </label>

            <textarea
              rows={4}
              value={latestRemark}
              onChange={(e) => setLatestRemark(e.target.value)}
              className="
              w-full
              border
              rounded-xl
              p-3
              border-slate-300
              outline-none
              focus:border-[#6D4AFF]
            "
              placeholder="Enter latest remark..."
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
