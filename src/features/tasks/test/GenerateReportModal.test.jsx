import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import GenerateReportModal from "../components/GenerateReportModal";

describe("GenerateReportModal", () => {
  const props = {
    isOpen: true,
    onClose: vi.fn(),
    reportType: "pdf",
    setReportType: vi.fn(),
    fromDate: "",
    setFromDate: vi.fn(),
    toDate: "",
    setToDate: vi.fn(),
    selectedProject: "Demo Project",
    selectedPhase: "Phase 1",
    selectedMilestone: "M1",
    selectedTask: "Task 1",
    selectedSubTask: "Sub Task 1",
    selectedActivity: "Activity 1",
    selectedStatus: "Completed",
    onGenerate: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders modal", () => {
    render(<GenerateReportModal {...props} />);

    expect(
      screen.getByRole("heading", {
        name: "Generate Report",
      })
    ).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    const { container } = render(
      <GenerateReportModal
        {...props}
        isOpen={false}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it("calls onClose when Cancel clicked", () => {
    render(<GenerateReportModal {...props} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Cancel",
      })
    );

    expect(props.onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when X clicked", () => {
    render(<GenerateReportModal {...props} />);

    const buttons = screen.getAllByRole("button");

    fireEvent.click(buttons[0]);

    expect(props.onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onGenerate", () => {
    render(<GenerateReportModal {...props} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Generate Report",
      })
    );

    expect(props.onGenerate).toHaveBeenCalledTimes(1);
  });

  it("changes report type to excel", () => {
    render(<GenerateReportModal {...props} />);

    fireEvent.click(
      screen.getByLabelText(/Excel/i)
    );

    expect(
      props.setReportType
    ).toHaveBeenCalledWith("excel");
  });

  it("changes report type to csv", () => {
    render(<GenerateReportModal {...props} />);

    fireEvent.click(
      screen.getByLabelText(/CSV/i)
    );

    expect(
      props.setReportType
    ).toHaveBeenCalledWith("csv");
  });

  it("changes report type to word", () => {
    render(<GenerateReportModal {...props} />);

    fireEvent.click(
      screen.getByLabelText(/Word/i)
    );

    expect(
      props.setReportType
    ).toHaveBeenCalledWith("word");
  });

  it("changes report type to pdf", () => {
    render(
      <GenerateReportModal
        {...props}
        reportType="excel"
      />
    );

    fireEvent.click(
      screen.getByLabelText(/PDF/i)
    );

    expect(
      props.setReportType
    ).toHaveBeenCalledWith("pdf");
  });

  it("changes from date", () => {
    render(<GenerateReportModal {...props} />);

    const inputs = screen.getAllByDisplayValue("");

fireEvent.change(inputs[0], {
  target: {
    value: "2025-01-01",
  },
});

expect(props.setFromDate).toHaveBeenCalledWith(
  "2025-01-01"
);

    
  });

  it("changes to date", () => {
    render(<GenerateReportModal {...props} />);
const inputs = screen.getAllByDisplayValue("");

fireEvent.change(inputs[1], {
  target: {
    value: "2025-01-31",
  },
});

expect(props.setToDate).toHaveBeenCalledWith(
  "2025-01-31"
);

  });

  it("shows current filters", () => {
    render(<GenerateReportModal {...props} />);

    expect(
      screen.getByText("Demo Project")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Phase 1")
    ).toBeInTheDocument();

    expect(
      screen.getByText("M1")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Task 1")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Sub Task 1")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Activity 1")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Completed")
    ).toBeInTheDocument();
  });
});