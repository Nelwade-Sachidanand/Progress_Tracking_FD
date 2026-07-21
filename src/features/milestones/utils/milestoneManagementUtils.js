export const getMilestoneManagementData = (selectedProjectId, projects) => {
  const milestones = [];

  projects.forEach((project) => {
    // Filter by selected project
    if (selectedProjectId && project.id !== selectedProjectId) return;

    project.phases?.forEach((phase) => {
      phase.milestones?.forEach((milestone) => {
        let totalActivities = 0;
        let totalProgress = 0;

        milestone.tasks?.forEach((task) => {
          task.subTasks?.forEach((subTask) => {
            subTask.activities?.forEach((activity) => {
              totalActivities++;
              totalProgress += Number(activity.progress || 0);
            });
          });
        });

        const progress =
          totalActivities > 0
            ? Math.round(totalProgress / totalActivities)
            : 0;

        milestones.push({
          id: `${project.id}-${milestone.milestoneId}`,

          // Project
          projectId: project.id,
          projectName: project.projectName,
          bankName: project.bankName,

          // Phase
          phaseId: phase.phaseId,
          phaseName: phase.phaseName,

          // Milestone
          milestoneId: milestone.milestoneId,
          milestoneName: milestone.milestoneName,

          weightage: milestone.weightage ?? "",
          progress,
        });
      });
    });
  });

  return milestones;
};