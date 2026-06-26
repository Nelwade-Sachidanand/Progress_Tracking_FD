import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { toast } from "react-toastify";

import { createActivity } from "../api/addTaskApi";
import useAddTask from "../hooks/useAddTask";

const mockFetchProjects = vi.fn();

const mockProjects = [
  {
    id: "1",
    projectName: "Test Project",

    phases: [
      {
        phaseName: "Phase A",

        milestones: [
          {
            milestoneName: "Milestone A",

            tasks: [
              {
                taskName: "Task A",

                subTasks: [
                  {
                    subTaskName: "Sub Task A",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

vi.mock("../../../context/ProjectContext", () => ({
  useProjects: () => ({
    projects: mockProjects,
    fetchProjects: mockFetchProjects,
  }),
}));

vi.mock("../api/addTaskApi", () => ({
  createActivity: vi.fn(),
}));

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("useAddTask", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    sessionStorage.clear();

    sessionStorage.setItem("selectedProjectId", "1");

    sessionStorage.setItem(
      "user",
      JSON.stringify({
        id: "100",
      }),
    );
  });

  it("initializes default form data", () => {
    const { result } = renderHook(() => useAddTask());

    expect(result.current.formData.phaseName).toBe("");

    expect(result.current.formData.progress).toBe(0);

    expect(result.current.formData.activityName).toBe("");
  });

  it("loads selected project", () => {
    const { result } = renderHook(() => useAddTask());

    expect(result.current.selectedProject).toEqual(mockProjects[0]);
  });

  it("returns phases", () => {
    const { result } = renderHook(() => useAddTask());

    expect(result.current.phases).toEqual(["Phase A"]);
  });

  it("returns milestones after selecting phase", () => {
    const { result } = renderHook(() => useAddTask());

    act(() => {
      result.current.handleChange("phaseName", "Phase A");
    });

    expect(result.current.milestones).toEqual(["Milestone A"]);
  });

  it("returns task options", () => {
    const { result } = renderHook(() => useAddTask());

    act(() => {
      result.current.handleChange("phaseName", "Phase A");

      result.current.handleChange("milestoneName", "Milestone A");
    });

    expect(result.current.taskOptions).toEqual(["Task A"]);
  });

  it("returns sub tasks", () => {
    const { result } = renderHook(() => useAddTask());

    act(() => {
      result.current.handleChange("phaseName", "Phase A");

      result.current.handleChange("milestoneName", "Milestone A");

      result.current.handleChange("taskName", "Task A");
    });

    expect(result.current.subTasks).toEqual(["Sub Task A"]);
  });

  it("updates phase", () => {
    const { result } = renderHook(() => useAddTask());

    act(() => {
      result.current.handleChange("phaseName", "Phase A");
    });

    expect(result.current.formData.phaseName).toBe("Phase A");
  });

  it("changing phase resets dependent fields", () => {
    const { result } = renderHook(() => useAddTask());

    act(() => {
      result.current.handleChange("phaseName", "Phase A");
    });

    expect(result.current.formData.milestoneName).toBe("");

    expect(result.current.formData.taskName).toBe("");

    expect(result.current.formData.subTaskName).toBe("");
  });

  it("changing milestone resets task and sub task", () => {
    const { result } = renderHook(() => useAddTask());

    act(() => {
      result.current.handleChange("milestoneName", "Milestone A");
    });

    expect(result.current.formData.taskName).toBe("");

    expect(result.current.formData.subTaskName).toBe("");
  });

  it("changing task resets sub task", () => {
    const { result } = renderHook(() => useAddTask());

    act(() => {
      result.current.handleChange("taskName", "Task A");
    });

    expect(result.current.formData.subTaskName).toBe("");
  });
  it("validates missing phase", async () => {
    const { result } = renderHook(() => useAddTask());

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(toast.error).toHaveBeenCalledWith("Please select Phase");
  });

  it("validates missing milestone", async () => {
    const { result } = renderHook(() => useAddTask());

    act(() => {
      result.current.handleChange("phaseName", "Phase A");
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(toast.error).toHaveBeenCalledWith("Please select Milestone");
  });

  it("validates missing task", async () => {
    const { result } = renderHook(() => useAddTask());

    act(() => {
      result.current.handleChange("phaseName", "Phase A");
      result.current.handleChange("milestoneName", "Milestone A");
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(toast.error).toHaveBeenCalledWith("Please select Task");
  });

  it("validates missing sub task", async () => {
    const { result } = renderHook(() => useAddTask());

    act(() => {
      result.current.handleChange("phaseName", "Phase A");
      result.current.handleChange("milestoneName", "Milestone A");
      result.current.handleChange("taskName", "Task A");
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(toast.error).toHaveBeenCalledWith("Please select Sub Task");
  });

  it("validates missing activity", async () => {
    const { result } = renderHook(() => useAddTask());

    act(() => {
      result.current.handleChange("phaseName", "Phase A");
      result.current.handleChange("milestoneName", "Milestone A");
      result.current.handleChange("taskName", "Task A");
      result.current.handleChange("subTaskName", "Sub Task A");
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(toast.error).toHaveBeenCalledWith("Please enter Activity");
  });

  it("creates activity successfully", async () => {
    createActivity.mockResolvedValue({
      statusType: "S",
      statusDesc: "Activity Created",
    });

    const { result } = renderHook(() => useAddTask());

    act(() => {
      result.current.handleChange("phaseName", "Phase A");
      result.current.handleChange("milestoneName", "Milestone A");
      result.current.handleChange("taskName", "Task A");
      result.current.handleChange("subTaskName", "Sub Task A");
      result.current.handleChange("activityName", "New Activity");
      result.current.handleChange("estimatedPeriodWeek", "5");
      result.current.handleChange("progress", "40");
      result.current.handleChange("executionStatus", "In Progress");
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(createActivity).toHaveBeenCalledTimes(1);

    expect(createActivity).toHaveBeenCalledWith(
      expect.objectContaining({
        projectId: "1",
        projectName: "Test Project",
        phaseName: "Phase A",
        milestoneName: "Milestone A",
        taskName: "Task A",
        subTaskName: "Sub Task A",
        activityName: "New Activity",
        estimatedPeriodWeek: 5,
        progress: 40,
        executionStatus: "In Progress",
        scheduleHealth: "GREEN",
      }),
    );

    expect(toast.success).toHaveBeenCalledWith("Activity Created");

    expect(mockFetchProjects).toHaveBeenCalledWith("100");
  });

  it("resets form after successful submit", async () => {
    createActivity.mockResolvedValue({
      statusType: "S",
      statusDesc: "Created",
    });

    const { result } = renderHook(() => useAddTask());

    act(() => {
      result.current.handleChange("phaseName", "Phase A");
      result.current.handleChange("milestoneName", "Milestone A");
      result.current.handleChange("taskName", "Task A");
      result.current.handleChange("subTaskName", "Sub Task A");
      result.current.handleChange("activityName", "Activity");
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(result.current.formData.phaseName).toBe("");

    expect(result.current.formData.activityName).toBe("");

    expect(result.current.formData.progress).toBe(0);
  });

  it("calls resetForm manually", () => {
    const { result } = renderHook(() => useAddTask());

    act(() => {
      result.current.handleChange("phaseName", "Phase A");
      result.current.handleChange("activityName", "Testing");
    });

    act(() => {
      result.current.resetForm();
    });

    expect(result.current.formData.phaseName).toBe("");

    expect(result.current.formData.activityName).toBe("");

    expect(result.current.formData.progress).toBe(0);
  });
  it("shows API failure message", async () => {
    createActivity.mockResolvedValue({
      statusType: "E",
      statusDesc: "Failed",
    });

    const { result } = renderHook(() => useAddTask());

    act(() => {
      result.current.handleChange("phaseName", "Phase A");
      result.current.handleChange("milestoneName", "Milestone A");
      result.current.handleChange("taskName", "Task A");
      result.current.handleChange("subTaskName", "Sub Task A");
      result.current.handleChange("activityName", "Activity A");
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(toast.error).toHaveBeenCalledWith("Failed");
  });

  it("handles backend exception", async () => {
    createActivity.mockRejectedValue({
      response: {
        data: {
          statusDesc: "Activity already exists",
        },
      },
    });

    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    const { result } = renderHook(() => useAddTask());

    act(() => {
      result.current.handleChange("phaseName", "Phase A");
      result.current.handleChange("milestoneName", "Milestone A");
      result.current.handleChange("taskName", "Task A");
      result.current.handleChange("subTaskName", "Sub Task A");
      result.current.handleChange("activityName", "Activity");
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(spy).toHaveBeenCalled();

    expect(toast.error).toHaveBeenCalledWith("Activity already exists");

    spy.mockRestore();
  });

  it("uses default schedule health", async () => {
    createActivity.mockResolvedValue({
      statusType: "S",
      statusDesc: "Created",
    });

    const { result } = renderHook(() => useAddTask());

    act(() => {
      result.current.handleChange("phaseName", "Phase A");
      result.current.handleChange("milestoneName", "Milestone A");
      result.current.handleChange("taskName", "Task A");
      result.current.handleChange("subTaskName", "Sub Task A");
      result.current.handleChange("activityName", "Activity");
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(createActivity).toHaveBeenCalledWith(
      expect.objectContaining({
        scheduleHealth: "GREEN",
      }),
    );
  });

  it("uses custom schedule health", async () => {
    createActivity.mockResolvedValue({
      statusType: "S",
      statusDesc: "Created",
    });

    const { result } = renderHook(() => useAddTask());

    act(() => {
      result.current.handleChange("phaseName", "Phase A");
      result.current.handleChange("milestoneName", "Milestone A");
      result.current.handleChange("taskName", "Task A");
      result.current.handleChange("subTaskName", "Sub Task A");
      result.current.handleChange("activityName", "Activity");
      result.current.handleChange("scheduleHealth", "RED");
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(createActivity).toHaveBeenCalledWith(
      expect.objectContaining({
        scheduleHealth: "RED",
      }),
    );
  });

  it("converts estimated weeks to number", async () => {
    createActivity.mockResolvedValue({
      statusType: "S",
      statusDesc: "Created",
    });

    const { result } = renderHook(() => useAddTask());

    act(() => {
      result.current.handleChange("phaseName", "Phase A");
      result.current.handleChange("milestoneName", "Milestone A");
      result.current.handleChange("taskName", "Task A");
      result.current.handleChange("subTaskName", "Sub Task A");
      result.current.handleChange("activityName", "Activity");
      result.current.handleChange("estimatedPeriodWeek", "12");
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(createActivity).toHaveBeenCalledWith(
      expect.objectContaining({
        estimatedPeriodWeek: 12,
      }),
    );
  });

  it("converts progress to number", async () => {
    createActivity.mockResolvedValue({
      statusType: "S",
      statusDesc: "Created",
    });

    const { result } = renderHook(() => useAddTask());

    act(() => {
      result.current.handleChange("phaseName", "Phase A");
      result.current.handleChange("milestoneName", "Milestone A");
      result.current.handleChange("taskName", "Task A");
      result.current.handleChange("subTaskName", "Sub Task A");
      result.current.handleChange("activityName", "Activity");
      result.current.handleChange("progress", "75");
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(createActivity).toHaveBeenCalledWith(
      expect.objectContaining({
        progress: 75,
      }),
    );
  });

  it("returns empty phases when no project exists", () => {
    sessionStorage.setItem("selectedProjectId", "999");

    const { result } = renderHook(() => useAddTask());

    expect(result.current.selectedProject).toBeNull();

    expect(result.current.phases).toEqual([]);

    expect(result.current.milestones).toEqual([]);

    expect(result.current.taskOptions).toEqual([]);

    expect(result.current.subTasks).toEqual([]);
  });

  it("stores owner value", () => {
    const { result } = renderHook(() => useAddTask());

    act(() => {
      result.current.handleChange("owner", "Sachin");
    });

    expect(result.current.formData.owner).toBe("Sachin");
  });

  it("stores execution status", () => {
    const { result } = renderHook(() => useAddTask());

    act(() => {
      result.current.handleChange("executionStatus", "Completed");
    });

    expect(result.current.formData.executionStatus).toBe("Completed");
  });

  it("stores planned dates", () => {
    const { result } = renderHook(() => useAddTask());

    act(() => {
      result.current.handleChange("plannedStartDate", "2026-06-01");

      result.current.handleChange("plannedEndDate", "2026-06-10");
    });

    expect(result.current.formData.plannedStartDate).toBe("2026-06-01");

    expect(result.current.formData.plannedEndDate).toBe("2026-06-10");
  });
});
