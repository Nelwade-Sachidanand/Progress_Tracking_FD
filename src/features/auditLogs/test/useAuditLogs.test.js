import { beforeEach, describe, expect, it, vi } from "vitest";

import { renderHook, waitFor } from "@testing-library/react";

import { toast } from "react-toastify";

import { useAuditLogs } from "../hooks/useAuditLogs";
import { getAuditLogs } from "../services/auditLogService";

vi.mock("../services/auditLogService", () => ({
  getAuditLogs: vi.fn(),
}));

vi.mock("react-toastify", () => ({
  toast: {
    error: vi.fn(),
  },
}));

describe("useAuditLogs", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should initialize with default values", () => {
    getAuditLogs.mockResolvedValue({
      statusType: "S",
      details: [],
    });

    const { result } = renderHook(() => useAuditLogs());

    expect(result.current.auditLogs).toEqual([]);
    expect(typeof result.current.fetchAuditLogs).toBe("function");
  });

  it("should fetch audit logs successfully", async () => {
    const mockLogs = [
      {
        id: 1,
        actionType: "CREATE_PROJECT",
      },
      {
        id: 2,
        actionType: "UPDATE_ACTIVITY",
      },
    ];

    getAuditLogs.mockResolvedValue({
      statusType: "S",
      details: mockLogs,
    });

    const { result } = renderHook(() => useAuditLogs());

    await waitFor(() => {
      expect(result.current.auditLogs).toEqual(mockLogs);
    });

    expect(getAuditLogs).toHaveBeenCalledTimes(1);

    expect(result.current.loading).toBe(false);
  });

  it("should handle empty audit logs response", async () => {
    getAuditLogs.mockResolvedValue({
      statusType: "S",
      details: [],
    });

    const { result } = renderHook(() => useAuditLogs());

    await waitFor(() => {
      expect(result.current.auditLogs).toEqual([]);
    });

    expect(getAuditLogs).toHaveBeenCalled();
  });

  it("should not update logs when statusType is not S", async () => {
    getAuditLogs.mockResolvedValue({
      statusType: "E",
      details: [
        {
          id: 1,
        },
      ],
    });

    const { result } = renderHook(() => useAuditLogs());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.auditLogs).toEqual([]);
  });

  it("should show backend error message", async () => {
    getAuditLogs.mockRejectedValue({
      response: {
        data: {
          statusDesc: "Unable to fetch audit logs",
        },
      },
    });

    renderHook(() => useAuditLogs());

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Unable to fetch audit logs");
    });
  });

  it("should show default error message", async () => {
    getAuditLogs.mockRejectedValue(new Error("Network Error"));

    renderHook(() => useAuditLogs());

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Failed to load audit logs");
    });
  });

  it("should set loading correctly during fetch", async () => {
    let resolvePromise;

    getAuditLogs.mockReturnValue(
      new Promise((resolve) => {
        resolvePromise = resolve;
      }),
    );

    const { result } = renderHook(() => useAuditLogs());

    await waitFor(() => {
      expect(result.current.loading).toBe(true);
    });

    resolvePromise({
      statusType: "S",
      details: [],
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });

  it("should allow manual fetchAuditLogs call", async () => {
    const mockLogs = [
      {
        id: 101,
        actionType: "CREATE_USER",
      },
    ];

    getAuditLogs.mockResolvedValue({
      statusType: "S",
      details: mockLogs,
    });

    const { result } = renderHook(() => useAuditLogs());

    await waitFor(() => {
      expect(getAuditLogs).toHaveBeenCalledTimes(1);
    });

    await result.current.fetchAuditLogs();

    expect(getAuditLogs).toHaveBeenCalledTimes(2);
  });
});
