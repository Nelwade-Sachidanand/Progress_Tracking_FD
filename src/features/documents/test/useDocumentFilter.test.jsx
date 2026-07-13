import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import useDocumentFilters from "../hooks/useDocumentFilters";

const documents = [
  {
    phase: "Phase 1",
    milestone: "M1",
    task: "Task 1",
    subTask: "Sub 1",
    activity: "Activity 1",
    uploadedBy: "Admin",
    uploadStatus: "Uploaded",
    fileName: "file1.pdf",
  },
  {
    phase: "Phase 2",
    milestone: "M2",
    task: "Task 2",
    subTask: "Sub 2",
    activity: "Activity 2",
    uploadedBy: "User",
    uploadStatus: "Pending",
    fileName: "file2.pdf",
  },
];

describe("useDocumentFilters", () => {
  it("returns initial documents", () => {
    const { result } = renderHook(() => useDocumentFilters(documents));

    expect(result.current.filteredDocuments).toHaveLength(2);
  });

  it("returns dropdown values", () => {
    const { result } = renderHook(() => useDocumentFilters(documents));

    expect(result.current.phases).toEqual(["Phase 1", "Phase 2"]);
    expect(result.current.milestones).toEqual(["M1", "M2"]);
    expect(result.current.tasks).toEqual(["Task 1", "Task 2"]);
    expect(result.current.subTasks).toEqual(["Sub 1", "Sub 2"]);
    expect(result.current.activities).toEqual([
      "Activity 1",
      "Activity 2",
    ]);
  });

  it("filters by phase", () => {
    const { result } = renderHook(() => useDocumentFilters(documents));

    act(() => {
      result.current.handlePhaseChange("Phase 1");
    });

    expect(result.current.filteredDocuments).toHaveLength(1);
    expect(result.current.filteredDocuments[0].phase).toBe("Phase 1");
  });

  it("filters by milestone", () => {
    const { result } = renderHook(() => useDocumentFilters(documents));

    act(() => {
      result.current.handleMilestoneChange("M2");
    });

    expect(result.current.filteredDocuments).toHaveLength(1);
    expect(result.current.filteredDocuments[0].milestone).toBe("M2");
  });

  it("filters by task", () => {
    const { result } = renderHook(() => useDocumentFilters(documents));

    act(() => {
      result.current.handleTaskChange("Task 2");
    });

    expect(result.current.filteredDocuments).toHaveLength(1);
    expect(result.current.filteredDocuments[0].task).toBe("Task 2");
  });

  it("filters by sub task", () => {
    const { result } = renderHook(() => useDocumentFilters(documents));

    act(() => {
      result.current.handleSubTaskChange("Sub 1");
    });

    expect(result.current.filteredDocuments).toHaveLength(1);
    expect(result.current.filteredDocuments[0].subTask).toBe("Sub 1");
  });

  it("filters by activity", () => {
    const { result } = renderHook(() => useDocumentFilters(documents));

    act(() => {
      result.current.setSelectedActivity("Activity 2");
    });

    expect(result.current.filteredDocuments).toHaveLength(1);
    expect(result.current.filteredDocuments[0].activity).toBe("Activity 2");
  });

  it("filters by status", () => {
    const { result } = renderHook(() => useDocumentFilters(documents));

    act(() => {
      result.current.setSelectedStatus("Uploaded");
    });

    expect(result.current.filteredDocuments).toHaveLength(1);
    expect(result.current.filteredDocuments[0].uploadStatus).toBe(
      "Uploaded"
    );
  });

  it("filters by search term", () => {
    const { result } = renderHook(() => useDocumentFilters(documents));

    act(() => {
      result.current.setSearchTerm("file2");
    });

    expect(result.current.filteredDocuments).toHaveLength(1);
    expect(result.current.filteredDocuments[0].fileName).toBe("file2.pdf");
  });

  it("searches by uploadedBy", () => {
    const { result } = renderHook(() => useDocumentFilters(documents));

    act(() => {
      result.current.setSearchTerm("admin");
    });

    expect(result.current.filteredDocuments).toHaveLength(1);
    expect(result.current.filteredDocuments[0].uploadedBy).toBe("Admin");
  });

  it("returns empty array when nothing matches", () => {
    const { result } = renderHook(() => useDocumentFilters(documents));

    act(() => {
      result.current.setSearchTerm("xyz");
    });

    expect(result.current.filteredDocuments).toHaveLength(0);
  });

  it("handlePhaseChange resets dependent filters", () => {
    const { result } = renderHook(() => useDocumentFilters(documents));

    act(() => {
      result.current.setSelectedMilestone(["M1"]);
      result.current.setSelectedTask("Task 1");
      result.current.setSelectedSubTask("Sub 1");
      result.current.setSelectedActivity("Activity 1");
    });

    act(() => {
      result.current.handlePhaseChange("Phase 2");
    });

    expect(result.current.selectedMilestone).toEqual([]);
    expect(result.current.selectedTask).toBe("All Tasks");
    expect(result.current.selectedSubTask).toBe("All Sub Tasks");
    expect(result.current.selectedActivity).toBe("All Activities");
  });

  it("handleMilestoneChange toggles milestone", () => {
    const { result } = renderHook(() => useDocumentFilters(documents));

    act(() => {
      result.current.handleMilestoneChange("M1");
    });

    expect(result.current.selectedMilestone).toEqual(["M1"]);

    act(() => {
      result.current.handleMilestoneChange("M1");
    });

    expect(result.current.selectedMilestone).toEqual([]);
  });

  it("handleTaskChange resets subtask and activity", () => {
    const { result } = renderHook(() => useDocumentFilters(documents));

    act(() => {
      result.current.handleTaskChange("Task 2");
    });

    expect(result.current.selectedTask).toBe("Task 2");
    expect(result.current.selectedSubTask).toBe("All Sub Tasks");
    expect(result.current.selectedActivity).toBe("All Activities");
  });

  it("handleSubTaskChange resets activity", () => {
    const { result } = renderHook(() => useDocumentFilters(documents));

    act(() => {
      result.current.handleSubTaskChange("Sub 2");
    });

    expect(result.current.selectedSubTask).toBe("Sub 2");
    expect(result.current.selectedActivity).toBe("All Activities");
  });
});