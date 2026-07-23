import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import useTaskFilters from "../hooks/useTaskFilters";
import AllTasksPage from "../pages/AllTasksPage";

const mockNavigate = vi.fn();
const mockFetchProjects = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("../../../context/ProjectContext", () => ({
  useProjects: () => ({
    fetchProjects: mockFetchProjects,
    projects: [],
  }),
}));

vi.mock("../hooks/useTaskFilters", () => ({
  default: () => ({
    phases: [],
    milestones: [],
    taskNames: [],
    subTasks: [],
    activities: [],

    selectedPhase: "",
    setSelectedPhase: vi.fn(),

    selectedMilestone: [],
    setSelectedMilestone: vi.fn(),

    selectedTask: "",
    setSelectedTask: vi.fn(),

    selectedSubTask: "",
    setSelectedSubTask: vi.fn(),

    selectedActivity: "",
    setSelectedActivity: vi.fn(),

    selectedStatus: "",
    setSelectedStatus: vi.fn(),

    searchTerm: "",
    setSearchTerm: vi.fn(),

    filteredTasks: [],
    sortedTasks: [],
    handleMilestoneChange: vi.fn(),
  }),
}));

vi.mock("../components/TaskSummaryCards", () => ({
  default: () => <div>TaskSummaryCards</div>,
}));

vi.mock("../components/TaskFilters", () => ({
  default: () => <div>TaskFilters</div>,
}));

vi.mock("../components/TaskActions", () => ({
  default: () => <div>TaskActions</div>,
}));

vi.mock("../components/TaskTable", () => ({
  default: () => <div>TaskTable</div>,
}));

vi.mock("../components/ActiveFilters", () => ({
  default: () => <div>ActiveFilters</div>,
}));

vi.mock("../components/RemarkModal", () => ({
  default: () => <div>RemarkModal</div>,
}));

vi.mock("../../../components/layout/Pagination", () => ({
  default: () => <div>Pagination</div>,
}));

describe("AllTasksPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    sessionStorage.clear();

    sessionStorage.setItem(
      "user",
      JSON.stringify({
        id: 1,
      })
    );
  });

  it("renders no project selected screen", () => {
    render(<AllTasksPage />);

    expect(
      screen.getByText("No Project Selected")
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Please Select a Project to View its Activities."
      )
    ).toBeInTheDocument();
  });

  it("navigates to dashboard", () => {
    render(<AllTasksPage />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /select project/i,
      })
    );

    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
  });

  it("calls fetchProjects", () => {
    render(<AllTasksPage />);

    expect(mockFetchProjects).toHaveBeenCalledWith(1);
  });

  it("renders page when project selected", () => {
    sessionStorage.setItem("selectedProjectId", "100");

    render(<AllTasksPage />);

    expect(
      screen.getByText("TaskSummaryCards")
    ).toBeInTheDocument();

    expect(
      screen.getByText("TaskFilters")
    ).toBeInTheDocument();

    expect(
      screen.getByText("TaskActions")
    ).toBeInTheDocument();

    expect(
      screen.getByText("TaskTable")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Pagination")
    ).toBeInTheDocument();

    expect(
      screen.getByText("RemarkModal")
    ).toBeInTheDocument();
  });

  it("renders task filters heading", () => {
    sessionStorage.setItem("selectedProjectId", "100");

    render(<AllTasksPage />);

    expect(screen.getByText("Task Filters")).toBeInTheDocument();

    expect(
      screen.getByText(
        "Filter Project Tasks Using The Criteria Below."
      )
    ).toBeInTheDocument();
  });
});
