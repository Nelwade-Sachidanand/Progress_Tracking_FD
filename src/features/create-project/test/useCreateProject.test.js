import { act, renderHook, waitFor } from "@testing-library/react";
import { vi } from "vitest";

import { toast } from "react-toastify";
import useCreateProject from "../hooks/useCreateProject";
import { createProject } from "../services/createProjectService";

vi.mock("../services/createProjectService", () => ({
  createProject: vi.fn(),
}));

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("useCreateProject", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("creates project successfully", async () => {
    const response = {
      statusType: "S",
      statusDesc: "Project created successfully",
    };

    createProject.mockResolvedValue(response);

    const { result } = renderHook(() => useCreateProject());

    let returned;

    await act(async () => {
      returned = await result.current.saveProject({
        projectName: "Test",
      });
    });

    expect(createProject).toHaveBeenCalledWith({
      projectName: "Test",
    });

    expect(toast.success).toHaveBeenCalledWith("Project created successfully");

    expect(returned).toEqual(response);

    expect(result.current.loading).toBe(false);
  });

  test("shows error toast when statusType is not S", async () => {
    const response = {
      statusType: "E",
      statusDesc: "Project creation failed",
    };

    createProject.mockResolvedValue(response);

    const { result } = renderHook(() => useCreateProject());

    let returned;

    await act(async () => {
      returned = await result.current.saveProject({});
    });

    expect(toast.error).toHaveBeenCalledWith("Project creation failed");

    expect(returned).toBeNull();
  });

  test("throws backend error and shows backend message", async () => {
    const error = {
      response: {
        data: {
          statusDesc: "Backend validation failed",
        },
      },
    };

    createProject.mockRejectedValue(error);

    const { result } = renderHook(() => useCreateProject());

    await expect(result.current.saveProject({})).rejects.toEqual(error);

    expect(toast.error).toHaveBeenCalledWith("Backend validation failed");
  });

  test("shows fallback error message", async () => {
    const error = new Error("Network Error");

    createProject.mockRejectedValue(error);

    const { result } = renderHook(() => useCreateProject());

    await expect(result.current.saveProject({})).rejects.toThrow();

    expect(toast.error).toHaveBeenCalledWith("Failed to create project");
  });

  test("loading becomes false after success", async () => {
    createProject.mockResolvedValue({
      statusType: "S",
      statusDesc: "Success",
    });

    const { result } = renderHook(() => useCreateProject());

    await act(async () => {
      await result.current.saveProject({});
    });

    expect(result.current.loading).toBe(false);
  });

  test("loading becomes false after failure", async () => {
    createProject.mockRejectedValue(new Error("Failure"));

    const { result } = renderHook(() => useCreateProject());

    try {
      await act(async () => {
        await result.current.saveProject({});
      });
    } catch {
      // expected
    }

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });
});
