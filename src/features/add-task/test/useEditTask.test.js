import { renderHook, act } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import useEditTask from "../hooks/useEditTask";
import { updateActivity } from "../api/editTaskApi";
import { toast } from "react-toastify";

const mockFetchProjects = vi.fn();

const task = {
  projectId: "1",
  projectName: "Project A",

  phaseId: "P1",
  phaseName: "Phase 1",

  milestoneId: "M1",
  milestoneName: "Milestone 1",

  taskId: "T1",
  taskName: "Task 1",

  subTaskId: "S1",
  subTaskName: "Sub Task 1",

  activityId: "A1",
  activityName: "Activity 1",

  owner: "Sachin",

  estimatedPeriodWeek: 2,
  actualPeriodWeek: "",

  plannedStartDate: "2026-07-01",
  plannedEndDate: "2026-07-05",

  actualStartDate: "",
  actualEndDate: "",

  progress: 0,

  executionStatus: "Not Started",
  scheduleHealth: "GREEN",
};

vi.mock("react-router-dom", () => ({
  useLocation: () => ({
    state: { task },
  }),
}));

vi.mock("../api/editTaskApi", () => ({
  updateActivity: vi.fn(),
}));

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("../../../context/ProjectContext", () => ({
  useProjects: () => ({
    fetchProjects: mockFetchProjects,
    projects: [
      {
        id: "1",
        phases: [],
      },
    ],
  }),
}));

describe("useEditTask", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    sessionStorage.setItem("selectedProjectId", "1");
    sessionStorage.setItem(
      "user",
      JSON.stringify({ id: 100 })
    );
  });

  it("loads initial data", () => {
    const { result } = renderHook(() => useEditTask());

    expect(result.current.formData.owner).toBe("Sachin");
    expect(result.current.formData.activityName).toBe("Activity 1");
    expect(result.current.selectedProject.id).toBe("1");
  });

  it("updates owner", () => {
    const { result } = renderHook(() => useEditTask());

    act(() => {
      result.current.handleChange("owner", "Rahul");
    });

    expect(result.current.formData.owner).toBe("Rahul");
  });

  it("updates progress", () => {
    const { result } = renderHook(() => useEditTask());

    act(() => {
      result.current.handleChange("progress", 50);
    });

    expect(result.current.formData.progress).toBe(50);
  });

  it("clears milestone when phase changes", () => {
    const { result } = renderHook(() => useEditTask());

    act(() => {
      result.current.handleChange("phaseName", "New Phase");
    });

    expect(result.current.formData.milestoneName).toBe("");
  });

  it("shows error if reason is missing when planned date changes", async () => {
    const { result } = renderHook(() => useEditTask());

    act(() => {
      result.current.handleChange(
        "plannedStartDate",
        "2026-08-01"
      );
    });

    await act(async () => {
      await result.current.handleUpdate();
    });

    expect(toast.error).toHaveBeenCalledWith(
      "Please enter reason for changing planned dates"
    );
  });

  it("shows error if progress > 0 without actual start date", async () => {
    const { result } = renderHook(() => useEditTask());

    act(() => {
      result.current.handleChange("progress", 50);
    });

    await act(async () => {
      await result.current.handleUpdate();
    });

    expect(toast.error).toHaveBeenCalledWith(
      "Please select Actual Start Date."
    );
  });

  it("shows error if progress is 100 without actual end date", async () => {
    const { result } = renderHook(() => useEditTask());

    act(() => {
      result.current.handleChange(
        "actualStartDate",
        "2026-07-02"
      );

      result.current.handleChange("progress", 100);
    });

    await act(async () => {
      await result.current.handleUpdate();
    });

    expect(toast.error).toHaveBeenCalledWith(
      "Please select Actual End Date when progress is 100%."
    );
  });

  it("updates activity successfully", async () => {
    updateActivity.mockResolvedValue({
      statusType: "S",
      statusDesc: "Updated Successfully",
    });

    const { result } = renderHook(() => useEditTask());

    act(() => {
      result.current.handleChange(
        "actualStartDate",
        "2026-07-02"
      );

      result.current.handleChange(
        "actualEndDate",
        "2026-07-05"
      );

      result.current.handleChange("progress", 100);
    });

    await act(async () => {
      await result.current.handleUpdate();
    });

    expect(updateActivity).toHaveBeenCalled();
    expect(mockFetchProjects).toHaveBeenCalledWith(100);
    expect(toast.success).toHaveBeenCalledWith(
      "Updated Successfully"
    );
  });

  it("shows api error", async () => {
    updateActivity.mockResolvedValue({
      statusType: "E",
      statusDesc: "Failed",
    });

    const { result } = renderHook(() => useEditTask());

    await act(async () => {
      await result.current.handleUpdate();
    });

    expect(toast.error).toHaveBeenCalled();
  });

  it("handles exception", async () => {
    updateActivity.mockRejectedValue({
      response: {
        data: {
          statusDesc: "Server Error",
        },
      },
    });

    const { result } = renderHook(() => useEditTask());

    await act(async () => {
      await result.current.handleUpdate();
    });

    expect(toast.error).toHaveBeenCalledWith(
      "Server Error"
    );
  });
});