import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../../../components/layout/Pagination";
import { useProjects } from "../../../context/ProjectContext";
import ActiveFilters from "../components/ActiveFilters";
import RemarkModal from "../components/RemarkModal";
import TaskActions from "../components/TaskActions";
import TaskFilters from "../components/TaskFilters";
import TaskSummaryCards from "../components/TaskSummaryCards";
import TaskTable from "../components/TaskTable";
import useTaskFilters from "../hooks/useTaskFilters";

export default function AllTasksPage() {
  const { fetchProjects, projects } = useProjects();
  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    const loadProjects = async () => {
      await fetchProjects(user.id);
    };

    if (user?.id) {
      loadProjects();
    }
  }, []);

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
        .filter((t) => !selectedPhase || t.phase === selectedPhase)
        .map((t) => t.milestone),
    ),
  ];
  const filteredTaskNames = [
    ...new Set(
      tasks
        .filter(
          (t) =>
            selectedMilestone.length === 0 ||
            selectedMilestone.includes(t.milestone),
        )
        .map((t) => t.task),
    ),
  ];

  const filteredSubTasks = [
    ...new Set(
      tasks
        .filter((t) => !selectedTask || t.task === selectedTask)
        .map((t) => t.subTask),
    ),
  ];

  const filteredActivities = [
    ...new Set(
      tasks
        .filter((t) => !selectedSubTask || t.subTask === selectedSubTask)
        .map((t) => t.activity),
    ),
  ];

  const total = filteredTasks.length;

  const completed = filteredTasks.filter(
    (task) => task.status === "Completed",
  ).length;

  const delayed = filteredTasks.filter(
    (task) => task.scheduleHealth === "Delayed",
  ).length;

  const notStarted = filteredTasks.filter(
    (task) => task.status === "Not Started",
  ).length;

  const inProgress = filteredTasks.filter(
    (task) => task.status === "In Progress",
  ).length;

  const [currentPage, setCurrentPage] = useState(1);

  const [selectedRemarkTask, setSelectedRemarkTask] = useState(null);

  const [showRemarkModal, setShowRemarkModal] = useState(false);
  const ITEMS_PER_PAGE = 10;

  const totalPages = Math.ceil(filteredTasks.length / ITEMS_PER_PAGE);

  const safeCurrentPage =
    currentPage > totalPages ? totalPages : currentPage || 1;

  const paginatedTasks = filteredTasks.slice(
    (safeCurrentPage - 1) * ITEMS_PER_PAGE,
    safeCurrentPage * ITEMS_PER_PAGE,
  );

  const clearFilters = () => {
    setSelectedPhase("");
    setSelectedMilestone([]);
    setSelectedTask("");
    setSelectedSubTask("");
    setSelectedActivity("");
    setSelectedStatus("");
    setSearchTerm("");
  };

  const [remark, setRemark] = useState("");

  useEffect(() => {
    const selectedProjectId = sessionStorage.getItem("selectedProjectId");

    const selectedProject = projects.find(
      (project) => String(project.id) === String(selectedProjectId),
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

                estimatedPeriodWeek: activity.estimatedPeriodWeek,

                plannedStartDate: activity.plannedStartDate,

                plannedEndDate: activity.plannedEndDate,

                actualStartDate: activity.actualStartDate,

                actualEndDate: activity.actualEndDate,

                progress: activity.progress,

                executionStatus: activity.executionStatus,

                scheduleHealth: activity.scheduleHealth,

                remark: activity.remark || "",

                // For TaskTable display
                phase: phase.phaseName,

                milestone: milestone.milestoneName,

                task: task.taskName,

                subTask: subTask.subTaskName,

                activity: activity.activityName,

                status: activity.executionStatus,

                startDate: activity.actualStartDate,

                endDate: activity.actualEndDate,
              });
            });
          });
        });
      });
    });

    setTasks(allActivities);
  }, [projects]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedPhase,
    selectedMilestone,
    selectedTask,
    selectedSubTask,
    selectedActivity,
    selectedStatus,
    searchTerm,
  ]);

  return (
    // <div className="p-6 bg-[#F5F7FB] min-h-screen ">
    <div className="p-6 w-full w-[1200px]">
      {/* <TaskHeader /> */}

      <TaskSummaryCards
        total={total}
        tasks={filteredTasks}
        completed={completed}
        delayed={delayed}
        notStarted={notStarted}
        inProgress={inProgress}
      />

      <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5">
        <div className="mb-1 flex items-center justify-between mt-[-7px]">
          <div>
            <h2 className="text-lg font-semibold text-[#0B1F59]">
              Task Filters
            </h2>

            <p className="text-sm text-slate-500">
              Filter Project Tasks Using The Criteria Below.
            </p>
          </div>

          <TaskActions
            selectedPhase={selectedPhase}
            selectedMilestone={selectedMilestone}
            selectedTask={selectedTask}
            selectedSubTask={selectedSubTask}
            selectedActivity={selectedActivity}
            selectedStatus={selectedStatus}
          />
        </div>

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
        />
      </div>

      <ActiveFilters
        selectedPhase={selectedPhase}
        selectedMilestone={selectedMilestone}
        selectedTask={selectedTask}
        selectedSubTask={selectedSubTask}
        selectedActivity={selectedActivity}
        selectedStatus={selectedStatus}
        setSelectedPhase={setSelectedPhase}
        setSelectedMilestone={setSelectedMilestone}
        setSelectedTask={setSelectedTask}
        setSelectedSubTask={setSelectedSubTask}
        setSelectedActivity={setSelectedActivity}
        setSelectedStatus={setSelectedStatus}
        clearFilters={clearFilters}
      />

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
        currentPage={safeCurrentPage}
        totalPages={totalPages}
        totalRecords={filteredTasks.length}
        recordsPerPage={ITEMS_PER_PAGE}
        label="tasks"
        onPageChange={setCurrentPage}
      />

      <RemarkModal
        isOpen={showRemarkModal}
        task={selectedRemarkTask}
        remark={remark}
        setRemark={setRemark}
        onClose={() => setShowRemarkModal(false)}
        onSave={() => {
          // console.log("Save Remark", remark);

          setShowRemarkModal(false);
        }}
      />
    </div>
  );
}
