// useAuth.test.js

import { act, renderHook } from "@testing-library/react";
import { toast } from "react-toastify";
import { vi } from "vitest";
import { useAuth } from "../hooks/useAuth";
import { loginUser } from "../services/authService";

vi.mock("../services/authService", () => ({
  loginUser: vi.fn(),
}));

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("useAuth", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  test("successful login", async () => {
    const mockResponse = {
      statusType: "S",
      statusDesc: "Login Successful",
      details: {
        user: {
          username: "admin",
        },
        projects: ["P1"],
        accessToken: "access123",
        refreshToken: "refresh123",
      },
    };

    loginUser.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useAuth());

    let response;

    await act(async () => {
      response = await result.current.login("admin", "admin123");
    });

    expect(loginUser).toHaveBeenCalledWith("admin", "admin123");

    expect(toast.success).toHaveBeenCalledWith("Login Successful");

    expect(JSON.parse(localStorage.getItem("user"))).toEqual({
      username: "admin",
    });

    expect(localStorage.getItem("accessToken")).toBe("access123");

    expect(response).toEqual(mockResponse);

    expect(result.current.loading).toBe(false);
  });

  test("failed login response", async () => {
    loginUser.mockResolvedValue({
      statusType: "E",
      statusDesc: "Invalid Credentials",
    });

    const { result } = renderHook(() => useAuth());

    let response;

    await act(async () => {
      response = await result.current.login("admin", "wrong");
    });

    expect(toast.error).toHaveBeenCalledWith("Invalid Credentials");

    expect(response).toBeNull();

    expect(localStorage.getItem("user")).toBeNull();
  });

  test("login throws exception", async () => {
    const error = {
      response: {
        data: {
          statusDesc: "Server Error",
        },
      },
    };

    loginUser.mockRejectedValue(error);

    const { result } = renderHook(() => useAuth());

    await expect(result.current.login("admin", "123")).rejects.toEqual(error);

    expect(toast.error).toHaveBeenCalledWith("Server Error");

    expect(result.current.loading).toBe(false);
  });

  test("fallback error message", async () => {
    loginUser.mockRejectedValue(new Error("Network"));

    const { result } = renderHook(() => useAuth());

    await expect(result.current.login("admin", "123")).rejects.toThrow();

    expect(toast.error).toHaveBeenCalledWith("Login Failed");
  });
});
