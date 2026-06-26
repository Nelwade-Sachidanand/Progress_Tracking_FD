import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import TaskHeader from "../components/TaskHeader";

/* Mock context */
vi.mock("../../../context/ProjectContext", () => ({
  useProjects: () => ({
    projects: [{ id: "1", projectName: "Demo Project" }],
  }),
}));

describe("TaskHeader", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("renders selected project label", () => {
    sessionStorage.setItem("selectedProjectId", "1");

    render(<TaskHeader />);

    expect(screen.getByText(/Selected Project/i)).toBeInTheDocument();
    expect(screen.getByText("Demo Project")).toBeInTheDocument();
  });

  it("renders fallback when no project selected", () => {
    render(<TaskHeader />);

    expect(screen.getByText("No Project Selected")).toBeInTheDocument();
  });

  it("renders project container", () => {
    render(<TaskHeader />);

    const container = screen.getByText(/Selected Project/i).closest("div");
    expect(container).toBeInTheDocument();
  });

  it("does not render add task button", () => {
    render(<TaskHeader />);

    expect(screen.queryByRole("button")).toBeNull();
  });
});
