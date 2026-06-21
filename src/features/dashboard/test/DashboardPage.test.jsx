import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import DashboardPage from "../pages/DashboardPage";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("../hooks/useDashboardData", () => ({
  default: vi.fn(),
}));

import useDashboardData from "../hooks/useDashboardData";

vi.mock("../components/DashboardToolbar", () => ({
  default: ({ onCreateProject }) => (
    <div data-testid="dashboard-toolbar">
      <button data-testid="create-project-btn" onClick={onCreateProject}>
        Create Project
      </button>
    </div>
  ),
}));

vi.mock("../components/KpiCards", () => ({
  default: ({ data }) => (
    <div data-testid="kpi-cards">KPI Cards - {data.totalProjects}</div>
  ),
}));

vi.mock("../components/PortfolioProgress", () => ({
  default: ({ data }) => (
    <div data-testid="portfolio-progress">
      Progress - {data.overallProgress}%
    </div>
  ),
}));

vi.mock("../components/ProgressCard", () => ({
  default: () => <div data-testid="progress-card">Progress Card</div>,
}));

describe("DashboardPage", () => {
  const mockDashboardData = {
    totalBanks: 5,
    totalProjects: 12,
    activeProjects: 10,
    delayedProjects: 2,
    onTrackProjects: 8,
    upcomingGoLive: 3,
    completedMilestones: 15,
    inProgressMilestones: 6,
    delayedMilestones: 1,
    overallProgress: 75,
    projects: [],
  };

  beforeEach(() => {
    vi.clearAllMocks();

    useDashboardData.mockReturnValue(mockDashboardData);
  });

  it("renders DashboardToolbar", () => {
    render(<DashboardPage />);

    expect(screen.getByTestId("dashboard-toolbar")).toBeInTheDocument();
  });

  it("renders KpiCards", () => {
    render(<DashboardPage />);

    expect(screen.getByTestId("kpi-cards")).toBeInTheDocument();

    expect(screen.getByText("KPI Cards - 12")).toBeInTheDocument();
  });

  it("renders PortfolioProgress", () => {
    render(<DashboardPage />);

    expect(screen.getByTestId("portfolio-progress")).toBeInTheDocument();

    expect(screen.getByText("Progress - 75%")).toBeInTheDocument();
  });

  it("renders ProgressCard", () => {
    render(<DashboardPage />);

    expect(screen.getByTestId("progress-card")).toBeInTheDocument();
  });

  it("calls useDashboardData hook", () => {
    render(<DashboardPage />);

    expect(useDashboardData).toHaveBeenCalledTimes(1);
  });

  it("navigates to create project page when create button clicked", () => {
    render(<DashboardPage />);

    fireEvent.click(screen.getByTestId("create-project-btn"));

    expect(mockNavigate).toHaveBeenCalledWith("/create-project");
  });

  it("passes dashboard data to child components", () => {
    render(<DashboardPage />);

    expect(screen.getByText("KPI Cards - 12")).toBeInTheDocument();

    expect(screen.getByText("Progress - 75%")).toBeInTheDocument();
  });

  it("renders successfully with empty dashboard data", () => {
    useDashboardData.mockReturnValue({
      totalBanks: 0,
      totalProjects: 0,
      activeProjects: 0,
      delayedProjects: 0,
      onTrackProjects: 0,
      upcomingGoLive: 0,
      completedMilestones: 0,
      inProgressMilestones: 0,
      delayedMilestones: 0,
      overallProgress: 0,
      projects: [],
    });

    render(<DashboardPage />);

    expect(screen.getByText("KPI Cards - 0")).toBeInTheDocument();

    expect(screen.getByText("Progress - 0%")).toBeInTheDocument();
  });
});
