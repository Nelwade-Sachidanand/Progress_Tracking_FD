import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";

import AddTaskPage from "../pages/AddTaskPage";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("../components/AddTaskForm", () => ({
  default: () => <div data-testid="add-task-form">AddTaskForm Component</div>,
}));

describe("AddTaskPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    sessionStorage.clear();

    sessionStorage.setItem("selectedProjectName", "Implementation Dashboard");
  });

  test("renders page heading", () => {
    render(<AddTaskPage />);

    expect(screen.getByText("Add Task")).toBeInTheDocument();
  });

  test("renders page description", () => {
    render(<AddTaskPage />);

    expect(
      screen.getByText("Create and manage project task"),
    ).toBeInTheDocument();
  });

  test("renders selected project label", () => {
    render(<AddTaskPage />);

    expect(screen.getByText("Selected Project")).toBeInTheDocument();
  });

  test("shows selected project from session storage", () => {
    render(<AddTaskPage />);

    expect(screen.getByText("Implementation Dashboard")).toBeInTheDocument();
  });

  test("shows default project when session storage is empty", () => {
    sessionStorage.clear();

    render(<AddTaskPage />);

    expect(screen.getByText("No Project Selected")).toBeInTheDocument();
  });

  test("renders AddTaskForm", () => {
    render(<AddTaskPage />);

    expect(screen.getByTestId("add-task-form")).toBeInTheDocument();
  });

  test("back button navigates to tasks page", () => {
    render(<AddTaskPage />);

    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledTimes(1);

    expect(mockNavigate).toHaveBeenCalledWith("/tasks");
  });

  test("clicking back button multiple times navigates each time", () => {
    render(<AddTaskPage />);

    const button = screen.getByRole("button");

    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledTimes(2);
  });

  test("page contains only one back button", () => {
    render(<AddTaskPage />);

    expect(screen.getAllByRole("button")).toHaveLength(1);
  });

  test("AddTaskForm is rendered below project information", () => {
    render(<AddTaskPage />);

    const project = screen.getByText("Implementation Dashboard");

    const form = screen.getByTestId("add-task-form");

    expect(project).toBeInTheDocument();

    expect(form).toBeInTheDocument();
  });
});
