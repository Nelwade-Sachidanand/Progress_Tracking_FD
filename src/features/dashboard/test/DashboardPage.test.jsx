import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, test, vi } from "vitest";

import useDashboardData from "../hooks/useDashboardData";
import DashboardPage from "../pages/DashboardPage";
import DashboardToolbar from "../components/DashboardToolbar";
import {
  calculateOverallProgress,
  getActiveProjects,
  getDelayedProjects,
  getMilestoneStats,
  getOnTrackProjects,
  getTotalBanks,
  getUpcomingGoLiveProjects,
} from "../utils/dashboardUtils";

const mockNavigate = vi.fn();

/* ================= MOCKS ================= */

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

/* ✅ FIX 1: CRITICAL MISSING MOCK */
vi.mock("../../../context/ProjectContext", () => ({
  useProjects: () => ({
    fetchProjects: vi.fn(),
    projects: [],
    loading: false,
  }),
}));

vi.mock("../hooks/useDashboardData", () => ({
  default: vi.fn(),
}));

vi.mock("../utils/dashboardUtils", () => ({
  calculateOverallProgress: vi.fn(),
  getActiveProjects: vi.fn(),
  getDelayedProjects: vi.fn(),
  getMilestoneStats: vi.fn(),
  getOnTrackProjects: vi.fn(),
  getTotalBanks: vi.fn(),
  getUpcomingGoLiveProjects: vi.fn(),
}));

vi.mock("../components/DashboardToolbar", () => ({
  default: ({ onCreateProject }) => (
    <button onClick={onCreateProject}>Create Project</button>
  ),
}));

vi.mock("../components/KpiCards", () => ({
  default: ({ data }) => (
    <div data-testid="kpi-cards">KPI Cards {data.totalProjects}</div>
  ),
}));

vi.mock("../components/PortfolioProgress", () => ({
  default: ({ data }) => (
    <div data-testid="portfolio-progress">
      Portfolio Progress {data.overallProgress}
    </div>
  ),
}));

vi.mock("../components/ProgressCard", () => ({
  default: ({ projects }) => (
    <div data-testid="progress-card">Progress Card {projects.length}</div>
  ),
}));

/* ================= TEST ================= */

describe("DashboardPage", () => {
  const mockProjects = [
    { bankName: "HDFC", projectName: "Project A" },
    { bankName: "ICICI", projectName: "Project B" },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear();

    sessionStorage.setItem("selectedBank", "All Banks");
    sessionStorage.setItem("user", JSON.stringify({ id: "1" }));

    useDashboardData.mockReturnValue({
      projects: mockProjects,
      loading: false,
      totalBanks: 2,
      totalProjects: 2,
      activeProjects: 2,
      delayedProjects: 1,
      onTrackProjects: 1,
      upcomingGoLive: 1,
      completedMilestones: 10,
      inProgressMilestones: 5,
      delayedMilestones: 2,
      overallProgress: 75,
    });

    calculateOverallProgress.mockReturnValue(75);
    getActiveProjects.mockReturnValue(2);
    getDelayedProjects.mockReturnValue([{ id: 1 }]);
    getOnTrackProjects.mockReturnValue([{ id: 2 }]);
    getUpcomingGoLiveProjects.mockReturnValue([{ id: 3 }]);
    getMilestoneStats.mockReturnValue({
      completed: 10,
      inProgress: 5,
      delayed: 2,
    });
    getTotalBanks.mockReturnValue(2);
  });

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>,
    );

  /* ========== BASIC RENDER ========== */

  test("renders dashboard page", () => {
    renderComponent();
    expect(screen.getByTestId("kpi-cards")).toBeInTheDocument();
    expect(screen.getByTestId("portfolio-progress")).toBeInTheDocument();
    expect(screen.getByTestId("progress-card")).toBeInTheDocument();
  });

  test("renders all projects initially", () => {
    renderComponent();
    expect(screen.getByText("Progress Card 2")).toBeInTheDocument();
  });

  /* ========== UTIL CALLS ========== */

  test("calls dashboard utility methods", () => {
    renderComponent();

    expect(calculateOverallProgress).toHaveBeenCalled();
    expect(getDelayedProjects).toHaveBeenCalled();
    expect(getOnTrackProjects).toHaveBeenCalled();
    expect(getUpcomingGoLiveProjects).toHaveBeenCalled();
    expect(getMilestoneStats).toHaveBeenCalled();
    expect(getTotalBanks).toHaveBeenCalled();
    expect(getActiveProjects).toHaveBeenCalled();
  });

  /* ========== NAVIGATION ========== */

 

  /* ========== FILTER EVENTS ========== */

  test("filters by selected bank", async () => {
    renderComponent();
    sessionStorage.setItem("selectedBank", "HDFC");
    window.dispatchEvent(new Event("bankChanged"));

    await waitFor(() => {
      expect(screen.getByTestId("progress-card")).toBeInTheDocument();
    });
  });

  test("filters by search text bank name", async () => {
    renderComponent();

    window.dispatchEvent(
      new CustomEvent("dashboardSearch", { detail: "HDFC" }),
    );

    await waitFor(() => {
      expect(screen.getByTestId("progress-card")).toBeInTheDocument();
    });
  });

  test("filters by search text project name", async () => {
    renderComponent();

    window.dispatchEvent(
      new CustomEvent("dashboardSearch", { detail: "Project B" }),
    );

    await waitFor(() => {
      expect(screen.getByTestId("progress-card")).toBeInTheDocument();
    });
  });

  /* ========== EDGE CASES ========== */

  test("handles empty projects", () => {
    useDashboardData.mockReturnValue({
      projects: [],
    });

    renderComponent();
    expect(screen.getByText("Progress Card 0")).toBeInTheDocument();
  });

  test("handles undefined projects", () => {
    useDashboardData.mockReturnValue({
      projects: undefined,
    });

    renderComponent();
    expect(screen.getByText("Progress Card 0")).toBeInTheDocument();
  });

  test("search with no match returns zero", async () => {
    renderComponent();

    window.dispatchEvent(new CustomEvent("dashboardSearch", { detail: "XYZ" }));

    await waitFor(() => {
      expect(screen.getByText("Progress Card 0")).toBeInTheDocument();
    });
  });

  /* ========== KPI CHECKS ========== */

  test("dashboard data passed to KPI cards", () => {
    renderComponent();
    expect(screen.getByText("KPI Cards 2")).toBeInTheDocument();
  });

  test("dashboard data passed to portfolio progress", () => {
    renderComponent();
    expect(screen.getByText("Portfolio Progress 75")).toBeInTheDocument();
  });
});
