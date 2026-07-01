import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import TaskHeader from "../components/TaskHeader";

vi.mock("../../../context/ProjectContext", () => ({
  useProjects: () => ({
    projects: [
      {
        id: "1",
        projectName: "Demo Project",
      },
    ],
  }),
}));

describe("TaskHeader", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("renders selected project name", () => {
    sessionStorage.setItem("selectedProjectId", "1");

    render(<TaskHeader />);

    expect(screen.getByText("Project :")).toBeInTheDocument();
    expect(screen.getByText("Demo Project")).toBeInTheDocument();
  });

  it("renders fallback when no project selected", () => {
    render(<TaskHeader />);

    expect(screen.getByText("Project :")).toBeInTheDocument();
    expect(screen.getByText("No Project Selected")).toBeInTheDocument();
  });

  it("renders project card container", () => {
    sessionStorage.setItem("selectedProjectId", "1");

    const { container } = render(<TaskHeader />);

    expect(container.querySelector(".rounded-2xl")).toBeInTheDocument();
    expect(container.querySelector(".shadow-sm")).toBeInTheDocument();
  });

  it("does not render add task button", () => {
    render(<TaskHeader />);

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
