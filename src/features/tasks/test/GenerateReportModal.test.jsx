import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import GenerateReportModal from "../components/GenerateReportModal";

describe("GenerateReportModal", () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    onGenerate: vi.fn(),

    reportType: "pdf",
    setReportType: vi.fn(),

    fromDate: "",
    setFromDate: vi.fn(),

    toDate: "",
    setToDate: vi.fn(),

    selectedProject: "",
    selectedPhase: "",
    selectedMilestone: [],
    selectedTask: "",
    selectedSubTask: "",
    selectedActivity: "",
    selectedStatus: "",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("does not render when closed", () => {
    const { container } = render(
      <GenerateReportModal
        {...defaultProps}
        isOpen={false}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it("renders modal", () => {
  render(<GenerateReportModal {...defaultProps} />);

  expect(
    screen.getByRole("heading", {
      name: /generate report/i,
    })
  ).toBeInTheDocument();

  expect(
    screen.getByText("Export filtered tasks data")
  ).toBeInTheDocument();

  expect(
    screen.getByRole("button", {
      name: /generate report/i,
    })
  ).toBeInTheDocument();
});

  it("renders all report formats", () => {
    render(<GenerateReportModal {...defaultProps} />);

    expect(screen.getByText("PDF")).toBeInTheDocument();
    expect(screen.getByText("Excel")).toBeInTheDocument();
    expect(screen.getByText("CSV")).toBeInTheDocument();
    expect(screen.getByText("Word")).toBeInTheDocument();
  });

  it("changes report type", () => {
    render(<GenerateReportModal {...defaultProps} />);

    fireEvent.click(screen.getByDisplayValue("excel"));

    expect(defaultProps.setReportType).toHaveBeenCalled();
  });

  it("calls onClose when Cancel clicked", () => {
    render(<GenerateReportModal {...defaultProps} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /cancel/i,
      })
    );

    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it("calls onGenerate", () => {
    render(<GenerateReportModal {...defaultProps} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /generate report/i,
      })
    );

    expect(defaultProps.onGenerate).toHaveBeenCalled();
  });

  it("shows no filters applied message", () => {
    render(<GenerateReportModal {...defaultProps} />);

    expect(
      screen.getByText(
        /No filters applied - all tasks will be included/i
      )
    ).toBeInTheDocument();
  });

  it("shows applied filters", () => {
    render(
      <GenerateReportModal
        {...defaultProps}
        selectedProject="Project A"
        selectedPhase="Phase 1"
        selectedMilestone={["Milestone 1"]}
        selectedTask="Task 1"
        selectedSubTask="SubTask 1"
        selectedActivity="Activity 1"
        selectedStatus="Completed"
      />
    );

    expect(screen.getByText("Project A")).toBeInTheDocument();
    expect(screen.getByText("Phase 1")).toBeInTheDocument();
    expect(screen.getByText("Milestone 1")).toBeInTheDocument();
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("SubTask 1")).toBeInTheDocument();
    expect(screen.getByText("Activity 1")).toBeInTheDocument();
    expect(screen.getByText("Completed")).toBeInTheDocument();
  });

  it("shows active filter count", () => {
    render(
      <GenerateReportModal
        {...defaultProps}
        selectedProject="Project A"
        selectedPhase="Phase 1"
      />
    );

    expect(
      screen.getByText(/2 filters applied/i)
    ).toBeInTheDocument();
  });

  it("shows milestone overflow", () => {
    render(
      <GenerateReportModal
        {...defaultProps}
        selectedMilestone={[
          "Milestone 1",
          "Milestone 2",
          "Milestone 3",
        ]}
      />
    );

    expect(
      screen.getByText("+2 more")
    ).toBeInTheDocument();
  });
});