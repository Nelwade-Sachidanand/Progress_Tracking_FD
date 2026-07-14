import { useMemo, useState } from "react";

export default function useDocumentFilters(documents = []) {
  const [selectedMilestone, setSelectedMilestone] = useState([]);
  const [selectedPhase, setSelectedPhase] = useState("");
  const [selectedTask, setSelectedTask] = useState("");
  const [selectedSubTask, setSelectedSubTask] = useState("");
  const [selectedActivity, setSelectedActivity] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  /* Dropdown Values */

  const phases = useMemo(() => {
    const map = new Map();

    documents.forEach((d) => {
      map.set(d.phaseId, {
        label: d.phase,
        value: d.phaseId,
      });
    });

    return [...map.values()];
  }, [documents]);

  const milestones = useMemo(() => {
    const map = new Map();

    documents
      .filter((d) => !selectedPhase || d.phaseId === selectedPhase)
      .forEach((d) => {
        map.set(d.milestoneId, {
          label: d.milestone,
          value: d.milestoneId,
        });
      });

    return [...map.values()];
  }, [documents, selectedPhase]);

  const tasks = useMemo(() => {
    const map = new Map();

    documents
      .filter(
        (d) =>
          selectedMilestone.length === 0 ||
          selectedMilestone.includes(d.milestoneId)
      )
      .forEach((d) => {
        const milestoneCode = d.milestone.split(" - ")[0];

        map.set(d.taskId, {
          label: `${d.task} (${milestoneCode})`,
          value: d.taskId,
        });
      });

    return [...map.values()];
  }, [documents, selectedMilestone]);

  const subTasks = useMemo(() => {
    const map = new Map();

    documents
      .filter((d) => !selectedTask || d.taskId === selectedTask)
      .forEach((d) => {
        map.set(d.subTaskId, {
          label: d.subTask,
          value: d.subTaskId,
        });
      });

    return [...map.values()];
  }, [documents, selectedTask]);

  const activities = useMemo(() => {
    const map = new Map();

    documents
      .filter((d) => !selectedSubTask || d.subTaskId === selectedSubTask)
      .forEach((d) => {
        map.set(d.activityId, {
          label: d.activity,
          value: d.activityId,
        });
      });

    return [...map.values()];
  }, [documents, selectedSubTask]);

  /* Handlers */

  const handlePhaseChange = (value) => {
    setSelectedPhase(value);

    setSelectedMilestone([]);
    setSelectedTask("");
    setSelectedSubTask("");
    setSelectedActivity("");
  };

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

  const handleTaskChange = (value) => {
    setSelectedTask(value);

    setSelectedSubTask("");
    setSelectedActivity("");
  };

  const handleSubTaskChange = (value) => {
    setSelectedSubTask(value);

    setSelectedActivity("");
  };

  /* Filtered Documents */

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      // Phase
      if (selectedPhase && doc.phaseId !== selectedPhase) {
        return false;
      }

      // Milestone (Multi Select)
      if (
        selectedMilestone.length > 0 &&
        !selectedMilestone.includes(doc.milestoneId)
      ) {
        return false;
      }

      // Task
      if (selectedTask && doc.taskId !== selectedTask) {
        return false;
      }

      // Sub Task
      if (selectedSubTask && doc.subTaskId !== selectedSubTask) {
        return false;
      }

      // Activity
      if (selectedActivity && doc.activityId !== selectedActivity) {
        return false;
      }

      const latestDocument =
        doc.documents?.length > 0
          ? doc.documents[doc.documents.length - 1]
          : null;

      const uploadStatus = latestDocument ? "Uploaded" : "Pending";

      if (selectedStatus && uploadStatus !== selectedStatus) {
        return false;
      }

      const search = searchTerm.toLowerCase();

      if (
        searchTerm &&
        !(
          doc.activity?.toLowerCase().includes(search) ||
          doc.task?.toLowerCase().includes(search) ||
          doc.phase?.toLowerCase().includes(search) ||
          doc.milestone?.toLowerCase().includes(search) ||
          latestDocument?.fileName?.toLowerCase().includes(search) ||
          latestDocument?.uploadedBy?.toLowerCase().includes(search)
        )
      ) {
        return false;
      }

      return true;
    });
  }, [
    documents,
    selectedPhase,
    selectedMilestone,
    selectedTask,
    selectedSubTask,
    selectedActivity,
    selectedStatus,
    searchTerm,
  ]);

  const clearFilters = () => {
    setSelectedPhase("");
    setSelectedMilestone([]);
    setSelectedTask("");
    setSelectedSubTask("");
    setSelectedActivity("");
    setSelectedStatus("");
    setSearchTerm("");
  };

  return {
    phases,
    milestones,
    tasks,
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

    filteredDocuments,

    handlePhaseChange,
    handleMilestoneChange,
    handleTaskChange,
    handleSubTaskChange,
    clearFilters,
  };
}