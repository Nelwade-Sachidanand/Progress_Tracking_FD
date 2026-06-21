import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import TaskTable from "../components/TaskTable";

describe("TaskTable", () => {
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
      activity: "Deployment",
      task: "Release",
      phase: "Phase 2",
      milestone: "Milestone B",
      startDate: "2026-02-01",
      endDate: "2026-02-10",
      progress: 100,
      status: "Completed",
    },
  ];

  it("renders all table headers", () => {
    render(<TaskTable tasks={mockTasks} />);

    expect(screen.getByText("ACTIVITY / TASK")).toBeInTheDocument();

    expect(screen.getByText("PHASE")).toBeInTheDocument();

    expect(screen.getByText("MILESTONE")).toBeInTheDocument();

    expect(screen.getByText("START DATE")).toBeInTheDocument();

    expect(screen.getByText("END DATE")).toBeInTheDocument();

    expect(screen.getByText("PROGRESS")).toBeInTheDocument();

    expect(screen.getByText("STATUS")).toBeInTheDocument();

    expect(screen.getByText("ACTIONS")).toBeInTheDocument();

    expect(screen.getByText("REMARK")).toBeInTheDocument();
  });

  it("renders task information", () => {
    render(<TaskTable tasks={mockTasks} />);

    expect(screen.getByText("Login Development")).toBeInTheDocument();

    expect(screen.getByText("Authentication")).toBeInTheDocument();

    expect(screen.getByText("Deployment")).toBeInTheDocument();

    expect(screen.getByText("Release")).toBeInTheDocument();
  });

  it("renders phase and milestone values", () => {
    render(<TaskTable tasks={mockTasks} />);

    expect(screen.getByText("Phase 1")).toBeInTheDocument();

    expect(screen.getByText("Phase 2")).toBeInTheDocument();

    expect(screen.getByText("Milestone A")).toBeInTheDocument();

    expect(screen.getByText("Milestone B")).toBeInTheDocument();
  });

  it("renders dates correctly", () => {
    render(<TaskTable tasks={mockTasks} />);

    expect(screen.getByText("2026-01-01")).toBeInTheDocument();

    expect(screen.getByText("2026-01-15")).toBeInTheDocument();

    expect(screen.getByText("2026-02-01")).toBeInTheDocument();

    expect(screen.getByText("2026-02-10")).toBeInTheDocument();
  });

  it("renders progress values", () => {
    render(<TaskTable tasks={mockTasks} />);

    expect(screen.getByText("75%")).toBeInTheDocument();

    expect(screen.getByText("100%")).toBeInTheDocument();
  });

  it("renders status values", () => {
    render(<TaskTable tasks={mockTasks} />);

    expect(screen.getByText("In Progress")).toBeInTheDocument();

    expect(screen.getByText("Completed")).toBeInTheDocument();
  });

  it("calls onEdit when edit button clicked", () => {
    const onEdit = vi.fn();

    const { container } = render(
      <TaskTable tasks={mockTasks} onEdit={onEdit} />,
    );

    const editButtons = container.querySelectorAll(".bg-blue-50");

    fireEvent.click(editButtons[0]);

    expect(onEdit).toHaveBeenCalledTimes(1);

    expect(onEdit).toHaveBeenCalledWith(mockTasks[0]);
  });

  it("calls onRemark when remark button clicked", () => {
    const onRemark = vi.fn();

    const { container } = render(
      <TaskTable tasks={mockTasks} onRemark={onRemark} />,
    );

    const remarkButtons = container.querySelectorAll(".bg-purple-50");

    fireEvent.click(remarkButtons[0]);

    expect(onRemark).toHaveBeenCalledTimes(1);

    expect(onRemark).toHaveBeenCalledWith(mockTasks[0]);
  });

  it("shows row numbers", () => {
    render(<TaskTable tasks={mockTasks} />);

    expect(screen.getByText("1")).toBeInTheDocument();

    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("shows empty state when tasks list is empty", () => {
    render(<TaskTable tasks={[]} />);

    expect(screen.getByText("No Tasks Found")).toBeInTheDocument();
  });

  it("does not crash when handlers are not provided", () => {
    const { container } = render(<TaskTable tasks={mockTasks} />);

    const buttons = container.querySelectorAll("button");

    fireEvent.click(buttons[0]);
    fireEvent.click(buttons[1]);

    expect(true).toBe(true);
  });
});
