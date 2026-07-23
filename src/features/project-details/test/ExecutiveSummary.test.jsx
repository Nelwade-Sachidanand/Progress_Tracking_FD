import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ExecutiveSummary from "../Components/ExecutiveSummary";



/* ---------------- Mocks ---------------- */

vi.mock("../../../components/common/MultiSelectDropdown", () => ({
  default: ({ label, onChange }) => (
    <button
      data-testid="milestone-filter"
      onClick={() => onChange(["M1"])}
    >
      {label}
    </button>
  ),
}));

vi.mock("../../../components/common/CustomDropdown", () => ({
  default: ({ label, onChange }) => (
    <select
      data-testid={label}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">Select</option>
      <option value="Today">Today</option>
      <option value="Week">Week</option>
      <option value="Month">Month</option>
      <option value="Quarter">Quarter</option>
      <option value="Half-Yearly">Half-Yearly</option>
      <option value="Year">Year</option>
    </select>
  ),
}));

vi.mock("../../../components/common/DateInput", () => ({
  default: ({ label, value, onChange }) => (
    <input
      data-testid={label}
      value={value}
      onChange={onChange}
    />
  ),
}));

describe("ExecutiveSummary", () => {
  const setSelectedMilestones = vi.fn();

  const today = new Date().toISOString().split("T")[0];

  const project = {
    phases: [
      {
        phaseName: "Phase 1",
        milestones: [
          {
            milestoneId: "M1",
            milestoneName: "Milestone 1",
            tasks: [
              {
                subTasks: [
                  {
                    activities: [
                      {
                        progress: 100,
                        executionStatus: "Completed",
                        scheduleHealth: "On Track",
                        plannedStartDate: today,
                      },
                      {
                        progress: 50,
                        executionStatus: "In Progress",
                        scheduleHealth: "Delayed",
                        plannedStartDate: today,
                      },
                      {
                        progress: 0,
                        executionStatus: "Not Started",
                        scheduleHealth: "On Track",
                        plannedStartDate: "2099-12-31",
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
    vi.clearAllMocks();
  });

  it("renders Executive Summary", () => {
    render(
      <ExecutiveSummary
        project={project}
        selectedMilestones={[]}
        setSelectedMilestones={setSelectedMilestones}
      />
    );

    expect(
      screen.getByText("Executive Summary")
    ).toBeInTheDocument();
  });

  it("shows summary cards", () => {
    render(
      <ExecutiveSummary
        project={project}
        selectedMilestones={[]}
        setSelectedMilestones={setSelectedMilestones}
      />
    );

    expect(screen.getByText("Total Activities")).toBeInTheDocument();
    expect(screen.getByText("Completed")).toBeInTheDocument();
    expect(screen.getByText("Delayed")).toBeInTheDocument();
    expect(screen.getByText("In Progress")).toBeInTheDocument();
    expect(screen.getByText("Not Started")).toBeInTheDocument();
  });

  it("calculates counts correctly", () => {
    render(
      <ExecutiveSummary
        project={project}
        selectedMilestones={[]}
        setSelectedMilestones={setSelectedMilestones}
      />
    );

    expect(screen.getByText("Total Activities")).toBeInTheDocument();

expect(screen.getAllByText("1")).toHaveLength(4);
expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("calculates overall progress", () => {
    render(
      <ExecutiveSummary
        project={project}
        selectedMilestones={[]}
        setSelectedMilestones={setSelectedMilestones}
      />
    );

    // (100 + 50 + 0)/3 = 50%
    expect(screen.getByText("50%")).toBeInTheDocument();
  });

  it("calls setSelectedMilestones", () => {
    render(
      <ExecutiveSummary
        project={project}
        selectedMilestones={[]}
        setSelectedMilestones={setSelectedMilestones}
      />
    );

    fireEvent.click(screen.getByTestId("milestone-filter"));

    expect(setSelectedMilestones).toHaveBeenCalledWith(["M1"]);
  });

  it("changes quick date filter", () => {
    render(
      <ExecutiveSummary
        project={project}
        selectedMilestones={[]}
        setSelectedMilestones={setSelectedMilestones}
      />
    );

    fireEvent.change(screen.getByTestId("Date Filter"), {
      target: { value: "Week" },
    });

    expect(screen.getByTestId("Date Filter")).toBeInTheDocument();
  });

  it("changes from date", () => {
    render(
      <ExecutiveSummary
        project={project}
        selectedMilestones={[]}
        setSelectedMilestones={setSelectedMilestones}
      />
    );

    fireEvent.change(screen.getByTestId("From"), {
      target: { value: "2025-01-01" },
    });

    expect(screen.getByTestId("From")).toHaveValue("2025-01-01");
  });

  it("changes to date", () => {
    render(
      <ExecutiveSummary
        project={project}
        selectedMilestones={[]}
        setSelectedMilestones={setSelectedMilestones}
      />
    );

    fireEvent.change(screen.getByTestId("To"), {
      target: { value: "2025-12-31" },
    });

    expect(screen.getByTestId("To")).toHaveValue("2025-12-31");
  });

  it("renders with empty project", () => {
    render(
      <ExecutiveSummary
        project={{ phases: [] }}
        selectedMilestones={[]}
        setSelectedMilestones={setSelectedMilestones}
      />
    );

    expect(screen.getByText("0%")).toBeInTheDocument();
    expect(screen.getByText("Executive Summary")).toBeInTheDocument();
  });

  it("renders when project is undefined", () => {
    render(
      <ExecutiveSummary
        project={undefined}
        selectedMilestones={[]}
        setSelectedMilestones={setSelectedMilestones}
      />
    );

    expect(screen.getByText("Executive Summary")).toBeInTheDocument();
    expect(screen.getByText("0%")).toBeInTheDocument();
  });
});