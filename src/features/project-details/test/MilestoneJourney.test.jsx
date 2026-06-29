import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import MilestoneJourney from "../components/MilestoneJourney";

describe("MilestoneJourney", () => {
  const project = {
    phases: [
      {
        phaseName: "Phase 1",
        milestones: [
          {
            milestoneName: "Requirement",
            tasks: [
              {
                taskName: "Task 1",
                subTasks: [
                  {
                    subTaskName: "SubTask 1",
                    activities: [
                      {
                        executionStatus: "Completed",
                        progress: 100,
                      },
                      {
                        executionStatus: "Completed",
                        progress: 100,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            milestoneName: "Development",
            tasks: [
              {
                taskName: "Task 2",
                subTasks: [
                  {
                    subTaskName: "SubTask 2",
                    activities: [
                      {
                        executionStatus: "In Progress",
                        progress: 60,
                      },
                      {
                        executionStatus: "Not Started",
                        progress: 0,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            milestoneName: "Testing",
            tasks: [
              {
                taskName: "Task 3",
                subTasks: [
                  {
                    subTaskName: "SubTask 3",
                    activities: [
                      {
                        executionStatus: "Not Started",
                        progress: 0,
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
    render(<MilestoneJourney project={project} />);

    expect(screen.getByText("Milestone Journey")).toBeInTheDocument();
  });

  it("renders milestone names", () => {
    render(<MilestoneJourney project={project} />);

    expect(screen.getByText("Requirement")).toBeInTheDocument();
    expect(screen.getByText("Development")).toBeInTheDocument();
    expect(screen.getByText("Testing")).toBeInTheDocument();
  });

  it("renders statuses", () => {
    render(<MilestoneJourney project={project} />);

    expect(screen.getByText("Completed")).toBeInTheDocument();
    expect(screen.getByText("In Progress")).toBeInTheDocument();
    expect(screen.getByText("Not Started")).toBeInTheDocument();
  });

  it("renders percentages", () => {
    render(<MilestoneJourney project={project} />);

    expect(screen.getByText("100%")).toBeInTheDocument();
    expect(screen.getAllByText("0%")).toHaveLength(2);
  });

  it("renders all milestone cards", () => {
    render(<MilestoneJourney project={project} />);

    expect(screen.getAllByText(/Requirement|Development|Testing/)).toHaveLength(
      3,
    );
  });

  it("renders icons", () => {
    const { container } = render(<MilestoneJourney project={project} />);

    expect(container.querySelectorAll("svg").length).toBeGreaterThanOrEqual(3);
  });

  it("renders timeline connector", () => {
    const { container } = render(<MilestoneJourney project={project} />);

    expect(container.querySelector(".border-dashed")).toBeTruthy();
  });

  it("renders with empty project", () => {
    render(<MilestoneJourney project={{}} />);

    expect(screen.getByText("Milestone Journey")).toBeInTheDocument();
  });

  it("renders with null project", () => {
    render(<MilestoneJourney project={null} />);

    expect(screen.getByText("Milestone Journey")).toBeInTheDocument();
  });

  it("renders without phases", () => {
    render(
      <MilestoneJourney
        project={{
          phases: [],
        }}
      />,
    );

    expect(screen.getByText("Milestone Journey")).toBeInTheDocument();
  });

  it("handles milestone without tasks", () => {
    render(
      <MilestoneJourney
        project={{
          phases: [
            {
              milestones: [
                {
                  milestoneName: "Empty",
                },
              ],
            },
          ],
        }}
      />,
    );

    expect(screen.getByText("Empty")).toBeInTheDocument();
    expect(screen.getByText("0%")).toBeInTheDocument();
  });

  it("handles milestone without subtasks", () => {
    render(
      <MilestoneJourney
        project={{
          phases: [
            {
              milestones: [
                {
                  milestoneName: "Demo",
                  tasks: [{}],
                },
              ],
            },
          ],
        }}
      />,
    );

    expect(screen.getByText("Demo")).toBeInTheDocument();
  });

  it("renders without crashing", () => {
    const { container } = render(<MilestoneJourney project={project} />);

    expect(container).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { container } = render(<MilestoneJourney project={project} />);

    expect(container).toMatchSnapshot();
  });
});
