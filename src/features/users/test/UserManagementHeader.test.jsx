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

  it("renders Add User button", () => {
    render(<UserManagementHeader />);

    expect(
      screen.getByRole("button", { name: /add user/i })
    ).toBeInTheDocument();
  });

  it("navigates to add user page when button is clicked", () => {
    render(<UserManagementHeader />);

    fireEvent.click(
      screen.getByRole("button", { name: /add user/i })
    );

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("/users/add");
  });

  it("renders only one button", () => {
    render(<UserManagementHeader />);

    expect(screen.getAllByRole("button")).toHaveLength(1);
  });

  it("button is enabled", () => {
    render(<UserManagementHeader />);

    expect(
      screen.getByRole("button", { name: /add user/i })
    ).toBeEnabled();
  });
});