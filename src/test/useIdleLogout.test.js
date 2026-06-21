import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import useIdleLogout from "../services/useIdleLogout";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

describe("useIdleLogout", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("does not start timer when access token is missing", () => {
    renderHook(() => useIdleLogout());

    vi.advanceTimersByTime(5 * 60 * 1000);

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("logs out user after idle timeout", () => {
    localStorage.setItem("accessToken", "token");

    renderHook(() => useIdleLogout());

    vi.advanceTimersByTime(5 * 60 * 1000);

    expect(localStorage.getItem("accessToken")).toBeNull();

    expect(mockNavigate).toHaveBeenCalledWith("/", {
      replace: true,
      state: {
        showSessionModal: true,
        message: "Session expired due to inactivity. Please login again.",
      },
    });
  });

  it("resets timer on mousemove", () => {
    localStorage.setItem("accessToken", "token");

    renderHook(() => useIdleLogout());

    vi.advanceTimersByTime(4 * 60 * 1000);

    window.dispatchEvent(new Event("mousemove"));

    vi.advanceTimersByTime(4 * 60 * 1000);

    expect(mockNavigate).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1 * 60 * 1000);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });

  it("resets timer on keydown", () => {
    localStorage.setItem("accessToken", "token");

    renderHook(() => useIdleLogout());

    vi.advanceTimersByTime(2 * 60 * 1000);

    window.dispatchEvent(new Event("keydown"));

    vi.advanceTimersByTime(4 * 60 * 1000);

    expect(mockNavigate).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1 * 60 * 1000);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });

  it("cleans up event listeners on unmount", () => {
    localStorage.setItem("accessToken", "token");

    const removeSpy = vi.spyOn(window, "removeEventListener");

    const { unmount } = renderHook(() => useIdleLogout());

    unmount();

    expect(removeSpy).toHaveBeenCalled();
  });

  it("clears timeout on unmount", () => {
    localStorage.setItem("accessToken", "token");

    const clearSpy = vi.spyOn(global, "clearTimeout");

    const { unmount } = renderHook(() => useIdleLogout());

    unmount();

    expect(clearSpy).toHaveBeenCalled();
  });
});
