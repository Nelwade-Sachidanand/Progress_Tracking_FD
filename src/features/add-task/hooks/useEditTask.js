import { useMemo, useState } from "react";

import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import { useProjects } from "../../../context/ProjectContext";
import { updateActivity } from "../api/editTaskApi";

export default function useEditTask() {
  const { state } = useLocation();

  const task = state?.task;
  console.log("Task:", task);

  const { fetchProjects, projects } = useProjects();
  const selectedProjectId = sessionStorage.getItem("selectedProjectId");
  const user = JSON.parse(sessionStorage.getItem("user"));
  const selectedProject =
    projects.find(
      (project) => String(project.id) === String(selectedProjectId),
    ) || null;

  const [formData, setFormData] = useState({
    projectId: task?.projectId || "",
projectName: task?.projectName || "",
    phaseId: task?.phaseId || "",
phaseName: task?.phaseName || task?.phase || "",

milestoneId: task?.milestoneId || "",
milestoneName: task?.milestoneName || task?.milestone || "",

taskId: task?.taskId || "",
taskName: task?.taskName || task?.task || "",

subTaskId: task?.subTaskId || "",
subTaskName: task?.subTaskName || task?.subTask || "",

activityId: task?.activityId || "",
  activityName: task?.activityName || task?.activity || "",
    

    owner: task?.owner || "",

    estimatedPeriodWeek: task?.estimatedPeriodWeek || "",

    plannedStartDate: task?.plannedStartDate || "",

    plannedEndDate: task?.plannedEndDate || "",

    actualStartDate: task?.actualStartDate || "",

    actualEndDate: task?.actualEndDate || "",

    progress: task?.progress || 0,

    executionStatus: task?.executionStatus || "",
actualPeriodWeek: task?.actualPeriodWeek || "",
    scheduleHealth: task?.scheduleHealth || "",
    changeReason: "",
  });
  const originalPlannedStartDate = task?.plannedStartDate || "";

  const originalPlannedEndDate = task?.plannedEndDate || "";

const phases = useMemo(() => {
  return (
    selectedProject?.phases?.map((phase) => ({
      id: phase.phaseId,
      name: phase.phaseName,
    })) || []
  );
}, [selectedProject]);

  const milestones = useMemo(() => {
  const phase = selectedProject?.phases?.find(
    (p) => p.phaseId === formData.phaseId,
  );

  return (
    phase?.milestones?.map((m) => ({
      id: m.milestoneId,
      name: m.milestoneName,
    })) || []
  );
}, [selectedProject, formData.phaseId]);

 const taskOptions = useMemo(() => {
  const phase = selectedProject?.phases?.find(
    (p) => p.phaseId === formData.phaseId,
  );

  const milestone = phase?.milestones?.find(
    (m) => m.milestoneId === formData.milestoneId,
  );

  return (
    milestone?.tasks?.map((t) => ({
      id: t.taskId,
      name: t.taskName,
    })) || []
  );
}, [selectedProject, formData.phaseId, formData.milestoneId]);

 const subTasks = useMemo(() => {
  const phase = selectedProject?.phases?.find(
    (p) => p.phaseId === formData.phaseId,
  );

  const milestone = phase?.milestones?.find(
    (m) => m.milestoneId === formData.milestoneId,
  );

  const taskObj = milestone?.tasks?.find(
    (t) => t.taskId === formData.taskId,
  );

  return (
    taskObj?.subTasks?.map((s) => ({
      id: s.subTaskId,
      name: s.subTaskName,
    })) || []
  );
}, [
  selectedProject,
  formData.phaseId,
  formData.milestoneId,
  formData.taskId,
]);

  const handleChange = (field, value) => {
    setFormData((prev) => {
    const updated = {
  ...prev,
  [field]: value,
};

// ================================
// Estimated Period Week
// ================================

if (field === "plannedStartDate" || field === "plannedEndDate") {
  const start =
    field === "plannedStartDate"
      ? value
      : updated.plannedStartDate;

  const end =
    field === "plannedEndDate"
      ? value
      : updated.plannedEndDate;

  if (start && end) {
    const startDate = new Date(start);
    const endDate = new Date(end);

    if (endDate >= startDate) {
      let workingDays = 0;

      const current = new Date(startDate);

      while (current <= endDate) {
        const day = current.getDay();

        // Monday to Friday only
        if (day !== 0 && day !== 6) {
          workingDays++;
        }

        current.setDate(current.getDate() + 1);
      }

      // Same as Excel: NETWORKDAYS(start,end)/5
      updated.estimatedPeriodWeek = Number(
        (workingDays / 5).toFixed(2)
      );
    } else {
      updated.estimatedPeriodWeek = "";
    }
  } else {
    updated.estimatedPeriodWeek = "";
  }
}

// ================================
// Actual Period Week
// ================================

if (field === "actualStartDate" || field === "actualEndDate") {
  const start =
    field === "actualStartDate"
      ? value
      : updated.actualStartDate;

  const end =
    field === "actualEndDate"
      ? value
      : updated.actualEndDate;

  if (start && end) {
    const startDate = new Date(start);
    const endDate = new Date(end);

    if (endDate >= startDate) {
      let workingDays = 0;

      const current = new Date(startDate);

      while (current <= endDate) {
        const day = current.getDay();

        // Monday-Friday
        if (day !== 0 && day !== 6) {
          workingDays++;
        }

        current.setDate(current.getDate() + 1);
      }

      updated.actualPeriodWeek = Number(
        (workingDays / 5).toFixed(1)
      );
    } else {
      updated.actualPeriodWeek = "";
    }
  } else {
    updated.actualPeriodWeek = "";
  }
}

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

  // Planned Date Change Reason
  if (isDateChanged && !formData.changeReason?.trim()) {
    toast.error("Please enter reason for changing planned dates");
    return;
  }

  // Progress Changed
const oldProgress = Number(task?.progress);
const newProgress = Number(formData.progress);

// Actual Start Date is required only when progress is greater than 0
if (
  newProgress > 0 &&
  oldProgress !== newProgress &&
  !formData.actualStartDate
) {
  toast.error("Please select Actual Start Date.");
  return;
}

// Actual End Date is required only when progress is exactly 100%
if (
  newProgress === 100 &&
  !formData.actualEndDate
) {
  toast.error(
    "Please select Actual End Date when progress is 100%."
  );
  return;
}

  // If progress reaches 100%, Actual End Date is mandatory
  if (
    Number(formData.progress) === 100 &&
    !formData.actualEndDate
  ) {
    toast.error(
      "Please select Actual End Date when progress is 100%."
    );
    return;
  }

  try {
    const payload = {
      projectId: formData.projectId,
      projectName: formData.projectName,

      phaseId: formData.phaseId,
      phaseName: formData.phaseName,

      milestoneId: formData.milestoneId,
      milestoneName: formData.milestoneName,

      taskId: formData.taskId,
      taskName: formData.taskName,

      subTaskId: formData.subTaskId,
      subTaskName: formData.subTaskName,

      activityId: formData.activityId,
      activityName: formData.activityName,

     // owner: formData.owner,
     owner: formData.owner?.trim() ? formData.owner : null,

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

    console.log(payload);

    const response = await updateActivity(payload);

    if (response.statusType === "S") {
      toast.success(response.statusDesc);
      await fetchProjects(user.id);
    } else {
      toast.error(response.statusDesc);
    }
  } catch (error) {
    console.error(error);

    toast.error(
      error?.response?.data?.statusDesc ||
        "Failed to update activity",
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
    handleUpdate,
    selectedProject,
  };
}
 