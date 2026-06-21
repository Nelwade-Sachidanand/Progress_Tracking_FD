import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import UserManagementHeader from "../components/UserManagementHeader";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

describe("UserManagementHeader", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders heading", () => {
    render(<UserManagementHeader />);

    expect(screen.getByText("User Management")).toBeInTheDocument();
  });

  it("renders description", () => {
    render(<UserManagementHeader />);

    expect(
      screen.getByText("Manage system users, roles, and permissions"),
    ).toBeInTheDocument();
  });

  it("renders add user button", () => {
    render(<UserManagementHeader />);

    expect(
      screen.getByRole("button", {
        name: /add user/i,
      }),
    ).toBeInTheDocument();
  });

  it("navigates to add user page when button clicked", () => {
    render(<UserManagementHeader />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /add user/i,
      }),
    );

    expect(mockNavigate).toHaveBeenCalledTimes(1);

    expect(mockNavigate).toHaveBeenCalledWith("/users/add");
  });

  it("renders only one add user button", () => {
    render(<UserManagementHeader />);

    expect(
      screen.getAllByRole("button", {
        name: /add user/i,
      }),
    ).toHaveLength(1);
  });

  it("button remains clickable on multiple clicks", () => {
    render(<UserManagementHeader />);

    const button = screen.getByRole("button", {
      name: /add user/i,
    });

    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledTimes(2);

    expect(mockNavigate).toHaveBeenNthCalledWith(1, "/users/add");

    expect(mockNavigate).toHaveBeenNthCalledWith(2, "/users/add");
  });
});
