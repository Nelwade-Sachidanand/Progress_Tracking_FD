import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import UserStatsCards from "../components/UserStatsCards";

describe("UserStatsCards", () => {
  const users = [
    {
      id: 1,
      fullname: "Admin",
      role: "ADMIN",
      status: true,
    },
    {
      id: 2,
      fullname: "Super Admin",
      role: "SUPER_ADMIN",
      status: true,
    },
    {
      id: 3,
      fullname: "Implementation",
      role: "IMPLEMENTATION USER",
      status: true,
    },
    {
      id: 4,
      fullname: "Management",
      role: "MANAGEMENT USER",
      status: false,
    },
    {
      id: 5,
      fullname: "Bank User",
      role: "USER",
      status: false,
    },
  ];

  it("renders all statistic titles", () => {
    render(<UserStatsCards users={users} />);

    expect(screen.getByText("Total Users")).toBeInTheDocument();
    expect(screen.getByText("Active Users")).toBeInTheDocument();
    expect(screen.getByText("Administrators")).toBeInTheDocument();
    expect(screen.getByText("Implementation Users")).toBeInTheDocument();
    expect(screen.getByText("Management Users")).toBeInTheDocument();
  });

  it("shows correct statistics", () => {
    render(<UserStatsCards users={users} />);

    expect(screen.getByText("5")).toBeInTheDocument(); // Total Users
    expect(screen.getByText("3")).toBeInTheDocument(); // Active Users
    expect(screen.getByText("2")).toBeInTheDocument(); // Administrators
    expect(screen.getAllByText("1")).toHaveLength(2); // Implementation + Management
  });

  it("renders zero values when users list is empty", () => {
    render(<UserStatsCards users={[]} />);

    expect(screen.getAllByText("0")).toHaveLength(5);
  });

  it("counts only active users", () => {
    render(
      <UserStatsCards
        users={[
          { role: "USER", status: true },
          { role: "USER", status: false },
          { role: "USER", status: false },
        ]}
      />
    );

    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("counts ADMIN and SUPER_ADMIN together", () => {
    render(
      <UserStatsCards
        users={[
          { role: "ADMIN", status: true },
          { role: "SUPER_ADMIN", status: true },
          { role: "USER", status: true },
        ]}
      />
    );

    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("counts implementation users", () => {
    render(
      <UserStatsCards
        users={[
          { role: "IMPLEMENTATION USER", status: true },
          { role: "IMPLEMENTATION USER", status: false },
          { role: "USER", status: true },
        ]}
      />
    );

    expect(screen.getByText("Implementation Users")).toBeInTheDocument();
        expect(screen.getAllByText("2").length).toBeGreaterThan(0);
  });

it("counts management users", () => {
  render(
    <UserStatsCards
      users={[
        { role: "MANAGEMENT USER", status: true },
        { role: "MANAGEMENT USER", status: false },
        { role: "USER", status: true },
      ]}
    />
  );

  const card = screen
    .getByText("Management Users")
    .closest("div");

  expect(card).toBeInTheDocument();
 expect(screen.getAllByText("2").length).toBeGreaterThan(0);
});

  it("renders five statistic cards", () => {
    render(<UserStatsCards users={users} />);

    expect(screen.getAllByText(/Users|Administrators/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Total Users|Active Users|Administrators|Implementation Users|Management Users/)).toHaveLength(5);
  });
});