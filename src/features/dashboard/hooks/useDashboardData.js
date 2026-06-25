import { useMemo } from "react";

import {
  calculateOverallProgress,
  getActiveProjects,
  getDelayedProjects,
  getMilestoneStats,
  getOnTrackProjects,
  getTotalBanks,
  getUpcomingGoLiveProjects,
} from "../utils/dashboardUtils";

export default function useDashboardData(projects, loading) {
  const dashboardData = useMemo(() => {
    const overallProgress = calculateOverallProgress(projects);

    const delayedProjects = getDelayedProjects(projects);

    const onTrackProjects = getOnTrackProjects(projects);

    const upcomingGoLiveProjects = getUpcomingGoLiveProjects(projects);

    const milestoneStats = getMilestoneStats(projects);

    return {
      projects,
      loading,

      totalBanks: getTotalBanks(projects),

      totalProjects: projects.length,

      activeProjects: getActiveProjects(projects),

      delayedProjects: delayedProjects.length,

      onTrackProjects: onTrackProjects.length,

      upcomingGoLive: upcomingGoLiveProjects.length,

      completedMilestones: milestoneStats.completed,

      inProgressMilestones: milestoneStats.inProgress,

      delayedMilestones: milestoneStats.delayed,

      overallProgress,
    };
  }, [projects, loading]);

  return dashboardData;
}
