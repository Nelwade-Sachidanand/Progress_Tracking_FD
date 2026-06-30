import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ActivityStatusOverview from "../components/ActivityStatusOverview";

describe("ActivityStatusOverview", () => {
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
                    subTaskName: "SubTask 1",
                    activities: [
                      {
                        activityName: "Upcoming Activity",
                        plannedStartDate: "2099-01-01",
                        scheduleHealth: "On Track",
                        executionStatus: "Pending",
                      },
                      {
                        activityName: "Delayed Activity",
                        plannedStartDate: "2020-01-01",
                        scheduleHealth: "Delayed",
                        executionStatus: "Delayed",
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

  it("renders heading", () => {
    render(<ActivityStatusOverview project={project} />);

    expect(screen.getByText("Activity Status Overview")).toBeInTheDocument();
  });

  it("renders upcoming section", () => {
    render(<ActivityStatusOverview project={project} />);

    expect(screen.getByText(/Upcoming Activities/i)).toBeInTheDocument();
  });

  it("renders delayed section", () => {
    render(<ActivityStatusOverview project={project} />);

    expect(screen.getByText(/Delayed Activities/i)).toBeInTheDocument();
  });

  it("renders upcoming activity", () => {
    render(<ActivityStatusOverview project={project} />);

    expect(screen.getByText("Upcoming Activity")).toBeInTheDocument();
  });

  it("renders delayed activity", () => {
    render(<ActivityStatusOverview project={project} />);

    expect(screen.getByText("Delayed Activity")).toBeInTheDocument();
  });

  it("renders milestone name", () => {
    render(<ActivityStatusOverview project={project} />);

    expect(screen.getAllByText("Milestone 1").length).toBeGreaterThan(0);
  });

  it("shows upcoming badge", () => {
    render(<ActivityStatusOverview project={project} />);

    expect(screen.getByText("Upcoming")).toBeInTheDocument();
  });

  it("shows delayed badge", () => {
    render(<ActivityStatusOverview project={project} />);

    expect(screen.getByText("Delayed")).toBeInTheDocument();
  });

  it("shows upcoming activity count", () => {
    render(<ActivityStatusOverview project={project} />);

    expect(screen.getByText(/Upcoming Activities \(1\)/i)).toBeInTheDocument();
  });

  it("shows delayed activity count", () => {
    render(<ActivityStatusOverview project={project} />);

    expect(screen.getByText(/Delayed Activities \(1\)/i)).toBeInTheDocument();
  });

  it("renders without crashing", () => {
    render(<ActivityStatusOverview project={project} />);

    expect(screen.getByText("Activity Status Overview")).toBeTruthy();
  });

  it("shows no upcoming activities message", () => {
    const emptyProject = {
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
                      subTaskName: "SubTask",
                      activities: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };

    render(<ActivityStatusOverview project={emptyProject} />);

    expect(screen.getByText("No upcoming activities")).toBeInTheDocument();
  });

  it("shows no delayed activities message", () => {
    const emptyProject = {
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
                      subTaskName: "SubTask",
                      activities: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };

    render(<ActivityStatusOverview project={emptyProject} />);

    expect(screen.getByText("No delayed activities")).toBeInTheDocument();
  });

  it("handles undefined project", () => {
    render(<ActivityStatusOverview />);

    expect(screen.getByText("No upcoming activities")).toBeInTheDocument();

    expect(screen.getByText("No delayed activities")).toBeInTheDocument();
  });

  it("handles empty phases", () => {
    render(<ActivityStatusOverview project={{ phases: [] }} />);

    expect(screen.getByText("No upcoming activities")).toBeInTheDocument();

    expect(screen.getByText("No delayed activities")).toBeInTheDocument();
  });

  it("renders header number", () => {
    render(<ActivityStatusOverview project={project} />);

    expect(screen.getByText("4")).toBeInTheDocument();
  });

  it("renders exactly one upcoming activity", () => {
    render(<ActivityStatusOverview project={project} />);

    expect(screen.getAllByText("Upcoming Activity")).toHaveLength(1);
  });

  it("renders exactly one delayed activity", () => {
    render(<ActivityStatusOverview project={project} />);

    expect(screen.getAllByText("Delayed Activity")).toHaveLength(1);
  });

  it("does not show upcoming badge for delayed activity", () => {
    render(<ActivityStatusOverview project={project} />);

    expect(screen.getAllByText("Upcoming")).toHaveLength(1);
  });

  it("does not show delayed badge for upcoming activity", () => {
    render(<ActivityStatusOverview project={project} />);

    expect(screen.getAllByText("Delayed")).toHaveLength(1);
  });

  it("renders both activity cards", () => {
    render(<ActivityStatusOverview project={project} />);

    expect(screen.getByText(/Upcoming Activities/i)).toBeInTheDocument();

    expect(screen.getByText(/Delayed Activities/i)).toBeInTheDocument();
  });

  it("handles null project", () => {
    render(<ActivityStatusOverview project={null} />);

    expect(screen.getByText("No upcoming activities")).toBeInTheDocument();

    expect(screen.getByText("No delayed activities")).toBeInTheDocument();
  });

  it("handles project without phases", () => {
    render(<ActivityStatusOverview project={{}} />);

    expect(screen.getByText("No upcoming activities")).toBeInTheDocument();

    expect(screen.getByText("No delayed activities")).toBeInTheDocument();
  });

  it("renders svg icons", () => {
    const { container } = render(<ActivityStatusOverview project={project} />);

    expect(container.querySelectorAll("svg").length).toBeGreaterThan(0);
  });

  it("matches activity counts", () => {
    render(<ActivityStatusOverview project={project} />);

    expect(screen.getByText(/Upcoming Activities \(1\)/i)).toBeInTheDocument();

    expect(screen.getByText(/Delayed Activities \(1\)/i)).toBeInTheDocument();
  });
});
