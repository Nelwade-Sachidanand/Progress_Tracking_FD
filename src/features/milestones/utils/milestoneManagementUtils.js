export const getMilestoneManagementData = (
  selectedBank
) => {
  const projects =
    JSON.parse(
      localStorage.getItem("projects")
    ) || [];

  const milestones = [];

  projects.forEach((project) => {
    if (
      selectedBank &&
      project.bankName !== selectedBank
    )
      return;

    project.phases?.forEach((phase) => {
      phase.milestones?.forEach(
        (milestone) => {
          let totalActivities = 0;
          let totalProgress = 0;

          milestone.tasks?.forEach((task) => {
            task.subTasks?.forEach(
              (subTask) => {
                subTask.activities?.forEach(
                  (activity) => {
                    totalActivities++;
                    totalProgress += Number(
                      activity.progress || 0
                    );
                  }
                );
              }
            );
          });

          const progress =
            totalActivities > 0
              ? Math.round(
                  totalProgress /
                    totalActivities
                )
              : 0;

          milestones.push({
            id:
              project.projectName +
              "-" +
              milestone.milestoneName,

            projectId: project.id,

            bankName: project.bankName,

            projectName:
              project.projectName,

            phaseName: phase.phaseName,

            milestoneName:
              milestone.milestoneName,

            weightage:
              Number(
                milestone.weightage || 0
              ),

            progress,
          });
        }
      );
    });
  });

  return milestones;
};

export const getBanks = () => {
  const projects =
    JSON.parse(
      localStorage.getItem("projects")
    ) || [];

  return [
    ...new Set(
      projects.map(
        (project) => project.bankName
      )
    ),
  ];
};