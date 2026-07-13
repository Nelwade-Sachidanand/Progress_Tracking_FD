import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import RiskAndIssues from "../Components/RiskAndIssues";

const today = new Date();
const past15 = new Date(today);
past15.setDate(today.getDate() - 15);

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
                      activityName: "Activity 1",
                      executionStatus: "In Progress",
                      progress: 40,
                      plannedStartDate: "2025-01-01",
                      plannedEndDate: past15.toISOString().split("T")[0],
                      scheduleHealth: "Delayed",
                    },
                    {
                      activityName: "Activity 2",
                      executionStatus: "Not Started",
                      progress: 0,
                      plannedStartDate: "2025-01-01",
                      plannedEndDate: "2099-01-01",
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

describe("RiskAndIssues", () => {
  beforeEach(() => {
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        role: "ADMIN",
      })
    );
  });

  it("renders heading", () => {
    render(<RiskAndIssues project={project} />);

    expect(
      screen.getByText("Risks & Issues")
    ).toBeInTheDocument();
  });

  it("renders all cards for admin", () => {
    render(<RiskAndIssues project={project} />);

    expect(
      screen.getByText("Critical Risks / Issues")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Escalations")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Dependencies")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Open Risks")
    ).toBeInTheDocument();
  });

  it("does not show escalation card for non admin", () => {
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        role: "USER",
      })
    );

    render(<RiskAndIssues project={project} />);

    expect(
      screen.queryByText("Escalations")
    ).not.toBeInTheDocument();
  });

 it("opens critical risk modal", () => {
  render(<RiskAndIssues project={project} />);

  const buttons = screen.getAllByRole("button", {
    name: /view details/i,
  });

  fireEvent.click(buttons[0]);

  expect(
    screen.getAllByText("Critical Risks / Issues")[1]
  ).toBeInTheDocument();

  expect(
    screen.getByText("Activity 1")
  ).toBeInTheDocument();
});

  it("closes modal", () => {
    render(<RiskAndIssues project={project} />);

    fireEvent.click(screen.getAllByText("View Details")[0]);

    fireEvent.click(screen.getByText("×"));

    expect(
      screen.queryByText("Activity 1")
    ).not.toBeInTheDocument();
  });

 it("opens dependency modal", () => {
  render(<RiskAndIssues project={project} />);

  const buttons = screen.getAllByRole("button", {
    name: /view details/i,
  });

  fireEvent.click(buttons[2]);

  expect(
    screen.getAllByText("Dependencies")[1]
  ).toBeInTheDocument();
});

it("opens open risk modal", () => {
  render(<RiskAndIssues project={project} />);

  const buttons = screen.getAllByRole("button", {
    name: /view details/i,
  });

  fireEvent.click(buttons[3]);

  expect(
    screen.getAllByText("Open Risks")[1]
  ).toBeInTheDocument();
});

  it("renders activity inside modal", () => {
    render(<RiskAndIssues project={project} />);

    fireEvent.click(screen.getAllByText("View Details")[0]);

    expect(
      screen.getByText("Milestone 1")
    ).toBeInTheDocument();

    expect(
      screen.getByText("40%")
    ).toBeInTheDocument();
  });

  it("renders empty project", () => {
    render(
      <RiskAndIssues
        project={{
          phases: [],
        }}
      />
    );

    expect(
      screen.getByText("Risks & Issues")
    ).toBeInTheDocument();
  });

  it("renders undefined project", () => {
    render(<RiskAndIssues />);

    expect(
      screen.getByText("Risks & Issues")
    ).toBeInTheDocument();
  });
});