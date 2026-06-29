import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useMilestone } from "../hooks/useMilestone";

import { toast } from "react-toastify";
import { updateMilestoneWeightages } from "../services/milestoneService";

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("../services/milestoneService", () => ({
  updateMilestoneWeightages: vi.fn(),
}));

describe("useMilestone", () => {
  const payload = {
    projectId: "P1",
    milestones: [
      {
        phaseName: "Planning",
        milestoneName: "Requirement",
        weightage: 100,
      },
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns loading initially false", () => {
    const { result } = renderHook(() => useMilestone());

    expect(result.current.loading).toBe(false);
  });

  it("updates weightages successfully", async () => {
    updateMilestoneWeightages.mockResolvedValue({
      statusType: "S",
      statusDesc: "Updated Successfully",
    });

    const { result } = renderHook(() => useMilestone());

    let response;

    await act(async () => {
      response = await result.current.updateWeightages(payload);
    });

    expect(updateMilestoneWeightages).toHaveBeenCalledWith(payload);

    expect(response).toEqual({
      statusType: "S",
      statusDesc: "Updated Successfully",
    });

    expect(toast.success).toHaveBeenCalledWith("Updated Successfully");
  });

  it("shows error toast for failed response", async () => {
    updateMilestoneWeightages.mockResolvedValue({
      statusType: "F",
      statusDesc: "Update Failed",
    });

    const { result } = renderHook(() => useMilestone());

    let response;

    await act(async () => {
      response = await result.current.updateWeightages(payload);
    });

    expect(response).toBeNull();

    expect(toast.error).toHaveBeenCalledWith("Update Failed");
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

    await expect(result.current.updateWeightages(payload)).rejects.toEqual(
      error,
    );

    expect(toast.error).toHaveBeenCalledWith("Server Error");
  });

  it("shows default error message when response missing", async () => {
    updateMilestoneWeightages.mockRejectedValue(new Error());

    const { result } = renderHook(() => useMilestone());

    await expect(result.current.updateWeightages(payload)).rejects.toThrow();

    expect(toast.error).toHaveBeenCalledWith(
      "Failed to update milestone weightages",
    );
  });

  it("sets loading true while request is running", async () => {
    let resolvePromise;

    updateMilestoneWeightages.mockReturnValue(
      new Promise((resolve) => {
        resolvePromise = resolve;
      }),
    );

    const { result } = renderHook(() => useMilestone());

    act(() => {
      result.current.updateWeightages(payload);
    });

    expect(result.current.loading).toBe(true);

    await act(async () => {
      resolvePromise({
        statusType: "S",
        statusDesc: "Success",
      });
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });

  it("calls api once", async () => {
    updateMilestoneWeightages.mockResolvedValue({
      statusType: "S",
      statusDesc: "Success",
    });

    const { result } = renderHook(() => useMilestone());

    await act(async () => {
      await result.current.updateWeightages(payload);
    });

    expect(updateMilestoneWeightages).toHaveBeenCalledTimes(1);
  });

  it("passes payload unchanged", async () => {
    updateMilestoneWeightages.mockResolvedValue({
      statusType: "S",
      statusDesc: "Success",
    });

    const { result } = renderHook(() => useMilestone());

    await act(async () => {
      await result.current.updateWeightages(payload);
    });

    expect(updateMilestoneWeightages.mock.calls[0][0]).toEqual(payload);
  });

  it("loading becomes false after success", async () => {
    updateMilestoneWeightages.mockResolvedValue({
      statusType: "S",
      statusDesc: "Success",
    });

    const { result } = renderHook(() => useMilestone());

    await act(async () => {
      await result.current.updateWeightages(payload);
    });

    expect(result.current.loading).toBe(false);
  });

  it("loading becomes false after failure", async () => {
    updateMilestoneWeightages.mockResolvedValue({
      statusType: "F",
      statusDesc: "Failed",
    });

    const { result } = renderHook(() => useMilestone());

    await act(async () => {
      await result.current.updateWeightages(payload);
    });

    expect(result.current.loading).toBe(false);
  });
});
