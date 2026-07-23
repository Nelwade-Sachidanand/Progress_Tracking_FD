import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import AuditTable from "../components/AuditTable";

// ---------------- Mock Pagination ----------------

vi.mock("../../../components/layout/Pagination", () => ({
  default: ({ currentPage, totalPages, onPageChange }) => (
    <div data-testid="pagination">
      <button onClick={() => onPageChange(1)}>Previous</button>
      <span>
        {currentPage} / {totalPages}
      </span>
      <button onClick={() => onPageChange(2)}>Next</button>
    </div>
  ),
}));

describe("AuditTable", () => {
  const onView = vi.fn();
  const onPageChange = vi.fn();

  const logs = [
    {
      id: 1,
      actionType: "CREATE_PROJECT",
      entityType: "PROJECT",
      entityName: "Banking Portal",
      modifiedBy: "SACHIN",
      modifiedDate: "2026-07-20T10:00:00",
    },
    {
      id: 2,
      actionType: "UPDATE_USER",
      entityType: "USER",
      entityName: "John",
      modifiedBy: "ADMIN",
      modifiedDate: "2026-07-21T12:30:00",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading message", () => {
    render(
      <AuditTable
        loading
        logs={[]}
        currentPage={1}
        totalPages={1}
        totalRecords={0}
        onPageChange={onPageChange}
      />,
    );

    expect(screen.getByText("Loading audit logs...")).toBeInTheDocument();
  });

  it("renders table headers", () => {
    render(
      <AuditTable
        loading={false}
        logs={logs}
        currentPage={1}
        totalPages={1}
        totalRecords={2}
        onPageChange={onPageChange}
      />,
    );

    expect(screen.getByText("Sr. No.")).toBeInTheDocument();
    expect(screen.getByText("Action Type")).toBeInTheDocument();
    expect(screen.getByText("Entity Type")).toBeInTheDocument();
    expect(screen.getByText("Entity Name")).toBeInTheDocument();
    expect(screen.getByText("Modified By")).toBeInTheDocument();
    expect(screen.getByText("Modified Date")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();
  });

  it("renders audit log data", () => {
    render(
      <AuditTable
        loading={false}
        logs={logs}
        currentPage={1}
        totalPages={1}
        totalRecords={2}
        onPageChange={onPageChange}
      />,
    );

    expect(screen.getByText("Create Project")).toBeInTheDocument();
    expect(screen.getByText("Update User")).toBeInTheDocument();

    expect(screen.getByText("Project")).toBeInTheDocument();
    expect(screen.getByText("User")).toBeInTheDocument();

    expect(screen.getByText("Banking Portal")).toBeInTheDocument();
    expect(screen.getByText("John")).toBeInTheDocument();

    expect(screen.getByText("Sachin")).toBeInTheDocument();
    expect(screen.getByText("Admin")).toBeInTheDocument();
  });

  it("renders serial numbers", () => {
    render(
      <AuditTable
        loading={false}
        logs={logs}
        currentPage={1}
        totalPages={1}
        totalRecords={2}
        onPageChange={onPageChange}
      />,
    );

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("calculates serial number for second page", () => {
    render(
      <AuditTable
        loading={false}
        logs={[logs[0]]}
        currentPage={2}
        totalPages={2}
        totalRecords={11}
        onPageChange={onPageChange}
      />,
    );

    expect(screen.getByText("11")).toBeInTheDocument();
  });

  it("formats modified date", () => {
    render(
      <AuditTable
        loading={false}
        logs={[logs[0]]}
        currentPage={1}
        totalPages={1}
        totalRecords={1}
        onPageChange={onPageChange}
      />,
    );

    expect(screen.getByText("20-07-2026")).toBeInTheDocument();
  });

  it("calls onView when eye button clicked", () => {
    render(
      <AuditTable
        loading={false}
        logs={[logs[0]]}
        currentPage={1}
        totalPages={1}
        totalRecords={1}
        onPageChange={onPageChange}
        onView={onView}
      />,
    );

    fireEvent.click(screen.getByTitle("View Details"));

    expect(onView).toHaveBeenCalledWith(logs[0]);
  });

  it("renders no audit logs message", () => {
    render(
      <AuditTable
        loading={false}
        logs={[]}
        currentPage={1}
        totalPages={1}
        totalRecords={0}
        onPageChange={onPageChange}
      />,
    );

    expect(screen.getByText("No audit logs found")).toBeInTheDocument();
  });

  it("renders pagination", () => {
    render(
      <AuditTable
        loading={false}
        logs={logs}
        currentPage={1}
        totalPages={5}
        totalRecords={20}
        onPageChange={onPageChange}
      />,
    );

    expect(screen.getByTestId("pagination")).toBeInTheDocument();
  });

  it("calls onPageChange", () => {
    render(
      <AuditTable
        loading={false}
        logs={logs}
        currentPage={1}
        totalPages={5}
        totalRecords={20}
        onPageChange={onPageChange}
      />,
    );

    fireEvent.click(screen.getByText("Next"));

    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("renders one view button for each log", () => {
    render(
      <AuditTable
        loading={false}
        logs={logs}
        currentPage={1}
        totalPages={1}
        totalRecords={2}
        onPageChange={onPageChange}
      />,
    );

    expect(screen.getAllByTitle("View Details")).toHaveLength(2);
  });

  it("renders one table row per log", () => {
    render(
      <AuditTable
        loading={false}
        logs={logs}
        currentPage={1}
        totalPages={1}
        totalRecords={2}
        onPageChange={onPageChange}
      />,
    );

    expect(screen.getAllByRole("row")).toHaveLength(3); // header + 2 rows
  });

  it("renders default action color for unknown action", () => {
    render(
      <AuditTable
        loading={false}
        logs={[
          {
            ...logs[0],
            actionType: "UNKNOWN_ACTION",
          },
        ]}
        currentPage={1}
        totalPages={1}
        totalRecords={1}
        onPageChange={onPageChange}
      />,
    );

    expect(screen.getByText("Unknown Action")).toBeInTheDocument();
  });

  it("does not throw when onView is not provided", () => {
    render(
      <AuditTable
        loading={false}
        logs={[logs[0]]}
        currentPage={1}
        totalPages={1}
        totalRecords={1}
        onPageChange={onPageChange}
      />,
    );

    fireEvent.click(screen.getByTitle("View Details"));
  });
});