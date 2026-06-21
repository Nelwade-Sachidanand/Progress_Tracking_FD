import { beforeEach, describe, expect, it, vi } from "vitest";

import { fireEvent, render, screen } from "@testing-library/react";

import EditTaskPage from "../pages/EditTaskPage";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("../components/EditTaskForm", () => ({
  default: () => <div data-testid="edit-task-form">EditTaskForm</div>,
}));

describe("EditTaskPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders page title", () => {
    render(<EditTaskPage />);

    expect(screen.getByText("Edit Task")).toBeInTheDocument();
  });

  it("renders subtitle", () => {
    render(<EditTaskPage />);

    expect(screen.getByText("Update activity details")).toBeInTheDocument();
  });

  it("renders EditTaskForm component", () => {
    render(<EditTaskPage />);

    expect(screen.getByTestId("edit-task-form")).toBeInTheDocument();
  });

  it("navigates to tasks page when back button is clicked", () => {
    render(<EditTaskPage />);

    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledTimes(1);

    expect(mockNavigate).toHaveBeenCalledWith("/tasks");
  });

  it("renders back button", () => {
    render(<EditTaskPage />);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
