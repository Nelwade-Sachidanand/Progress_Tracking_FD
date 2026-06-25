import { useMemo, useState } from "react";

import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import { useProjects } from "../../../context/ProjectContext";
import { updateActivity } from "../api/editTaskApi";

export default function useEditTask() {
  const { state } = useLocation();

  const task = state?.task;

  const { projects } = useProjects();
  const selectedProjectId = sessionStorage.getItem("selectedProjectId");

  const selectedProject =
    projects.find(
      (project) => String(project.id) === String(selectedProjectId),
    ) || null;

  const [formData, setFormData] = useState({
    phaseName: task?.phaseName || task?.phase || "",

    milestoneName: task?.milestoneName || task?.milestone || "",

    taskName: task?.taskName || task?.task || "",

    subTaskName: task?.subTaskName || task?.subTask || "",

    activityName: task?.activityName || task?.activity || "",

    owner: task?.owner || "",

    estimatedPeriodWeek: task?.estimatedPeriodWeek || "",

    plannedStartDate: task?.plannedStartDate || "",

    plannedEndDate: task?.plannedEndDate || "",

    actualStartDate: task?.actualStartDate || "",

    actualEndDate: task?.actualEndDate || "",

    progress: task?.progress || 0,

    executionStatus: task?.executionStatus || "Not Started",

    scheduleHealth: task?.scheduleHealth || "",
    changeReason: "",
  });
  const originalPlannedStartDate = task?.plannedStartDate || "";

  const originalPlannedEndDate =
    task?.plannedEndDate || "";
  


  const phases = useMemo(() => {
    return selectedProject?.phases?.map((phase) => phase.phaseName) || [];
  }, [selectedProject]);

  const milestones = useMemo(() => {
    const phase = selectedProject?.phases?.find(
      (phase) => phase.phaseName === formData.phaseName,
    );

    return phase?.milestones?.map((milestone) => milestone.milestoneName) || [];
  }, [selectedProject, formData.phaseName]);

  const taskOptions = useMemo(() => {
    const phase = selectedProject?.phases?.find(
      (phase) => phase.phaseName === formData.phaseName,
    );

    const milestone = phase?.milestones?.find(
      (milestone) => milestone.milestoneName === formData.milestoneName,
    );

    return milestone?.tasks?.map((task) => task.taskName) || [];
  }, [selectedProject, formData.phaseName, formData.milestoneName]);

  const subTasks = useMemo(() => {
    const phase = selectedProject?.phases?.find(
      (phase) => phase.phaseName === formData.phaseName,
    );

    const milestone = phase?.milestones?.find(
      (milestone) => milestone.milestoneName === formData.milestoneName,
    );

    const taskObj = milestone?.tasks?.find(
      (task) => task.taskName === formData.taskName,
    );

    return taskObj?.subTasks?.map((subTask) => subTask.subTaskName) || [];
  }, [
    selectedProject,
    formData.phaseName,
    formData.milestoneName,
    formData.taskName,
  ]);

  const handleChange = (field, value) => {
    setFormData((prev) => {
      const updated = {
        ...prev,
        [field]: value,
      };

      if (field === "phaseName") {
        updated.milestoneName = "";
        updated.taskName = "";
        updated.subTaskName = "";
      }

      if (field === "milestoneName") {
        updated.taskName = "";
        updated.subTaskName = "";
      }

      if (field === "taskName") {
        updated.subTaskName = "";
      }

      return updated;
    });
  };

  const handleUpdate = async () => {
    const isDateChanged =
      formData.plannedStartDate !== originalPlannedStartDate ||
      formData.plannedEndDate !== originalPlannedEndDate;


    console.log(
      "Original Planned Start:",
      originalPlannedStartDate
    );

    console.log(
      "Updated Planned Start:",
      formData.plannedStartDate
    );

    console.log(
      "Original Planned End:",
      originalPlannedEndDate
    );

    console.log(
      "Updated Planned End:",
      formData.plannedEndDate
    );

    console.log(
      "Is Date Changed:",
      isDateChanged
    );

    console.log(
      "Change Reason:",
      formData.changeReason
    );
    if (
      isDateChanged &&
      !formData.changeReason?.trim()
    ) {
      toast.error(
        "Please enter reason for changing planned dates"
      );
      return;
    }
    try {
      if (isDateChanged && !formData.changeReason?.trim()) {
        toast.error("Please enter reason for changing planned dates");
        return;
      }
      const payload = {
        projectId: selectedProject?.id,

        projectName: selectedProject?.projectName,

        phaseName: formData.phaseName,

        milestoneName: formData.milestoneName,

        taskName: formData.taskName,

        subTaskName: formData.subTaskName,

        activityName: formData.activityName,

        owner: formData.owner,

        estimatedPeriodWeek: Number(formData.estimatedPeriodWeek),

        plannedStartDate: formData.plannedStartDate,

        plannedEndDate: formData.plannedEndDate,

        actualStartDate: formData.actualStartDate,

        actualEndDate: formData.actualEndDate,

        progress: Number(formData.progress),

        executionStatus: formData.executionStatus,

        scheduleHealth: formData.scheduleHealth,

        changeReason: formData.changeReason,
      };

      // console.log(payload);

      const response =
        await updateActivity(
          payload
        );
      console.log(
        "Update Payload:",
        payload
      );

      console.log(
        "Change Reason Sent:",
        payload.changeReason
      );
      if (
        response.statusType ===
        "S"
      ) {
        toast.success(
          response.statusDesc
        );
      } else {
        toast.error(
          response.statusDesc
        );
      }

    } catch (error) {

      console.error(error);

      toast.error(
        error?.response?.data
          ?.statusDesc ||
        "Failed to update activity"
      );
    }
  };

  return {
    formData,
    handleChange,
    phases,
    milestones,
    taskOptions,
    subTasks,
    // resetForm,
    handleUpdate,
    selectedProject,
  };
}
