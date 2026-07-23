import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { getProjectMetrics } from "../utils/projectMetrics";

describe("getProjectMetrics", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-15"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns default values for empty project", () => {
    expect(getProjectMetrics({})).toEqual({
      overallProgress: 0,
      readiness: 0,
      currentPhase: "Completed",
      currentMilestone: "Completed",
      projectStartDate: null,
      goLiveDate: null,
      daysRemaining: 0,
      delayWeeks: 0,
      scheduleVariance: 0,
      totalActivities: 0,
      completedActivities: 0,
      status: "On Track",
    });
  });

  const project = {
    createdDate: "2026-01-01",
    phases: [
      {
        phaseName: "Implementation",
        milestones: [
          {
            milestoneName: "Development",
            weightage: 100,
            tasks: [
              {
                subTasks: [
                  {
                    activities: [
                      {
                        progress: 100,
                        plannedStartDate: "2026-01-01",
                        plannedEndDate: "2026-02-01",
                        actualEndDate: "2026-02-01",
                      },
                      {
                        progress: 50,
                        plannedStartDate: "2026-01-05",
                        plannedEndDate: "2026-02-10",
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

  it("calculates overall progress", () => {
    const metrics = getProjectMetrics(project);

    expect(metrics.overallProgress).toBe(75);
  });

  it("calculates readiness", () => {
    const metrics = getProjectMetrics(project);

    expect(metrics.readiness).toBe(50);
  });

  it("returns current phase", () => {
    const metrics = getProjectMetrics(project);

    expect(metrics.currentPhase).toBe("Implementation");
  });

  it("returns current milestone", () => {
    const metrics = getProjectMetrics(project);

    expect(metrics.currentMilestone).toBe("Development");
  });

  it("returns project start date", () => {
    const metrics = getProjectMetrics(project);

    expect(metrics.projectStartDate).toBe("2026-01-01");
  });

  it("returns go live date", () => {
    const metrics = getProjectMetrics(project);

    expect(metrics.goLiveDate).toBe("2026-02-10");
  });

  it("calculates days remaining", () => {
    const metrics = getProjectMetrics(project);

    expect(metrics.daysRemaining).toBeGreaterThan(0);
  });

  it("returns on track status", () => {
    const metrics = getProjectMetrics(project);

    expect(metrics.status).toBe("On Track");
  });

  it("returns delayed status", () => {
    const delayedProject = structuredClone(project);

    delayedProject.phases[0].milestones[0].tasks[0].subTasks[0].activities[1].plannedEndDate =
      "2025-12-20";

    const metrics = getProjectMetrics(delayedProject);

    expect(metrics.status).toBe("Delayed");
  });

  it("returns at risk status", () => {
    vi.setSystemTime(new Date("2026-02-16"));

    const riskProject = structuredClone(project);

    riskProject.phases[0].milestones[0].tasks[0].subTasks[0].activities[1].plannedEndDate =
      "2026-02-08";

    const metrics = getProjectMetrics(riskProject);

    expect(metrics.status).toBe("At Risk");
  });

  it("calculates delay weeks", () => {
    const delayedProject = structuredClone(project);

    delayedProject.phases[0].milestones[0].tasks[0].subTasks[0].activities[1].plannedEndDate =
      "2025-12-20";

    const metrics = getProjectMetrics(delayedProject);

    expect(metrics.delayWeeks).toBeGreaterThan(2);
  });

  it("calculates weighted progress", () => {
    const weightedProject = {
      phases: [
        {
          phaseName: "Phase 1",
          milestones: [
            {
              milestoneName: "M1",
              weightage: 40,
              tasks: [
                {
                  subTasks: [
                    {
                      activities: [{ progress: 100 }],
                    },
                  ],
                },
              ],
            },
            {
              milestoneName: "M2",
              weightage: 60,
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

    const metrics = getProjectMetrics(weightedProject);

    expect(metrics.overallProgress).toBe(70);
  });

  it("returns completed when all activities are completed", () => {
    const completedProject = {
      phases: [
        {
          phaseName: "Completed Phase",
          milestones: [
            {
              milestoneName: "Completed Milestone",
              weightage: 100,
              tasks: [
                {
                  subTasks: [
                    {
                      activities: [
                        {
                          progress: 100,
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

    const metrics = getProjectMetrics(completedProject);

    expect(metrics.currentPhase).toBe("Completed");
    expect(metrics.currentMilestone).toBe("Completed");
    expect(metrics.readiness).toBe(100);
    expect(metrics.overallProgress).toBe(100);
  });
});