import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ExecutiveSummary from "../Components/ExecutiveSummary";

const project = {
  phases: [
    {
      phaseName: "Phase 1",
      milestones: [
        {
          milestoneName: "Requirement",
          tasks: [
            {
              subTasks: [
                {
                  activities: [
                    {
                      executionStatus: "Completed",
                      scheduleHealth: "On Track",
                      progress: 100,
                      plannedStartDate: "2025-01-01",
                    },
                    {
                      executionStatus: "In Progress",
                      scheduleHealth: "Delayed",
                      progress: 50,
                      plannedStartDate: "2025-01-10",
                    },
                    {
                      executionStatus: "Pending",
                      scheduleHealth: "Delayed",
                      progress: 0,
                      plannedStartDate: "2025-01-20",
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
              subTasks: [
                {
                  activities: [
                    {
                      executionStatus: "Completed",
                      scheduleHealth: "On Track",
                      progress: 100,
                      plannedStartDate: "2025-02-01",
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

describe("ExecutiveSummary", () => {
  it("renders heading", () => {
    render(<ExecutiveSummary project={project} />);

    expect(
      screen.getByText("Executive Summary")
    ).toBeInTheDocument();
  });

  it("renders summary cards", () => {
    render(<ExecutiveSummary project={project} />);

    expect(screen.getByText("Overall Progress")).toBeInTheDocument();
    expect(screen.getByText("Total Activities")).toBeInTheDocument();
    expect(screen.getByText("Completed")).toBeInTheDocument();
    expect(screen.getByText("Delayed")).toBeInTheDocument();
    expect(screen.getByText("Open / Remaining")).toBeInTheDocument();
  });

it("shows calculated values", () => {
  render(<ExecutiveSummary project={project} />);

  expect(screen.getByText("Total Activities")).toBeInTheDocument();
  expect(screen.getByText("Completed")).toBeInTheDocument();
  expect(screen.getByText("Delayed")).toBeInTheDocument();
  expect(screen.getByText("Open / Remaining")).toBeInTheDocument();

  expect(screen.getByText("4")).toBeInTheDocument();

  expect(screen.getAllByText("2")).toHaveLength(4);
});

  it("opens milestone dropdown", () => {
    render(<ExecutiveSummary project={project} />);

    fireEvent.click(screen.getByText("All Milestones"));

    expect(screen.getByText("Requirement")).toBeInTheDocument();
    expect(screen.getByText("Development")).toBeInTheDocument();
  });

  it("selects a milestone", () => {
    render(<ExecutiveSummary project={project} />);

    fireEvent.click(screen.getByText("All Milestones"));

    fireEvent.click(screen.getByLabelText("Requirement"));

    expect(screen.getByText("1 Selected")).toBeInTheDocument();
  });

  it("changes from date", () => {
    render(<ExecutiveSummary project={project} />);

    const inputs = screen.getAllByDisplayValue("");

    fireEvent.change(inputs[0], {
      target: {
        value: "2025-01-01",
      },
    });

    expect(inputs[0].value).toBe("2025-01-01");
  });

  it("changes to date", () => {
    render(<ExecutiveSummary project={project} />);

    const inputs = screen.getAllByDisplayValue("");

    fireEvent.change(inputs[1], {
      target: {
        value: "2025-01-31",
      },
    });

    expect(inputs[1].value).toBe("2025-01-31");
  });

  it("clicks today quick filter", () => {
    render(<ExecutiveSummary project={project} />);

    fireEvent.click(screen.getByText("Today"));

    expect(screen.getByText("Today")).toBeInTheDocument();
  });

  it("clicks week quick filter", () => {
    render(<ExecutiveSummary project={project} />);

    fireEvent.click(screen.getByText("Week"));
  });

  it("clicks month quick filter", () => {
    render(<ExecutiveSummary project={project} />);

    fireEvent.click(screen.getByText("Month"));
  });

  it("clicks quarter quick filter", () => {
    render(<ExecutiveSummary project={project} />);

    fireEvent.click(screen.getByText("Quarter"));
  });

  it("clicks half yearly quick filter", () => {
    render(<ExecutiveSummary project={project} />);

    fireEvent.click(screen.getByText("Half-Yearly"));
  });

  it("clicks year quick filter", () => {
    render(<ExecutiveSummary project={project} />);

    fireEvent.click(screen.getByText("Year"));
  });

  it("clears filters", () => {
    render(<ExecutiveSummary project={project} />);

    fireEvent.click(screen.getByText("Clear"));

    expect(screen.getByText("All Milestones")).toBeInTheDocument();
  });

  it("renders with empty project", () => {
    render(<ExecutiveSummary project={{ phases: [] }} />);

    expect(
      screen.getByText("Executive Summary")
    ).toBeInTheDocument();
  });

  it("renders when project has no phases", () => {
    render(<ExecutiveSummary project={{}} />);

    expect(
      screen.getByText("Executive Summary")
    ).toBeInTheDocument();
  });
});