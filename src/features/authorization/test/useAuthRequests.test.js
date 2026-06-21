import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { toast } from "react-toastify";

import { useAuthRequests } from "../hooks/useAuthRequests";

import {
  approveRequest,
  approveSelectedRequests,
  getAllAuthRequests,
  getAuthRequests,
  rejectRequest,
  rejectSelectedRequests,
} from "../services/authService";

vi.mock("../services/authService", () => ({
  getAuthRequests: vi.fn(),
  approveRequest: vi.fn(),
  rejectRequest: vi.fn(),
  getAllAuthRequests: vi.fn(),
  approveSelectedRequests: vi.fn(),
  rejectSelectedRequests: vi.fn(),
}));

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("useAuthRequests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("loads auth requests on mount", async () => {
    getAuthRequests.mockResolvedValue({
      statusType: "S",
      details: [{ id: 1 }],
    });

    getAllAuthRequests.mockResolvedValue({
      details: [{ id: 10 }],
    });

    const { result } = renderHook(() => useAuthRequests());

    await waitFor(() => {
      expect(result.current.auths).toEqual([{ id: 1 }]);
    });

    expect(result.current.allAuths).toEqual([{ id: 10 }]);
  });

  it("handles fetchAuthRequests success", async () => {
    getAuthRequests.mockResolvedValue({
      statusType: "S",
      details: [{ id: 100 }],
    });

    getAllAuthRequests.mockResolvedValue({
      details: [],
    });

    const { result } = renderHook(() => useAuthRequests());

    await act(async () => {
      await result.current.fetchAuthRequests();
    });

    expect(result.current.auths).toEqual([{ id: 100 }]);
  });

  it("handles fetchAuthRequests failure", async () => {
    getAuthRequests.mockRejectedValue({
      response: {
        data: {
          statusDesc: "Failed to load authorization requests",
        },
      },
    });

    getAllAuthRequests.mockResolvedValue({
      details: [],
    });

    renderHook(() => useAuthRequests());

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
    });
  });

  it("approves request successfully", async () => {
    approveRequest.mockResolvedValue({
      statusType: "S",
      statusDesc: "Approved",
    });

    getAuthRequests.mockResolvedValue({
      statusType: "S",
      details: [],
    });

    getAllAuthRequests.mockResolvedValue({
      details: [],
    });

    const { result } = renderHook(() => useAuthRequests());

    await act(async () => {
      await result.current.approveRequest(1);
    });

    expect(approveRequest).toHaveBeenCalledWith(1);

    expect(toast.success).toHaveBeenCalledWith("Approved");
  });

  it("handles approve request failure", async () => {
    approveRequest.mockRejectedValue({
      response: {
        data: {
          statusDesc: "Failed to approve request",
        },
      },
    });

    getAuthRequests.mockResolvedValue({
      statusType: "S",
      details: [],
    });

    getAllAuthRequests.mockResolvedValue({
      details: [],
    });

    const { result } = renderHook(() => useAuthRequests());

    await expect(result.current.approveRequest(1)).rejects.toBeDefined();

    expect(toast.error).toHaveBeenCalled();
  });

  it("rejects request successfully", async () => {
    rejectRequest.mockResolvedValue({
      statusType: "S",
      statusDesc: "Rejected",
    });

    getAuthRequests.mockResolvedValue({
      statusType: "S",
      details: [],
    });

    getAllAuthRequests.mockResolvedValue({
      details: [],
    });

    const { result } = renderHook(() => useAuthRequests());

    await act(async () => {
      await result.current.rejectRequest(1, "Invalid");
    });

    expect(rejectRequest).toHaveBeenCalledWith(1, "Invalid");

    expect(toast.success).toHaveBeenCalledWith("Rejected");
  });

  it("handles reject request failure", async () => {
    rejectRequest.mockRejectedValue({
      response: {
        data: {
          statusDesc: "Failed to reject request",
        },
      },
    });

    getAuthRequests.mockResolvedValue({
      statusType: "S",
      details: [],
    });

    getAllAuthRequests.mockResolvedValue({
      details: [],
    });

    const { result } = renderHook(() => useAuthRequests());

    await expect(
      result.current.rejectRequest(1, "Reason"),
    ).rejects.toBeDefined();

    expect(toast.error).toHaveBeenCalled();
  });

  it("loads all authorization requests", async () => {
    getAuthRequests.mockResolvedValue({
      statusType: "S",
      details: [],
    });

    getAllAuthRequests.mockResolvedValue({
      details: [{ id: 5 }],
    });

    const { result } = renderHook(() => useAuthRequests());

    await act(async () => {
      await result.current.getAllAuthRequests();
    });

    expect(result.current.allAuths).toEqual([{ id: 5 }]);
  });

  it("handles getAllAuthRequests failure", async () => {
    getAuthRequests.mockResolvedValue({
      statusType: "S",
      details: [],
    });

    getAllAuthRequests.mockRejectedValue({
      response: {
        data: {
          statusDesc: "Failed to get All Auth Requests",
        },
      },
    });

    const { result } = renderHook(() => useAuthRequests());

    await act(async () => {
      await result.current.getAllAuthRequests();
    });

    expect(toast.error).toHaveBeenCalled();
  });

  it("approves selected requests", async () => {
    approveSelectedRequests.mockResolvedValue({
      statusType: "S",
      statusDesc: "Approved Selected",
    });

    getAuthRequests.mockResolvedValue({
      statusType: "S",
      details: [],
    });

    getAllAuthRequests.mockResolvedValue({
      details: [],
    });

    const { result } = renderHook(() => useAuthRequests());

    await act(async () => {
      await result.current.approveSelectedRequests([1, 2]);
    });

    expect(approveSelectedRequests).toHaveBeenCalledWith([1, 2]);

    expect(toast.success).toHaveBeenCalledWith("Approved Selected");
  });

  it("handles approveSelectedRequests failure", async () => {
    approveSelectedRequests.mockRejectedValue({
      response: {
        data: {
          statusDesc: "Failed to approve requests",
        },
      },
    });

    getAuthRequests.mockResolvedValue({
      statusType: "S",
      details: [],
    });

    getAllAuthRequests.mockResolvedValue({
      details: [],
    });

    const { result } = renderHook(() => useAuthRequests());

    await act(async () => {
      await result.current.approveSelectedRequests([1]);
    });

    expect(toast.error).toHaveBeenCalled();
  });

  it("rejects selected requests", async () => {
    rejectSelectedRequests.mockResolvedValue({
      statusType: "S",
      statusDesc: "Rejected Selected",
    });

    getAuthRequests.mockResolvedValue({
      statusType: "S",
      details: [],
    });

    getAllAuthRequests.mockResolvedValue({
      details: [],
    });

    const { result } = renderHook(() => useAuthRequests());

    await act(async () => {
      await result.current.rejectSelectedRequests([1, 2], "Invalid");
    });

    expect(rejectSelectedRequests).toHaveBeenCalledWith([1, 2], "Invalid");

    expect(toast.success).toHaveBeenCalledWith("Rejected Selected");
  });

  it("handles rejectSelectedRequests failure", async () => {
    rejectSelectedRequests.mockRejectedValue({
      response: {
        data: {
          statusDesc: "Failed to reject requests",
        },
      },
    });

    getAuthRequests.mockResolvedValue({
      statusType: "S",
      details: [],
    });

    getAllAuthRequests.mockResolvedValue({
      details: [],
    });

    const { result } = renderHook(() => useAuthRequests());

    await act(async () => {
      await result.current.rejectSelectedRequests([1], "Reason");
    });

    expect(toast.error).toHaveBeenCalled();
  });

  it("updates loading state", async () => {
    getAuthRequests.mockResolvedValue({
      statusType: "S",
      details: [],
    });

    getAllAuthRequests.mockResolvedValue({
      details: [],
    });

    const { result } = renderHook(() => useAuthRequests());

    expect(typeof result.current.loading).toBe("boolean");
  });
});
