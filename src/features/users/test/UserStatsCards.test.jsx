import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import UserStatsCards from "../components/UserStatsCards";

describe("UserStatsCards", () => {
  const mockUsers = [
    {
      id: 1,
      active: true,
      role: "ADMIN",
    },
    {
      id: 2,
      active: true,
      role: "SUPER_ADMIN",
    },
    {
      id: 3,
      active: true,
      role: "IMPLEMENTATION_USER",
    },
    {
      id: 4,
      active: false,
      role: "USER",
    },
  ];

  it("renders all stat card titles", () => {
    render(<UserStatsCards users={mockUsers} />);

    expect(screen.getByText("Total Users")).toBeInTheDocument();

    expect(screen.getByText("Active Users")).toBeInTheDocument();

    expect(screen.getByText("Administrators")).toBeInTheDocument();

    expect(screen.getByText("Implementation User")).toBeInTheDocument();
  });

  it("calculates total users correctly", () => {
    render(<UserStatsCards users={mockUsers} />);

    expect(screen.getByText("4")).toBeInTheDocument();
  });

  it("calculates active users correctly", () => {
    render(<UserStatsCards users={mockUsers} />);

    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("calculates administrators correctly", () => {
    render(<UserStatsCards users={mockUsers} />);

    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("calculates implementation users correctly", () => {
    render(<UserStatsCards users={mockUsers} />);

    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("renders all four cards", () => {
    render(<UserStatsCards users={mockUsers} />);

    expect(
      screen.getAllByText(
        /Total Users|Active Users|Administrators|Implementation User/,
      ),
    ).toHaveLength(4);
  });

  it("shows zero values when users array is empty", () => {
    render(<UserStatsCards users={[]} />);

    const zeros = screen.getAllByText("0");

    expect(zeros).toHaveLength(4);
  });

  it("handles undefined users prop", () => {
    render(<UserStatsCards />);

    const zeros = screen.getAllByText("0");

    expect(zeros).toHaveLength(4);
  });

  it("counts only ADMIN and SUPER_ADMIN as administrators", () => {
    const users = [
      { active: true, role: "ADMIN" },
      { active: true, role: "SUPER_ADMIN" },
      { active: true, role: "USER" },
      { active: true, role: "IMPLEMENTATION_USER" },
    ];

    render(<UserStatsCards users={users} />);

    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("counts only IMPLEMENTATION_USER users", () => {
    const users = [
      { active: true, role: "IMPLEMENTATION_USER" },
      { active: true, role: "IMPLEMENTATION_USER" },
      { active: true, role: "USER" },
    ];

    render(<UserStatsCards users={users} />);

    expect(screen.getByText("2")).toBeInTheDocument();
  });
});
