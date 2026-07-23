import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import useTaskFilters from "../hooks/useTaskFilters";


const mockTasks = [
  {
    phase: "Phase 1",
    milestone: "Milestone A",
    milestoneId: "M1",
    task: "Login",
    subTask: "UI",
    activity: "Design",
    status: "Completed",
  },
  {
    phase: "Phase 1",
    milestone: "Milestone B",
    milestoneId: "M2",
    task: "Login",
    subTask: "Backend",
    activity: "API",
    status: "In Progress",
  },
  {
    phase: "Phase 2",
    milestone: "Milestone C",
    milestoneId: "M3",
    task: "Dashboard",
    subTask: "Charts",
    activity: "Chart",
    status: "Not Started",
  },
];

describe("useTaskFilters", () => {
  it("returns unique phases", () => {
    const { result } = renderHook(() => useTaskFilters(mockTasks));

    expect(result.current.phases).toEqual(["Phase 1", "Phase 2"]);
  });

  it("returns all milestones initially", () => {
    const { result } = renderHook(() => useTaskFilters(mockTasks));

    expect(result.current.milestones).toEqual(["M1", "M2", "M3"]);
  });

  it("filters milestones by selected phase", () => {
    const { result } = renderHook(() => useTaskFilters(mockTasks));

    act(() => {
      result.current.setSelectedPhase("Phase 2");
    });

    expect(result.current.milestones).toEqual(["M3"]);
  });

  it("returns task names for selected milestone", () => {
    const { result } = renderHook(() => useTaskFilters(mockTasks));

    act(() => {
      result.current.setSelectedMilestone(["M1"]);
    });

    expect(result.current.taskNames).toEqual(["Login"]);
  });

  it("returns subtasks for selected task", () => {
    const { result } = renderHook(() => useTaskFilters(mockTasks));

    act(() => {
      result.current.setSelectedTask("Login");
    });

    expect(result.current.subTasks).toEqual(["UI", "Backend"]);
  });

  it("returns activities for selected subtask", () => {
    const { result } = renderHook(() => useTaskFilters(mockTasks));

    act(() => {
      result.current.setSelectedSubTask("Backend");
    });

    expect(result.current.activities).toEqual(["API"]);
  });

  it("filters tasks by phase", () => {
    const { result } = renderHook(() => useTaskFilters(mockTasks));

    act(() => {
      result.current.setSelectedPhase("Phase 1");
    });

    expect(result.current.filteredTasks).toHaveLength(2);
  });

  it("filters tasks by milestone", () => {
    const { result } = renderHook(() => useTaskFilters(mockTasks));

    act(() => {
      result.current.setSelectedMilestone(["M2"]);
    });

    expect(result.current.filteredTasks).toHaveLength(1);
    expect(result.current.filteredTasks[0].activity).toBe("API");
  });

  it("filters tasks by task name", () => {
    const { result } = renderHook(() => useTaskFilters(mockTasks));

    act(() => {
      result.current.setSelectedTask("Dashboard");
    });

    expect(result.current.filteredTasks).toHaveLength(1);
  });

  it("filters tasks by subtask", () => {
    const { result } = renderHook(() => useTaskFilters(mockTasks));

    act(() => {
      result.current.setSelectedSubTask("Charts");
    });

    expect(result.current.filteredTasks).toHaveLength(1);
  });

  it("filters tasks by activity", () => {
    const { result } = renderHook(() => useTaskFilters(mockTasks));

    act(() => {
      result.current.setSelectedActivity("API");
    });

    expect(result.current.filteredTasks).toHaveLength(1);
  });

  it("filters tasks by status", () => {
    const { result } = renderHook(() => useTaskFilters(mockTasks));

    act(() => {
      result.current.setSelectedStatus("Completed");
    });

    expect(result.current.filteredTasks).toHaveLength(1);
  });

  it("filters tasks by search term", () => {
    const { result } = renderHook(() => useTaskFilters(mockTasks));

    act(() => {
      result.current.setSearchTerm("dash");
    });

    expect(result.current.filteredTasks).toHaveLength(1);
    expect(result.current.filteredTasks[0].task).toBe("Dashboard");
  });

  it("sorts search results with startsWith first", () => {
    const { result } = renderHook(() => useTaskFilters(mockTasks));

    act(() => {
      result.current.setSearchTerm("log");
    });

    expect(result.current.sortedTasks[0].task).toBe("Login");
  });

  it("toggles milestone selection", () => {
    const { result } = renderHook(() => useTaskFilters(mockTasks));

    act(() => {
      result.current.handleMilestoneChange("M1");
    });

    expect(result.current.selectedMilestone).toEqual(["M1"]);

    act(() => {
      result.current.handleMilestoneChange("M1");
    });

    expect(result.current.selectedMilestone).toEqual([]);
  });

  it("returns all tasks when no filters are applied", () => {
    const { result } = renderHook(() => useTaskFilters(mockTasks));

    expect(result.current.filteredTasks).toHaveLength(3);
  });

  it("returns empty arrays when no tasks are provided", () => {
    const { result } = renderHook(() => useTaskFilters([]));

    expect(result.current.phases).toEqual([]);
    expect(result.current.milestones).toEqual([]);
    expect(result.current.taskNames).toEqual([]);
    expect(result.current.filteredTasks).toEqual([]);
  });
});