import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import ProjectOverview from "../components/ProjectOverview";

describe("ProjectOverview", () => {
  const project = {
    projectName: "CBS Implementation",
    bankName: "HDFC Bank",
    projectManager: "John Doe",
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
                        activityName: "Activity 1",
                        plannedStartDate: "2025-01-01",
                        plannedEndDate: "2025-06-30",
                        scheduleHealth: "On Track",
                      },
                      {
                        activityName: "Activity 2",
                        plannedStartDate: "2025-02-01",
                        plannedEndDate: "2025-07-15",
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

  beforeEach(() => {
    render(<ProjectOverview project={project} />);
  });

  it("renders without crashing", () => {
    expect(screen.getByText("Project Overview")).toBeInTheDocument();
  });

  it("renders project title", () => {
    expect(screen.getAllByText("CBS Implementation")[0]).toBeInTheDocument();
  });

  it("renders bank name", () => {
    expect(screen.getByText("HDFC Bank")).toBeInTheDocument();
  });

  it("renders project manager", () => {
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("renders project manager label", () => {
    expect(screen.getByText("Project Manager")).toBeInTheDocument();
  });

  it("renders start date label", () => {
    expect(screen.getByText("Start Date")).toBeInTheDocument();
  });

  it("renders target go-live label", () => {
    expect(screen.getByText("Target Go-Live")).toBeInTheDocument();
  });

  it("renders project type label", () => {
    expect(screen.getByText("Project Type")).toBeInTheDocument();
  });

  it("renders project status label", () => {
    expect(screen.getByText("Project Status")).toBeInTheDocument();
  });

  it("shows earliest planned start date", () => {
    expect(screen.getByText("2025-01-01")).toBeInTheDocument();
  });

  it("shows latest planned end date", () => {
    expect(screen.getByText("2025-07-15")).toBeInTheDocument();
  });

  it("shows project name as project type", () => {
    const types = screen.getAllByText("CBS Implementation");

    expect(types.length).toBeGreaterThan(1);
  });

  it("shows At Risk status when at least one activity is delayed", () => {
    expect(screen.getByText("At Risk")).toBeInTheDocument();
  });

  it("renders all section labels", () => {
    expect(screen.getByText("Start Date")).toBeInTheDocument();
    expect(screen.getByText("Target Go-Live")).toBeInTheDocument();
    expect(screen.getByText("Project Type")).toBeInTheDocument();
    expect(screen.getByText("Project Status")).toBeInTheDocument();
  });

  it("renders project overview heading once", () => {
    expect(screen.getAllByText("Project Overview")).toHaveLength(1);
  });

  it("renders project manager only once", () => {
    expect(screen.getAllByText("John Doe")).toHaveLength(1);
  });

  it("renders bank name once", () => {
    expect(screen.getAllByText("HDFC Bank")).toHaveLength(1);
  });

  it("renders project status once", () => {
    expect(screen.getAllByText("At Risk")).toHaveLength(1);
  });

  it("renders project type badge", () => {
    expect(screen.getAllByText("CBS Implementation")[1]).toBeInTheDocument();
  });

  it("renders icons", () => {
    expect(document.querySelectorAll("svg").length).toBeGreaterThanOrEqual(5);
  });

  it("handles project with no delayed activities", () => {
    const onTrackProject = {
      ...project,
      phases: [
        {
          phaseName: "Phase",
          milestones: [
            {
              milestoneName: "M1",
              tasks: [
                {
                  taskName: "Task",
                  subTasks: [
                    {
                      subTaskName: "Sub",
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

  it("renders '-' when activities array is empty", () => {
    render(
      <ProjectOverview
        project={{
          ...project,
          phases: [],
        }}
      />,
    );

    expect(screen.getAllByText("-").length).toBeGreaterThanOrEqual(2);
  });

  it("renders empty project safely", () => {
    render(<ProjectOverview project={{}} />);

    expect(screen.getAllByText("Project Overview")[1]).toBeInTheDocument();
  });

  it("renders null project safely", () => {
    render(<ProjectOverview project={null} />);

    expect(screen.getAllByText("Project Overview")[1]).toBeInTheDocument();
  });

  it("renders undefined project safely", () => {
    render(<ProjectOverview />);

    expect(screen.getAllByText("Project Overview")[1]).toBeInTheDocument();
  });

  it("renders placeholder dates when no activities exist", () => {
    render(
      <ProjectOverview
        project={{
          projectName: "Demo",
          bankName: "Bank",
          projectManager: "Manager",
          phases: [],
        }}
      />,
    );

    expect(screen.getAllByText("-")).toHaveLength(2);
  });

  it("renders project type correctly", () => {
    expect(screen.getAllByText("CBS Implementation")[0]).toBeInTheDocument();
  });

  it("renders start date only once", () => {
    expect(screen.getAllByText("2025-01-01")).toHaveLength(1);
  });

  it("renders target end date only once", () => {
    expect(screen.getAllByText("2025-07-15")).toHaveLength(1);
  });

  it("contains multiple svg icons", () => {
    const { container } = render(<ProjectOverview project={project} />);

    expect(container.querySelectorAll("svg").length).toBeGreaterThan(4);
  });

  it("renders all information cards", () => {
    expect(screen.getByText("Start Date")).toBeInTheDocument();
    expect(screen.getByText("Target Go-Live")).toBeInTheDocument();
    expect(screen.getByText("Project Type")).toBeInTheDocument();
    expect(screen.getByText("Project Status")).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { container } = render(<ProjectOverview project={project} />);

    expect(container).toMatchSnapshot();
  });
});
