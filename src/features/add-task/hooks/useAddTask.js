import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useProjects } from "../../../context/ProjectContext";
import { createActivity } from "../api/addTaskApi";
import { useNavigate } from "react-router-dom";
export default function useAddTask() {
  const { fetchProjects, projects } = useProjects();

  const navigate = useNavigate();

  const selectedProjectId = sessionStorage.getItem("selectedProjectId");

  const user = JSON.parse(sessionStorage.getItem("user"));

  const selectedProject =
    projects.find(
      (project) => String(project.id) === String(selectedProjectId),
    ) || null;

  //const selectedProject = projects[0];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    phaseId: "",
    phaseName: "",
    newPhase: false,

    milestoneId: "",
    milestoneName: "",
    newMilestone: false,

    taskId: "",
    taskName: "",
    newTask: false,

    subTaskId: "",
    subTaskName: "",
    newSubTask: false,

    activityName: "",
    owner: "",

    estimatedPeriodWeek: "",
    actualPeriodWeek: "",
    plannedStartDate: "",
    plannedEndDate: "",

    actualStartDate: "",
    actualEndDate: "",

    progress: 0,

    executionStatus: "",
    scheduleHealth: "",
  });
  const handleSubmit = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      console.log(formData);

      if (!formData.phaseName) {
        toast.error("Please select Phase");
        return;
      }

      if (!formData.milestoneName) {
        toast.error("Please select Milestone");
        return;
      }

      if (!formData.taskName) {
        toast.error("Please select Task");
        return;
      }

      if (!formData.subTaskName) {
        toast.error("Please select Sub Task");
        return;
      }

      if (!formData.activityName?.trim()) {
        toast.error("Please enter Activity");
        return;
      }

      const payload = {
        projectId: selectedProject?.id,

        phaseId: formData.phaseId || null,
        phaseName: formData.phaseName,
        newPhase: formData.newPhase,

        milestoneId: formData.milestoneId || null,
        milestoneName: formData.milestoneName,
        newMilestone: formData.newMilestone,

        taskId: formData.taskId || null,
        taskName: formData.taskName,
        newTask: formData.newTask,

        subTaskId: formData.subTaskId || null,
        subTaskName: formData.subTaskName,
        newSubTask: formData.newSubTask,

        activityName: formData.activityName,

        owner: formData.owner,

        estimatedPeriodWeek: Number(formData.estimatedPeriodWeek),

        plannedStartDate: formData.plannedStartDate || null,
        plannedEndDate: formData.plannedEndDate || null,

        actualStartDate: formData.actualStartDate || null,
        actualEndDate: formData.actualEndDate || null,

        progress: Number(formData.progress),

        executionStatus: formData.executionStatus,

        scheduleHealth: formData.scheduleHealth || "GREEN",
      };

      const response = await createActivity(payload);

      if (response.statusType === "S") {
        toast.success(response.statusDesc);
        await fetchProjects(user.id);
        resetForm();
        navigate("/tasks", {
          replace: true,
        });
      } else {
        toast.error(response.statusDesc);
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.statusDesc || "Failed to create activity",
      );
    } finally {
      setTimeout(() => {
        setIsSubmitting(false);
      }, 3000);
    }

  };
  const resetForm = () => {
    setFormData({
      phaseId: "",
      phaseName: "",
      newPhase: false,

      milestoneId: "",
      milestoneName: "",
      newMilestone: false,

      taskId: "",
      taskName: "",
      newTask: false,

      subTaskId: "",
      subTaskName: "",
      newSubTask: false,
      actualPeriodWeek: "",
      activityName: "",
      owner: "",

      estimatedPeriodWeek: "",

      plannedStartDate: "",
      plannedEndDate: "",

      actualStartDate: "",
      actualEndDate: "",

      progress: 0,

      executionStatus: "",
      scheduleHealth: "",
    });
  };

  // const phases = useMemo(() => {
  //   return (
  //     selectedProject?.phases?.map((phase) => ({
  //       id: phase.phaseId,
  //       name: phase.phaseName,
  //     })) || []
  //   );
  // }, [selectedProject]);
  const phases = useMemo(() => {
    return (
      selectedProject?.phases?.map((phase) => ({
        id: phase.phaseId,
        name: phase.phaseName,
        isNew: phase.isNew || false,
      })) || []
    );
  }, [selectedProject]);

  const milestones = useMemo(() => {
    const phase = selectedProject?.phases?.find(
      (p) => p.phaseId === formData.phaseId
    );

    return (
      phase?.milestones?.map((milestone) => ({
        id: milestone.milestoneId,
        name: milestone.milestoneName,
        isNew: milestone.isNew || false,
      })) || []
    );
  }, [selectedProject, formData.phaseId]);

  const taskOptions = useMemo(() => {
    const phase = selectedProject?.phases?.find(
      (p) => p.phaseId === formData.phaseId
    );

    const milestone = phase?.milestones?.find(
      (m) => m.milestoneId === formData.milestoneId
    );

    return (
      milestone?.tasks?.map((task) => ({
        id: task.taskId,
        name: task.taskName,
        isNew: task.isNew || false,
      })) || []
    );
  }, [selectedProject, formData.phaseId, formData.milestoneId]);

  const subTasks = useMemo(() => {
    const phase = selectedProject?.phases?.find(
      (p) => p.phaseId === formData.phaseId
    );

    const milestone = phase?.milestones?.find(
      (m) => m.milestoneId === formData.milestoneId
    );

    const task = milestone?.tasks?.find(
      (t) => t.taskId === formData.taskId
    );

    return (
      task?.subTasks?.map((subTask) => ({
        id: subTask.subTaskId,
        name: subTask.subTaskName,
        isNew: subTask.isNew || false,
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

      // ======================================
      // Calculate Estimated Period Week
      // ======================================



      if (
        field === "plannedStartDate" ||
        field === "plannedEndDate"
      ) {
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

              // Monday-Friday
              if (day !== 0 && day !== 6) {
                workingDays++;
              }

              current.setDate(current.getDate() + 1);
            }

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

      // ======================================
      // Calculate Actual Period Week
      // ======================================


      if (
        field === "actualStartDate" ||
        field === "actualEndDate"
      ) {
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

      // Phase changed
      if (field === "phaseId" || field === "phaseName") {
        updated.milestoneId = "";
        updated.milestoneName = "";
        updated.newMilestone = false;

        updated.taskId = "";
        updated.taskName = "";
        updated.newTask = false;

        updated.subTaskId = "";
        updated.subTaskName = "";
        updated.newSubTask = false;
      }

      // Milestone changed
      if (field === "milestoneId" || field === "milestoneName") {
        updated.taskId = "";
        updated.taskName = "";
        updated.newTask = false;

        updated.subTaskId = "";
        updated.subTaskName = "";
        updated.newSubTask = false;
      }

      // Task changed
      if (field === "taskId" || field === "taskName") {
        updated.subTaskId = "";
        updated.subTaskName = "";
        updated.newSubTask = false;
      }

      return updated;
    });
  };

  return {
    selectedProject,
    formData,
    handleChange,
    phases,
    milestones,
    taskOptions,
    subTasks,
    resetForm,
    handleSubmit,
    isSubmitting,
  };
}
