import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ActivityStatusOverview from "../components/ActivityStatusOverview";


describe("ActivityStatusOverview", () => {
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 5);

  const pastDate = new Date();
  pastDate.setDate(pastDate.getDate() - 5);

  const project = {
    phases: [
      {
        phaseName: "Phase 1",
        milestones: [
          {
            milestoneName: "Milestone 1",
            tasks: [
              {
                taskName: "Task 1",
                subTasks: [
                  {
                    subTaskName: "Sub Task 1",
                    activities: [
                      {
                        activityName: "Upcoming Activity",
                        plannedStartDate: futureDate.toISOString(),
                        plannedEndDate: futureDate.toISOString(),
                        progress: 0,
                        executionStatus: "Not Started",
                        estimatedPeriodWeek: 2,
                        actualPeriodWeek: 0,
                      },
                      {
                        activityName: "In Progress Activity",
                        plannedStartDate: pastDate.toISOString(),
                        plannedEndDate: futureDate.toISOString(),
                        progress: 50,
                        executionStatus: "In Progress",
                        estimatedPeriodWeek: 2,
                        actualPeriodWeek: 1,
                      },
                      {
                        activityName: "Delayed Activity",
                        plannedStartDate: pastDate.toISOString(),
                        plannedEndDate: pastDate.toISOString(),
                        progress: 60,
                        executionStatus: "In Progress",
                        estimatedPeriodWeek: 2,
                        actualPeriodWeek: 1,
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

  it("renders component", () => {
    render(<ActivityStatusOverview project={project} />);

    expect(
      screen.getByText("Activity Status Overview")
    ).toBeInTheDocument();
  });

  it("shows upcoming activity", () => {
    render(<ActivityStatusOverview project={project} />);

    expect(
      screen.getByText("Upcoming Activity")
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Upcoming Activities \(1\)/)
    ).toBeInTheDocument();
  });

  it("shows in progress activity", () => {
    render(<ActivityStatusOverview project={project} />);

    expect(
      screen.getByText("In Progress Activity")
    ).toBeInTheDocument();

    expect(
      screen.getByText(/In Progress Activities \(2\)/)
    ).toBeInTheDocument();
  });

 it("shows delayed activity", () => {
  render(<ActivityStatusOverview project={project} />);

  expect(screen.getAllByText("Delayed Activity")).toHaveLength(2);

  expect(
    screen.getByText(/Delayed Activities \(1\)/)
  ).toBeInTheDocument();
});

  it("shows delayed completed activity when actual period exceeds estimated", () => {
    const completedProject = {
      phases: [
        {
          phaseName: "Phase",
          milestones: [
            {
              milestoneName: "Milestone",
              tasks: [
                {
                  taskName: "Task",
                  subTasks: [
                    {
                      subTaskName: "Sub",
                      activities: [
                        {
                          activityName: "Completed Delayed",
                          progress: 100,
                          executionStatus: "Completed",
                          estimatedPeriodWeek: 2,
                          actualPeriodWeek: 5,
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

    render(<ActivityStatusOverview project={completedProject} />);

    expect(
      screen.getByText("Completed Delayed")
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Delayed Activities \(1\)/)
    ).toBeInTheDocument();
  });

  it("shows empty state when no activities exist", () => {
    render(<ActivityStatusOverview project={{ phases: [] }} />);

    expect(
      screen.getByText("No upcoming activities")
    ).toBeInTheDocument();

    expect(
      screen.getByText("No activities in progress")
    ).toBeInTheDocument();

    expect(
      screen.getByText("No delayed activities")
    ).toBeInTheDocument();
  });

  it("handles undefined project", () => {
    render(<ActivityStatusOverview />);

    expect(
      screen.getByText("No upcoming activities")
    ).toBeInTheDocument();

    expect(
      screen.getByText("No activities in progress")
    ).toBeInTheDocument();

    expect(
      screen.getByText("No delayed activities")
    ).toBeInTheDocument();
  });

  it("shows correct section counts", () => {
    render(<ActivityStatusOverview project={project} />);

    expect(
      screen.getByText(/Upcoming Activities \(1\)/)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/In Progress Activities \(2\)/)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Delayed Activities \(1\)/)
    ).toBeInTheDocument();
  });
});