import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import DashboardToolbar from "../components/DashboardToolbar";

describe("DashboardToolbar", () => {
  it("renders Filters button", () => {
    render(<DashboardToolbar onCreateProject={vi.fn()} />);

    expect(
      screen.getByRole("button", {
        name: /filters/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders Create Project button", () => {
    render(<DashboardToolbar onCreateProject={vi.fn()} />);

    expect(
      screen.getByRole("button", {
        name: /create project/i,
      }),
    ).toBeInTheDocument();
  });

  it("calls onCreateProject when Create Project button is clicked", () => {
    const onCreateProject = vi.fn();

    render(<DashboardToolbar onCreateProject={onCreateProject} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /create project/i,
      }),
    );

    expect(onCreateProject).toHaveBeenCalledTimes(1);
  });

  it("does not call onCreateProject when Filters button is clicked", () => {
    const onCreateProject = vi.fn();

    render(<DashboardToolbar onCreateProject={onCreateProject} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /filters/i,
      }),
    );

    expect(onCreateProject).not.toHaveBeenCalled();
  });

  it("renders exactly two buttons", () => {
    render(<DashboardToolbar onCreateProject={vi.fn()} />);

    const buttons = screen.getAllByRole("button");

    expect(buttons).toHaveLength(2);
  });

  it("handles missing onCreateProject gracefully", () => {
    render(<DashboardToolbar />);

    expect(
      screen.getByRole("button", {
        name: /create project/i,
      }),
    ).toBeInTheDocument();
  });
});
