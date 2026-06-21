import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import TaskHeader from "../components/TaskHeader";

describe("TaskHeader", () => {
  it("renders heading", () => {
    render(<TaskHeader />);

    expect(
      screen.getByRole("heading", {
        name: "All Tasks",
      }),
    ).toBeInTheDocument();
  });

  it("renders description", () => {
    render(<TaskHeader />);

    expect(
      screen.getByText("View and manage all project tasks"),
    ).toBeInTheDocument();
  });

  it("renders add task button", () => {
    render(<TaskHeader />);

    expect(
      screen.getByRole("button", {
        name: /add task/i,
      }),
    ).toBeInTheDocument();
  });

  it("shows correct button text", () => {
    render(<TaskHeader />);

    expect(screen.getByText("Add Task")).toBeInTheDocument();
  });

  it("renders only one button", () => {
    render(<TaskHeader />);

    expect(screen.getAllByRole("button")).toHaveLength(1);
  });
});
