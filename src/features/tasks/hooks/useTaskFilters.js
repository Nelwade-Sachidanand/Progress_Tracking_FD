import { useMemo, useState } from "react";

export default function useTaskFilters(tasks = []) {
  const [selectedMilestone, setSelectedMilestone] = useState([]);
  const [selectedPhase, setSelectedPhase] = useState("");
  const [selectedTask, setSelectedTask] = useState("");
  const [selectedSubTask, setSelectedSubTask] = useState("");
  const [selectedActivity, setSelectedActivity] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

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
          .filter((t) => !selectedPhase || t.phase === selectedPhase)
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
          .filter((t) => !selectedTask || t.task === selectedTask)
          .map((t) => t.subTask),
      ),
    ];
  }, [tasks, selectedTask]);

  const activities = useMemo(() => {
    return [
      ...new Set(
        tasks
          .filter((t) => !selectedSubTask || t.subTask === selectedSubTask)
          .map((t) => t.activity),
      ),
    ];
  }, [tasks, selectedSubTask]);
  const handlePhaseChange = (value) => {
    setSelectedPhase(value);

    setSelectedMilestone([]);
    setSelectedTask("");
    setSelectedSubTask("");
    setSelectedActivity("");
  };
  const handleTaskChange = (value) => {
    setSelectedTask(value);

    setSelectedSubTask("");
    setSelectedActivity("");
  };
  const handleSubTaskChange = (value) => {
    setSelectedSubTask(value);

    setSelectedActivity("");
  };
  // Filtered Data

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (selectedPhase && task.phase !== selectedPhase) {
        return false;
      }

      if (
        selectedMilestone.length > 0 &&
        !selectedMilestone.includes(task.milestone)
      ) {
        return false;
      }

      if (selectedTask && task.task !== selectedTask) {
        return false;
      }

      if (selectedSubTask && task.subTask !== selectedSubTask) {
        return false;
      }

      if (selectedActivity && task.activity !== selectedActivity) {
        return false;
      }

      if (selectedStatus && task.status !== selectedStatus) {
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

    setSelectedTask("");
    setSelectedSubTask("");
    setSelectedActivity("");
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
 