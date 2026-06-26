import { renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import useIdleLogout from "../services/useIdleLogout";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

describe("useIdleLogout", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    sessionStorage.clear();

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("does not start timer when access token is missing", () => {
    renderHook(() => useIdleLogout());

    vi.advanceTimersByTime(5 * 60 * 1000);

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("logs out user after idle timeout", () => {
    sessionStorage.setItem("accessToken", "token");

    renderHook(() => useIdleLogout());

    vi.advanceTimersByTime(5 * 60 * 1000);

    expect(sessionStorage.getItem("accessToken")).toBeNull();

    expect(mockNavigate).toHaveBeenCalledWith("/", {
      replace: true,
      state: {
        showSessionModal: true,
        message: "Session expired due to inactivity. Please login again.",
      },
    });
  });

  it("resets timer on mousemove", () => {
    sessionStorage.setItem("accessToken", "token");

    renderHook(() => useIdleLogout());

    vi.advanceTimersByTime(4 * 60 * 1000);

    window.dispatchEvent(new Event("mousemove"));

    vi.advanceTimersByTime(4 * 60 * 1000);

    expect(mockNavigate).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1 * 60 * 1000);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });

  it("resets timer on keydown", () => {
    sessionStorage.setItem("accessToken", "token");

    renderHook(() => useIdleLogout());

    vi.advanceTimersByTime(2 * 60 * 1000);

    window.dispatchEvent(new Event("keydown"));

    vi.advanceTimersByTime(4 * 60 * 1000);

    expect(mockNavigate).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1 * 60 * 1000);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });

  it("cleans up event listeners on unmount", () => {
    sessionStorage.setItem("accessToken", "token");

    const removeSpy = vi.spyOn(window, "removeEventListener");

    const { unmount } = renderHook(() => useIdleLogout());

    unmount();

    expect(removeSpy).toHaveBeenCalledTimes(6);
  });

  it("clears timeout on unmount", () => {
    sessionStorage.setItem("accessToken", "token");

    const clearSpy = vi.spyOn(global, "clearTimeout");

    const { unmount } = renderHook(() => useIdleLogout());

    unmount();

    expect(clearSpy).toHaveBeenCalled();
  });
});
