import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import useDashboardData from "../hooks/useDashboardData";

import {
  calculateOverallProgress,
  getActiveProjects,
  getDelayedProjects,
  getMilestoneStats,
  getOnTrackProjects,
  getTotalBanks,
  getUpcomingGoLiveProjects,
} from "../utils/dashboardUtils";

vi.mock("../utils/dashboardUtils", () => ({
  calculateOverallProgress: vi.fn(),
  getDelayedProjects: vi.fn(),
  getOnTrackProjects: vi.fn(),
  getUpcomingGoLiveProjects: vi.fn(),
  getMilestoneStats: vi.fn(),
  getActiveProjects: vi.fn(),
  getTotalBanks: vi.fn(),
}));

describe("useDashboardData", () => {
  const mockProjects = [
    {
      id: 1,
      projectName: "Project A",
    },
    {
      id: 2,
      projectName: "Project B",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();

    calculateOverallProgress.mockReturnValue(75);

    getDelayedProjects.mockReturnValue([{ id: 1 }, { id: 2 }]);

    getOnTrackProjects.mockReturnValue([{ id: 3 }]);

    getUpcomingGoLiveProjects.mockReturnValue([
      { id: 4 },
      { id: 5 },
      { id: 6 },
    ]);

    getMilestoneStats.mockReturnValue({
      completed: 10,
      inProgress: 5,
      delayed: 2,
    });

    getActiveProjects.mockReturnValue(7);

    getTotalBanks.mockReturnValue(4);
  });

  it("returns dashboard data correctly", () => {
    const { result } = renderHook(() => useDashboardData(mockProjects, false));

    expect(result.current).toEqual({
      projects: mockProjects,
      loading: false,
      totalBanks: 4,
      totalProjects: 2,
      activeProjects: 7,
      delayedProjects: 2,
      onTrackProjects: 1,
      upcomingGoLive: 3,
      completedMilestones: 10,
      inProgressMilestones: 5,
      delayedMilestones: 2,
      overallProgress: 75,
    });
  });

  it("calls all utility functions with projects", () => {
    renderHook(() => useDashboardData(mockProjects, false));

    expect(calculateOverallProgress).toHaveBeenCalledWith(mockProjects);

    expect(getDelayedProjects).toHaveBeenCalledWith(mockProjects);

    expect(getOnTrackProjects).toHaveBeenCalledWith(mockProjects);

    expect(getUpcomingGoLiveProjects).toHaveBeenCalledWith(mockProjects);

    expect(getMilestoneStats).toHaveBeenCalledWith(mockProjects);

    expect(getActiveProjects).toHaveBeenCalledWith(mockProjects);

    expect(getTotalBanks).toHaveBeenCalledWith(mockProjects);
  });

  it("handles empty projects list", () => {
    calculateOverallProgress.mockReturnValue(0);

    getDelayedProjects.mockReturnValue([]);

    getOnTrackProjects.mockReturnValue([]);

    getUpcomingGoLiveProjects.mockReturnValue([]);

    getMilestoneStats.mockReturnValue({
      completed: 0,
      inProgress: 0,
      delayed: 0,
    });

    getActiveProjects.mockReturnValue(0);

    getTotalBanks.mockReturnValue(0);

    const { result } = renderHook(() => useDashboardData([], false));

    expect(result.current).toEqual({
      projects: [],
      loading: false,
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
    });
  });

  it("handles undefined projects", () => {
    calculateOverallProgress.mockReturnValue(0);

    getDelayedProjects.mockReturnValue([]);

    getOnTrackProjects.mockReturnValue([]);

    getUpcomingGoLiveProjects.mockReturnValue([]);

    getMilestoneStats.mockReturnValue({
      completed: 0,
      inProgress: 0,
      delayed: 0,
    });

    getActiveProjects.mockReturnValue(0);

    getTotalBanks.mockReturnValue(0);

    const { result } = renderHook(() => useDashboardData([], false));

    expect(result.current.projects).toEqual([]);

    expect(calculateOverallProgress).toHaveBeenCalledWith([]);
  });

  it("calculates counts from returned arrays", () => {
    getDelayedProjects.mockReturnValue([{}, {}, {}]);

    getOnTrackProjects.mockReturnValue([{}, {}]);

    getUpcomingGoLiveProjects.mockReturnValue([{}]);

    const { result } = renderHook(() => useDashboardData(mockProjects, false));

    expect(result.current.delayedProjects).toBe(3);

    expect(result.current.onTrackProjects).toBe(2);

    expect(result.current.upcomingGoLive).toBe(1);
  });

  it("returns supplied projects", () => {
    const { result } = renderHook(() => useDashboardData(mockProjects, false));

    expect(result.current.projects).toEqual(mockProjects);
  });

  it("returns total projects length", () => {
    const { result } = renderHook(() => useDashboardData(mockProjects, false));

    expect(result.current.totalProjects).toBe(2);
  });
});
