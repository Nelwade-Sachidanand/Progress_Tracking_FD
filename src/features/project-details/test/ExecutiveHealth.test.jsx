import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ExecutiveHealth from "../components/ExecutiveHealth";
describe("ExecutiveHealth", () => {
  const today = new Date();

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 10);

  const format = (date) => date.toISOString().split("T")[0];

  const project = {
    phases: [
      {
        milestones: [
          {
            milestoneId: "M1",
            milestoneName: "Planning",
            tasks: [
              {
                subTasks: [
                  {
                    activities: [
                      {
                        plannedStartDate: format(yesterday),
                        plannedEndDate: format(tomorrow),
                        actualEndDate: format(yesterday),
                        executionStatus: "Completed",
                        progress: 100,
                        scheduleHealth: "On Track",
                      },
                      {
                        plannedStartDate: format(yesterday),
                        plannedEndDate: format(tomorrow),
                        executionStatus: "In Progress",
                        progress: 50,
                        scheduleHealth: "Delayed",
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

  it("renders Executive Health title", () => {
    render(
      <ExecutiveHealth
        project={project}
        selectedMilestones={[]}
      />
    );

    expect(
      screen.getByText("Executive Health")
    ).toBeInTheDocument();
  });

  it("renders all three cards", () => {
    render(
      <ExecutiveHealth
        project={project}
        selectedMilestones={[]}
      />
    );

    expect(screen.getByText("Project Health")).toBeInTheDocument();
    expect(screen.getByText("Risk Level")).toBeInTheDocument();
    expect(
      screen.getByText("Delivery Confidence")
    ).toBeInTheDocument();
  });

  it("shows milestone count", () => {
    render(
      <ExecutiveHealth
        project={project}
        selectedMilestones={[]}
      />
    );

    expect(screen.getAllByText("0/1 Milestones")).toHaveLength(2);
  });

  it("shows delayed count", () => {
    render(
      <ExecutiveHealth
        project={project}
        selectedMilestones={[]}
      />
    );

    expect(
      screen.getByText("1 Delayed")
    ).toBeInTheDocument();
  });

  it("filters milestones", () => {
    render(
      <ExecutiveHealth
        project={project}
        selectedMilestones={["M1"]}
      />
    );

    expect(screen.getByText("Project Health")).toBeInTheDocument();
  });

  it("renders empty project", () => {
    render(
      <ExecutiveHealth
        project={{ phases: [] }}
        selectedMilestones={[]}
      />
    );

    expect(
      screen.getByText("Executive Health")
    ).toBeInTheDocument();

    expect(screen.getByText("0%")).toBeInTheDocument();
  });

  it("renders undefined project", () => {
    render(
      <ExecutiveHealth
        selectedMilestones={[]}
      />
    );

    expect(
      screen.getByText("Executive Health")
    ).toBeInTheDocument();
  });

  it("shows LOW risk when there are no delayed activities", () => {
    const noDelayProject = {
      phases: [
        {
          milestones: [
            {
              milestoneId: "M1",
              tasks: [
                {
                  subTasks: [
                    {
                      activities: [
                        {
                          plannedStartDate: format(yesterday),
                          plannedEndDate: format(tomorrow),
                          executionStatus: "Completed",
                          progress: 100,
                          scheduleHealth: "On Track",
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

    render(
      <ExecutiveHealth
        project={noDelayProject}
        selectedMilestones={[]}
      />
    );

    expect(screen.getByText("LOW")).toBeInTheDocument();
  });

  it("renders delivery confidence card", () => {
    render(
      <ExecutiveHealth
        project={project}
        selectedMilestones={[]}
      />
    );

    expect(
      screen.getByText(/Likely On Schedule|Needs Monitoring|Delivery At Risk/)
    ).toBeInTheDocument();
  });

  it("renders project health value", () => {
    render(
      <ExecutiveHealth
        project={project}
        selectedMilestones={[]}
      />
    );

    expect(
      screen.getAllByText(/\d+%/).length
    ).toBeGreaterThan(0);
  });
});