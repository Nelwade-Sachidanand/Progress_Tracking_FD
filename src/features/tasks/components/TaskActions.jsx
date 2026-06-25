import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { exportExcelReport } from "../../add-task/api/exportExcelApi";
import { useRef } from "react";
import { useProjects } from "../../../context/ProjectContext";
import GenerateReportModal from "../components/GenerateReportModal";
import { useState } from "react";



import PrintReport from "../components//PrintReport";

export default function TaskActions({
  selectedPhase,
  selectedMilestone,
  selectedTask,
  selectedSubTask,
  selectedActivity,
  selectedStatus,
}) {
  const navigate = useNavigate();
  const [showReportModal, setShowReportModal] = useState(false);

const [reportType, setReportType] = useState("pdf");

const [fromDate, setFromDate] = useState("");

const [toDate, setToDate] = useState("");

  const user = JSON.parse(sessionStorage.getItem("user"));
 const reportRef = useRef(null);
const { projects } = useProjects();
const selectedProjectId =
  sessionStorage.getItem(
    "selectedProjectId"
  );

const project =
  projects.find(
    p =>
      String(p.id) ===
      String(selectedProjectId)
  );

  console.log("Selected Project ID:", selectedProjectId);
console.log("Projects:", projects);
console.log("Project:", project);
console.log("Project Phases:", project?.phases);
const handleGenerate = () => {
  switch (reportType) {
    case "pdf":
      handleGeneratePdf();
      break;

    case "excel":
      handleExportExcel();
      break;

    case "csv":
      handleGenerateCsv();
      break;

    case "word":
      handleGenerateWord();
      break;

    default:
      toast.error("Please select report format");
      return;
  }

  setShowReportModal(false);
};
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

        plannedStartDate: fromDate || null,
plannedEndDate: toDate || null,
      };

      console.log("Export Payload:", payload);

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
      try {
        if (error.response?.data instanceof Blob) {
          const text = await error.response.data.text();
          const errorData = JSON.parse(text);

          toast.error(errorData.statusDesc || "Failed to export report");
        } else {
          toast.error(
            error.response?.data?.statusDesc || "Failed to export report",
          );
        }
      } catch {
        toast.error("Failed to export report");
      }
    }
  };
const handlePrintReport = () => {
  if (!reportRef.current) {
    toast.error("Nothing to print");
    return;
  }

  const projectName =
    sessionStorage.getItem("selectedProjectName") ||
    "Project";

  const printContent =
    reportRef.current.innerHTML;
console.log("Report Ref:", reportRef.current);
console.log("Report HTML:", reportRef.current?.innerHTML);
  const printWindow = window.open(
    "",
    "_blank"
  );

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${projectName} - Project Report</title>

        <style>

          body{
            font-family:Arial,sans-serif;
            margin:30px;
            color:#1E293B;
          }

          h1{
            text-align:center;
            margin-bottom:20px;
          }

          h2{
            margin-top:25px;
            color:#2563EB;
          }

          table{
            width:100%;
            border-collapse:collapse;
            margin-top:12px;
          }

          th{
            background:#2563EB;
            color:white;
            border:1px solid #CBD5E1;
            padding:8px;
          }

          td{
            border:1px solid #CBD5E1;
            padding:8px;
          }

          tr:nth-child(even){
            background:#F8FAFC;
          }

        </style>

      </head>

      <body>

        ${printContent}

      </body>

    </html>
  `);

  printWindow.document.close();

  printWindow.focus();

  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 500);
};

const handleGeneratePdf = () => {
  if (!reportRef.current) {
    toast.error("Nothing to print");
    return;
  }

  const projectName =
    sessionStorage.getItem("selectedProjectName") || "Project";

  const printContent = reportRef.current.innerHTML;

  const printWindow = window.open("", "_blank");

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${projectName}</title>
        <style>
          body{
            font-family:Arial,sans-serif;
            margin:30px;
          }

          table{
            width:100%;
            border-collapse:collapse;
          }

          th,td{
            border:1px solid #ccc;
            padding:8px;
          }

          th{
            background:#2563EB;
            color:white;
          }
        </style>
      </head>

      <body>
        ${printContent}
      </body>
    </html>
  `);

  printWindow.document.close();

  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 500);
};
const handleGenerateCsv = () => {
  const rows = [
    [
      "Phase",
      "Milestone",
      "Task",
      "Sub Task",
      "Activity",
      "Owner",
      "Progress",
      "Status",
      "Schedule Health",
    ],
  ];

  filteredActivities.forEach((activity) => {
    rows.push([
      activity.phase,
      activity.milestone,
      activity.task,
      activity.subTask,
      activity.activityName,
      activity.owner,
      activity.progress,
      activity.executionStatus,
      activity.scheduleHealth,
    ]);
  });

  const csv = rows.map((row) => row.join(",")).join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const link = document.createElement("a");

  link.href = URL.createObjectURL(blob);

  link.download = `${project.projectName}.csv`;

  link.click();

  URL.revokeObjectURL(link.href);

  toast.success("CSV downloaded successfully");
};

const handleGenerateWord = () => {
   // call Word generator
};
 return (
  <div
    className="
    flex
    flex-col
    lg:flex-row
    lg:items-center
    lg:justify-between
    gap-4
    mb-3
    cursor-pointer
    "
  >
    {/* Action Buttons */}
    <div
      className="
      flex
      flex-wrap
      gap-3
      w-full
      lg:w-auto
      "
    >
      <button
  onClick={() => setShowReportModal(true)}
  className="
    bg-[#6D4AFF]
    hover:bg-[#5B3DF4]
    text-white
    px-4
    py-2.5
    rounded-xl
    text-sm
    font-medium
    cursor-pointer
  "
>
  Generate Report
</button>

      {/* <button
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
        flex-1
        sm:flex-none
        cursor-pointer
        "
        
      >
        Export Excel
      </button> */}

   {/* <button
 onClick={handlePrintReport}
  className="
  bg-[#2563EB]
  text-white
  px-4
  py-2.5
  rounded-xl
  "
>
  Print Report
</button> */}
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
<div
  ref={reportRef}
  style={{
    position: "absolute",
    left: "-9999px",
    top: 0,
  }}
>
<PrintReport
  project={project}
  selectedPhase={selectedPhase}
  selectedMilestone={selectedMilestone}
  selectedTask={selectedTask}
  selectedSubTask={selectedSubTask}
  selectedActivity={selectedActivity}
  selectedStatus={selectedStatus}
  fromDate={fromDate}
  toDate={toDate}
/>
</div>
<GenerateReportModal
  isOpen={showReportModal}
  onClose={() => setShowReportModal(false)}

  reportType={reportType}
  setReportType={setReportType}

  fromDate={fromDate}
  setFromDate={setFromDate}

  toDate={toDate}
  setToDate={setToDate}

  selectedProject={project?.projectName}

  selectedPhase={selectedPhase}
  selectedMilestone={selectedMilestone}
  selectedTask={selectedTask}
  selectedSubTask={selectedSubTask}
  selectedActivity={selectedActivity}
  selectedStatus={selectedStatus}

  onGenerate={handleGenerate}
/>
    </div>
  );
} 