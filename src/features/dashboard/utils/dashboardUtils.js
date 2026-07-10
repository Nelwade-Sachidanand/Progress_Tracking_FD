// dashboardUtils.js
import { getProjectMetrics } from "./projectMetrics";
export const getAllActivities = (projects) => {
  const activities = [];

  projects?.forEach((project) => {
    project.phases?.forEach((phase) => {
      phase.milestones?.forEach((milestone) => {
        milestone.tasks?.forEach((task) => {
          task.subTasks?.forEach((subTask) => {
            subTask.activities?.forEach((activity) => {
              activities.push(activity);
            });
          });
        });
      });
    });
  });

  return activities;
};

export const getProjectActivities = (project) => {
  const activities = [];

  project?.phases?.forEach((phase) => {
    phase.milestones?.forEach((milestone) => {
      milestone.tasks?.forEach((task) => {
        task.subTasks?.forEach((subTask) => {
          subTask.activities?.forEach((activity) => {
            activities.push(activity);
          });
        });
      });
    });
  });

  return activities;
};

/* ==========================================
   OVERALL PROGRESS
========================================== */

export const calculateOverallProgress = (projects) => {
  let weightedProgressSum = 0;
  let totalWeightage = 0;

  projects?.forEach((project) => {
    project?.phases?.forEach((phase) => {
      phase?.milestones?.forEach((milestone) => {
        let activityCount = 0;
        let activityProgress = 0;

        milestone?.tasks?.forEach((task) => {
          task?.subTasks?.forEach((subTask) => {
            subTask?.activities?.forEach((activity) => {
              activityCount++;
              activityProgress += Number(activity.progress || 0);
            });
          });
        });

        const milestoneProgress =
          activityCount > 0 ? activityProgress / activityCount : 0;

        // Default weightage = 1 when not provided
        const weightage =
          milestone.weightage !== undefined &&
          milestone.weightage !== null &&
          milestone.weightage !== ""
            ? Number(milestone.weightage)
            : 1;

        weightedProgressSum += milestoneProgress * weightage;
        totalWeightage += weightage;
      });
    });
  });

  if (totalWeightage === 0) {
    const activities = getAllActivities(projects);

    if (activities.length === 0) {
      return 0;
    }

    let totalProgress = 0;

    activities.forEach((activity) => {
      totalProgress += Number(activity.progress || 0);
    });

    return Math.round(totalProgress / activities.length);
  }

  return Math.round(weightedProgressSum / totalWeightage);
};

export const calculateProjectProgress = (project) => {
  const activities = getProjectActivities(project);

  if (!activities.length) return 0;

  const totalProgress = activities.reduce(
    (sum, activity) => sum + Number(activity.progress || 0),
    0,
  );

  return Math.round(totalProgress / activities.length);
};

/* ==========================================
   TOTAL BANKS
========================================== */

export const getTotalBanks = (projects) => {
  return new Set(projects.map((project) => project.bankName).filter(Boolean))
    .size;
};

/* ==========================================
   ACTIVE PROJECTS
========================================== */

export const getActiveProjects = (projects) => {
  return projects.filter((project) => {
    const activities = getProjectActivities(project);

    if (!activities.length) return false;

    return activities.some(
      (activity) => activity.executionStatus !== "Completed",
    );
  }).length;
};

/* ==========================================
   DELAYED PROJECTS
========================================== */

export const getDelayedProjects = (projects) => {
  return projects.filter((project) => {
    const status = getProjectMetrics(project).status;
    return status === "Delayed";
  });
};

/* ==========================================
   ON TRACK PROJECTS
========================================== */

export const getOnTrackProjects = (projects) => {
  return projects.filter(
    (project) => getProjectMetrics(project).status === "On Track",
  );
};

/* ==========================================
   GO LIVE THIS YEAR
========================================== */

export const getUpcomingGoLiveProjects = (projects) => {
  const currentYear = new Date().getFullYear();

  return projects.filter((project) => {
    const activities = getProjectActivities(project);

    const endDates = activities
      .map((activity) => activity.plannedEndDate)
      .filter(Boolean);

    if (!endDates.length) return false;

    const latestEndDate = endDates.sort((a, b) => new Date(b) - new Date(a))[0];

    return new Date(latestEndDate).getFullYear() === currentYear;
  });
};

/* ==========================================
   MILESTONE STATS
========================================== */

export const getMilestoneStats = (projects) => {
  let completed = 0;
  let inProgress = 0;
  let delayed = 0;

  projects?.forEach((project) => {
    project.phases?.forEach((phase) => {
      phase.milestones?.forEach((milestone) => {
        const activities = [];

        milestone.tasks?.forEach((task) => {
          task.subTasks?.forEach((subTask) => {
            subTask.activities?.forEach((activity) => {
              activities.push(activity);
            });
          });
        });

        if (!activities.length) return;

        const allCompleted = activities.every(
          (activity) => activity.executionStatus === "Completed",
        );

        const hasDelayed = activities.some(
          (activity) => activity.scheduleHealth === "Delayed",
        );

        if (allCompleted) {
          completed++;
        } else if (hasDelayed) {
          delayed++;
        } else {
          inProgress++;
        }
      });
    });
  });

  return {
    completed,
    inProgress,
    delayed,
  };
};

/* ==========================================
   EXECUTION STATUS COUNTS
========================================== */

export const getExecutionStatusCounts = (projects) => {
  let completed = 0;
  let inProgress = 0;
  let notStarted = 0;

  const activities = getAllActivities(projects);

  activities.forEach((activity) => {
    const status = activity.executionStatus;

    if (status === "Completed") {
      completed++;
    } else if (status === "In Progress") {
      inProgress++;
    } else {
      notStarted++;
    }
  });

  return {
    completed,
    inProgress,
    notStarted,
  };
};

/* ==========================================
   BUSINESS IMPACT SUMMARY
========================================== */

export const getBusinessImpactSummary = (projects) => {
  const activities = getAllActivities(projects);

  if (!activities.length) {
    return {
      operationalEfficiency: 0,
      customerSatisfaction: 0,
      riskReduction: 0,
      costOptimization: 0,
    };
  }

  const avgProgress = calculateOverallProgress(projects);

  return {
    operationalEfficiency: avgProgress,

    customerSatisfaction: Math.min(100, avgProgress + 5),

    riskReduction: Math.min(100, avgProgress + 10),

    costOptimization: Math.min(100, avgProgress + 8),
  };
};
