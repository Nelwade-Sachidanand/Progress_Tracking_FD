import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import TaskActions from "../components/TaskActions";
import { exportExcelReport } from "../api/exportExcelApi";
import { toast } from "react-toastify";
import { Packer } from "docx";
import { saveAs } from "file-saver";

const mockNavigate = vi.fn();

const mockProjects = [
  {
    id: 1,
    projectName: "Demo Project",
    bankName: "Demo Bank",
    phases: [],
  },
];

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("../../../context/ProjectContext", () => ({
  useProjects: () => ({
    projects: mockProjects,
  }),
}));

vi.mock("../api/exportExcelApi", () => ({
  exportExcelReport: vi.fn(),
}));

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("../components/PrintReport", () => ({
  default: () => <div data-testid="print-report" />,
}));

vi.mock("../components/GenerateReportModal", () => ({
  default: ({ isOpen, onClose }) =>
    isOpen ? (
      <div data-testid="report-modal">
        <button onClick={onClose}>Close Modal</button>
      </div>
    ) : null,
}));

describe("TaskActions", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    sessionStorage.setItem(
      "user",
      JSON.stringify({
        id: 1,
        role: "ADMIN",
      })
    );

    sessionStorage.setItem("selectedProjectId", "1");
    sessionStorage.setItem("selectedProjectName", "Demo Project");
  });

  const renderComponent = () =>
    render(
      <TaskActions
        selectedPhase="All Phases"
        selectedPhaseId={null}
        selectedMilestone={[]}
        selectedMilestoneIds={[]}
        selectedTask="All Tasks"
        selectedTaskId={null}
        selectedSubTask="All Sub Tasks"
        selectedSubTaskId={null}
        selectedActivity="All Activities"
        selectedActivityId={null}
        selectedStatus="All Status"
      />
    );

  it("renders Generate Report button", () => {
    renderComponent();

    expect(
      screen.getByRole("button", {
        name: /generate report/i,
      })
    ).toBeInTheDocument();
  });

  it("renders Add Activity button for ADMIN", () => {
    renderComponent();

    expect(
      screen.getByRole("button", {
        name: /add activity/i,
      })
    ).toBeInTheDocument();
  });

  it("does not render Add Activity button for USER", () => {
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        id: 1,
        role: "USER",
      })
    );

    renderComponent();

    expect(
      screen.queryByRole("button", {
        name: /add activity/i,
      })
    ).not.toBeInTheDocument();
  });

  it("navigates to add-task", () => {
    renderComponent();

    fireEvent.click(
      screen.getByRole("button", {
        name: /add activity/i,
      })
    );

    expect(mockNavigate).toHaveBeenCalledWith("add-task");
  });

  it("opens report modal", () => {
    renderComponent();

    fireEvent.click(
      screen.getByRole("button", {
        name: /generate report/i,
      })
    );

    expect(
      screen.getByTestId("report-modal")
    ).toBeInTheDocument();
  });

  it("closes report modal", () => {
    renderComponent();

    fireEvent.click(
      screen.getByRole("button", {
        name: /generate report/i,
      })
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /close modal/i,
      })
    );

    expect(
      screen.queryByTestId("report-modal")
    ).not.toBeInTheDocument();
  });

  it("renders hidden PrintReport", () => {
    renderComponent();

    expect(
      screen.getByTestId("print-report")
    ).toBeInTheDocument();
  });
});