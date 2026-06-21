import { describe, expect, it } from "vitest";
import { getProjectMetrics } from "../utils/projectMetrics";

describe("getProjectMetrics", () => {
  it("returns default values when project is empty", () => {
    const result = getProjectMetrics({});

    expect(result.overallProgress).toBe(0);
    expect(result.readiness).toBe(0);
    expect(result.currentPhase).toBe("Completed");
    expect(result.currentMilestone).toBe("Completed");
    expect(result.delayDays).toBe(0);
    expect(result.totalActivities).toBe(0);
    expect(result.completedActivities).toBe(0);
    expect(result.status).toBe("On Track");
  });

  it("calculates progress and readiness correctly", () => {
    const project = {
      phases: [
        {
          phaseName: "Phase 1",
          milestones: [
            {
              milestoneName: "M1",
              tasks: [
                {
                  subTasks: [
                    {
                      activities: [{ progress: 100 }, { progress: 50 }],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };

    const result = getProjectMetrics(project);

    expect(result.totalActivities).toBe(2);
    expect(result.completedActivities).toBe(1);
    expect(result.overallProgress).toBe(75);
    expect(result.readiness).toBe(50);
  });

  it("identifies current phase and milestone dynamically", () => {
    const project = {
      phases: [
        {
          phaseName: "Initiation",
          milestones: [
            {
              milestoneName: "M1",
              tasks: [
                {
                  subTasks: [
                    {
                      activities: [{ progress: 50 }],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };

    const result = getProjectMetrics(project);

    expect(result.currentPhase).toBe("Initiation");
    expect(result.currentMilestone).toBe("M1");
  });

  it("marks project as completed when all activities are 100%", () => {
    const project = {
      phases: [
        {
          phaseName: "Phase 1",
          milestones: [
            {
              milestoneName: "M1",
              tasks: [
                {
                  subTasks: [
                    {
                      activities: [{ progress: 100 }, { progress: 100 }],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };

    const result = getProjectMetrics(project);

    expect(result.currentPhase).toBe("Completed");
    expect(result.currentMilestone).toBe("Completed");
    expect(result.readiness).toBe(100);
    expect(result.overallProgress).toBe(100);
  });

  it("calculates delay from actual end date", () => {
    const project = {
      phases: [
        {
          phaseName: "Phase 1",
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
                          plannedEndDate: "2026-01-01",
                          actualEndDate: "2026-01-10",
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
    };

    const result = getProjectMetrics(project);

    expect(result.delayDays).toBeGreaterThan(0);
  });

  it("calculates delay for overdue incomplete activity", () => {
    const oldDate = new Date();
    oldDate.setDate(oldDate.getDate() - 10);

    const project = {
      phases: [
        {
          phaseName: "Phase 1",
          milestones: [
            {
              milestoneName: "M1",
              tasks: [
                {
                  subTasks: [
                    {
                      activities: [
                        {
                          progress: 50,
                          plannedEndDate: oldDate.toISOString(),
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
    };

    const result = getProjectMetrics(project);

    expect(result.delayDays).toBeGreaterThan(0);
  });

  it("sets status as At Risk", () => {
    const project = {
      phases: [
        {
          phaseName: "Phase 1",
          milestones: [
            {
              milestoneName: "M1",
              tasks: [
                {
                  subTasks: [
                    {
                      activities: [
                        {
                          progress: 50,
                          plannedEndDate: "2026-01-01",
                          actualEndDate: "2026-01-10",
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
    };

    const result = getProjectMetrics(project);

    expect(result.status).toBe("At Risk");
  });

  it("sets status as Delayed", () => {
    const project = {
      phases: [
        {
          phaseName: "Phase 1",
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
                          plannedEndDate: "2026-01-01",
                          actualEndDate: "2026-02-01",
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
    };

    const result = getProjectMetrics(project);

    expect(result.status).toBe("Delayed");
  });

  it("calculates go live date and days remaining", () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 30);

    const project = {
      phases: [
        {
          phaseName: "Phase 1",
          milestones: [
            {
              milestoneName: "M1",
              tasks: [
                {
                  subTasks: [
                    {
                      activities: [
                        {
                          progress: 50,
                          plannedEndDate: futureDate.toISOString(),
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
    };

    const result = getProjectMetrics(project);

    expect(result.goLiveDate).toBeTruthy();
    expect(result.daysRemaining).toBeGreaterThan(0);
  });

  it("calculates schedule variance", () => {
    const project = {
      createdDate: "2026-01-01",
      phases: [
        {
          phaseName: "Phase 1",
          milestones: [
            {
              milestoneName: "M1",
              tasks: [
                {
                  subTasks: [
                    {
                      activities: [
                        {
                          progress: 50,
                          plannedEndDate: "2027-01-01",
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
    };

    const result = getProjectMetrics(project);

    expect(typeof result.scheduleVariance).toBe("number");
  });

  it("uses fallback names when phase or milestone name is missing", () => {
    const project = {
      phases: [
        {
          milestones: [
            {
              tasks: [
                {
                  subTasks: [
                    {
                      activities: [{ progress: 50 }],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };

    const result = getProjectMetrics(project);

    expect(result.currentPhase).toBe("Unnamed Phase");
    expect(result.currentMilestone).toBe("Unnamed Milestone");
  });
});
