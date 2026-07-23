import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import useDocumentFilters from "../hooks/useDocumentFilters";



describe("useDocumentFilters", () => {
  const documents = [
    {
      phaseId: "P1",
      phase: "Phase 1",

      milestoneId: "M1",
      milestone: "M1 - Planning",

      taskId: "T1",
      task: "Task 1",

      subTaskId: "ST1",
      subTask: "Sub Task 1",

      activityId: "A1",
      activity: "Activity 1",

      documents: [
        {
          fileName: "file1.pdf",
          uploadedBy: "Sachin",
        },
      ],
    },
    {
      phaseId: "P2",
      phase: "Phase 2",

      milestoneId: "M2",
      milestone: "M2 - Development",

      taskId: "T2",
      task: "Task 2",

      subTaskId: "ST2",
      subTask: "Sub Task 2",

      activityId: "A2",
      activity: "Activity 2",

      documents: [],
    },
  ];

  it("returns dropdown values", () => {
    const { result } = renderHook(() =>
      useDocumentFilters(documents)
    );

    expect(result.current.phases).toHaveLength(2);
    expect(result.current.milestones).toHaveLength(2);
    expect(result.current.tasks).toHaveLength(2);
    expect(result.current.subTasks).toHaveLength(2);
    expect(result.current.activities).toHaveLength(2);
  });

  it("filters by phase", () => {
    const { result } = renderHook(() =>
      useDocumentFilters(documents)
    );

    act(() => {
      result.current.handlePhaseChange("P1");
    });

    expect(result.current.filteredDocuments).toHaveLength(1);
    expect(result.current.filteredDocuments[0].phaseId).toBe("P1");
  });

  it("filters by milestone", () => {
    const { result } = renderHook(() =>
      useDocumentFilters(documents)
    );

    act(() => {
      result.current.handleMilestoneChange("M1");
    });

    expect(result.current.filteredDocuments).toHaveLength(1);
  });

  it("filters by task", () => {
    const { result } = renderHook(() =>
      useDocumentFilters(documents)
    );

    act(() => {
      result.current.handleTaskChange("T1");
    });

    expect(result.current.filteredDocuments).toHaveLength(1);
  });

  it("filters by sub task", () => {
    const { result } = renderHook(() =>
      useDocumentFilters(documents)
    );

    act(() => {
      result.current.handleSubTaskChange("ST1");
    });

    expect(result.current.filteredDocuments).toHaveLength(1);
  });

  it("filters by uploaded status", () => {
    const { result } = renderHook(() =>
      useDocumentFilters(documents)
    );

    act(() => {
      result.current.setSelectedStatus("Uploaded");
    });

    expect(result.current.filteredDocuments).toHaveLength(1);
    expect(result.current.filteredDocuments[0].activity).toBe("Activity 1");
  });

  it("filters by pending status", () => {
    const { result } = renderHook(() =>
      useDocumentFilters(documents)
    );

    act(() => {
      result.current.setSelectedStatus("Pending");
    });

    expect(result.current.filteredDocuments).toHaveLength(1);
    expect(result.current.filteredDocuments[0].activity).toBe("Activity 2");
  });

  it("filters by search activity", () => {
    const { result } = renderHook(() =>
      useDocumentFilters(documents)
    );

    act(() => {
      result.current.setSearchTerm("activity 1");
    });

    expect(result.current.filteredDocuments).toHaveLength(1);
  });

  it("filters by uploaded file name", () => {
    const { result } = renderHook(() =>
      useDocumentFilters(documents)
    );

    act(() => {
      result.current.setSearchTerm("file1");
    });

    expect(result.current.filteredDocuments).toHaveLength(1);
  });

  it("filters by uploaded user", () => {
    const { result } = renderHook(() =>
      useDocumentFilters(documents)
    );

    act(() => {
      result.current.setSearchTerm("Sachin");
    });

    expect(result.current.filteredDocuments).toHaveLength(1);
  });

  it("returns empty when search does not match", () => {
    const { result } = renderHook(() =>
      useDocumentFilters(documents)
    );

    act(() => {
      result.current.setSearchTerm("xyz");
    });

    expect(result.current.filteredDocuments).toHaveLength(0);
  });

  it("clears all filters", () => {
    const { result } = renderHook(() =>
      useDocumentFilters(documents)
    );

    act(() => {
      result.current.handlePhaseChange("P1");
      result.current.setSearchTerm("file1");
      result.current.setSelectedStatus("Uploaded");
    });

    act(() => {
      result.current.clearFilters();
    });

    expect(result.current.selectedPhase).toBe("");
    expect(result.current.selectedMilestone).toEqual([]);
    expect(result.current.selectedTask).toBe("");
    expect(result.current.selectedSubTask).toBe("");
    expect(result.current.selectedActivity).toBe("");
    expect(result.current.selectedStatus).toBe("");
    expect(result.current.searchTerm).toBe("");

    expect(result.current.filteredDocuments).toHaveLength(2);
  });

  it("returns empty dropdowns when documents are empty", () => {
    const { result } = renderHook(() =>
      useDocumentFilters([])
    );

    expect(result.current.phases).toEqual([]);
    expect(result.current.milestones).toEqual([]);
    expect(result.current.tasks).toEqual([]);
    expect(result.current.subTasks).toEqual([]);
    expect(result.current.activities).toEqual([]);
    expect(result.current.filteredDocuments).toEqual([]);
  });
});