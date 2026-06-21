import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, test, vi } from "vitest";

import useDashboardData from "../hooks/useDashboardData";
import DashboardPage from "../pages/DashboardPage";

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

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../hooks/useDashboardData", () => ({
  default: vi.fn(),
}));

/*
  IMPORTANT:
  These paths MUST match the imports inside DashboardPage.jsx

  DashboardPage imports:

  import DashboardToolbar from "../components/DashboardToolbar";
  import KpiCards from "../components/KpiCards";
  import PortfolioProgress from "../components/PortfolioProgress";
  import ProgressCard from "../components/ProgressCard";
*/

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

vi.mock("../utils/dashboardUtils", () => ({
  calculateOverallProgress: vi.fn(),
  getActiveProjects: vi.fn(),
  getDelayedProjects: vi.fn(),
  getMilestoneStats: vi.fn(),
  getOnTrackProjects: vi.fn(),
  getTotalBanks: vi.fn(),
  getUpcomingGoLiveProjects: vi.fn(),
}));

describe("DashboardPage", () => {
  const mockProjects = [
    {
      bankName: "HDFC",
      projectName: "Project A",
    },
    {
      bankName: "ICICI",
      projectName: "Project B",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();

    localStorage.clear();

    localStorage.setItem("selectedBank", "All Banks");

    useDashboardData.mockReturnValue({
      projects: mockProjects,
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

  test("create project button navigates", () => {
    renderComponent();

    fireEvent.click(screen.getByText("Create Project"));

    expect(mockNavigate).toHaveBeenCalledWith("/create-project");
  });

  test("filters by selected bank", async () => {
    renderComponent();

    localStorage.setItem("selectedBank", "HDFC");

    window.dispatchEvent(new Event("bankChanged"));

    await waitFor(() => {
      expect(screen.getByText("Progress Card 1")).toBeInTheDocument();
    });
  });

  test("filters by search text bank name", async () => {
    renderComponent();

    window.dispatchEvent(
      new CustomEvent("dashboardSearch", {
        detail: "HDFC",
      }),
    );

    await waitFor(() => {
      expect(screen.getByText("Progress Card 1")).toBeInTheDocument();
    });
  });

  test("filters by search text project name", async () => {
    renderComponent();

    window.dispatchEvent(
      new CustomEvent("dashboardSearch", {
        detail: "Project B",
      }),
    );

    await waitFor(() => {
      expect(screen.getByText("Progress Card 1")).toBeInTheDocument();
    });
  });

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

  test("updates selected bank when bankChanged event fires", async () => {
    renderComponent();

    localStorage.setItem("selectedBank", "ICICI");

    window.dispatchEvent(new Event("bankChanged"));

    await waitFor(() => {
      expect(screen.getByText("Progress Card 1")).toBeInTheDocument();
    });
  });

  test("search with no matching project returns zero projects", async () => {
    renderComponent();

    window.dispatchEvent(
      new CustomEvent("dashboardSearch", {
        detail: "XYZ",
      }),
    );

    await waitFor(() => {
      expect(screen.getByText("Progress Card 0")).toBeInTheDocument();
    });
  });

  test("dashboard data passed to KPI cards", () => {
    renderComponent();

    expect(screen.getByText("KPI Cards 2")).toBeInTheDocument();
  });

  test("dashboard data passed to portfolio progress", () => {
    renderComponent();

    expect(screen.getByText("Portfolio Progress 75")).toBeInTheDocument();
  });
});
