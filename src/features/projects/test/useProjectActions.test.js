import { renderHook, act, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import useProjectActions from "../hooks/useProjectActions";
import { deleteProject as deleteProjectService } from "../services/projectService";
import { toast } from "react-toastify";

const mockFetchProjects = vi.fn();

vi.mock("../services/projectService", () => ({
  deleteProject: vi.fn(),
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
  }),
}));

describe("useProjectActions", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    sessionStorage.setItem(
      "user",
      JSON.stringify({
        id: "101",
      })
    );
  });

  it("deletes project successfully", async () => {
    deleteProjectService.mockResolvedValue({
      statusType: "S",
      statusDesc: "Project deleted successfully",
    });

    const { result } = renderHook(() => useProjectActions());

    let response;

    await act(async () => {
      response = await result.current.deleteProject("1");
    });

    expect(deleteProjectService).toHaveBeenCalledWith("1");

    expect(toast.success).toHaveBeenCalledWith(
      "Project deleted successfully"
    );

    expect(mockFetchProjects).toHaveBeenCalledWith("101");

    expect(response).toEqual({
      statusType: "S",
      statusDesc: "Project deleted successfully",
    });
  });

  it("shows error toast when service returns failure", async () => {
    deleteProjectService.mockResolvedValue({
      statusType: "E",
      statusDesc: "Delete failed",
    });

    const { result } = renderHook(() => useProjectActions());

    const response = await act(async () => {
      return await result.current.deleteProject("1");
    });

    expect(toast.error).toHaveBeenCalledWith("Delete failed");

    expect(mockFetchProjects).not.toHaveBeenCalled();

    expect(response).toBeNull();
  });

  it("shows default error message when failure response has no description", async () => {
    deleteProjectService.mockResolvedValue({
      statusType: "E",
    });

    const { result } = renderHook(() => useProjectActions());

    await act(async () => {
      await result.current.deleteProject("1");
    });

    expect(toast.error).toHaveBeenCalledWith(
      "Failed to delete project"
    );
  });

  it("throws error when API throws exception", async () => {
    const error = {
      response: {
        data: {
          statusDesc: "Internal Server Error",
        },
      },
    };

    deleteProjectService.mockRejectedValue(error);

    const { result } = renderHook(() => useProjectActions());

    await expect(
      result.current.deleteProject("1")
    ).rejects.toEqual(error);

    expect(toast.error).toHaveBeenCalledWith(
      "Internal Server Error"
    );
  });

  it("shows default message when exception has no response", async () => {
    deleteProjectService.mockRejectedValue(new Error("Network Error"));

    const { result } = renderHook(() => useProjectActions());

    await expect(
      result.current.deleteProject("1")
    ).rejects.toThrow();

    expect(toast.error).toHaveBeenCalledWith(
      "Failed to delete project"
    );
  });

  it("calls deleteProjectService once", async () => {
    deleteProjectService.mockResolvedValue({
      statusType: "S",
      statusDesc: "Deleted",
    });

    const { result } = renderHook(() => useProjectActions());

    await act(async () => {
      await result.current.deleteProject("55");
    });

    expect(deleteProjectService).toHaveBeenCalledTimes(1);
    expect(deleteProjectService).toHaveBeenCalledWith("55");
  });

  it("calls fetchProjects only on success", async () => {
    deleteProjectService.mockResolvedValue({
      statusType: "S",
      statusDesc: "Deleted",
    });

    const { result } = renderHook(() => useProjectActions());

    await act(async () => {
      await result.current.deleteProject("1");
    });

    expect(mockFetchProjects).toHaveBeenCalledTimes(1);
  });
});