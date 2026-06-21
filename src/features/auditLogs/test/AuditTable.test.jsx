import { beforeEach, describe, expect, it, vi } from "vitest";

import { fireEvent, render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";

import AuditTable from "../components/AuditTable";

describe("AuditTable", () => {
  const onView = vi.fn();

  const mockLogs = Array.from({ length: 15 }, (_, index) => ({
    id: index + 1,
    actionType: index % 2 === 0 ? "CREATE_PROJECT" : "UPDATE_ACTIVITY",
    entityType: index % 2 === 0 ? "PROJECT" : "ACTIVITY",
    entityName: `Entity ${index + 1}`,
    modifiedBy: "Sachin",
    modifiedDate: "2026-06-20T10:00:00.000Z",
  }));

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state", () => {
    render(<AuditTable logs={[]} loading={true} />);

    expect(screen.getByText("Loading audit logs...")).toBeInTheDocument();
  });

  it("renders table headers", () => {
    render(<AuditTable logs={mockLogs} loading={false} />);

    expect(screen.getByText("Sr. No.")).toBeInTheDocument();

    expect(screen.getByText("Action Type")).toBeInTheDocument();

    expect(screen.getByText("Entity Type")).toBeInTheDocument();

    expect(screen.getByText("Entity Name")).toBeInTheDocument();

    expect(screen.getByText("Modified By")).toBeInTheDocument();

    expect(screen.getByText("Modified Date")).toBeInTheDocument();

    expect(screen.getByText("Actions")).toBeInTheDocument();
  });

  it("renders first page records", () => {
    render(<AuditTable logs={mockLogs} loading={false} />);

    expect(screen.getByText("Entity 1")).toBeInTheDocument();

    expect(screen.getByText("Entity 10")).toBeInTheDocument();

    expect(screen.queryByText("Entity 11")).not.toBeInTheDocument();
  });

  it("renders empty state", () => {
    render(<AuditTable logs={[]} loading={false} />);

    expect(screen.getByText("No audit logs found")).toBeInTheDocument();
  });

  it("calls onView when eye button clicked", () => {
    render(<AuditTable logs={mockLogs} loading={false} onView={onView} />);

    const buttons = screen.getAllByRole("button");

    fireEvent.click(buttons[0]);

    expect(onView).toHaveBeenCalled();
  });

  it("shows pagination info", () => {
    render(<AuditTable logs={mockLogs} loading={false} />);

    expect(screen.getByText(/Showing 1 to 10 of 15 logs/)).toBeInTheDocument();
  });

  it("goes to next page", () => {
    render(<AuditTable logs={mockLogs} loading={false} />);

    const buttons = screen.getAllByRole("button");

    const nextButton = buttons[buttons.length - 1];

    fireEvent.click(nextButton);

    expect(screen.getByText("Entity 11")).toBeInTheDocument();

    expect(screen.getByText("Entity 15")).toBeInTheDocument();
  });

  it("goes back to previous page", () => {
    render(<AuditTable logs={mockLogs} loading={false} />);

    const buttons = screen.getAllByRole("button");

    const nextButton = buttons[buttons.length - 1];

    fireEvent.click(nextButton);

    const updatedButtons = screen.getAllByRole("button");

    const prevButton = updatedButtons[updatedButtons.length - 2];

    fireEvent.click(prevButton);

    expect(screen.getByText("Entity 1")).toBeInTheDocument();
  });

  it("disables previous button on first page", () => {
    render(<AuditTable logs={mockLogs} loading={false} />);

    const buttons = screen.getAllByRole("button");

    const prevButton = buttons[buttons.length - 2];

    expect(prevButton).toBeDisabled();
  });

  it("disables next button on last page", () => {
    render(<AuditTable logs={mockLogs} loading={false} />);

    const buttons = screen.getAllByRole("button");

    const nextButton = buttons[buttons.length - 1];

    fireEvent.click(nextButton);

    const updatedButtons = screen.getAllByRole("button");

    const lastNextButton = updatedButtons[updatedButtons.length - 1];

    expect(lastNextButton).toBeDisabled();
  });

  it("shows correct page count", () => {
    render(<AuditTable logs={mockLogs} loading={false} />);

    expect(screen.getByText("1 / 2")).toBeInTheDocument();
  });

  it("handles single page records", () => {
    render(<AuditTable logs={mockLogs.slice(0, 5)} loading={false} />);

    expect(screen.getByText("1 / 1")).toBeInTheDocument();
  });

  it("handles undefined onView safely", () => {
    render(<AuditTable logs={mockLogs} loading={false} />);

    const buttons = screen.getAllByRole("button");

    fireEvent.click(buttons[0]);

    expect(true).toBe(true);
  });
});
