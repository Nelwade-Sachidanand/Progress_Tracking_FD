import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import RiskAndIssues from "../Components/RiskAndIssues";

describe("RiskAndIssues", () => {
  const today = new Date();

  const format = (date) => date.toISOString().split("T")[0];

  const lastWeek = new Date(today);
  lastWeek.setDate(today.getDate() - 8);

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const project = {
    phases: [
      {
        phaseId: "P1",
        phaseName: "Phase 1",
        milestones: [
          {
            milestoneId: "M1",
            milestoneName: "Milestone 1",
            tasks: [
              {
                taskId: "T1",
                taskName: "Task 1",
                subTasks: [
                  {
                    subTaskId: "S1",
                    subTaskName: "SubTask 1",
                    activities: [
                      {
                        activityId: "A1",
                        activityName: "Activity 1",
                        plannedStartDate: format(lastWeek),
                        plannedEndDate: format(yesterday),
                        executionStatus: "In Progress",
                        progress: 20,
                        scheduleHealth: "Delayed",
                      },
                      {
                        activityId: "A2",
                        activityName: "Activity 2",
                        plannedStartDate: format(lastWeek),
                        plannedEndDate: format(tomorrow),
                        executionStatus: "Not Started",
                        progress: 0,
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

  beforeEach(() => {
    sessionStorage.clear();

    sessionStorage.setItem(
      "user",
      JSON.stringify({
        role: "ADMIN",
      })
    );
  });

  it("renders header", () => {
    render(<RiskAndIssues project={project} />);

    expect(screen.getByText("Risks & Issues")).toBeInTheDocument();
  });

  it("shows all cards for admin", () => {
    render(<RiskAndIssues project={project} />);

    expect(screen.getByText("Critical Risks")).toBeInTheDocument();
    expect(screen.getByText("Escalations")).toBeInTheDocument();
    expect(screen.getByText("Dependencies")).toBeInTheDocument();
  });

  it("does not show escalation card for normal user", () => {
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        role: "USER",
      })
    );

    render(<RiskAndIssues project={project} />);

    expect(screen.queryByText("Escalations")).not.toBeInTheDocument();
  });

  

 it("opens critical risk modal", () => {
  render(<RiskAndIssues project={project} />);

  fireEvent.click(screen.getAllByText("View Details")[0]);

  expect(screen.getAllByText("Critical Risks")).toHaveLength(2);
  expect(screen.getByText("Activity")).toBeInTheDocument();
  expect(screen.getByText("Milestone")).toBeInTheDocument();
});

it("opens dependency modal", () => {
  render(<RiskAndIssues project={project} />);

  fireEvent.click(screen.getAllByText("View Details")[2]);

  expect(screen.getAllByText("Dependencies")).toHaveLength(2);
  expect(screen.getByText("Blocked By")).toBeInTheDocument();
  expect(screen.getByText("Dependency Status")).toBeInTheDocument();
});

it("renders activity inside modal", () => {
  render(<RiskAndIssues project={project} />);

  fireEvent.click(screen.getAllByText("View Details")[0]);

  expect(screen.getByText("Activity 1")).toBeInTheDocument();
  expect(screen.getAllByText("Milestone 1")).toHaveLength(2);
});

  it("closes modal", () => {
    render(<RiskAndIssues project={project} />);

    fireEvent.click(screen.getAllByText("View Details")[0]);

    fireEvent.click(screen.getByTitle("Close"));

    expect(screen.queryByText("Activity")).not.toBeInTheDocument();
  });

  it("renders empty project", () => {
    render(<RiskAndIssues project={{ phases: [] }} />);

    expect(screen.getByText("Risks & Issues")).toBeInTheDocument();
  });

  it("renders undefined project", () => {
    render(<RiskAndIssues />);

    expect(screen.getByText("Risks & Issues")).toBeInTheDocument();
  });

  

  it("shows risk level", () => {
    render(<RiskAndIssues project={project} />);

    fireEvent.click(screen.getAllByText("View Details")[0]);

    expect(screen.getByText("Critical")).toBeInTheDocument();
  });
});