export const getProjectMetrics = (project) => {
  let totalActivities = 0;
  let completedActivities = 0;
  let totalProgress = 0;

  let delayDays = 0;
  let goLiveDate = null;

  let currentPhase = "Completed";
  let currentMilestone = "Completed";

  let phaseFound = false;
  let milestoneFound = false;

  project?.phases?.forEach((phase) => {
    let phaseActivities = 0;
    let phaseProgress = 0;

    phase?.milestones?.forEach((milestone) => {
      let milestoneActivities = 0;
      let milestoneProgress = 0;

      milestone?.tasks?.forEach((task) => {
        task?.subTasks?.forEach((subTask) => {
          subTask?.activities?.forEach((activity) => {
            const progress = Number(activity.progress || 0);

            totalActivities++;
            totalProgress += progress;

            milestoneActivities++;
            milestoneProgress += progress;

            phaseActivities++;
            phaseProgress += progress;

            if (progress >= 100) {
              completedActivities++;
            }

            const plannedEnd = activity.plannedEndDate
              ? new Date(activity.plannedEndDate)
              : null;

            const actualEnd = activity.actualEndDate
              ? new Date(activity.actualEndDate)
              : null;

            if (plannedEnd) {
              if (actualEnd) {
                const diff = (actualEnd - plannedEnd) / (1000 * 60 * 60 * 24);

                if (diff > 0) {
                  delayDays += Math.round(diff);
                }
              } else {
                const today = new Date();

                if (progress < 100 && today > plannedEnd) {
                  const diff = (today - plannedEnd) / (1000 * 60 * 60 * 24);

                  delayDays += Math.round(diff);
                }
              }
            }

            if (
              activity.plannedEndDate &&
              (!goLiveDate ||
                new Date(activity.plannedEndDate) > new Date(goLiveDate))
            ) {
              goLiveDate = activity.plannedEndDate;
            }
          });
        });
      });

      const milestonePercent =
        milestoneActivities > 0 ? milestoneProgress / milestoneActivities : 0;

      if (!milestoneFound && milestonePercent < 100) {
        currentMilestone =
          milestone.milestoneName || milestone.name || "Unnamed Milestone";

        milestoneFound = true;
      }
    });

    const phasePercent =
      phaseActivities > 0 ? phaseProgress / phaseActivities : 0;

    if (!phaseFound && phasePercent < 100) {
      currentPhase = phase.phaseName || phase.name || "Unnamed Phase";

      phaseFound = true;
    }
  });

  const overallProgress =
    totalActivities > 0 ? Math.round(totalProgress / totalActivities) : 0;

  const readiness =
    totalActivities > 0
      ? Math.round((completedActivities / totalActivities) * 100)
      : 0;

  const daysRemaining = goLiveDate
    ? Math.max(
        0,
        Math.ceil((new Date(goLiveDate) - new Date()) / (1000 * 60 * 60 * 24)),
      )
    : 0;

  let status = "On Track";

  if (delayDays > 15) {
    status = "Delayed";
  } else if (delayDays > 5) {
    status = "At Risk";
  }

  let scheduleVariance = 0;

  if (goLiveDate) {
    const totalDuration =
      (new Date(goLiveDate) -
        new Date(
          project.createdDate || project.projectStartDate || new Date(),
        )) /
      (1000 * 60 * 60 * 24);

    const elapsed =
      (new Date() -
        new Date(
          project.createdDate || project.projectStartDate || new Date(),
        )) /
      (1000 * 60 * 60 * 24);

    const plannedProgress =
      totalDuration > 0 ? (elapsed / totalDuration) * 100 : 0;

    scheduleVariance = Math.round(overallProgress - plannedProgress);
  }

  return {
    overallProgress,
    readiness,

    currentPhase,
    currentMilestone,

    goLiveDate,
    daysRemaining,

    delayDays,
    scheduleVariance,

    totalActivities,
    completedActivities,

    status,
  };
};
