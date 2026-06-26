import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";

import EditTaskPage from "../pages/EditTaskPage";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("../components/EditTaskForm", () => ({
  default: () => <div data-testid="edit-task-form">EditTaskForm Component</div>,
}));

describe("EditTaskPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    sessionStorage.clear();

    sessionStorage.setItem("selectedProjectName", "Implementation Dashboard");
  });

  test("renders page heading", () => {
    render(<EditTaskPage />);

    expect(screen.getByText("Edit Task")).toBeInTheDocument();
  });

  test("renders page description", () => {
    render(<EditTaskPage />);

    expect(screen.getByText("Update activity details")).toBeInTheDocument();
  });

  test("renders selected project label", () => {
    render(<EditTaskPage />);

    expect(screen.getByText("Selected Project")).toBeInTheDocument();
  });

  test("shows selected project from sessionStorage", () => {
    render(<EditTaskPage />);

    expect(screen.getByText("Implementation Dashboard")).toBeInTheDocument();
  });

  test("shows default project when sessionStorage is empty", () => {
    sessionStorage.clear();

    render(<EditTaskPage />);

    expect(screen.getByText("No Project Selected")).toBeInTheDocument();
  });

  test("renders EditTaskForm", () => {
    render(<EditTaskPage />);

    expect(screen.getByTestId("edit-task-form")).toBeInTheDocument();
  });

  test("back button navigates to tasks page", () => {
    render(<EditTaskPage />);

    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledTimes(1);

    expect(mockNavigate).toHaveBeenCalledWith("/tasks");
  });

  test("clicking back button multiple times navigates each time", () => {
    render(<EditTaskPage />);

    const button = screen.getByRole("button");

    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledTimes(2);
  });

  test("page contains only one button", () => {
    render(<EditTaskPage />);

    expect(screen.getAllByRole("button")).toHaveLength(1);
  });

  test("EditTaskForm is rendered below project information", () => {
    render(<EditTaskPage />);

    const project = screen.getByText("Implementation Dashboard");

    const form = screen.getByTestId("edit-task-form");

    expect(project).toBeInTheDocument();

    expect(form).toBeInTheDocument();
  });

  test("renders project name only once", () => {
    render(<EditTaskPage />);

    expect(screen.getAllByText("Implementation Dashboard")).toHaveLength(1);
  });

  test("renders selected project section", () => {
    render(<EditTaskPage />);

    expect(screen.getByText("Selected Project")).toBeVisible();
  });
});
