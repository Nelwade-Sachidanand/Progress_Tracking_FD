import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { toast } from "react-toastify";

import { updateActivity } from "../api/editTaskApi";
import useEditTask from "../hooks/useEditTask";

const mockFetchProjects = vi.fn();

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
                    subTaskName: "SubTask A",
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

  it("initializes form data from task", () => {
    const { result } = renderHook(() => useEditTask());

    expect(result.current.formData.activityName).toBe("Activity A");

    expect(result.current.formData.owner).toBe("Sachin");

    expect(result.current.formData.progress).toBe(50);
  });

  it("loads selected project", () => {
    const { result } = renderHook(() => useEditTask());

    expect(result.current.selectedProject).toEqual(mockProjects[0]);
  });

  it("returns phases", () => {
    const { result } = renderHook(() => useEditTask());

    expect(result.current.phases).toEqual(["Phase A"]);
  });

  it("returns milestones", () => {
    const { result } = renderHook(() => useEditTask());

    expect(result.current.milestones).toEqual(["Milestone A"]);
  });

  it("returns task options", () => {
    const { result } = renderHook(() => useEditTask());

    expect(result.current.taskOptions).toEqual(["Task A"]);
  });

  it("returns sub tasks", () => {
    const { result } = renderHook(() => useEditTask());

    expect(result.current.subTasks).toEqual(["SubTask A"]);
  });

  it("updates phase and resets dependent fields", () => {
    const { result } = renderHook(() => useEditTask());

    act(() => {
      result.current.handleChange("phaseName", "New Phase");
    });

    expect(result.current.formData.phaseName).toBe("New Phase");

    expect(result.current.formData.milestoneName).toBe("");

    expect(result.current.formData.taskName).toBe("");

    expect(result.current.formData.subTaskName).toBe("");
  });

  it("updates milestone and resets task/subtask", () => {
    const { result } = renderHook(() => useEditTask());

    act(() => {
      result.current.handleChange("milestoneName", "New Milestone");
    });

    expect(result.current.formData.taskName).toBe("");

    expect(result.current.formData.subTaskName).toBe("");
  });

  it("updates task and resets sub task", () => {
    const { result } = renderHook(() => useEditTask());

    act(() => {
      result.current.handleChange("taskName", "New Task");
    });

    expect(result.current.formData.subTaskName).toBe("");
  });

  it("updates owner", () => {
    const { result } = renderHook(() => useEditTask());

    act(() => {
      result.current.handleChange("owner", "Rahul");
    });

    expect(result.current.formData.owner).toBe("Rahul");
  });

  it("updates execution status", () => {
    const { result } = renderHook(() => useEditTask());

    act(() => {
      result.current.handleChange("executionStatus", "Completed");
    });

    expect(result.current.formData.executionStatus).toBe("Completed");
  });

  it("updates change reason", () => {
    const { result } = renderHook(() => useEditTask());

    act(() => {
      result.current.handleChange("changeReason", "Requirement changed");
    });

    expect(result.current.formData.changeReason).toBe("Requirement changed");
  });
  it("updates activity successfully", async () => {
    updateActivity.mockResolvedValue({
      statusType: "S",
      statusDesc: "Updated Successfully",
    });

    const { result } = renderHook(() => useEditTask());

    act(() => {
      result.current.handleChange("owner", "Rahul");
    });

    await act(async () => {
      await result.current.handleUpdate();
    });

    expect(updateActivity).toHaveBeenCalledTimes(1);

    expect(updateActivity).toHaveBeenCalledWith(
      expect.objectContaining({
        projectId: "1",
        projectName: "Test Project",
        phaseName: "Phase A",
        milestoneName: "Milestone A",
        taskName: "Task A",
        subTaskName: "SubTask A",
        activityName: "Activity A",
        owner: "Rahul",
        estimatedPeriodWeek: 2,
        progress: 50,
        executionStatus: "In Progress",
        scheduleHealth: "GREEN",
      }),
    );

    expect(toast.success).toHaveBeenCalledWith("Updated Successfully");

    expect(mockFetchProjects).toHaveBeenCalledWith("100");
  });

  it("shows error for failed response", async () => {
    updateActivity.mockResolvedValue({
      statusType: "E",
      statusDesc: "Update Failed",
    });

    const { result } = renderHook(() => useEditTask());

    await act(async () => {
      await result.current.handleUpdate();
    });

    expect(updateActivity).toHaveBeenCalledTimes(1);

    expect(toast.error).toHaveBeenCalledWith("Update Failed");
  });

  it("handles backend exception", async () => {
    updateActivity.mockRejectedValue({
      response: {
        data: {
          statusDesc: "Activity already exists",
        },
      },
    });

    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    const { result } = renderHook(() => useEditTask());

    await act(async () => {
      await result.current.handleUpdate();
    });

    expect(spy).toHaveBeenCalled();

    expect(toast.error).toHaveBeenCalledWith("Activity already exists");

    spy.mockRestore();
  });

  it("shows default error message", async () => {
    updateActivity.mockRejectedValue(new Error("Network Error"));

    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    const { result } = renderHook(() => useEditTask());

    await act(async () => {
      await result.current.handleUpdate();
    });

    expect(toast.error).toHaveBeenCalledWith("Failed to update activity");

    spy.mockRestore();
  });

  it("converts estimated weeks to number", async () => {
    updateActivity.mockResolvedValue({
      statusType: "S",
      statusDesc: "Updated",
    });

    const { result } = renderHook(() => useEditTask());

    act(() => {
      result.current.handleChange("estimatedPeriodWeek", "10");
    });

    await act(async () => {
      await result.current.handleUpdate();
    });

    expect(updateActivity).toHaveBeenCalledWith(
      expect.objectContaining({
        estimatedPeriodWeek: 10,
      }),
    );
  });

  it("converts progress to number", async () => {
    updateActivity.mockResolvedValue({
      statusType: "S",
      statusDesc: "Updated",
    });

    const { result } = renderHook(() => useEditTask());

    act(() => {
      result.current.handleChange("progress", "90");
    });

    await act(async () => {
      await result.current.handleUpdate();
    });

    expect(updateActivity).toHaveBeenCalledWith(
      expect.objectContaining({
        progress: 90,
      }),
    );
  });

  it("keeps custom schedule health", async () => {
    updateActivity.mockResolvedValue({
      statusType: "S",
      statusDesc: "Updated",
    });

    const { result } = renderHook(() => useEditTask());

    act(() => {
      result.current.handleChange("scheduleHealth", "RED");
    });

    await act(async () => {
      await result.current.handleUpdate();
    });

    expect(updateActivity).toHaveBeenCalledWith(
      expect.objectContaining({
        scheduleHealth: "RED",
      }),
    );
  });

  it("updates planned start date", () => {
    const { result } = renderHook(() => useEditTask());

    act(() => {
      result.current.handleChange("plannedStartDate", "2026-02-01");
    });

    expect(result.current.formData.plannedStartDate).toBe("2026-02-01");
  });

  it("updates planned end date", () => {
    const { result } = renderHook(() => useEditTask());

    act(() => {
      result.current.handleChange("plannedEndDate", "2026-02-15");
    });

    expect(result.current.formData.plannedEndDate).toBe("2026-02-15");
  });
  it("shows validation error when planned start date changes without reason", async () => {
    const { result } = renderHook(() => useEditTask());

    act(() => {
      result.current.handleChange("plannedStartDate", "2026-02-01");
    });

    await act(async () => {
      await result.current.handleUpdate();
    });

    expect(updateActivity).not.toHaveBeenCalled();

    expect(toast.error).toHaveBeenCalledWith(
      "Please enter reason for changing planned dates",
    );
  });

  it("updates successfully when date changes with reason", async () => {
    updateActivity.mockResolvedValue({
      statusType: "S",
      statusDesc: "Updated Successfully",
    });

    const { result } = renderHook(() => useEditTask());

    act(() => {
      result.current.handleChange("plannedStartDate", "2026-02-01");

      result.current.handleChange("changeReason", "Customer requested change");
    });

    await act(async () => {
      await result.current.handleUpdate();
    });

    expect(updateActivity).toHaveBeenCalledWith(
      expect.objectContaining({
        plannedStartDate: "2026-02-01",
        changeReason: "Customer requested change",
      }),
    );

    expect(toast.success).toHaveBeenCalled();
  });

  it("returns empty arrays when selected project is not found", () => {
    sessionStorage.setItem("selectedProjectId", "999");

    const { result } = renderHook(() => useEditTask());

    expect(result.current.selectedProject).toBeNull();

    expect(result.current.phases).toEqual([]);

    expect(result.current.milestones).toEqual([]);

    expect(result.current.taskOptions).toEqual([]);

    expect(result.current.subTasks).toEqual([]);
  });

  it("updates actual start date", () => {
    const { result } = renderHook(() => useEditTask());

    act(() => {
      result.current.handleChange("actualStartDate", "2026-02-05");
    });

    expect(result.current.formData.actualStartDate).toBe("2026-02-05");
  });

  it("updates actual end date", () => {
    const { result } = renderHook(() => useEditTask());

    act(() => {
      result.current.handleChange("actualEndDate", "2026-02-20");
    });

    expect(result.current.formData.actualEndDate).toBe("2026-02-20");
  });

  it("stores owner correctly", () => {
    const { result } = renderHook(() => useEditTask());

    act(() => {
      result.current.handleChange("owner", "Rahul");
    });

    expect(result.current.formData.owner).toBe("Rahul");
  });

  it("stores activity name", () => {
    const { result } = renderHook(() => useEditTask());

    act(() => {
      result.current.handleChange("activityName", "New Activity");
    });

    expect(result.current.formData.activityName).toBe("New Activity");
  });

  it("stores milestone name", () => {
    const { result } = renderHook(() => useEditTask());

    act(() => {
      result.current.handleChange("milestoneName", "Milestone X");
    });

    expect(result.current.formData.milestoneName).toBe("Milestone X");
  });

  it("stores task name", () => {
    const { result } = renderHook(() => useEditTask());

    act(() => {
      result.current.handleChange("taskName", "Task X");
    });

    expect(result.current.formData.taskName).toBe("Task X");
  });

  it("stores sub task name", () => {
    const { result } = renderHook(() => useEditTask());

    act(() => {
      result.current.handleChange("subTaskName", "Sub Task X");
    });

    expect(result.current.formData.subTaskName).toBe("Sub Task X");
  });

  it("stores phase name", () => {
    const { result } = renderHook(() => useEditTask());

    act(() => {
      result.current.handleChange("phaseName", "Phase X");
    });

    expect(result.current.formData.phaseName).toBe("Phase X");
  });
});
