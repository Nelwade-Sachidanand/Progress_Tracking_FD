import { beforeEach, describe, expect, it, vi } from "vitest";

import { fireEvent, render, screen } from "@testing-library/react";

import AddTaskPage from "../pages/AddTaskPage";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("../components/AddTaskForm", () => ({
  default: () => <div data-testid="add-task-form">AddTaskForm</div>,
}));

describe("AddTaskPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("renders page title", () => {
    localStorage.setItem("selectedProjectName", "Progress Tracker");

    render(<AddTaskPage />);

    expect(screen.getByText("Add Task")).toBeInTheDocument();
  });

  it("renders selected project name", () => {
    localStorage.setItem("selectedProjectName", "Progress Tracker");

    render(<AddTaskPage />);

    expect(screen.getAllByText("Progress Tracker").length).toBeGreaterThan(0);
  });

  it("renders fallback project name when localStorage is empty", () => {
    render(<AddTaskPage />);

    expect(screen.getAllByText("No Project Selected").length).toBeGreaterThan(
      0,
    );
  });

  it("renders AddTaskForm component", () => {
    render(<AddTaskPage />);

    expect(screen.getByTestId("add-task-form")).toBeInTheDocument();
  });

  it("navigates to tasks page on back button click", () => {
    render(<AddTaskPage />);

    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith("/tasks");
  });

  it("shows selected project section", () => {
    localStorage.setItem("selectedProjectName", "My Project");

    render(<AddTaskPage />);

    expect(screen.getByText("Selected Project")).toBeInTheDocument();

    expect(screen.getAllByText("My Project").length).toBe(2);
  });
});
