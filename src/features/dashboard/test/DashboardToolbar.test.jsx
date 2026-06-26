import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import DashboardToolbar from "../components/DashboardToolbar";

const mockUser = {
  role: "ADMIN",
};

beforeEach(() => {
  sessionStorage.clear();
  sessionStorage.setItem("user", JSON.stringify(mockUser));
});

describe("DashboardToolbar", () => {
  it("renders Filters button", () => {
    render(<DashboardToolbar onCreateProject={vi.fn()} />);

    expect(
      screen.getByRole("button", { name: /filters/i }),
    ).toBeInTheDocument();
  });

  it("renders Create Project button", () => {
    render(<DashboardToolbar onCreateProject={vi.fn()} />);

    expect(
      screen.getByRole("button", { name: /create project/i }),
    ).toBeInTheDocument();
  });

  it("calls onCreateProject when Create Project button is clicked", () => {
    const onCreateProject = vi.fn();

    render(<DashboardToolbar onCreateProject={onCreateProject} />);

    fireEvent.click(screen.getByRole("button", { name: /create project/i }));

    expect(onCreateProject).toHaveBeenCalledTimes(1);
  });

  it("does not call onCreateProject when Filters button is clicked", () => {
    const onCreateProject = vi.fn();

    render(<DashboardToolbar onCreateProject={onCreateProject} />);

    fireEvent.click(screen.getByRole("button", { name: /filters/i }));

    expect(onCreateProject).not.toHaveBeenCalled();
  });

  it("renders exactly two buttons", () => {
    render(<DashboardToolbar onCreateProject={vi.fn()} />);

    const buttons = screen.getAllByRole("button");

    expect(buttons).toHaveLength(2);
  });

  it("handles missing onCreateProject gracefully", () => {
    render(<DashboardToolbar />);

    // still should render Filters always
    expect(
      screen.getByRole("button", { name: /filters/i }),
    ).toBeInTheDocument();

    // Create Project depends on ADMIN → should exist due to mock
    expect(
      screen.getByRole("button", { name: /create project/i }),
    ).toBeInTheDocument();
  });
});
