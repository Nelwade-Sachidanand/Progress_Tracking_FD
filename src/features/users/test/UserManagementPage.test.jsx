import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import UserManagementPage from "../pages/UserManagementPage";

const mockUseUsers = vi.fn();

vi.mock("../hooks/useUsers", () => ({
  useUsers: () => mockUseUsers(),
}));

vi.mock("../components/UserManagementHeader", () => ({
  default: () => (
    <div data-testid="user-management-header">User Management Header</div>
  ),
}));

vi.mock("../components/UserStatsCards", () => ({
  default: ({ users }) => (
    <div data-testid="user-stats-cards">Total Users: {users.length}</div>
  ),
}));

vi.mock("../components/UserTable", () => ({
  default: ({ users, loading }) => (
    <div data-testid="user-table">
      <div>Loading: {String(loading)}</div>

      <div>Users Count: {users.length}</div>

      {users.map((user) => (
        <div key={user.id}>{user.fullname}</div>
      ))}
    </div>
  ),
}));

vi.mock("../components/UserFilters", () => ({
  default: ({ searchTerm, setSearchTerm, roleFilter, setRoleFilter }) => (
    <div data-testid="user-filters">
      <input
        data-testid="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select
        data-testid="role-filter"
        value={roleFilter}
        onChange={(e) => setRoleFilter(e.target.value)}
      >
        <option value="">All</option>
        <option value="ADMIN">ADMIN</option>
        <option value="USER">USER</option>
      </select>
    </div>
  ),
}));

describe("UserManagementPage", () => {
  const mockUsers = [
    {
      id: 1,
      fullname: "John Doe",
      username: "john",
      role: "ADMIN",
      active: true,
      projectNames: ["Project A"],
    },
    {
      id: 2,
      fullname: "Jane Smith",
      username: "jane",
      role: "USER",
      active: true,
      projectNames: ["Project B"],
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();

    mockUseUsers.mockReturnValue({
      users: mockUsers,
      loading: false,
    });
  });

  it("renders page components", () => {
    render(<UserManagementPage />);

    expect(screen.getByTestId("user-management-header")).toBeInTheDocument();

    expect(screen.getByTestId("user-stats-cards")).toBeInTheDocument();

    expect(screen.getByTestId("user-filters")).toBeInTheDocument();

    expect(screen.getByTestId("user-table")).toBeInTheDocument();
  });

  it("passes all users to stats cards", () => {
    render(<UserManagementPage />);

    expect(screen.getByText("Total Users: 2")).toBeInTheDocument();
  });

  it("passes all users to table initially", () => {
    render(<UserManagementPage />);

    expect(screen.getByText("Users Count: 2")).toBeInTheDocument();

    expect(screen.getByText("John Doe")).toBeInTheDocument();

    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });

  it("filters users by search fullname", () => {
    render(<UserManagementPage />);

    fireEvent.change(screen.getByTestId("search-input"), {
      target: {
        value: "john",
      },
    });

    expect(screen.getByText("Users Count: 1")).toBeInTheDocument();

    expect(screen.getByText("John Doe")).toBeInTheDocument();

    expect(screen.queryByText("Jane Smith")).not.toBeInTheDocument();
  });

  it("filters users by username", () => {
    render(<UserManagementPage />);

    fireEvent.change(screen.getByTestId("search-input"), {
      target: {
        value: "jane",
      },
    });

    expect(screen.getByText("Users Count: 1")).toBeInTheDocument();

    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });

  it("filters users by role", () => {
    render(<UserManagementPage />);

    fireEvent.change(screen.getByTestId("role-filter"), {
      target: {
        value: "ADMIN",
      },
    });

    expect(screen.getByText("Users Count: 1")).toBeInTheDocument();

    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("filters by search and role together", () => {
    render(<UserManagementPage />);

    fireEvent.change(screen.getByTestId("search-input"), {
      target: {
        value: "john",
      },
    });

    fireEvent.change(screen.getByTestId("role-filter"), {
      target: {
        value: "ADMIN",
      },
    });

    expect(screen.getByText("Users Count: 1")).toBeInTheDocument();

    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("shows no users when filters do not match", () => {
    render(<UserManagementPage />);

    fireEvent.change(screen.getByTestId("search-input"), {
      target: {
        value: "xyz",
      },
    });

    expect(screen.getByText("Users Count: 0")).toBeInTheDocument();
  });

  it("passes loading state to table", () => {
    mockUseUsers.mockReturnValue({
      users: [],
      loading: true,
    });

    render(<UserManagementPage />);

    expect(screen.getByText("Loading: true")).toBeInTheDocument();
  });

  it("handles empty users list", () => {
    mockUseUsers.mockReturnValue({
      users: [],
      loading: false,
    });

    render(<UserManagementPage />);

    expect(screen.getByText("Total Users: 0")).toBeInTheDocument();

    expect(screen.getByTestId("user-table")).toHaveTextContent(
      "Users Count: 0",
    );
  });
});
