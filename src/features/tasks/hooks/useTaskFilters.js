import { useMemo, useState } from "react";

export default function useTaskFilters(tasks = []) {
  const [selectedPhase, setSelectedPhase] = useState("All Phases");

  const [selectedMilestone, setSelectedMilestone] = useState([]);
  const [selectedTask, setSelectedTask] = useState("All Tasks");

  const [selectedSubTask, setSelectedSubTask] = useState("All Sub Tasks");

  const [selectedActivity, setSelectedActivity] = useState("All Activities");

  const [selectedStatus, setSelectedStatus] = useState("All Status");

  const [searchTerm, setSearchTerm] = useState("");

  // Dropdown Values

  const phases = useMemo(
    () => [...new Set(tasks.map((t) => t.phase))],
    [tasks],
  );

  const milestones = useMemo(() => {
    return [
      ...new Set(
        tasks
          .filter(
            (t) => selectedPhase === "All Phases" || t.phase === selectedPhase,
          )
          .map((t) => t.milestone),
      ),
    ];
  }, [tasks, selectedPhase]);

  const taskNames = useMemo(() => {
    return [
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
  }, [tasks, selectedMilestone]);
  const subTasks = useMemo(() => {
    return [
      ...new Set(
        tasks
          .filter(
            (t) => selectedTask === "All Tasks" || t.task === selectedTask,
          )
          .map((t) => t.subTask),
      ),
    ];
  }, [tasks, selectedTask]);

  const activities = useMemo(() => {
    return [
      ...new Set(
        tasks
          .filter(
            (t) =>
              selectedSubTask === "All Sub Tasks" ||
              t.subTask === selectedSubTask,
          )
          .map((t) => t.activity),
      ),
    ];
  }, [tasks, selectedSubTask]);
  const handlePhaseChange = (value) => {
    setSelectedPhase(value);

    setSelectedMilestone([]);
    setSelectedTask("All Tasks");
    setSelectedSubTask("All Sub Tasks");
    setSelectedActivity("All Activities");
  };
  const handleTaskChange = (value) => {
    setSelectedTask(value);

    setSelectedSubTask("All Sub Tasks");
    setSelectedActivity("All Activities");
  };
  const handleSubTaskChange = (value) => {
    setSelectedSubTask(value);

    setSelectedActivity("All Activities");
  };
  // Filtered Data

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (selectedPhase !== "All Phases" && task.phase !== selectedPhase) {
        return false;
      }

      if (
        selectedMilestone.length > 0 &&
        !selectedMilestone.includes(task.milestone)
      ) {
        return false;
      }

      if (selectedTask !== "All Tasks" && task.task !== selectedTask) {
        return false;
      }

      if (
        selectedSubTask !== "All Sub Tasks" &&
        task.subTask !== selectedSubTask
      ) {
        return false;
      }

      if (
        selectedActivity !== "All Activities" &&
        task.activity !== selectedActivity
      ) {
        return false;
      }

      if (selectedStatus !== "All Status" && task.status !== selectedStatus) {
        return false;
      }

      const search = searchTerm.toLowerCase();

      if (
        searchTerm &&
        !(
          task.activity?.toLowerCase().includes(search) ||
          task.task?.toLowerCase().includes(search) ||
          task.phase?.toLowerCase().includes(search) ||
          task.milestone?.toLowerCase().includes(search)
        )
      ) {
        return false;
      }

      return true;
    });
  }, [
    tasks,
    selectedPhase,
    selectedMilestone,
    selectedTask,
    selectedSubTask,
    selectedActivity,
    selectedStatus,
    searchTerm,
  ]);
  const handleMilestoneChange = (milestone) => {
    setSelectedMilestone((prev) =>
      prev.includes(milestone)
        ? prev.filter((m) => m !== milestone)
        : [...prev, milestone],
    );

    setSelectedTask("All Tasks");
    setSelectedSubTask("All Sub Tasks");
    setSelectedActivity("All Activities");
  };
  return {
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
  };
}
