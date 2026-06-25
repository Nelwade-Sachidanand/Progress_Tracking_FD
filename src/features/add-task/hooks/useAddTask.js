import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useProjects } from "../../../context/ProjectContext";
import { createActivity } from "../api/addTaskApi";
export default function useAddTask() {
  const { fetchProjects, projects } = useProjects();

  const selectedProjectId = sessionStorage.getItem("selectedProjectId");

  const selectedProject =
    projects.find(
      (project) => String(project.id) === String(selectedProjectId),
    ) || null;

  //const selectedProject = projects[0];

  const [formData, setFormData] = useState({
    phaseName: "",
    milestoneName: "",
    taskName: "",
    subTaskName: "",
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
  const handleSubmit = async () => {
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
        projectName: selectedProject?.projectName,

        phaseName: formData.phaseName,

        milestoneName: formData.milestoneName,

        taskName: formData.taskName,

        subTaskName: formData.subTaskName,

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
      } else {
        toast.error(response.statusDesc);
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.statusDesc || "Failed to create activity",
      );
    }
  };
  const resetForm = () => {
    setFormData({
      phaseName: "",
      milestoneName: "",
      taskName: "",
      subTaskName: "",
      activityName: "",
      owner: "",
      estimatedPeriodWeek: "",
      plannedStartDate: "",
      plannedEndDate: "",
      actualStartDate: "",
      actualEndDate: "",
      progress: 0,
      executionStatus: " ",
      scheduleHealth: "",
    });
  };

  const phases = useMemo(() => {
    return selectedProject?.phases?.map((p) => p.phaseName) || [];
  }, [selectedProject]);

  const milestones = useMemo(() => {
    const phase = selectedProject?.phases?.find(
      (p) => p.phaseName === formData.phaseName,
    );

    return phase?.milestones?.map((m) => m.milestoneName) || [];
  }, [selectedProject, formData.phaseName]);

  const taskOptions = useMemo(() => {
    const phase = selectedProject?.phases?.find(
      (p) => p.phaseName === formData.phaseName,
    );

    const milestone = phase?.milestones?.find(
      (m) => m.milestoneName === formData.milestoneName,
    );

    return milestone?.tasks?.map((t) => t.taskName) || [];
  }, [selectedProject, formData.phaseName, formData.milestoneName]);

  const subTasks = useMemo(() => {
    const phase = selectedProject?.phases?.find(
      (p) => p.phaseName === formData.phaseName,
    );

    const milestone = phase?.milestones?.find(
      (m) => m.milestoneName === formData.milestoneName,
    );

    const task = milestone?.tasks?.find(
      (t) => t.taskName === formData.taskName,
    );

    return task?.subTasks?.map((s) => s.subTaskName) || [];
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
  };
}
