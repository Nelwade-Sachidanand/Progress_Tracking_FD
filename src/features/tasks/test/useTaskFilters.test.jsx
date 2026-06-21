import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import useTaskFilters from "../hooks/useTaskFilters";

describe("useTaskFilters", () => {
  const mockTasks = [
    {
      phase: "Phase 1",
      milestone: "Milestone A",
      task: "Task 1",
      subTask: "SubTask 1",
      activity: "Activity 1",
      status: "Completed",
    },
    {
      phase: "Phase 1",
      milestone: "Milestone B",
      task: "Task 2",
      subTask: "SubTask 2",
      activity: "Activity 2",
      status: "In Progress",
    },
    {
      phase: "Phase 2",
      milestone: "Milestone C",
      task: "Task 3",
      subTask: "SubTask 3",
      activity: "Activity 3",
      status: "Delayed",
    },
  ];

  it("returns unique phases", () => {
    const { result } = renderHook(() => useTaskFilters(mockTasks));

    expect(result.current.phases).toEqual(["Phase 1", "Phase 2"]);
  });

  it("returns milestones", () => {
    const { result } = renderHook(() => useTaskFilters(mockTasks));

    expect(result.current.milestones).toContain("Milestone A");

    expect(result.current.milestones).toContain("Milestone B");
  });

  it("filters milestones by phase", () => {
    const { result } = renderHook(() => useTaskFilters(mockTasks));

    act(() => {
      result.current.setSelectedPhase("Phase 2");
    });

    expect(result.current.milestones).toEqual(["Milestone C"]);
  });

  it("filters tasks by selected milestone", () => {
    const { result } = renderHook(() => useTaskFilters(mockTasks));

    act(() => {
      result.current.handleMilestoneChange("Milestone A");
    });

    expect(result.current.taskNames).toEqual(["Task 1"]);
  });

  it("filters subtasks by selected task", () => {
    const { result } = renderHook(() => useTaskFilters(mockTasks));

    act(() => {
      result.current.setSelectedTask("Task 2");
    });

    expect(result.current.subTasks).toEqual(["SubTask 2"]);
  });

  it("filters activities by selected subtask", () => {
    const { result } = renderHook(() => useTaskFilters(mockTasks));

    act(() => {
      result.current.setSelectedSubTask("SubTask 3");
    });

    expect(result.current.activities).toEqual(["Activity 3"]);
  });

  it("filters tasks by phase", () => {
    const { result } = renderHook(() => useTaskFilters(mockTasks));

    act(() => {
      result.current.setSelectedPhase("Phase 1");
    });

    expect(result.current.filteredTasks).toHaveLength(2);
  });

  it("filters tasks by status", () => {
    const { result } = renderHook(() => useTaskFilters(mockTasks));

    act(() => {
      result.current.setSelectedStatus("Completed");
    });

    expect(result.current.filteredTasks).toHaveLength(1);

    expect(result.current.filteredTasks[0].activity).toBe("Activity 1");
  });

  it("filters tasks by search term", () => {
    const { result } = renderHook(() => useTaskFilters(mockTasks));

    act(() => {
      result.current.setSearchTerm("Activity 2");
    });

    expect(result.current.filteredTasks).toHaveLength(1);

    expect(result.current.filteredTasks[0].activity).toBe("Activity 2");
  });

  it("adds milestone selection", () => {
    const { result } = renderHook(() => useTaskFilters(mockTasks));

    act(() => {
      result.current.handleMilestoneChange("Milestone A");
    });

    expect(result.current.selectedMilestone).toContain("Milestone A");
  });

  it("removes milestone selection when clicked again", () => {
    const { result } = renderHook(() => useTaskFilters(mockTasks));

    act(() => {
      result.current.handleMilestoneChange("Milestone A");
    });

    act(() => {
      result.current.handleMilestoneChange("Milestone A");
    });

    expect(result.current.selectedMilestone).toEqual([]);
  });

  it("returns all tasks initially", () => {
    const { result } = renderHook(() => useTaskFilters(mockTasks));

    expect(result.current.filteredTasks).toHaveLength(3);
  });

  it("works with empty task list", () => {
    const { result } = renderHook(() => useTaskFilters([]));

    expect(result.current.filteredTasks).toEqual([]);

    expect(result.current.phases).toEqual([]);
  });
});
