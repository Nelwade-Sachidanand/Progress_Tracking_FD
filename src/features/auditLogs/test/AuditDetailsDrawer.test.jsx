import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import AuditDetailsDrawer from "../components/AuditDetailsDrawer";

describe("AuditDetailsDrawer", () => {
  const onClose = vi.fn();

  const mockLog = {
    entityType: "Activity",
    actionType: "UPDATE",
    modifiedBy: "Sachin",
    modifiedDate: "2026-06-20T10:00:00.000Z",
    oldData: JSON.stringify({
      name: "Old Activity",
      progress: 20,
    }),
    newData: JSON.stringify({
      name: "New Activity",
      progress: 80,
    }),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns null when log is not provided", () => {
    const { container } = render(
      <AuditDetailsDrawer log={null} onClose={onClose} />,
    );

    expect(container.firstChild).toBeNull();
  });

  it("renders audit details header", () => {
    render(<AuditDetailsDrawer log={mockLog} onClose={onClose} />);

    expect(screen.getByText("Audit Details")).toBeInTheDocument();
  });

  it("renders summary section", () => {
    render(<AuditDetailsDrawer log={mockLog} onClose={onClose} />);

    expect(screen.getByText("Summary")).toBeInTheDocument();

    expect(screen.getByText("Entity Type")).toBeInTheDocument();

    expect(screen.getByText("Action Type")).toBeInTheDocument();

    expect(screen.getByText("Modified By")).toBeInTheDocument();

    expect(screen.getByText("Modified Date")).toBeInTheDocument();
  });

  it("renders audit information", () => {
    render(<AuditDetailsDrawer log={mockLog} onClose={onClose} />);

    expect(screen.getByText("Activity")).toBeInTheDocument();

    expect(screen.getByText("UPDATE")).toBeInTheDocument();

    expect(screen.getByText("Sachin")).toBeInTheDocument();
  });

  it("renders previous data section", () => {
    render(<AuditDetailsDrawer log={mockLog} onClose={onClose} />);

    expect(screen.getByText("Previous Data")).toBeInTheDocument();

    expect(screen.getByText(/Old Activity/i)).toBeInTheDocument();
  });

  it("renders updated data section", () => {
    render(<AuditDetailsDrawer log={mockLog} onClose={onClose} />);

    expect(screen.getByText("Updated Data")).toBeInTheDocument();

    expect(screen.getByText(/New Activity/i)).toBeInTheDocument();
  });

  it("calls onClose when close button clicked", () => {
    render(<AuditDetailsDrawer log={mockLog} onClose={onClose} />);

    fireEvent.click(screen.getByRole("button"));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("renders modified date", () => {
    render(<AuditDetailsDrawer log={mockLog} onClose={onClose} />);

    expect(screen.getByText("Modified Date")).toBeInTheDocument();
  });

  it("renders only updated data when oldData is null", () => {
    const log = {
      ...mockLog,
      oldData: null,
    };

    render(<AuditDetailsDrawer log={log} onClose={onClose} />);

    expect(screen.queryByText("Previous Data")).not.toBeInTheDocument();

    expect(screen.getByText("Updated Data")).toBeInTheDocument();
  });

  it("renders only previous data when newData is null", () => {
    const log = {
      ...mockLog,
      newData: null,
    };

    render(<AuditDetailsDrawer log={log} onClose={onClose} />);

    expect(screen.getByText("Previous Data")).toBeInTheDocument();

    expect(screen.queryByText("Updated Data")).not.toBeInTheDocument();
  });

  it("renders array data correctly", () => {
    const log = {
      ...mockLog,
      oldData: JSON.stringify([
        {
          id: 1,
          name: "Old Item",
        },
      ]),
      newData: JSON.stringify([
        {
          id: 1,
          name: "New Item",
        },
      ]),
    };

    render(<AuditDetailsDrawer log={log} onClose={onClose} />);

    expect(screen.getByText(/Old Item/i)).toBeInTheDocument();

    expect(screen.getByText(/New Item/i)).toBeInTheDocument();
  });
});
