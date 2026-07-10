import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import MilestoneJourney from "../Components/MilestoneJourney";

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
                subTasks: [
                  {
                    activities: [
                      {
                        executionStatus: "Completed",
                      },
                      {
                        executionStatus: "Completed",
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
                      },
                      {
                        executionStatus: "In Progress",
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
                subTasks: [
                  {
                    activities: [
                      {
                        executionStatus: "Pending",
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

    expect(
      screen.getByText("Milestone Journey")
    ).toBeInTheDocument();
  });

  it("renders milestone names", () => {
    render(<MilestoneJourney project={project} />);

    expect(
      screen.getByText("Requirement")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Development")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Testing")
    ).toBeInTheDocument();
  });

  it("shows completed milestone", () => {
    render(<MilestoneJourney project={project} />);

    expect(screen.getByText("100%")).toBeInTheDocument();

    expect(
      screen.getByText("Completed")
    ).toBeInTheDocument();
  });

  it("shows in progress milestone", () => {
    render(<MilestoneJourney project={project} />);

    expect(screen.getByText("50%")).toBeInTheDocument();

    expect(
      screen.getByText("In Progress")
    ).toBeInTheDocument();
  });

  it("shows not started milestone", () => {
    render(<MilestoneJourney project={project} />);

    expect(screen.getByText("0%")).toBeInTheDocument();

    expect(
      screen.getByText("Not Started")
    ).toBeInTheDocument();
  });

  it("renders correctly with empty project", () => {
    render(<MilestoneJourney project={{ phases: [] }} />);

    expect(
      screen.getByText("Milestone Journey")
    ).toBeInTheDocument();
  });
it("renders when project has no phases", () => {
  render(<MilestoneJourney project={{ phases: [] }} />);

  expect(
    screen.getByText("Milestone Journey")
  ).toBeInTheDocument();
});

  it("renders correctly when milestone has no activities", () => {
    const emptyProject = {
      phases: [
        {
          milestones: [
            {
              milestoneName: "Deployment",
              tasks: [],
            },
          ],
        },
      ],
    };

    render(<MilestoneJourney project={emptyProject} />);

    expect(
      screen.getByText("Deployment")
    ).toBeInTheDocument();

    expect(screen.getByText("0%")).toBeInTheDocument();

    expect(
      screen.getByText("Not Started")
    ).toBeInTheDocument();
  });

  it("renders all milestone percentages", () => {
    render(<MilestoneJourney project={project} />);

    expect(screen.getByText("100%")).toBeInTheDocument();
    expect(screen.getByText("50%")).toBeInTheDocument();
    expect(screen.getByText("0%")).toBeInTheDocument();
  });

  it("renders milestone title attribute", () => {
    render(<MilestoneJourney project={project} />);

    expect(
      screen.getByTitle("Requirement")
    ).toBeInTheDocument();

    expect(
      screen.getByTitle("Development")
    ).toBeInTheDocument();

    expect(
      screen.getByTitle("Testing")
    ).toBeInTheDocument();
  });
});