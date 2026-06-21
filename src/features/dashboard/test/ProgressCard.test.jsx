import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ProgressCard from "../components/ProgressCard";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

describe("ProgressCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("renders dashboard heading", () => {
    render(<ProgressCard />);

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  it("shows no projects message when projects list is empty", () => {
    localStorage.setItem("projects", JSON.stringify([]));

    render(<ProgressCard />);

    expect(screen.getByText("No Projects Found")).toBeInTheDocument();
  });

  it("renders projects from localStorage", () => {
    const projects = [
      {
        id: "1",
        projectName: "Project Alpha",
        bankName: "Bank A",
      },
      {
        id: "2",
        projectName: "Project Beta",
        bankName: "Bank B",
      },
    ];

    localStorage.setItem("projects", JSON.stringify(projects));

    render(<ProgressCard />);

    expect(screen.getByText("Project Alpha")).toBeInTheDocument();

    expect(screen.getByText("Project Beta")).toBeInTheDocument();

    expect(screen.getByText("Bank A")).toBeInTheDocument();

    expect(screen.getByText("Bank B")).toBeInTheDocument();
  });

  it("renders one View Project Details button per project", () => {
    const projects = [
      {
        id: "1",
        projectName: "Project Alpha",
        bankName: "Bank A",
      },
      {
        id: "2",
        projectName: "Project Beta",
        bankName: "Bank B",
      },
    ];

    localStorage.setItem("projects", JSON.stringify(projects));

    render(<ProgressCard />);

    const buttons = screen.getAllByRole("button", {
      name: /view project details/i,
    });

    expect(buttons).toHaveLength(2);
  });

  it("stores selected project and navigates when button clicked", () => {
    const projects = [
      {
        id: "1",
        projectName: "Project Alpha",
        bankName: "Bank A",
      },
    ];

    localStorage.setItem("projects", JSON.stringify(projects));

    render(<ProgressCard />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /view project details/i,
      }),
    );

    expect(localStorage.getItem("selectedProjectId")).toBe("1");

    expect(localStorage.getItem("selectedProjectName")).toBe("Project Alpha");

    expect(mockNavigate).toHaveBeenCalledWith("/project-details");
  });

  it("handles missing projects in localStorage", () => {
    render(<ProgressCard />);

    expect(screen.getByText("No Projects Found")).toBeInTheDocument();
  });

  it("renders multiple project cards", () => {
    const projects = [
      {
        id: "1",
        projectName: "Project Alpha",
        bankName: "Bank A",
      },
      {
        id: "2",
        projectName: "Project Beta",
        bankName: "Bank B",
      },
      {
        id: "3",
        projectName: "Project Gamma",
        bankName: "Bank C",
      },
    ];

    localStorage.setItem("projects", JSON.stringify(projects));

    render(<ProgressCard />);

    expect(screen.getByText("Project Alpha")).toBeInTheDocument();

    expect(screen.getByText("Project Beta")).toBeInTheDocument();

    expect(screen.getByText("Project Gamma")).toBeInTheDocument();
  });

  it("stores correct project when second project button clicked", () => {
    const projects = [
      {
        id: "1",
        projectName: "Project Alpha",
        bankName: "Bank A",
      },
      {
        id: "2",
        projectName: "Project Beta",
        bankName: "Bank B",
      },
    ];

    localStorage.setItem("projects", JSON.stringify(projects));

    render(<ProgressCard />);

    const buttons = screen.getAllByRole("button", {
      name: /view project details/i,
    });

    fireEvent.click(buttons[1]);

    expect(localStorage.getItem("selectedProjectId")).toBe("2");

    expect(localStorage.getItem("selectedProjectName")).toBe("Project Beta");

    expect(mockNavigate).toHaveBeenCalledWith("/project-details");
  });
});
