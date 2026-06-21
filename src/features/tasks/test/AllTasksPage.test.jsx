import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import AllTasksPage from "../pages/AllTasksPage";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("../components/TaskActions", () => ({
  default: () => <div>TaskActions</div>,
}));

vi.mock("../components/TaskFilters", () => ({
  default: (props) => (
    <button onClick={props.handleMilestoneChange}>TaskFilters</button>
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

vi.mock("../components/Pagination", () => ({
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

vi.mock("../hooks/useTaskFilters", () => ({
  default: vi.fn(),
}));

import useTaskFilters from "../hooks/useTaskFilters";

describe("AllTasksPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    localStorage.clear();

    localStorage.setItem("selectedProjectId", "1");

    localStorage.setItem("selectedProjectName", "Demo Project");

    localStorage.setItem(
      "projects",
      JSON.stringify([
        {
          id: "1",
          projectName: "Demo Project",
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
                              executionStatus: "Completed",
                              actualStartDate: "2026-01-01",
                              actualEndDate: "2026-01-10",
                              progress: 100,
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
      ]),
    );

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
  });

  it("renders summary cards", () => {
    render(<AllTasksPage />);

    expect(screen.getByText(/Summary Total/i)).toBeInTheDocument();
  });

  it("opens remark modal", () => {
    render(<AllTasksPage />);

    fireEvent.click(screen.getByText("Remark Task"));

    expect(screen.getByText("Close Remark")).toBeInTheDocument();
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
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    render(<AllTasksPage />);

    fireEvent.click(screen.getByText("Remark Task"));

    fireEvent.click(screen.getByText("Save Remark"));

    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it("renders empty project safely", () => {
    localStorage.setItem("projects", JSON.stringify([]));

    render(<AllTasksPage />);

    expect(screen.getByText("Demo Project")).toBeInTheDocument();
  });
});
