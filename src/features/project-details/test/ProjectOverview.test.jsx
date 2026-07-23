import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import ProjectOverview from "../components/ProjectOverview";


describe("ProjectOverview", () => {
  const project = {
    projectName: "Progress Tracker",
    bankName: "ABC Bank",
    projectManager: "John Doe",
    phases: [
      {
        milestones: [
          {
            tasks: [
              {
                subTasks: [
                  {
                    activities: [
                      {
                        plannedStartDate: "2025-01-10",
                        plannedEndDate: "2025-03-15",
                        scheduleHealth: "On Track",
                      },
                      {
                        plannedStartDate: "2025-01-05",
                        plannedEndDate: "2025-04-20",
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

  it("renders project overview title", () => {
    render(<ProjectOverview project={project} />);

    expect(screen.getByText("Project Overview")).toBeInTheDocument();
  });

  it("renders project information", () => {
    render(<ProjectOverview project={project} />);

    expect(screen.getByText("Progress Tracker")).toBeInTheDocument();
    expect(screen.getByText("ABC Bank")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("shows formatted project start date", () => {
    render(<ProjectOverview project={project} />);

    expect(screen.getByText("05-01-2025")).toBeInTheDocument();
  });

  it("shows formatted target go-live date", () => {
    render(<ProjectOverview project={project} />);

    expect(screen.getByText("20-04-2025")).toBeInTheDocument();
  });

  it("shows project status as At Risk when delayed activities exist", () => {
    render(<ProjectOverview project={project} />);

    expect(screen.getByText("At Risk")).toBeInTheDocument();
  });

  it("shows project status as On Track when no delayed activity exists", () => {
    const onTrackProject = {
      ...project,
      phases: [
        {
          milestones: [
            {
              tasks: [
                {
                  subTasks: [
                    {
                      activities: [
                        {
                          plannedStartDate: "2025-01-01",
                          plannedEndDate: "2025-02-01",
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

    render(<ProjectOverview project={onTrackProject} />);

    expect(screen.getByText("On Track")).toBeInTheDocument();
  });

  it("shows '-' when project has no activities", () => {
    render(
      <ProjectOverview
        project={{
          projectName: "Demo",
          bankName: "Bank",
          projectManager: "Manager",
          phases: [],
        }}
      />
    );

    expect(screen.getAllByText("-")).toHaveLength(2);
  });

  it("renders with undefined project", () => {
    render(<ProjectOverview />);

    expect(screen.getByText("Project Overview")).toBeInTheDocument();
    expect(screen.getAllByText("-")).toHaveLength(2);
    expect(screen.getByText("On Track")).toBeInTheDocument();
  });

  it("handles invalid dates", () => {
    const invalidProject = {
      ...project,
      phases: [
        {
          milestones: [
            {
              tasks: [
                {
                  subTasks: [
                    {
                      activities: [
                        {
                          plannedStartDate: "invalid-date",
                          plannedEndDate: "invalid-date",
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

    render(<ProjectOverview project={invalidProject} />);

    expect(screen.getAllByText("-")).toHaveLength(2);
  });

  it("renders labels correctly", () => {
    render(<ProjectOverview project={project} />);

    expect(screen.getByText("Project Name:")).toBeInTheDocument();
    expect(screen.getByText("Bank Name:")).toBeInTheDocument();
    expect(screen.getByText("Project Manager:")).toBeInTheDocument();
    expect(screen.getByText("Project Start:")).toBeInTheDocument();
    expect(screen.getByText("Target Go-Live:")).toBeInTheDocument();
    expect(screen.getByText("Project Status:")).toBeInTheDocument();
  });
});