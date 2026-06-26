import { useMemo, useState } from "react";

export default function useDocumentFilters(documents = []) {
  const [selectedPhase, setSelectedPhase] =
    useState("All Phases");

  const [selectedMilestone, setSelectedMilestone] =
    useState([]);

  const [selectedTask, setSelectedTask] =
    useState("All Tasks");

  const [selectedSubTask, setSelectedSubTask] =
    useState("All Sub Tasks");

  const [selectedActivity, setSelectedActivity] =
    useState("All Activities");

  const [selectedStatus, setSelectedStatus] =
    useState("All Status");

  const [searchTerm, setSearchTerm] =
    useState("");

  const handleMilestoneChange = (values) => {
    setSelectedMilestone(values);
  };

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const phaseMatch =
        selectedPhase === "All Phases" ||
        doc.phase === selectedPhase;

      const milestoneMatch =
        selectedMilestone.length === 0 ||
        selectedMilestone.includes(doc.milestone);

      const taskMatch =
        selectedTask === "All Tasks" ||
        doc.task === selectedTask;

      const subTaskMatch =
        selectedSubTask === "All Sub Tasks" ||
        doc.subTask === selectedSubTask;

      const activityMatch =
        selectedActivity === "All Activities" ||
        doc.activity === selectedActivity;

      const statusMatch =
        selectedStatus === "All Status" ||
        doc.uploadStatus === selectedStatus;

      const searchMatch =
        searchTerm === "" ||
        doc.activity
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        doc.owner
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        doc.fileName
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());

      return (
        phaseMatch &&
        milestoneMatch &&
        taskMatch &&
        subTaskMatch &&
        activityMatch &&
        statusMatch &&
        searchMatch
      );
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

    handleMilestoneChange,
  };
}