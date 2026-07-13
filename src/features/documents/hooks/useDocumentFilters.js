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

  const phases = useMemo(
    () => [...new Set(documents.map((d) => d.phase))],
    [documents],
  );

  const milestones = useMemo(() => {
    return [
      ...new Set(
        documents
          .filter((d) => !selectedPhase || d.phase === selectedPhase)
          .map((d) => d.milestone),
      ),
    ];
  }, [documents, selectedPhase]);

  const tasks = useMemo(() => {
    return [
      ...new Set(
        documents
          .filter(
            (d) =>
              selectedMilestone.length === 0 ||
              selectedMilestone.includes(d.milestone),
          )
          .map((d) => d.task),
      ),
    ];
  }, [documents, selectedMilestone]);

  const subTasks = useMemo(() => {
    return [
      ...new Set(
        documents
          .filter((d) => !selectedTask || d.task === selectedTask)
          .map((d) => d.subTask),
      ),
    ];
  }, [documents, selectedTask]);

  const activities = useMemo(() => {
    return [
      ...new Set(
        documents
          .filter((d) => !selectedSubTask || d.subTask === selectedSubTask)
          .map((d) => d.activity),
      ),
    ];
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
      if (selectedPhase && doc.phase !== selectedPhase) {
        return false;
      }

      if (
        selectedMilestone.length > 0 &&
        !selectedMilestone.includes(doc.milestone)
      ) {
        return false;
      }

      if (selectedTask && doc.task !== selectedTask) {
        return false;
      }

      if (selectedSubTask && doc.subTask !== selectedSubTask) {
        return false;
      }

      if (selectedActivity && doc.activity !== selectedActivity) {
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