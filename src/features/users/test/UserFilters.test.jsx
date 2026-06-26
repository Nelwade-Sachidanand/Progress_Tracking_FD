import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import UserFilters from "../components/UserFilters";

describe("UserFilters", () => {
  const setSearchTerm = vi.fn();
  const setRoleFilter = vi.fn();

  const defaultProps = {
    searchTerm: "",
    setSearchTerm,
    roleFilter: "",
    setRoleFilter,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders search input", () => {
    render(<UserFilters {...defaultProps} />);

    expect(
      screen.getByPlaceholderText("Search by name or username..."),
    ).toBeInTheDocument();
  });

  it("renders role dropdown", () => {
    render(<UserFilters {...defaultProps} />);

    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByText("All Roles")).toBeInTheDocument();
  });

  it("shows provided search value", () => {
    render(<UserFilters {...defaultProps} searchTerm="sachin" />);

    expect(screen.getByDisplayValue("sachin")).toBeInTheDocument();
  });

  it("calls setSearchTerm on typing", () => {
    render(<UserFilters {...defaultProps} />);

    fireEvent.change(
      screen.getByPlaceholderText("Search by name or username..."),
      {
        target: { value: "john" },
      },
    );

    expect(setSearchTerm).toHaveBeenCalledTimes(1);
    expect(setSearchTerm).toHaveBeenCalledWith("john");
  });

  it("shows selected role", () => {
    render(<UserFilters {...defaultProps} roleFilter="ADMIN" />);

    expect(screen.getByDisplayValue("Admin")).toBeInTheDocument();
  });

  it("calls setRoleFilter when role changes", () => {
    render(<UserFilters {...defaultProps} />);

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "MANAGEMENT USER" },
    });

    expect(setRoleFilter).toHaveBeenCalledTimes(1);
    expect(setRoleFilter).toHaveBeenCalledWith("MANAGEMENT USER");
  });

  it("renders all role options", () => {
    render(<UserFilters {...defaultProps} />);

    expect(
      screen.getByRole("option", { name: "All Roles" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Admin" })).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Bank User" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Manager" })).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Implementation User" }),
    ).toBeInTheDocument();
  });

  it("handles empty search value", () => {
    render(<UserFilters {...defaultProps} />);

    const input = screen.getByPlaceholderText("Search by name or username...");

    expect(input.value).toBe("");
  });

  it("handles empty role filter", () => {
    render(<UserFilters {...defaultProps} />);

    const select = screen.getByRole("combobox");

    expect(select.value).toBe("");
  });
});
