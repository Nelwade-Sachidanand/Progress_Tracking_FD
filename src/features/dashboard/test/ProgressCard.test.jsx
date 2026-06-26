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
    sessionStorage.clear();

    getProjectMetrics.mockReturnValue({
      projectStartDate: "2026-01-01",
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

  test("renders projects heading", () => {
    renderComponent();

    expect(screen.getByText("Projects")).toBeInTheDocument();
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

  test("renders multiple project count", () => {
    renderComponent([
      mockProject,
      {
        id: "2",
        projectName: "Project Beta",
        bankName: "ICICI Bank",
      },
    ]);

    expect(screen.getByText("2 Projects")).toBeInTheDocument();
  });

  test("renders multiple project cards", () => {
    renderComponent([
      mockProject,
      {
        id: "2",
        projectName: "Project Beta",
        bankName: "ICICI Bank",
      },
    ]);

    expect(screen.getByText("Project Alpha")).toBeInTheDocument();
    expect(screen.getByText("Project Beta")).toBeInTheDocument();
  });

  test("renders progress percentage", () => {
    renderComponent();

    expect(screen.getByText("75%")).toBeInTheDocument();
  });

  test("renders project status", () => {
    renderComponent();

    expect(screen.getAllByText("On Track")[0]).toBeInTheDocument();
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

  test("renders project start date", () => {
    renderComponent();

    expect(screen.getByText("01/01/2026")).toBeInTheDocument();
  });

  test("renders go live date", () => {
    renderComponent();

    expect(screen.getByText("31/12/2026")).toBeInTheDocument();
  });

  test("renders days remaining", () => {
    renderComponent();

    expect(screen.getByText("120")).toBeInTheDocument();
  });

  test("renders delay days", () => {
    renderComponent();

    expect(screen.getByText("2 Days")).toBeInTheDocument();
  });

  test("calls getProjectMetrics", () => {
    renderComponent();

    expect(getProjectMetrics).toHaveBeenCalledWith(mockProject);
  });

  test("renders view project details button", () => {
    renderComponent();

    expect(
      screen.getByRole("button", {
        name: /view project details/i,
      }),
    ).toBeInTheDocument();
  });

  test("navigates to project details", () => {
    renderComponent();

    fireEvent.click(
      screen.getByRole("button", {
        name: /view project details/i,
      }),
    );

    expect(sessionStorage.getItem("selectedProjectId")).toBe("1");
    expect(sessionStorage.getItem("selectedProjectName")).toBe("Project Alpha");

    expect(mockNavigate).toHaveBeenCalledWith("/project-details");
  });

  test("renders delayed status", () => {
    getProjectMetrics.mockReturnValue({
      projectStartDate: "2026-01-01",
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
    expect(screen.getByText("25 Days")).toBeInTheDocument();
  });

  test("renders at risk status", () => {
    getProjectMetrics.mockReturnValue({
      projectStartDate: "2026-01-01",
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
    expect(screen.getByText("8 Days")).toBeInTheDocument();
  });

  test("renders unknown status", () => {
    getProjectMetrics.mockReturnValue({
      projectStartDate: "2026-01-01",
      overallProgress: 50,
      status: "Unknown",
      goLiveDate: "",
      daysRemaining: 0,
      delayDays: 0,
      currentPhase: "-",
      currentMilestone: "-",
      readiness: 50,
    });

    renderComponent();

    expect(screen.getAllByText("Unknown")[0]).toBeInTheDocument();
  });

  test("shows dash when project start date missing", () => {
    getProjectMetrics.mockReturnValue({
      projectStartDate: null,
      overallProgress: 70,
      status: "On Track",
      goLiveDate: "2026-12-31",
      daysRemaining: 25,
      delayDays: 2,
      currentPhase: "Testing",
      currentMilestone: "UAT",
      readiness: 80,
    });

    renderComponent();

    expect(screen.getAllByText("-").length).toBeGreaterThan(0);
  });

  test("shows dash when go live date missing", () => {
    getProjectMetrics.mockReturnValue({
      projectStartDate: "2026-01-01",
      overallProgress: 70,
      status: "On Track",
      goLiveDate: null,
      daysRemaining: 25,
      delayDays: 2,
      currentPhase: "Testing",
      currentMilestone: "UAT",
      readiness: 80,
    });

    renderComponent();

    expect(screen.getAllByText("-").length).toBeGreaterThan(0);
  });

  test("renders green delay", () => {
    getProjectMetrics.mockReturnValue({
      projectStartDate: "2026-01-01",
      overallProgress: 85,
      status: "On Track",
      goLiveDate: "2026-12-31",
      daysRemaining: 120,
      delayDays: 2,
      currentPhase: "Testing",
      currentMilestone: "UAT",
      readiness: 90,
    });

    renderComponent();

    expect(screen.getByText("2 Days")).toBeInTheDocument();
  });

  test("renders yellow delay", () => {
    getProjectMetrics.mockReturnValue({
      projectStartDate: "2026-01-01",
      overallProgress: 60,
      status: "At Risk",
      goLiveDate: "2026-12-31",
      daysRemaining: 30,
      delayDays: 10,
      currentPhase: "SIT",
      currentMilestone: "Execution",
      readiness: 65,
    });

    renderComponent();

    expect(screen.getByText("10 Days")).toBeInTheDocument();
  });

  test("renders red delay", () => {
    getProjectMetrics.mockReturnValue({
      projectStartDate: "2026-01-01",
      overallProgress: 25,
      status: "Delayed",
      goLiveDate: "2026-12-31",
      daysRemaining: 5,
      delayDays: 30,
      currentPhase: "Development",
      currentMilestone: "Coding",
      readiness: 35,
    });

    renderComponent();

    expect(screen.getByText("30 Days")).toBeInTheDocument();
  });
});
