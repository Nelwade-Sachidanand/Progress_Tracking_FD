import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import ProjectTable from "../components/ProjectTable";

const mockNavigate = vi.fn();
const mockDeleteProject = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("../hooks/useProjectActions", () => ({
  default: () => ({
    deleteProject: mockDeleteProject,
  }),
}));

vi.mock("../../dashboard/utils/dashboardUtils", () => ({
  calculateOverallProgress: vi.fn(() => 80),
}));

vi.mock("../../dashboard/utils/projectMetrics", () => ({
  getProjectMetrics: vi.fn(() => ({
    overallProgress: 80,
    status: 80,
  })),
}));

vi.mock("sweetalert2", () => ({
  default: {
    fire: vi.fn(() =>
      Promise.resolve({
        isConfirmed: true,
      })
    ),
  },
}));

vi.mock("../../../components/layout/Pagination", () => ({
  default: ({ currentPage, totalPages }) => (
    <div data-testid="pagination">
      {currentPage}-{totalPages}
    </div>
  ),
}));

describe("ProjectTable", () => {
  const projects = [
    {
      id: "1",
      projectInformationId: "101",
      bankName: "State Bank of India (SBI)",
      projectName: "Core Banking",
      projectManager: "Sachin",
      phases: [],
    },
    {
      id: "2",
      projectInformationId: "102",
      bankName: "ICICI Bank",
      projectName: "Mobile Banking",
      projectManager: "Rahul",
      phases: [],
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders table headers", () => {
    render(<ProjectTable projects={projects} />);

    expect(screen.getByText("Sr. No.")).toBeInTheDocument();
    expect(screen.getByText("Bank")).toBeInTheDocument();
    expect(screen.getByText("Project")).toBeInTheDocument();
    expect(screen.getByText("Project Manager")).toBeInTheDocument();
    expect(screen.getByText("Progress")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();
  });

  it("renders project data", () => {
    render(<ProjectTable projects={projects} />);

    expect(screen.getByText("SBI")).toBeInTheDocument();
    expect(screen.getByText("Core Banking")).toBeInTheDocument();
    expect(screen.getByText("Sachin")).toBeInTheDocument();

    expect(screen.getByText("ICICI Bank")).toBeInTheDocument();
    expect(screen.getByText("Mobile Banking")).toBeInTheDocument();
    expect(screen.getByText("Rahul")).toBeInTheDocument();
  });

  it("renders progress", () => {
    render(<ProjectTable projects={projects} />);

    expect(screen.getAllByText("80%")).toHaveLength(2);
  });

  it("renders status", () => {
    render(<ProjectTable projects={projects} />);

    expect(screen.getAllByText("On Track")).toHaveLength(2);
  });

  it("navigates to view page", () => {
    render(<ProjectTable projects={projects} />);

    fireEvent.click(screen.getAllByTitle("View Project")[0]);

    expect(mockNavigate).toHaveBeenCalledWith(
      "/projects/view/101"
    );
  });

  it("navigates to edit page", () => {
    render(<ProjectTable projects={projects} />);

    fireEvent.click(screen.getAllByTitle("Edit Project")[0]);

    expect(mockNavigate).toHaveBeenCalledWith(
      "/projects/edit/101"
    );
  });

  it("deletes project after confirmation", async () => {
    render(<ProjectTable projects={projects} />);

    fireEvent.click(screen.getAllByTitle("Delete Project")[0]);

    await waitFor(() => {
      expect(mockDeleteProject).toHaveBeenCalledWith("1");
    });
  });

  it("shows empty message", () => {
    render(<ProjectTable projects={[]} />);

    expect(
      screen.getByText("No projects found")
    ).toBeInTheDocument();
  });

  it("renders pagination", () => {
    render(<ProjectTable projects={projects} />);

    expect(
      screen.getByTestId("pagination")
    ).toBeInTheDocument();
  });

  it("renders serial numbers", () => {
    render(<ProjectTable projects={projects} />);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });
});