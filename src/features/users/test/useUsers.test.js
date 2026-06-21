import { renderHook, waitFor } from "@testing-library/react";
import { toast } from "react-toastify";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useUsers } from "../hooks/useUsers";

import {
  getProjectNames,
  getUsers,
  registerUser,
  updateUser,
} from "../services/userService";

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("../services/userService", () => ({
  getUsers: vi.fn(),
  registerUser: vi.fn(),
  updateUser: vi.fn(),
  getProjectNames: vi.fn(),
}));

describe("useUsers", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("loads users successfully", async () => {
    getUsers.mockResolvedValue({
      details: [
        {
          id: 1,
          fullname: "John Doe",
          projectIds: ["p1"],
        },
      ],
    });

    getProjectNames.mockResolvedValue({
      details: {
        p1: "Project A",
      },
    });

    const { result } = renderHook(() => useUsers());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.users).toEqual([
      {
        id: 1,
        fullname: "John Doe",
        projectIds: ["p1"],
        projectNames: ["Project A"],
      },
    ]);
  });

  it("loads users without projects", async () => {
    getUsers.mockResolvedValue({
      details: [
        {
          id: 1,
          fullname: "John Doe",
          projectIds: [],
        },
      ],
    });

    const { result } = renderHook(() => useUsers());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.users).toEqual([
      {
        id: 1,
        fullname: "John Doe",
        projectIds: [],
        projectNames: [],
      },
    ]);

    expect(getProjectNames).not.toHaveBeenCalled();
  });

  it("handles getUsers failure", async () => {
    const error = new Error("API Error");

    getUsers.mockRejectedValue(error);

    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    renderHook(() => useUsers());

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled();
    });

    consoleSpy.mockRestore();
  });

  it("creates user successfully", async () => {
    getUsers.mockResolvedValue({ details: [] });

    registerUser.mockResolvedValue({
      statusType: "S",
      statusDesc: "User created successfully",
    });

    const { result } = renderHook(() => useUsers());

    const response = await result.current.createUser({
      fullname: "John",
    });

    expect(response.statusType).toBe("S");

    expect(toast.success).toHaveBeenCalledWith("User created successfully");
  });

  it("shows error when create user fails", async () => {
    getUsers.mockResolvedValue({ details: [] });

    registerUser.mockResolvedValue({
      statusType: "E",
      statusDesc: "Create failed",
    });

    const { result } = renderHook(() => useUsers());

    const response = await result.current.createUser({
      fullname: "John",
    });

    expect(response).toBeNull();

    expect(toast.error).toHaveBeenCalledWith("Create failed");
  });

  it("handles create user exception", async () => {
    getUsers.mockResolvedValue({ details: [] });

    const error = {
      response: {
        data: {
          statusDesc: "Server Error",
        },
      },
    };

    registerUser.mockRejectedValue(error);

    const { result } = renderHook(() => useUsers());

    await expect(result.current.createUser({})).rejects.toEqual(error);

    expect(toast.error).toHaveBeenCalledWith("Server Error");
  });

  it("updates user successfully", async () => {
    getUsers.mockResolvedValue({ details: [] });

    updateUser.mockResolvedValue({
      statusType: "S",
      statusDesc: "User updated successfully",
    });

    const { result } = renderHook(() => useUsers());

    const response = await result.current.updateUser({
      fullname: "John",
    });

    expect(response.statusType).toBe("S");

    expect(toast.success).toHaveBeenCalledWith("User updated successfully");
  });

  it("shows error when update user fails", async () => {
    getUsers.mockResolvedValue({ details: [] });

    updateUser.mockResolvedValue({
      statusType: "E",
      statusDesc: "Update failed",
    });

    const { result } = renderHook(() => useUsers());

    const response = await result.current.updateUser({
      fullname: "John",
    });

    expect(response).toBeNull();

    expect(toast.error).toHaveBeenCalledWith("Update failed");
  });

  it("handles update user exception", async () => {
    getUsers.mockResolvedValue({ details: [] });

    const error = {
      response: {
        data: {
          statusDesc: "Update Error",
        },
      },
    };

    updateUser.mockRejectedValue(error);

    const { result } = renderHook(() => useUsers());

    await expect(result.current.updateUser({})).rejects.toEqual(error);

    expect(toast.error).toHaveBeenCalledWith("Update Error");
  });

  it("calls fetchUsers manually", async () => {
    getUsers.mockResolvedValue({
      details: [],
    });

    const { result } = renderHook(() => useUsers());

    await result.current.fetchUsers();

    expect(getUsers).toHaveBeenCalled();
  });

  it("sets loading correctly during fetch", async () => {
    getUsers.mockResolvedValue({
      details: [],
    });

    const { result } = renderHook(() => useUsers());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });
});
