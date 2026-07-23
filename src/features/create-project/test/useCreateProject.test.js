import { act, renderHook, waitFor } from "@testing-library/react";
import { vi } from "vitest";

import { toast } from "react-toastify";
import useCreateProject from "../hooks/useCreateProject";
//import { createProject } from "../services/createProjectService";

import {
  createProject,
  updateProjectInformation,
} from "../services/createProjectService";

vi.mock("../services/createProjectService", () => ({
  createProject: vi.fn(),
  updateProjectInformation: vi.fn(),
}));

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("useCreateProject", () => {
  const payload = {
    projectName: "Test Project",
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("creates project successfully", async () => {
    const response = {
      statusType: "S",
      statusDesc: "Project Created Successfully",
    };

    createProject.mockResolvedValue(response);

    const { result } = renderHook(() => useCreateProject());

    let returned;

    await act(async () => {
      returned = await result.current.saveProject(payload);
    });

    expect(createProject).toHaveBeenCalledWith(payload);
    expect(returned).toEqual(response);
    expect(toast.success).toHaveBeenCalledWith(response.statusDesc);

    // loading should still be true before timer
    expect(result.current.loading).toBe(true);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(result.current.loading).toBe(false);
  });

  it("returns null when API returns failure", async () => {
    const response = {
      statusType: "F",
      statusDesc: "Project Already Exists",
    };

    createProject.mockResolvedValue(response);

    const { result } = renderHook(() => useCreateProject());

    let returned;

    await act(async () => {
      returned = await result.current.saveProject(payload);
    });

    expect(returned).toBeNull();
    expect(toast.error).toHaveBeenCalledWith(response.statusDesc);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(result.current.loading).toBe(false);
  });

  it("throws error when createProject fails", async () => {
    const error = {
      response: {
        data: {
          statusDesc: "Failed to create project",
        },
      },
    };

    createProject.mockRejectedValue(error);

    const { result } = renderHook(() => useCreateProject());

    await expect(
      act(async () => {
        await result.current.saveProject(payload);
      })
    ).rejects.toEqual(error);

    expect(toast.error).toHaveBeenCalledWith("Failed to create project");

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(result.current.loading).toBe(false);
  });

  it("updates project successfully", async () => {
    const response = {
      statusType: "S",
      statusDesc: "Project Updated Successfully",
    };

    updateProjectInformation.mockResolvedValue(response);

    const { result } = renderHook(() => useCreateProject());

    let returned;

    await act(async () => {
      returned = await result.current.updateProject("1", payload);
    });

    expect(updateProjectInformation).toHaveBeenCalledWith("1", payload);
    expect(returned).toEqual(response);
    expect(toast.success).toHaveBeenCalledWith(response.statusDesc);

    expect(result.current.loading).toBe(true);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(result.current.loading).toBe(false);
  });

  it("throws error when update fails", async () => {
    const error = {
      response: {
        data: {
          statusDesc: "Failed to update project",
        },
      },
    };

    updateProjectInformation.mockRejectedValue(error);

    const { result } = renderHook(() => useCreateProject());

    await expect(
      act(async () => {
        await result.current.updateProject("1", payload);
      })
    ).rejects.toEqual(error);

    expect(toast.error).toHaveBeenCalledWith("Failed to update project");

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(result.current.loading).toBe(false);
  });

  it("loading becomes false after success", async () => {
    createProject.mockResolvedValue({
      statusType: "S",
      statusDesc: "Success",
    });

    const { result } = renderHook(() => useCreateProject());

    await act(async () => {
      await result.current.saveProject(payload);
    });

    expect(result.current.loading).toBe(true);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(result.current.loading).toBe(false);
  });
});