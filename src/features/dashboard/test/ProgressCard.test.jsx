import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, test, vi } from "vitest";

import ProgressCard from "../components/ProgressCard";
import { getProjectMetrics } from "../utils/projectMetrics";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../utils/projectMetrics", () => ({
  getProjectMetrics: vi.fn(),
}));

describe("ProgressCard", () => {
  const mockProject = {
    id: "1",
    projectName: "Project Alpha",
    bankName: "HDFC Bank",
  };

  beforeEach(() => {
    vi.clearAllMocks();

    getProjectMetrics.mockReturnValue({
      overallProgress: 75,
      status: "On Track",
      goLiveDate: "2026-12-31",
      daysRemaining: 120,
      delayDays: 2,
      currentPhase: "Testing",
      currentMilestone: "UAT Signoff",
      readiness: 80,
    });
  });

  const renderComponent = (projects = [mockProject]) =>
    render(
      <MemoryRouter>
        <ProgressCard projects={projects} />
      </MemoryRouter>,
    );

  test("renders no projects message", () => {
    renderComponent([]);

    expect(screen.getByText("No Projects Found")).toBeInTheDocument();
  });

  test("renders project title", () => {
    renderComponent();

    expect(screen.getByText("Project Alpha")).toBeInTheDocument();
  });

  test("renders bank name", () => {
    renderComponent();

    expect(screen.getByText("HDFC Bank")).toBeInTheDocument();
  });

  test("renders project count", () => {
    renderComponent();

    expect(screen.getByText("1 Project")).toBeInTheDocument();
  });

  test("renders progress percentage", () => {
    renderComponent();

    expect(screen.getByText("75%")).toBeInTheDocument();
  });

  test("renders project status", () => {
    renderComponent();

    const statuses = screen.getAllByText("On Track");

    expect(statuses.length).toBeGreaterThan(0);
  });

  test("renders current phase", () => {
    renderComponent();

    expect(screen.getByText("Testing")).toBeInTheDocument();
  });

  test("renders current milestone", () => {
    renderComponent();

    expect(screen.getByText("UAT Signoff")).toBeInTheDocument();
  });

  test("renders readiness", () => {
    renderComponent();

    expect(screen.getByText("80%")).toBeInTheDocument();
  });

  test("renders days remaining", () => {
    renderComponent();

    expect(screen.getByText("120")).toBeInTheDocument();
  });

  test("renders delay days", () => {
    renderComponent();

    expect(screen.getByText("2 Days")).toBeInTheDocument();
  });

  test("renders formatted go live date", () => {
    renderComponent();

    expect(screen.getByText("31/12/2026")).toBeInTheDocument();
  });

  test("calls getProjectMetrics", () => {
    renderComponent();

    expect(getProjectMetrics).toHaveBeenCalledWith(mockProject);
  });

  test("navigates to project details", () => {
    renderComponent();

    fireEvent.click(screen.getByText("View Project Details"));

    expect(localStorage.getItem("selectedProjectId")).toBe("1");

    expect(localStorage.getItem("selectedProjectName")).toBe("Project Alpha");

    expect(mockNavigate).toHaveBeenCalledWith("/project-details");
  });

  test("renders multiple projects count", () => {
    renderComponent([
      mockProject,
      {
        id: "2",
        projectName: "Project Beta",
        bankName: "ICICI",
      },
    ]);

    expect(screen.getByText("2 Projects")).toBeInTheDocument();
  });

  test("renders delayed status", () => {
    getProjectMetrics.mockReturnValue({
      overallProgress: 40,
      status: "Delayed",
      goLiveDate: "2026-12-31",
      daysRemaining: 20,
      delayDays: 25,
      currentPhase: "Development",
      currentMilestone: "Coding",
      readiness: 45,
    });

    renderComponent();

    expect(screen.getAllByText("Delayed")[0]).toBeInTheDocument();
  });

  test("renders at risk status", () => {
    getProjectMetrics.mockReturnValue({
      overallProgress: 60,
      status: "At Risk",
      goLiveDate: "2026-12-31",
      daysRemaining: 50,
      delayDays: 8,
      currentPhase: "SIT",
      currentMilestone: "Execution",
      readiness: 65,
    });

    renderComponent();

    expect(screen.getAllByText("At Risk")[0]).toBeInTheDocument();
  });
});
