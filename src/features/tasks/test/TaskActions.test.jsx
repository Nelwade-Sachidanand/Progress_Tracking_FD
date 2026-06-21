import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { toast } from "react-toastify";
import { exportExcelReport } from "../../add-task/api/exportExcelApi";
import TaskActions from "../components/TaskActions";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("../../add-task/api/exportExcelApi", () => ({
  exportExcelReport: vi.fn(),
}));

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("TaskActions", () => {
  const defaultProps = {
    selectedPhase: "Phase 1",
    selectedMilestone: ["Milestone 1"],
    selectedTask: "Task 1",
    selectedSubTask: "Sub Task 1",
    selectedActivity: "Activity 1",
    selectedStatus: "Completed",
  };

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();

    localStorage.clear();

    localStorage.setItem("selectedProjectId", "123");

    localStorage.setItem("selectedProjectName", "Demo Project");

    global.URL.createObjectURL = vi.fn(() => "blob:test");

    global.URL.revokeObjectURL = vi.fn();
  });

  it("renders all buttons", () => {
    render(<TaskActions {...defaultProps} />);

    expect(screen.getByText("Generate Report")).toBeInTheDocument();

    expect(screen.getByText("Export Excel")).toBeInTheDocument();

    expect(screen.getByText("Print Report")).toBeInTheDocument();

    expect(screen.getByText("Add Task")).toBeInTheDocument();
  });

  it("navigates to add-task page", () => {
    render(<TaskActions {...defaultProps} />);

    fireEvent.click(screen.getByText("Add Task"));

    expect(mockNavigate).toHaveBeenCalledWith("add-task");
  });

  it("exports excel successfully", async () => {
    exportExcelReport.mockResolvedValue(new Blob(["test"]));

    const clickMock = vi.fn();

    HTMLAnchorElement.prototype.click = clickMock;

    render(<TaskActions {...defaultProps} />);

    fireEvent.click(screen.getByText("Export Excel"));

    await waitFor(() => {
      expect(exportExcelReport).toHaveBeenCalledTimes(1);
    });

    expect(clickMock).toHaveBeenCalled();

    expect(toast.success).toHaveBeenCalledWith("Excel downloaded successfully");
  });

  it("sends correct payload", async () => {
    exportExcelReport.mockResolvedValue(new Blob(["test"]));

    render(<TaskActions {...defaultProps} />);

    fireEvent.click(screen.getByText("Export Excel"));

    await waitFor(() => {
      expect(exportExcelReport).toHaveBeenCalledWith({
        projectId: "123",
        projectName: "Demo Project",
        phaseName: "Phase 1",
        milestoneName: "Milestone 1",
        taskName: "Task 1",
        subtaskName: "Sub Task 1",
        activityName: "Activity 1",
        executionStatus: "Completed",
        plannedStartDate: null,
        plannedEndDate: null,
      });
    });
  });

  it("handles all filter values as null", async () => {
    exportExcelReport.mockResolvedValue(new Blob(["test"]));

    render(
      <TaskActions
        selectedPhase="All Phases"
        selectedMilestone={[]}
        selectedTask="All Tasks"
        selectedSubTask="All Sub Tasks"
        selectedActivity="All Activities"
        selectedStatus="All Status"
      />,
    );

    fireEvent.click(screen.getByText("Export Excel"));

    await waitFor(() => {
      expect(exportExcelReport).toHaveBeenCalledWith({
        projectId: "123",
        projectName: "Demo Project",
        phaseName: null,
        milestoneName: null,
        taskName: null,
        subtaskName: null,
        activityName: null,
        executionStatus: null,
        plannedStartDate: null,
        plannedEndDate: null,
      });
    });
  });

  it("shows backend error message", async () => {
    exportExcelReport.mockRejectedValue({
      response: {
        data: {
          statusDesc: "Export Failed",
        },
      },
    });

    render(<TaskActions {...defaultProps} />);

    fireEvent.click(screen.getByText("Export Excel"));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Export Failed");
    });
  });

  it("shows default error message when export fails", async () => {
    exportExcelReport.mockRejectedValue(new Error("Network Error"));

    render(<TaskActions {...defaultProps} />);

    fireEvent.click(screen.getByText("Export Excel"));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Failed to export report");
    });
  });
});
