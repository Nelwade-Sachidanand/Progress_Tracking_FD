import { Plus } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useProjects } from "../../../context/ProjectContext";
import { exportExcelReport } from "../api/exportExcelApi";
import GenerateReportModal from "../components/GenerateReportModal";


import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableRow,
  TableCell,
  HeadingLevel,
  WidthType,
} from "docx";



import PrintReport from "../components//PrintReport";


export default function TaskActions({
  selectedPhase,
  selectedPhaseId,

  selectedMilestone,
  selectedMilestoneIds,

  selectedTask,
  selectedTaskId,

  selectedSubTask,
  selectedSubTaskId,

  selectedActivity,
  selectedActivityId,

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
  const selectedProjectId = sessionStorage.getItem("selectedProjectId");

  const project = projects.find(
    (p) => String(p.id) === String(selectedProjectId),
  );

  const allActivities =
    project?.phases?.flatMap((phase) =>
      phase.milestones?.flatMap((milestone) =>
        milestone.tasks?.flatMap((task) =>
          task.subTasks?.flatMap((subTask) =>
            subTask.activities?.map((activity) => ({
              ...activity,

              // IDs
              phaseId: phase.phaseId,
              milestoneId: milestone.milestoneId,
              taskId: task.taskId,
              subTaskId: subTask.subTaskId,
              activityId: activity.activityId,

              // Names
              phase: phase.phaseName,
              milestone: milestone.milestoneName,
              task: task.taskName,
              subTask: subTask.subTaskName,
              activityName: activity.activityName,
            })) || []
          ) || []
        ) || []
      ) || []
    ) || [];

  const selectedMilestoneNames = allActivities
    .filter((a) => selectedMilestone.includes(a.milestoneId))
    .map((a) => a.milestone)
    .filter((name, index, arr) => arr.indexOf(name) === index);

  const filteredActivities = allActivities.filter((activity) => {
    const phaseMatch =
      !selectedPhase ||
      selectedPhase === "All Phases" ||
      activity.phase === selectedPhase;

    const milestoneMatch =
      !selectedMilestone ||
      selectedMilestone.length === 0 ||
      selectedMilestone.includes(activity.milestone);

    const taskMatch =
      !selectedTask ||
      selectedTask === "All Tasks" ||
      activity.task === selectedTask;

    const subTaskMatch =
      !selectedSubTask ||
      selectedSubTask === "All Sub Tasks" ||
      activity.subTask === selectedSubTask;

    const activityMatch =
      !selectedActivity ||
      selectedActivity === "All Activities" ||
      activity.activityName === selectedActivity;

    const statusMatch =
      !selectedStatus ||
      selectedStatus === "All Status" ||
      activity.executionStatus === selectedStatus;

    const dateMatch =
      (!fromDate ||
        new Date(activity.plannedStartDate) >= new Date(fromDate)) &&
      (!toDate ||
        new Date(activity.plannedEndDate) <= new Date(toDate));

    return (
      phaseMatch &&
      milestoneMatch &&
      taskMatch &&
      subTaskMatch &&
      activityMatch &&
      statusMatch &&
      dateMatch
    );
  });




  const handleGenerate = () => {

    if (!project || !selectedProjectId) {
      toast.error("No project selected. No permission to generate report.");
      return;
    }


    if (!project.projectName) {
      toast.error("Invalid project selection.");
      return;
    }

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

        // Phase
        phaseId:
          selectedPhase === "All Phases" ? null : selectedPhaseId,
        phaseName:
          selectedPhase === "All Phases" ? null : selectedPhase,

        // Milestone
        milestoneIds:
          selectedMilestone?.length > 0 ? selectedMilestone : null,
        milestoneNames:
          selectedMilestone?.length > 0 ? selectedMilestone : null,

        // Task
        taskId:
          selectedTask === "All Tasks" ? null : selectedTaskId,
        taskName:
          selectedTask === "All Tasks" ? null : selectedTask,

        // Sub Task
        subTaskId:
          selectedSubTask === "All Sub Tasks" ? null : selectedSubTaskId,
        subTaskName:
          selectedSubTask === "All Sub Tasks" ? null : selectedSubTask,

        // Activity
        activityId:
          selectedActivity === "All Activities" ? null : selectedActivityId,
        activityName:
          selectedActivity === "All Activities" ? null : selectedActivity,

        executionStatus:
          selectedStatus === "All Status" ? null : selectedStatus,

        plannedStartDate: fromDate || null,
        plannedEndDate: toDate || null,
      };
      console.log("Payload:", payload);
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
      sessionStorage.getItem("selectedProjectName") || "Project";

    const printContent = reportRef.current.innerHTML;
    console.log("Report Ref:", reportRef.current);
    console.log("Report HTML:", reportRef.current?.innerHTML);
    const printWindow = window.open("", "_blank");

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
    try {
      if (!project) {
        toast.error("No project selected");
        return;
      }

      if (!filteredActivities || filteredActivities.length === 0) {
        toast.error("No activities found for selected filters");
        return;
      }

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
          "Planned Start",
          "Planned End",
          "Actual Start",
          "Actual End",
        ],
      ];

      filteredActivities.forEach((activity) => {
        rows.push([
          activity.phase ?? "",
          activity.milestone ?? "",
          activity.task ?? "",
          activity.subTask ?? "",
          activity.activityName ?? "",
          activity.owner ?? "",
          `${activity.progress ?? 0}%`,
          activity.executionStatus ?? "",
          activity.scheduleHealth ?? "",
          activity.plannedStartDate ?? "",
          activity.plannedEndDate ?? "",
          activity.actualStartDate ?? "",
          activity.actualEndDate ?? "",
        ]);
      });

      const csvContent = rows
        .map((row) =>
          row
            .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
            .join(",")
        )
        .join("\n");

      const blob = new Blob([csvContent], {
        type: "text/csv;charset=utf-8;",
      });

      const link = document.createElement("a");

      link.href = URL.createObjectURL(blob);

      link.download = `${project.projectName}_Report.csv`;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      URL.revokeObjectURL(link.href);

      toast.success("CSV report downloaded successfully");
    } catch (error) {
      console.error("CSV Generation Error:", error);

      toast.error("Failed to generate CSV report");
    }
  };


  const handleGenerateWord = async () => {
    try {
      if (!project) {
        toast.error("No project selected");
        return;
      }

      if (!filteredActivities || filteredActivities.length === 0) {
        toast.error("No activities found for selected filters");
        return;
      }

      const tableRows = [
        new TableRow({
          children: [
            "Phase",
            "Milestone",
            "Task",
            "Sub Task",
            "Activity",
            "Owner",
            "Progress",
            "Status",
          ].map(
            (value) =>
              new TableCell({
                children: [new Paragraph(String(value))],
              })
          ),
        }),

        ...filteredActivities.map(
          (activity) =>
            new TableRow({
              children: [
                activity.phase,
                activity.milestone,
                activity.task,
                activity.subTask,
                activity.activityName,
                activity.owner,
                `${activity.progress}%`,
                activity.executionStatus,
              ].map(
                (value) =>
                  new TableCell({
                    children: [
                      new Paragraph(String(value ?? "")),
                    ],
                  })
              ),
            })
        ),
      ];

      const doc = new Document({
        sections: [
          {
            children: [
              new Paragraph({
                text: "PROJECT PROGRESS REPORT",
                heading: HeadingLevel.HEADING_1,
              }),

              new Paragraph(""),

              new Paragraph(
                `Project : ${project.projectName}`
              ),

              new Paragraph(
                `Bank : ${project.bankName}`
              ),

              new Paragraph(
                `Generated : ${new Date().toLocaleString()}`
              ),

              new Paragraph(""),

              new Table({
                rows: tableRows,
              }),
            ],
          },
        ],
      });

      const blob = await Packer.toBlob(doc);

      saveAs(
        blob,
        `${project.projectName}_Report.docx`
      );

      toast.success("Word report downloaded successfully");
    } catch (error) {
      console.error("Word Generation Error:", error);

      toast.error("Failed to generate Word report");
    }
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
          h-10
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


      </div>

      {(user?.role === "ADMIN" || user?.role === "IMPLEMENTATION USER") && (
        <button
          onClick={() => navigate("add-task")}
          className="
          h-10
          bg-gradient-to-r
          from-[#7C3AED]
          to-[#A855F7]
          text-white
          text-sm
          px-5
          py-2.5
          rounded-xl
          flex
          items-center
          gap-1
          font-medium
          shadow-sm
          cursor-pointer
        "
        >
          <Plus size={18} />
          Add Activity
        </button>
      )}
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
        selectedMilestone={selectedMilestoneNames}
        selectedTask={selectedTask}
        selectedSubTask={selectedSubTask}
        selectedActivity={selectedActivity}
        selectedStatus={selectedStatus}
        onGenerate={handleGenerate}
      />
    </div>
  );
}
