import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { toast } from "react-toastify";
import { useMilestone } from "../hooks/useMilestone";
import { updateMilestoneWeightages } from "../services/milestoneService";
import { useProjects } from "../../../context/ProjectContext";

vi.mock("../services/milestoneService", () => ({
  updateMilestoneWeightages: vi.fn(),
}));

vi.mock("../../../context/ProjectContext", () => ({
  useProjects: vi.fn(),
}));

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("useMilestone", () => {
  const fetchProjects = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();

    sessionStorage.setItem(
      "user",
      JSON.stringify({
        id: 101,
      })
    );

    useProjects.mockReturnValue({
      fetchProjects,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns loading initially false", () => {
    const { result } = renderHook(() => useMilestone());

    expect(result.current.loading).toBe(false);
  });

  it("updates weightages successfully", async () => {
    const payload = [
      {
        milestoneId: 1,
        weightage: 50,
      },
    ];

    const response = {
      statusType: "S",
      statusDesc: "Updated Successfully",
    };

    updateMilestoneWeightages.mockResolvedValue(response);

    const { result } = renderHook(() => useMilestone());

    let res;

    await act(async () => {
      res = await result.current.updateWeightages(payload);
    });

    expect(updateMilestoneWeightages).toHaveBeenCalledWith(payload);

    expect(fetchProjects).toHaveBeenCalledWith(101);

    expect(toast.success).toHaveBeenCalledWith(
      "Updated Successfully"
    );

    expect(res).toEqual(response);

    act(() => {
      vi.runAllTimers();
    });

    expect(result.current.loading).toBe(false);
  });

  it("shows error toast for failed response", async () => {
    updateMilestoneWeightages.mockResolvedValue({
      statusType: "E",
      statusDesc: "Validation Failed",
    });

    const { result } = renderHook(() => useMilestone());

    let response;

    await act(async () => {
      response = await result.current.updateWeightages([]);
    });

    expect(response).toBeNull();

    expect(fetchProjects).not.toHaveBeenCalled();

    expect(toast.error).toHaveBeenCalledWith(
      "Validation Failed"
    );
  });

  it("throws error when api rejects", async () => {
    const error = {
      response: {
        data: {
          statusDesc: "Server Error",
        },
      },
    };

    updateMilestoneWeightages.mockRejectedValue(error);

    const { result } = renderHook(() => useMilestone());

    await expect(
      result.current.updateWeightages([])
    ).rejects.toEqual(error);

    expect(toast.error).toHaveBeenCalledWith(
      "Server Error"
    );
  });

  it("shows default error message when response missing", async () => {
    const error = new Error("Network");

    updateMilestoneWeightages.mockRejectedValue(error);

    const { result } = renderHook(() => useMilestone());

    await expect(
      result.current.updateWeightages([])
    ).rejects.toThrow();

    expect(toast.error).toHaveBeenCalledWith(
      "Failed to update milestone weightages"
    );
  });

  it("sets loading true while request is running", async () => {
    let resolvePromise;

    updateMilestoneWeightages.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolvePromise = resolve;
        })
    );

    const { result } = renderHook(() => useMilestone());

    act(() => {
      result.current.updateWeightages([]);
    });

    expect(result.current.loading).toBe(true);

    await act(async () => {
      resolvePromise({
        statusType: "S",
        statusDesc: "Success",
      });
    });

    act(() => {
      vi.runAllTimers();
    });

    expect(result.current.loading).toBe(false);
  });

  it("calls api once", async () => {
    updateMilestoneWeightages.mockResolvedValue({
      statusType: "S",
      statusDesc: "Success",
    });

    const { result } = renderHook(() => useMilestone());

    await act(async () => {
      await result.current.updateWeightages([]);
    });

    expect(updateMilestoneWeightages).toHaveBeenCalledTimes(1);
  });

  it("passes payload unchanged", async () => {
    const payload = [
      {
        id: 1,
        weightage: 60,
      },
    ];

    updateMilestoneWeightages.mockResolvedValue({
      statusType: "S",
      statusDesc: "Success",
    });

    const { result } = renderHook(() => useMilestone());

    await act(async () => {
      await result.current.updateWeightages(payload);
    });

    expect(updateMilestoneWeightages).toHaveBeenCalledWith(payload);
  });

  it("loading becomes false after success", async () => {
    updateMilestoneWeightages.mockResolvedValue({
      statusType: "S",
      statusDesc: "Success",
    });

    const { result } = renderHook(() => useMilestone());

    await act(async () => {
      await result.current.updateWeightages([]);
    });

    act(() => {
      vi.runAllTimers();
    });

    expect(result.current.loading).toBe(false);
  });

  it("loading becomes false after failure", async () => {
    updateMilestoneWeightages.mockRejectedValue(new Error("Failed"));

    const { result } = renderHook(() => useMilestone());

    await expect(
      result.current.updateWeightages([])
    ).rejects.toThrow();

    act(() => {
      vi.runAllTimers();
    });

    expect(result.current.loading).toBe(false);
  });
});