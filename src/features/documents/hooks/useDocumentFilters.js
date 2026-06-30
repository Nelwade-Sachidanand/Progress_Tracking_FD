import { useMemo, useState } from "react";

export default function useDocumentFilters(documents = []) {
  const [selectedPhase, setSelectedPhase] = useState("All Phases");
  const [selectedMilestone, setSelectedMilestone] = useState([]);
  const [selectedTask, setSelectedTask] = useState("All Tasks");
  const [selectedSubTask, setSelectedSubTask] = useState("All Sub Tasks");
  const [selectedActivity, setSelectedActivity] = useState("All Activities");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [searchTerm, setSearchTerm] = useState("");

  /* Dropdown Values */

  const phases = useMemo(
    () => [...new Set(documents.map((d) => d.phase))],
    [documents]
  );

  const milestones = useMemo(() => {
    return [
      ...new Set(
        documents
          .filter(
            (d) =>
              selectedPhase === "All Phases" ||
              d.phase === selectedPhase
          )
          .map((d) => d.milestone)
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
              selectedMilestone.includes(d.milestone)
          )
          .map((d) => d.task)
      ),
    ];
  }, [documents, selectedMilestone]);

  const subTasks = useMemo(() => {
    return [
      ...new Set(
        documents
          .filter(
            (d) =>
              selectedTask === "All Tasks" ||
              d.task === selectedTask
          )
          .map((d) => d.subTask)
      ),
    ];
  }, [documents, selectedTask]);

  const activities = useMemo(() => {
    return [
      ...new Set(
        documents
          .filter(
            (d) =>
              selectedSubTask === "All Sub Tasks" ||
              d.subTask === selectedSubTask
          )
          .map((d) => d.activity)
      ),
    ];
  }, [documents, selectedSubTask]);

  /* Handlers */

  const handlePhaseChange = (value) => {
    setSelectedPhase(value);
    setSelectedMilestone([]);
    setSelectedTask("All Tasks");
    setSelectedSubTask("All Sub Tasks");
    setSelectedActivity("All Activities");
  };

  const handleMilestoneChange = (milestone) => {
    setSelectedMilestone((prev) =>
      prev.includes(milestone)
        ? prev.filter((m) => m !== milestone)
        : [...prev, milestone]
    );

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

  /* Filtered Documents */

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      if (
        selectedPhase !== "All Phases" &&
        doc.phase !== selectedPhase
      ) {
        return false;
      }

      if (
        selectedMilestone.length > 0 &&
        !selectedMilestone.includes(doc.milestone)
      ) {
        return false;
      }

      if (
        selectedTask !== "All Tasks" &&
        doc.task !== selectedTask
      ) {
        return false;
      }

      if (
        selectedSubTask !== "All Sub Tasks" &&
        doc.subTask !== selectedSubTask
      ) {
        return false;
      }

      if (
        selectedActivity !== "All Activities" &&
        doc.activity !== selectedActivity
      ) {
        return false;
      }

      if (
        selectedStatus !== "All Status" &&
        doc.uploadStatus !== selectedStatus
      ) {
        return false;
      }

      if (searchTerm) {
        const search = searchTerm.toLowerCase();

        return (
          doc.activity?.toLowerCase().includes(search) ||
          doc.task?.toLowerCase().includes(search) ||
          doc.phase?.toLowerCase().includes(search) ||
          doc.milestone?.toLowerCase().includes(search) ||
          doc.fileName?.toLowerCase().includes(search) ||
          doc.uploadedBy?.toLowerCase().includes(search)
        );
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
  };
}