import { beforeEach, describe, expect, it, vi } from "vitest";

import { act, renderHook } from "@testing-library/react";

import { toast } from "react-toastify";

import { updateActivity } from "../api/editTaskApi";

import useEditTask from "../hooks/useEditTask";

const mockTask = {
  phaseName: "Phase A",
  milestoneName: "Milestone A",
  taskName: "Task A",
  subTaskName: "SubTask A",
  activityName: "Activity A",
  owner: "Sachin",
  estimatedPeriodWeek: 2,
  plannedStartDate: "2026-01-01",
  plannedEndDate: "2026-01-15",
  actualStartDate: "2026-01-02",
  actualEndDate: "2026-01-16",
  progress: 50,
  executionStatus: "In Progress",
  scheduleHealth: "GREEN",
};

vi.mock("../api/editTaskApi", () => ({
  updateActivity: vi.fn(),
}));

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("react-router-dom", () => ({
  useLocation: () => ({
    state: {
      task: mockTask,
    },
  }),
}));

describe("useEditTask", () => {
  const mockProject = {
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
                    subTaskName: "SubTask A",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();

    localStorage.clear();

    localStorage.setItem("projects", JSON.stringify([mockProject]));

    localStorage.setItem("selectedProjectId", "1");
  });

  it("should initialize form data from task", () => {
    const { result } = renderHook(() => useEditTask());

    expect(result.current.formData.activityName).toBe("Activity A");

    expect(result.current.formData.owner).toBe("Sachin");

    expect(result.current.formData.progress).toBe(50);
  });

  it("should load selected project", () => {
    const { result } = renderHook(() => useEditTask());

    expect(result.current.selectedProject.projectName).toBe("Test Project");
  });

  it("should return phases", () => {
    const { result } = renderHook(() => useEditTask());

    expect(result.current.phases).toEqual(["Phase A"]);
  });

  it("should return milestones", () => {
    const { result } = renderHook(() => useEditTask());

    expect(result.current.milestones).toEqual(["Milestone A"]);
  });

  it("should return tasks", () => {
    const { result } = renderHook(() => useEditTask());

    expect(result.current.taskOptions).toEqual(["Task A"]);
  });

  it("should return subtasks", () => {
    const { result } = renderHook(() => useEditTask());

    expect(result.current.subTasks).toEqual(["SubTask A"]);
  });

  it("should update phase and reset dependent fields", () => {
    const { result } = renderHook(() => useEditTask());

    act(() => {
      result.current.handleChange("phaseName", "New Phase");
    });

    expect(result.current.formData.phaseName).toBe("New Phase");

    expect(result.current.formData.milestoneName).toBe("");

    expect(result.current.formData.taskName).toBe("");

    expect(result.current.formData.subTaskName).toBe("");
  });

  it("should update milestone and reset task/subtask", () => {
    const { result } = renderHook(() => useEditTask());

    act(() => {
      result.current.handleChange("milestoneName", "New Milestone");
    });

    expect(result.current.formData.taskName).toBe("");

    expect(result.current.formData.subTaskName).toBe("");
  });

  it("should update task and reset subtask", () => {
    const { result } = renderHook(() => useEditTask());

    act(() => {
      result.current.handleChange("taskName", "New Task");
    });

    expect(result.current.formData.subTaskName).toBe("");
  });

  it("should reset form", () => {
    const { result } = renderHook(() => useEditTask());

    act(() => {
      result.current.handleChange("activityName", "Changed Activity");
    });

    act(() => {
      result.current.resetForm();
    });

    expect(result.current.formData.activityName).toBe("Activity A");
  });

  it("should update activity successfully", async () => {
    updateActivity.mockResolvedValue({
      statusType: "S",
      statusDesc: "Updated Successfully",
    });

    const { result } = renderHook(() => useEditTask());

    await act(async () => {
      await result.current.handleUpdate();
    });

    expect(updateActivity).toHaveBeenCalledTimes(1);

    expect(toast.success).toHaveBeenCalledWith("Updated Successfully");
  });

  it("should show error for failed response", async () => {
    updateActivity.mockResolvedValue({
      statusType: "E",
      statusDesc: "Update Failed",
    });

    const { result } = renderHook(() => useEditTask());

    await act(async () => {
      await result.current.handleUpdate();
    });

    expect(toast.error).toHaveBeenCalledWith("Update Failed");
  });

  it("should handle backend exception", async () => {
    updateActivity.mockRejectedValue({
      response: {
        data: {
          statusDesc: "Activity already exists",
        },
      },
    });

    const { result } = renderHook(() => useEditTask());

    await act(async () => {
      await result.current.handleUpdate();
    });

    expect(toast.error).toHaveBeenCalledWith("Activity already exists");
  });

  it("should show default error message", async () => {
    updateActivity.mockRejectedValue(new Error("Network Error"));

    const { result } = renderHook(() => useEditTask());

    await act(async () => {
      await result.current.handleUpdate();
    });

    expect(toast.error).toHaveBeenCalledWith("Failed to update activity");
  });
});
