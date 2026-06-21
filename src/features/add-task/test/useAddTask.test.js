import { act, renderHook } from "@testing-library/react";
import { toast } from "react-toastify";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createActivity } from "../api/addTaskApi";
import useAddTask from "../hooks/useAddTask";

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

  it("should initialize default form data", () => {
    const { result } = renderHook(() => useAddTask());

    expect(result.current.formData.phaseName).toBe("");
    expect(result.current.formData.progress).toBe(0);
  });

  it("should load selected project", () => {
    const { result } = renderHook(() => useAddTask());

    expect(result.current.selectedProject).toEqual(mockProject);
  });

  it("should return phases", () => {
    const { result } = renderHook(() => useAddTask());

    expect(result.current.phases).toEqual(["Phase A"]);
  });

  it("should update phase name", () => {
    const { result } = renderHook(() => useAddTask());

    act(() => {
      result.current.handleChange("phaseName", "Phase A");
    });

    expect(result.current.formData.phaseName).toBe("Phase A");
  });

  it("should reset dependent fields when phase changes", () => {
    const { result } = renderHook(() => useAddTask());

    act(() => {
      result.current.handleChange("phaseName", "Phase A");
    });

    expect(result.current.formData.milestoneName).toBe("");
    expect(result.current.formData.taskName).toBe("");
    expect(result.current.formData.subTaskName).toBe("");
  });

  it("should validate missing phase", async () => {
    const { result } = renderHook(() => useAddTask());

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(toast.error).toHaveBeenCalledWith("Please select Phase");
  });

  it("should validate missing milestone", async () => {
    const { result } = renderHook(() => useAddTask());

    act(() => {
      result.current.handleChange("phaseName", "Phase A");
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(toast.error).toHaveBeenCalledWith("Please select Milestone");
  });

  it("should validate missing task", async () => {
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

  it("should validate missing sub task", async () => {
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

  it("should validate missing activity", async () => {
    const { result } = renderHook(() => useAddTask());

    act(() => {
      result.current.handleChange("phaseName", "Phase A");

      result.current.handleChange("milestoneName", "Milestone A");

      result.current.handleChange("taskName", "Task A");

      result.current.handleChange("subTaskName", "SubTask A");
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(toast.error).toHaveBeenCalledWith("Please enter Activity");
  });

  it("should create activity successfully", async () => {
    createActivity.mockResolvedValue({
      statusType: "S",
      statusDesc: "Activity Created",
    });

    const { result } = renderHook(() => useAddTask());

    act(() => {
      result.current.handleChange("phaseName", "Phase A");

      result.current.handleChange("milestoneName", "Milestone A");

      result.current.handleChange("taskName", "Task A");

      result.current.handleChange("subTaskName", "SubTask A");

      result.current.handleChange("activityName", "New Activity");
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(createActivity).toHaveBeenCalledTimes(1);

    expect(toast.success).toHaveBeenCalledWith("Activity Created");
  });

  it("should show API failure message", async () => {
    createActivity.mockResolvedValue({
      statusType: "E",
      statusDesc: "Failed",
    });

    const { result } = renderHook(() => useAddTask());

    act(() => {
      result.current.handleChange("phaseName", "Phase A");

      result.current.handleChange("milestoneName", "Milestone A");

      result.current.handleChange("taskName", "Task A");

      result.current.handleChange("subTaskName", "SubTask A");

      result.current.handleChange("activityName", "Activity A");
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(toast.error).toHaveBeenCalledWith("Failed");
  });

  it("should handle backend error", async () => {
    createActivity.mockRejectedValue({
      response: {
        data: {
          statusDesc: "Activity already exists",
        },
      },
    });

    const { result } = renderHook(() => useAddTask());

    act(() => {
      result.current.handleChange("phaseName", "Phase A");

      result.current.handleChange("milestoneName", "Milestone A");

      result.current.handleChange("taskName", "Task A");

      result.current.handleChange("subTaskName", "SubTask A");

      result.current.handleChange("activityName", "Activity A");
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(toast.error).toHaveBeenCalledWith("Activity already exists");
  });

  it("should reset form", () => {
    const { result } = renderHook(() => useAddTask());

    act(() => {
      result.current.handleChange("phaseName", "Phase A");

      result.current.handleChange("activityName", "Test Activity");
    });

    act(() => {
      result.current.resetForm();
    });

    expect(result.current.formData.phaseName).toBe("");

    expect(result.current.formData.activityName).toBe("");
  });
});
