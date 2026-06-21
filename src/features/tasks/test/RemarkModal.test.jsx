import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import RemarkModal from "../components/RemarkModal";

describe("RemarkModal", () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    onSave: vi.fn(),
    setRemark: vi.fn(),
    remark: "Initial Remark",
    task: {
      activity: "Activity A",
    },
  };

  it("renders nothing when modal is closed", () => {
    const { container } = render(
      <RemarkModal {...defaultProps} isOpen={false} />,
    );

    expect(container.firstChild).toBeNull();
  });

  it("renders modal title", () => {
    render(<RemarkModal {...defaultProps} />);

    expect(screen.getByText("Task Remark")).toBeInTheDocument();
  });

  it("renders activity value", () => {
    render(<RemarkModal {...defaultProps} />);

    expect(screen.getByDisplayValue("Activity A")).toBeInTheDocument();
  });

  it("renders remark value", () => {
    render(<RemarkModal {...defaultProps} />);

    expect(screen.getByDisplayValue("Initial Remark")).toBeInTheDocument();
  });

  it("calls setRemark when textarea changes", () => {
    render(<RemarkModal {...defaultProps} />);

    const textarea = screen.getByPlaceholderText("Enter remark...");

    fireEvent.change(textarea, {
      target: {
        value: "Updated Remark",
      },
    });

    expect(defaultProps.setRemark).toHaveBeenCalledWith("Updated Remark");
  });

  it("calls onClose when X button clicked", () => {
    render(<RemarkModal {...defaultProps} />);

    const buttons = screen.getAllByRole("button");

    fireEvent.click(buttons[0]);

    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when Cancel clicked", () => {
    render(<RemarkModal {...defaultProps} />);

    fireEvent.click(screen.getByText("Cancel"));

    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it("calls onSave when Save Remark clicked", () => {
    render(<RemarkModal {...defaultProps} />);

    fireEvent.click(screen.getByText("Save Remark"));

    expect(defaultProps.onSave).toHaveBeenCalledTimes(1);
  });

  it("shows empty activity when task is null", () => {
    render(<RemarkModal {...defaultProps} task={null} />);

    const activityInput = screen.getByDisplayValue("");

    expect(activityInput).toBeInTheDocument();
  });

  it("activity input is disabled", () => {
    render(<RemarkModal {...defaultProps} />);

    expect(screen.getByDisplayValue("Activity A")).toBeDisabled();
  });

  it("renders labels correctly", () => {
    render(<RemarkModal {...defaultProps} />);

    expect(screen.getByText("Activity")).toBeInTheDocument();

    expect(screen.getByText("Remark")).toBeInTheDocument();
  });
});
