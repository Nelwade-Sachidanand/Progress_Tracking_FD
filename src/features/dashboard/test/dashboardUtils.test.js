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
    createdDate: "2024-01-01",
    phases: [
      {
        phaseName: "Phase 1",
        milestones: [
          {
            milestoneName: "M1",
            weightage: 50,
            tasks: [
              {
                subTasks: [
                  {
                    activities: [
                      {
                        progress: 100,
                        executionStatus: "Completed",
                        scheduleHealth: "On Track",
                        plannedStartDate: "2024-01-01",
                        plannedEndDate: "2024-01-15",
                        actualEndDate: "2024-01-15",
                      },
                      {
                        progress: 50,
                        executionStatus: "In Progress",
                        scheduleHealth: "Delayed",
                        plannedStartDate: "2024-01-16",
                        plannedEndDate: "2024-01-20",
                        // actualEndDate intentionally omitted
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            milestoneName: "M2",
            weightage: 50,
            tasks: [
              {
                subTasks: [
                  {
                    activities: [
                      {
                        progress: 0,
                        executionStatus: "Not Started",
                        scheduleHealth: "On Track",
                        plannedStartDate: "2024-02-01",
                        plannedEndDate: "2024-02-10",
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
    createdDate: "2025-01-01",
    phases: [
      {
        phaseName: "Phase 1",
        milestones: [
          {
            milestoneName: "M3",
            weightage: 100,
            tasks: [
              {
                subTasks: [
                  {
                    activities: [
                      {
                        progress: 100,
                        executionStatus: "Completed",
                        scheduleHealth: "On Track",
                        plannedStartDate: `${currentYear}-01-01`,
                        plannedEndDate: `${currentYear}-12-31`,
                        actualEndDate: `${currentYear}-12-31`,
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
  it("calculates weighted progress", () => {
    expect(calculateOverallProgress(mockProjects)).toBe(69);
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

  expect(getBusinessImpactSummary(mockProjects)).toEqual({
  operationalEfficiency: 69,
  customerSatisfaction: 74,
  riskReduction: 79,
  costOptimization: 77,
});
});
