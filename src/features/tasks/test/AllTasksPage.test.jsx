import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import useTaskFilters from "../hooks/useTaskFilters";
import AllTasksPage from "../pages/AllTasksPage";

const mockNavigate = vi.fn();
const mockFetchProjects = vi.fn();

const mockProjects = [
  {
    id: "1",
    projectName: "Demo Project",
    bankName: "HDFC Bank",
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
                        id: "1",
                        activityName: "Activity 1",
                        owner: "Sachin",
                        estimatedPeriodWeek: 2,
                        plannedStartDate: "2026-01-01",
                        plannedEndDate: "2026-01-10",
                        actualStartDate: "2026-01-01",
                        actualEndDate: "2026-01-10",
                        progress: 100,
                        executionStatus: "Completed",
                        scheduleHealth: "GREEN",
                        remark: "Done",
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
  },
];

const mockUseProjects = vi.fn();

vi.mock("../../../context/ProjectContext", () => ({
  useProjects: () => mockUseProjects(),
}));

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("../hooks/useTaskFilters", () => ({
  default: vi.fn(),
}));

vi.mock("../components/TaskHeader", () => ({
  default: () => <div>Demo Project</div>,
}));

vi.mock("../components/TaskActions", () => ({
  default: () => <div>TaskActions</div>,
}));

vi.mock("../components/TaskFilters", () => ({
  default: ({ handleMilestoneChange }) => (
    <button onClick={handleMilestoneChange}>TaskFilters</button>
  ),
}));

vi.mock("../components/ActiveFilters", () => ({
  default: ({ clearFilters }) => (
    <button onClick={clearFilters}>ActiveFilters</button>
  ),
}));

vi.mock("../components/TaskSummaryCards", () => ({
  default: ({ total }) => <div>Summary Total: {total}</div>,
}));

vi.mock("../../../components/layout/Pagination", () => ({
  default: () => <div>Pagination</div>,
}));

vi.mock("../components/RemarkModal", () => ({
  default: ({ isOpen, onClose, onSave }) =>
    isOpen ? (
      <div>
        <button onClick={onClose}>Close Remark</button>
        <button onClick={onSave}>Save Remark</button>
      </div>
    ) : null,
}));

vi.mock("../components/TaskTable", () => ({
  default: ({ tasks, onEdit, onRemark }) => (
    <div>
      <div>TaskTable ({tasks.length})</div>

      <button onClick={() => onEdit(tasks[0])}>Edit Task</button>

      <button onClick={() => onRemark(tasks[0])}>Remark Task</button>
    </div>
  ),
}));

