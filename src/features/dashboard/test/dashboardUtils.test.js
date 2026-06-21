import {
  calculateOverallProgress,
  calculateProjectProgress,
  getActiveProjects,
  getAllActivities,
  getBusinessImpactSummary,
  getDelayedProjects,
  getExecutionStatusCounts,
  getMilestoneStats,
  getOnTrackProjects,
  getProjectActivities,
  getTotalBanks,
  getUpcomingGoLiveProjects,
} from "../utils/dashboardUtils";

describe("dashboardUtils", () => {
  const currentYear = new Date().getFullYear();

  const mockProjects = [
    {
      bankName: "HDFC",
      phases: [
        {
          milestones: [
            {
              milestoneName: "M1",
              tasks: [
                {
                  subTasks: [
                    {
                      activities: [
                        {
                          progress: 100,
                          executionStatus: "Completed",
                          scheduleHealth: "On Track",
                          plannedEndDate: `${currentYear}-12-01`,
                        },
                        {
                          progress: 50,
                          executionStatus: "In Progress",
                          scheduleHealth: "Delayed",
                          plannedEndDate: `${currentYear}-11-01`,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              milestoneName: "M2",
              tasks: [
                {
                  subTasks: [
                    {
                      activities: [
                        {
                          progress: 0,
                          executionStatus: "Not Started",
                          scheduleHealth: "On Track",
                          plannedEndDate: `${currentYear}-10-01`,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      bankName: "ICICI",
      phases: [
        {
          milestones: [
            {
              milestoneName: "M3",
              tasks: [
                {
                  subTasks: [
                    {
                      activities: [
                        {
                          progress: 100,
                          executionStatus: "Completed",
                          scheduleHealth: "On Track",
                          plannedEndDate: "2020-01-01",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  describe("getAllActivities", () => {
    it("returns all activities", () => {
      const result = getAllActivities(mockProjects);

      expect(result).toHaveLength(4);
    });

    it("returns empty array for empty projects", () => {
      expect(getAllActivities([])).toEqual([]);
    });
  });

  describe("getProjectActivities", () => {
    it("returns project activities", () => {
      const result = getProjectActivities(mockProjects[0]);

      expect(result).toHaveLength(3);
    });

    it("returns empty array when project is undefined", () => {
      expect(getProjectActivities()).toEqual([]);
    });
  });

  describe("calculateOverallProgress", () => {
    it("calculates average progress", () => {
      expect(calculateOverallProgress(mockProjects)).toBe(63);
    });

    it("returns 0 when no activities", () => {
      expect(calculateOverallProgress([])).toBe(0);
    });
  });

  describe("calculateProjectProgress", () => {
    it("calculates project progress", () => {
      expect(calculateProjectProgress(mockProjects[0])).toBe(50);
    });

    it("returns 0 for empty project", () => {
      expect(calculateProjectProgress({})).toBe(0);
    });
  });

  describe("getTotalBanks", () => {
    it("returns unique bank count", () => {
      expect(getTotalBanks(mockProjects)).toBe(2);
    });

    it("ignores empty bank names", () => {
      expect(
        getTotalBanks([
          { bankName: "HDFC" },
          { bankName: null },
          { bankName: "HDFC" },
        ]),
      ).toBe(1);
    });
  });

  describe("getActiveProjects", () => {
    it("returns active projects count", () => {
      expect(getActiveProjects(mockProjects)).toBe(1);
    });

    it("returns 0 for no projects", () => {
      expect(getActiveProjects([])).toBe(0);
    });
  });

  describe("getDelayedProjects", () => {
    it("returns delayed projects", () => {
      const result = getDelayedProjects(mockProjects);

      expect(result).toHaveLength(1);
    });
  });

  describe("getOnTrackProjects", () => {
    it("returns on-track projects", () => {
      const result = getOnTrackProjects(mockProjects);

      expect(result).toHaveLength(1);
    });
  });

  describe("getUpcomingGoLiveProjects", () => {
    it("returns current year projects", () => {
      const result = getUpcomingGoLiveProjects(mockProjects);

      expect(result).toHaveLength(1);
    });

    it("returns empty when no end dates", () => {
      expect(getUpcomingGoLiveProjects([{}])).toEqual([]);
    });
  });

  describe("getMilestoneStats", () => {
    it("returns milestone statistics", () => {
      const result = getMilestoneStats(mockProjects);

      expect(result).toEqual({
        completed: 1,
        inProgress: 1,
        delayed: 1,
      });
    });

    it("returns zero stats for empty projects", () => {
      expect(getMilestoneStats([])).toEqual({
        completed: 0,
        inProgress: 0,
        delayed: 0,
      });
    });
  });

  describe("getExecutionStatusCounts", () => {
    it("returns execution status counts", () => {
      expect(getExecutionStatusCounts(mockProjects)).toEqual({
        completed: 2,
        inProgress: 1,
        notStarted: 1,
      });
    });

    it("returns zero counts for empty projects", () => {
      expect(getExecutionStatusCounts([])).toEqual({
        completed: 0,
        inProgress: 0,
        notStarted: 0,
      });
    });
  });

  describe("getBusinessImpactSummary", () => {
    it("returns business impact summary", () => {
      expect(getBusinessImpactSummary(mockProjects)).toEqual({
        operationalEfficiency: 63,
        customerSatisfaction: 68,
        riskReduction: 73,
        costOptimization: 71,
      });
    });

    it("returns zeros when no activities", () => {
      expect(getBusinessImpactSummary([])).toEqual({
        operationalEfficiency: 0,
        customerSatisfaction: 0,
        riskReduction: 0,
        costOptimization: 0,
      });
    });
  });
});
