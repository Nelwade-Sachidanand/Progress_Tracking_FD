import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import TaskTable from "../components/TaskTable";

describe("TaskTable", () => {
  const onEdit = vi.fn();
  const onRemark = vi.fn();

  const mockTasks = [
    {
      activity: "Login Development",
      task: "Authentication",
      phase: "Phase 1",
      milestone: "Milestone A",
      startDate: "2026-01-01",
      endDate: "2026-01-15",
      progress: 75,
      status: "In Progress",
    },
    {
      activity: "Dashboard",
      task: "UI",
      phase: "Phase 2",
      milestone: "Milestone B",
      startDate: "2026-02-01",
      endDate: "2026-02-10",
      progress: 100,
      status: "Completed",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();

    sessionStorage.setItem(
      "user",
      JSON.stringify({
        role: "ADMIN",
      })
    );
  });

  it("renders all table headers", () => {
    render(
      <TaskTable
        tasks={mockTasks}
        currentPage={1}
        recordsPerPage={10}
      />
    );

    expect(screen.getByText("Sr. No.")).toBeInTheDocument();
    expect(screen.getByText("Activity / Task")).toBeInTheDocument();
    expect(screen.getByText("Phase / Milestone")).toBeInTheDocument();
    expect(screen.getByText("Date")).toBeInTheDocument();
    expect(screen.getByText("Progress")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Edit")).toBeInTheDocument();
    expect(screen.getByText("Remark")).toBeInTheDocument();
  });

  it("renders task data", () => {
    render(
      <TaskTable
        tasks={mockTasks}
        currentPage={1}
        recordsPerPage={10}
      />
    );

    expect(screen.getByText("Login Development")).toBeInTheDocument();
    expect(screen.getByText("Authentication")).toBeInTheDocument();
    expect(screen.getByText("Phase 1")).toBeInTheDocument();
    expect(screen.getByText("Milestone A")).toBeInTheDocument();

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("UI")).toBeInTheDocument();
  });

  it("renders row numbers", () => {
    render(
      <TaskTable
        tasks={mockTasks}
        currentPage={1}
        recordsPerPage={10}
      />
    );

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("formats dates correctly", () => {
    render(
      <TaskTable
        tasks={mockTasks}
        currentPage={1}
        recordsPerPage={10}
      />
    );

    expect(screen.getByText("01-01-2026")).toBeInTheDocument();
    expect(screen.getByText("15-01-2026")).toBeInTheDocument();
  });

  it("renders progress values", () => {
    render(
      <TaskTable
        tasks={mockTasks}
        currentPage={1}
        recordsPerPage={10}
      />
    );

    expect(screen.getByText("75%")).toBeInTheDocument();
    expect(screen.getByText("100%")).toBeInTheDocument();
  });

  it("renders statuses", () => {
    render(
      <TaskTable
        tasks={mockTasks}
        currentPage={1}
        recordsPerPage={10}
      />
    );

    expect(screen.getByText("In Progress")).toBeInTheDocument();
    expect(screen.getByText("Completed")).toBeInTheDocument();
  });

  it("calls onEdit when edit button clicked", () => {
    render(
      <TaskTable
        tasks={mockTasks}
        currentPage={1}
        recordsPerPage={10}
        onEdit={onEdit}
      />
    );

    fireEvent.click(screen.getAllByTitle("Edit")[0]);

    expect(onEdit).toHaveBeenCalledWith(mockTasks[0]);
  });

  it("calls onRemark when remark button clicked", () => {
    render(
      <TaskTable
        tasks={mockTasks}
        currentPage={1}
        recordsPerPage={10}
        onRemark={onRemark}
      />
    );

    fireEvent.click(screen.getAllByTitle("Remark")[0]);

    expect(onRemark).toHaveBeenCalledWith(mockTasks[0]);
  });

  it("shows 'No Tasks Found' when tasks are empty", () => {
    render(
      <TaskTable
        tasks={[]}
        currentPage={1}
        recordsPerPage={10}
      />
    );

    expect(screen.getByText("No Tasks Found")).toBeInTheDocument();
  });

  it("does not show Edit column for USER role", () => {
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        role: "USER",
      })
    );

    render(
      <TaskTable
        tasks={mockTasks}
        currentPage={1}
        recordsPerPage={10}
      />
    );

    expect(screen.queryByText("Edit")).not.toBeInTheDocument();
  });

  it("calculates serial number correctly for page 2", () => {
    render(
      <TaskTable
        tasks={mockTasks}
        currentPage={2}
        recordsPerPage={10}
      />
    );

    expect(screen.getByText("11")).toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();
  });
});