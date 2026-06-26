import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";

import { ProjectProvider, useProjects } from "../context/ProjectContext";

import { getProjectsByUserId } from "../services/projectService";

vi.mock("../services/projectService", () => ({
  getProjectsByUserId: vi.fn(),
}));

const TestComponent = () => {
  const { projects, loading, fetchProjects, setProjects } = useProjects();

  return (
    <>
      <div data-testid="loading">{loading ? "loading" : "idle"}</div>

      <div data-testid="count">{projects.length}</div>

      <button onClick={() => fetchProjects("1")}>Fetch</button>

      <button
        onClick={() =>
          setProjects([
            {
              id: 100,
            },
          ])
        }
      >
        Set
      </button>
    </>
  );
};

describe("ProjectContext", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    sessionStorage.clear();
  });

  test("renders children", () => {
    render(
      <ProjectProvider>
        <div>Hello</div>
      </ProjectProvider>,
    );

    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  test("initial projects are empty", () => {
    render(
      <ProjectProvider>
        <TestComponent />
      </ProjectProvider>,
    );

    expect(screen.getByTestId("count")).toHaveTextContent("0");
  });

  test("setProjects updates projects", () => {
    render(
      <ProjectProvider>
        <TestComponent />
      </ProjectProvider>,
    );

    fireEvent.click(screen.getByText("Set"));

    expect(screen.getByTestId("count")).toHaveTextContent("1");
  });

  test("fetchProjects loads projects successfully", async () => {
    getProjectsByUserId.mockResolvedValue({
      statusType: "S",
      details: [
        {
          id: 1,
        },
        {
          id: 2,
        },
      ],
    });

    render(
      <ProjectProvider>
        <TestComponent />
      </ProjectProvider>,
    );

    fireEvent.click(screen.getByText("Fetch"));

    await waitFor(() => {
      expect(getProjectsByUserId).toHaveBeenCalledWith("1");
    });

    expect(screen.getByTestId("count")).toHaveTextContent("2");
  });

  test("loading becomes idle after fetch", async () => {
    getProjectsByUserId.mockResolvedValue({
      statusType: "S",
      details: [],
    });

    render(
      <ProjectProvider>
        <TestComponent />
      </ProjectProvider>,
    );

    fireEvent.click(screen.getByText("Fetch"));

    await waitFor(() => {
      expect(screen.getByTestId("loading")).toHaveTextContent("idle");
    });
  });

  test("handles fetchProjects failure", async () => {
    getProjectsByUserId.mockRejectedValue(new Error("API Error"));

    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <ProjectProvider>
        <TestComponent />
      </ProjectProvider>,
    );

    fireEvent.click(screen.getByText("Fetch"));

    await waitFor(() => {
      expect(spy).toHaveBeenCalled();
    });

    spy.mockRestore();
  });

  test("automatically fetches projects when user exists", async () => {
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        id: "55",
      }),
    );

    getProjectsByUserId.mockResolvedValue({
      statusType: "S",
      details: [
        {
          id: 1,
        },
      ],
    });

    render(
      <ProjectProvider>
        <TestComponent />
      </ProjectProvider>,
    );

    await waitFor(() => {
      expect(getProjectsByUserId).toHaveBeenCalledWith("55");
    });
  });

  test("does not fetch projects when user is absent", () => {
    render(
      <ProjectProvider>
        <TestComponent />
      </ProjectProvider>,
    );

    expect(getProjectsByUserId).not.toHaveBeenCalled();
  });

  test("projects remain empty without user", () => {
    render(
      <ProjectProvider>
        <TestComponent />
      </ProjectProvider>,
    );

    expect(screen.getByTestId("count")).toHaveTextContent("0");
  });

  test("fetchProjects returns fetched projects", async () => {
    getProjectsByUserId.mockResolvedValue({
      statusType: "S",
      details: [
        {
          id: 10,
        },
      ],
    });

    render(
      <ProjectProvider>
        <TestComponent />
      </ProjectProvider>,
    );

    fireEvent.click(screen.getByText("Fetch"));

    await waitFor(() => {
      expect(screen.getByTestId("count")).toHaveTextContent("1");
    });
  });
});
