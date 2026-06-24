

import { useEffect, useState } from "react";
import { List } from "lucide-react";
import DashboardHeader from "../../../components/layout/DashboardHeader";
import TaskHeader from "../components/TaskHeader";
import TaskActions from "../components/TaskActions";
import TaskFilters from "../components/TaskFilters";
import TaskSummaryCards from "../components/TaskSummaryCards";
import TaskTable from "../components/TaskTable";
import useTaskFilters from "../hooks/useTaskFilters";
import Pagination from "../components/Pagination";
import RemarkModal from "../components/RemarkModal";
import ActiveFilters from "../components/ActiveFilters";
import { useNavigate } from "react-router-dom";

export default function AllTasksPage() {
  const [tasks, setTasks] = useState([]);

const navigate = useNavigate();
const {
  phases,
  milestones,
  taskNames,
  subTasks,
  activities,

  selectedPhase,
  setSelectedPhase,

  selectedMilestone,
  setSelectedMilestone,

  selectedTask,
  setSelectedTask,

  selectedSubTask,
  setSelectedSubTask,

  selectedActivity,
  setSelectedActivity,

  selectedStatus,
  setSelectedStatus,

  searchTerm,
  setSearchTerm,

  filteredTasks,
  handleMilestoneChange,
} = useTaskFilters(tasks);

const filteredMilestones = [
  ...new Set(
    tasks
      .filter(
        (t) =>
          selectedPhase === "All Phases" ||
          t.phase === selectedPhase
      )
      .map((t) => t.milestone)
  ),
];
const filteredTaskNames = [
  ...new Set(
    tasks
      .filter(
        (t) =>
          selectedMilestone.length === 0 ||
          selectedMilestone.includes(
            t.milestone
          )
      )
      .map((t) => t.task)
  ),
];

const filteredSubTasks = [
  ...new Set(
    tasks
      .filter(
        (t) =>
          selectedTask === "All Tasks" ||
          t.task === selectedTask
      )
      .map((t) => t.subTask)
  ),
];

const filteredActivities = [
  ...new Set(
    tasks
      .filter(
        (t) =>
          selectedSubTask ===
            "All Sub Tasks" ||
          t.subTask === selectedSubTask
      )
      .map((t) => t.activity)
  ),
];

  useEffect(() => {
    const projects =
      JSON.parse(localStorage.getItem("projects")) || [];

    console.log(projects);

    setTasks([]);
  }, []);

 const total = filteredTasks.length;

const completed = filteredTasks.filter(
  (task) => task.status === "Completed"
).length;

const delayed = filteredTasks.filter(
  (task) => task.scheduleHealth === "Delayed"
).length;

const notStarted = filteredTasks.filter(
  (task) => task.status === "Not Started"
).length;

const [currentPage, setCurrentPage] =
  useState(1);

const [selectedRemarkTask, setSelectedRemarkTask] =
  useState(null);

const [showRemarkModal, setShowRemarkModal] =
  useState(false);
  const ITEMS_PER_PAGE = 10;

const totalPages = Math.ceil(
  filteredTasks.length / ITEMS_PER_PAGE
);
// const totalPages = Math.ceil(
//   tasks.length / ITEMS_PER_PAGE
// );

const paginatedTasks =
  filteredTasks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
const clearFilters = () => {
  setSelectedPhase("All Phases");
  setSelectedMilestone([]);
  setSelectedTask("All Tasks");
  setSelectedSubTask("All Sub Tasks");
  setSelectedActivity("All Activities");
  setSelectedStatus("All Status");
  setSearchTerm("");
};
// const ITEMS_PER_PAGE = 10;

// const totalPages = Math.ceil(
//   tasks.length / ITEMS_PER_PAGE
// );
const [remark, setRemark] =
  useState("");
useEffect(() => {
  const projects =
    JSON.parse(localStorage.getItem("projects")) || [];

  const selectedProjectId =
    localStorage.getItem("selectedProjectId");

  const selectedProject = projects.find(
    (project) =>
      String(project.id) ===
      String(selectedProjectId)
  );

  if (!selectedProject) {
    setTasks([]);
    return;
  }

  const allActivities = [];

  selectedProject.phases?.forEach((phase) => {
    phase.milestones?.forEach((milestone) => {
      milestone.tasks?.forEach((task) => {
        task.subTasks?.forEach((subTask) => {
          subTask.activities?.forEach((activity) => {
           allActivities.push({
  id: activity.id,

  projectId: selectedProject.id,
  projectName: selectedProject.projectName,

  phaseName: phase.phaseName,
  milestoneName: milestone.milestoneName,
  taskName: task.taskName,
  subTaskName: subTask.subTaskName,

  activityName: activity.activityName,

  owner: activity.owner,

  estimatedPeriodWeek:
    activity.estimatedPeriodWeek,

  plannedStartDate:
    activity.plannedStartDate,

  plannedEndDate:
    activity.plannedEndDate,

  actualStartDate:
    activity.actualStartDate,

  actualEndDate:
    activity.actualEndDate,

  progress:
    activity.progress,

  executionStatus:
    activity.executionStatus,

  scheduleHealth:
    activity.scheduleHealth,

  remark:
    activity.remark || "",

  // For TaskTable display
  phase:
    phase.phaseName,

  milestone:
    milestone.milestoneName,

  task:
    task.taskName,

  subTask:
    subTask.subTaskName,

  activity:
    activity.activityName,

  status:
    activity.executionStatus,

  startDate:
    activity.actualStartDate,

  endDate:
    activity.actualEndDate,
});
          });
        });
      });
    });
  });

  setTasks(allActivities);
}, []);
  return (
    // <div className="p-6 bg-[#F5F7FB] min-h-screen ">
<div className="p-6 w-full w-[1200px]">

<div className="mb-5">
  <h1 className="text-2xl font-bold text-[#0B1F59]">
    {localStorage.getItem(
      "selectedProjectName"
    )}
  </h1>

  <p className="text-sm text-slate-500">
    Project Tasks
  </p>
</div>
       {/* <TaskHeader />  */}

      {/* <TaskActions /> */}
<TaskActions
  selectedPhase={selectedPhase}
  selectedMilestone={selectedMilestone}
  selectedTask={selectedTask}
  selectedSubTask={selectedSubTask}
  selectedActivity={selectedActivity}
  selectedStatus={selectedStatus}
/>
  <TaskFilters
  phases={phases}
  milestones={filteredMilestones}
  tasks={filteredTaskNames}
  subTasks={filteredSubTasks}
  activities={filteredActivities}

  selectedPhase={selectedPhase}
  selectedMilestone={selectedMilestone}
  selectedTask={selectedTask}
  selectedSubTask={selectedSubTask}
  selectedActivity={selectedActivity}
  selectedStatus={selectedStatus}
  searchTerm={searchTerm}

  setSelectedPhase={setSelectedPhase}
  setSelectedMilestone={setSelectedMilestone}
  setSelectedTask={setSelectedTask}
  setSelectedSubTask={setSelectedSubTask}
  setSelectedActivity={setSelectedActivity}
  setSelectedStatus={setSelectedStatus}
  setSearchTerm={setSearchTerm}

  handleMilestoneChange={
    handleMilestoneChange
  }
/>
<ActiveFilters
  selectedPhase={selectedPhase}
  selectedMilestone={selectedMilestone}
  selectedTask={selectedTask}
  selectedStatus={selectedStatus}

  setSelectedPhase={setSelectedPhase}
  setSelectedMilestone={setSelectedMilestone}
  setSelectedTask={setSelectedTask}
  setSelectedStatus={setSelectedStatus}

  clearFilters={clearFilters}
/>
      <TaskSummaryCards
        total={total}
        tasks={filteredTasks}
        completed={completed}
        delayed={delayed}
        notStarted={notStarted}
      />
{/* 
<TaskTable
  tasks={filteredTasks}
 tasks={tasks}
  onEdit={(task) => console.log(task)}
  onDelete={(task) => console.log(task)}
  onRemark={(task) => {
    setSelectedRemarkTask(task);
    setShowRemarkModal(true);
  }}
/> */}

<TaskTable
  tasks={paginatedTasks}
   onEdit={(task) =>
    navigate("/edit-task", {
      state: { task },
    })
  }
  onDelete={(task) => console.log(task)}
  onRemark={(task) => {
    setSelectedRemarkTask(task);
    setShowRemarkModal(true);
  }}
/>

 <Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  setCurrentPage={setCurrentPage}
  totalItems={filteredTasks.length}
  pageSize={10}
/>
<RemarkModal
  isOpen={showRemarkModal}
  task={selectedRemarkTask}
  remark={remark}
  setRemark={setRemark}
  onClose={() => setShowRemarkModal(false)}
  onSave={() => {
    console.log("Save Remark", remark);

    setShowRemarkModal(false);
  }}
/>

    </div>
  );
}