describe("AllTasksPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    sessionStorage.clear();

    sessionStorage.setItem("selectedProjectId", "1");
    sessionStorage.setItem("selectedProjectName", "Demo Project");
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        id: "100",
        username: "admin",
      }),
    );

    mockUseProjects.mockReturnValue({
      fetchProjects: mockFetchProjects,
      projects: mockProjects,
    });

    useTaskFilters.mockReturnValue({
      phases: ["Phase 1"],
      milestones: ["Milestone 1"],
      taskNames: ["Task 1"],
      subTasks: ["SubTask 1"],
      activities: ["Activity 1"],

      selectedPhase: "All Phases",
      setSelectedPhase: vi.fn(),

      selectedMilestone: [],
      setSelectedMilestone: vi.fn(),

      selectedTask: "All Tasks",
      setSelectedTask: vi.fn(),

      selectedSubTask: "All Sub Tasks",
      setSelectedSubTask: vi.fn(),

      selectedActivity: "All Activities",
      setSelectedActivity: vi.fn(),

      selectedStatus: "All Status",
      setSelectedStatus: vi.fn(),

      searchTerm: "",
      setSearchTerm: vi.fn(),

      filteredTasks: [
        {
          id: "1",
          activity: "Activity 1",
          task: "Task 1",
          phase: "Phase 1",
          milestone: "Milestone 1",
          status: "Completed",
          scheduleHealth: "GREEN",
          progress: 100,
        },
      ],

      handleMilestoneChange: vi.fn(),
    });
  });
  it("renders project name", () => {
    render(<AllTasksPage />);

    expect(screen.getByText("Demo Project")).toBeInTheDocument();
  });

  it("renders child components", () => {
    render(<AllTasksPage />);

    expect(screen.getByText("TaskActions")).toBeInTheDocument();

    expect(screen.getByText("TaskFilters")).toBeInTheDocument();

    expect(screen.getByText("Pagination")).toBeInTheDocument();

    expect(screen.getByText(/TaskTable/i)).toBeInTheDocument();
  });

  it("renders summary cards", () => {
    render(<AllTasksPage />);

    expect(screen.getByText(/Summary Total/i)).toBeInTheDocument();

    expect(screen.getByText("Summary Total: 1")).toBeInTheDocument();
  });

  it("calls fetchProjects on mount", () => {
    render(<AllTasksPage />);

    expect(mockFetchProjects).toHaveBeenCalledWith("100");
  });

  it("opens remark modal", () => {
    render(<AllTasksPage />);

    fireEvent.click(screen.getByText("Remark Task"));

    expect(screen.getByText("Close Remark")).toBeInTheDocument();

    expect(screen.getByText("Save Remark")).toBeInTheDocument();
  });

  it("closes remark modal", () => {
    render(<AllTasksPage />);

    fireEvent.click(screen.getByText("Remark Task"));

    fireEvent.click(screen.getByText("Close Remark"));

    expect(screen.queryByText("Close Remark")).not.toBeInTheDocument();
  });

  it("navigates to edit page", () => {
    render(<AllTasksPage />);

    fireEvent.click(screen.getByText("Edit Task"));

    expect(mockNavigate).toHaveBeenCalledWith("/edit-task", {
      state: {
        task: expect.any(Object),
      },
    });
  });
  it("handles save remark", () => {
    render(<AllTasksPage />);

    fireEvent.click(screen.getByText("Remark Task"));

    fireEvent.click(screen.getByText("Save Remark"));

    expect(screen.queryByText("Close Remark")).not.toBeInTheDocument();
  });

  it("renders empty project safely", () => {
    mockUseProjects.mockReturnValue({
      fetchProjects: mockFetchProjects,
      projects: [],
    });

    render(<AllTasksPage />);

    expect(screen.getByText("Demo Project")).toBeInTheDocument();

    expect(screen.getByText("TaskActions")).toBeInTheDocument();
  });

  it("calls handleMilestoneChange", () => {
    const handleMilestoneChange = vi.fn();

    useTaskFilters.mockReturnValue({
      ...useTaskFilters.mock.results[0]?.value,
      phases: ["Phase 1"],
      milestones: ["Milestone 1"],
      taskNames: ["Task 1"],
      subTasks: ["SubTask 1"],
      activities: ["Activity 1"],

      selectedPhase: "All Phases",
      setSelectedPhase: vi.fn(),

      selectedMilestone: [],
      setSelectedMilestone: vi.fn(),

      selectedTask: "All Tasks",
      setSelectedTask: vi.fn(),

      selectedSubTask: "All Sub Tasks",
      setSelectedSubTask: vi.fn(),

      selectedActivity: "All Activities",
      setSelectedActivity: vi.fn(),

      selectedStatus: "All Status",
      setSelectedStatus: vi.fn(),

      searchTerm: "",
      setSearchTerm: vi.fn(),

      filteredTasks: [],

      handleMilestoneChange,
    });

    render(<AllTasksPage />);

    fireEvent.click(screen.getByText("TaskFilters"));

    expect(handleMilestoneChange).toHaveBeenCalled();
  });

  it("calls clear filters", () => {
    render(<AllTasksPage />);

    fireEvent.click(screen.getByText("ActiveFilters"));

    expect(screen.getByText("ActiveFilters")).toBeInTheDocument();
  });

  it("renders task table", () => {
    render(<AllTasksPage />);

    expect(screen.getByText(/TaskTable/i)).toBeInTheDocument();
  });

  it("renders pagination", () => {
    render(<AllTasksPage />);

    expect(screen.getByText("Pagination")).toBeInTheDocument();
  });

  it("renders remark modal closed initially", () => {
    render(<AllTasksPage />);

    expect(screen.queryByText("Close Remark")).not.toBeInTheDocument();
  });
  it("renders one filtered task", () => {
    render(<AllTasksPage />);

    expect(screen.getByText("TaskTable (1)")).toBeInTheDocument();
  });

  it("renders zero tasks when filteredTasks is empty", () => {
    useTaskFilters.mockReturnValue({
      phases: [],
      milestones: [],
      taskNames: [],
      subTasks: [],
      activities: [],

      selectedPhase: "All Phases",
      setSelectedPhase: vi.fn(),

      selectedMilestone: [],
      setSelectedMilestone: vi.fn(),

      selectedTask: "All Tasks",
      setSelectedTask: vi.fn(),

      selectedSubTask: "All Sub Tasks",
      setSelectedSubTask: vi.fn(),

      selectedActivity: "All Activities",
      setSelectedActivity: vi.fn(),

      selectedStatus: "All Status",
      setSelectedStatus: vi.fn(),

      searchTerm: "",
      setSearchTerm: vi.fn(),

      filteredTasks: [],

      handleMilestoneChange: vi.fn(),
    });

    render(<AllTasksPage />);

    expect(screen.getByText("TaskTable (0)")).toBeInTheDocument();
  });

  it("calls fetchProjects only once", () => {
    render(<AllTasksPage />);

    expect(mockFetchProjects).toHaveBeenCalledTimes(1);
  });

  it("renders TaskHeader", () => {
    render(<AllTasksPage />);

    expect(screen.getByText("Demo Project")).toBeInTheDocument();
  });

  it("renders page without crashing", () => {
    const { container } = render(<AllTasksPage />);

    expect(container).toBeTruthy();
  });

  it("renders main page wrapper", () => {
    const { container } = render(<AllTasksPage />);

    expect(container.firstChild).toBeInTheDocument();
  });
});
