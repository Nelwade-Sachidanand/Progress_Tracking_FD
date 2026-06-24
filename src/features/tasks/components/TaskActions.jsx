import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { exportExcelReport } from "../../add-task/api/exportExcelApi";

export default function TaskActions({
  selectedPhase,
  selectedMilestone,
  selectedTask,
  selectedSubTask,
  selectedActivity,
  selectedStatus,
}) {
  const navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("user"));

  const handleExportExcel = async () => {
    try {
      const selectedProjectId = sessionStorage.getItem("selectedProjectId");

      const selectedProjectName = sessionStorage.getItem("selectedProjectName");

      const payload = {
        projectId: selectedProjectId,

        projectName: selectedProjectName,

        phaseName: selectedPhase === "All Phases" ? null : selectedPhase,

        milestoneNames:
          selectedMilestone?.length > 0 ? selectedMilestone : null,

        taskName: selectedTask === "All Tasks" ? null : selectedTask,

        subtaskName:
          selectedSubTask === "All Sub Tasks" ? null : selectedSubTask,

        activityName:
          selectedActivity === "All Activities" ? null : selectedActivity,

        executionStatus:
          selectedStatus === "All Status" ? null : selectedStatus,

        plannedStartDate: null,
        plannedEndDate: null,
      };

      // console.log("Export Payload:", payload);

      const blob = await exportExcelReport(payload);

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = `${selectedProjectName}_Report.xlsx`;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);

      toast.success("Excel downloaded successfully");
    } catch (error) {
      console.error("Export Error:", error.response?.data || error);

      toast.error(
        error.response?.data?.statusDesc || "Failed to export report",
      );
    }
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex gap-3">
        <button className="bg-[#6D4AFF] text-white px-4 py-2.5 rounded-xl text-sm font-medium">
          Generate Report
        </button>

        <button
          onClick={handleExportExcel}
          className="
            bg-[#10B981]
            text-white
            px-4
            py-2.5
            rounded-xl
            text-sm
            font-medium
            hover:bg-[#059669]
          "
        >
          Export Excel
        </button>

        <button className="bg-[#2563EB] text-white px-4 py-2.5 rounded-xl text-sm font-medium">
          Print Report
        </button>
      </div>

      {(user?.role === "ADMIN" || user?.role === "IMPLEMENTATION USER") &&
        <button
          onClick={() => navigate("add-task")}
          className="
          bg-[#6D4AFF]
          hover:bg-[#5B3DF4]
          text-white
          px-5
          py-2.5
          rounded-xl
          flex
          items-center
          gap-2
          font-medium
          shadow-sm
          cursor-pointer
        "
        >
          <Plus size={18} />
          Add Task
        </button>
      }

    </div>
  );
}
