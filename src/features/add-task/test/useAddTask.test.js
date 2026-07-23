import { renderHook, act } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import useAddTask from "../hooks/useAddTask";
import { createActivity } from "../api/addTaskApi";
import { toast } from "react-toastify";

const mockNavigate = vi.fn();
const mockFetchProjects = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
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

describe("useAddTask", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    sessionStorage.setItem("selectedProjectId", "1");
    sessionStorage.setItem("user", JSON.stringify({ id: 10 }));
  });

  it("returns initial values", () => {
    const { result } = renderHook(() => useAddTask());

    expect(result.current.selectedProject.id).toBe("1");
    expect(result.current.formData.progress).toBe(0);
    expect(result.current.isSubmitting).toBe(false);
  });

  it("updates owner", () => {
    const { result } = renderHook(() => useAddTask());

    act(() => {
      result.current.handleChange("owner", "Sachin");
    });

    expect(result.current.formData.owner).toBe("Sachin");
  });

  it("updates activity name", () => {
    const { result } = renderHook(() => useAddTask());

    act(() => {
      result.current.handleChange("activityName", "Login");
    });

    expect(result.current.formData.activityName).toBe("Login");
  });

  it("resets form", () => {
    const { result } = renderHook(() => useAddTask());

    act(() => {
      result.current.handleChange("owner", "Sachin");
    });

    act(() => {
      result.current.resetForm();
    });

    expect(result.current.formData.owner).toBe("");
    expect(result.current.formData.progress).toBe(0);
  });

  it("shows validation when phase is missing", async () => {
    const { result } = renderHook(() => useAddTask());

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(toast.error).toHaveBeenCalledWith(
      "Please select Phase"
    );
  });

  it("creates activity successfully", async () => {
    createActivity.mockResolvedValue({
      statusType: "S",
      statusDesc: "Success",
    });

    const { result } = renderHook(() => useAddTask());

    act(() => {
      result.current.handleChange("phaseName", "Phase");
      result.current.handleChange("milestoneName", "Milestone");
      result.current.handleChange("taskName", "Task");
      result.current.handleChange("subTaskName", "SubTask");
      result.current.handleChange("activityName", "Activity");
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(createActivity).toHaveBeenCalled();
    expect(mockFetchProjects).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/tasks", {
      replace: true,
    });
  });
});