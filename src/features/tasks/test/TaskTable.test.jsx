import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import TaskTable from "../components/TaskTable";

const mockUser = {
  role: "ADMIN",
};

beforeEach(() => {
  sessionStorage.clear();
  sessionStorage.setItem("user", JSON.stringify(mockUser));
});

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
    expect(screen.getByText("ACTIONS")).toBeInTheDocument(); // now works
    expect(screen.getByText("REMARK")).toBeInTheDocument();
  });

  it("calls onEdit when edit button clicked", () => {
    const onEdit = vi.fn();

    render(<TaskTable tasks={mockTasks} onEdit={onEdit} />);

    const editBtn = screen
      .getAllByRole("button")
      .find((b) => b.querySelector("svg"));

    fireEvent.click(editBtn);

    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(onEdit).toHaveBeenCalledWith(mockTasks[0]);
  });

  it("calls onRemark when remark button clicked", () => {
    const onRemark = vi.fn();

    const { container } = render(
      <TaskTable tasks={mockTasks} onRemark={onRemark} />,
    );

    const rows = container.querySelectorAll("tbody tr");

    const firstRow = rows[0];

    // remark button is last button in row (after edit)
    const remarkBtn = firstRow.querySelectorAll("button")[1];

    fireEvent.click(remarkBtn);

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
    render(<TaskTable tasks={mockTasks} />);

    const buttons = screen.getAllByRole("button");

    fireEvent.click(buttons[0]);

    expect(true).toBe(true);
  });
});
