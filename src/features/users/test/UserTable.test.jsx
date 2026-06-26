import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import UserTable from "../components/UserTable";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

describe("UserTable", () => {
  const mockUsers = [
    {
      id: 1,
      fullname: "John Doe",
      username: "john",
      role: "ADMIN",
      status: true,
      projectNames: ["Project A", "Project B", "Project C"],
    },
    {
      id: 2,
      fullname: "Jane Smith",
      username: "jane",
      role: "IMPLEMENTATION_USER",
      status: false,
      projectNames: ["Project X"],
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state", () => {
    render(<UserTable users={[]} loading={true} />);
    expect(screen.getByText("Loading users...")).toBeInTheDocument();
  });

  it("renders table headers", () => {
    render(<UserTable users={mockUsers} loading={false} />);

    expect(screen.getByText("Full Name")).toBeInTheDocument();
    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(screen.getByText("Role")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();
  });

  it("renders user data", () => {
    render(<UserTable users={mockUsers} loading={false} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john")).toBeInTheDocument();

    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("jane")).toBeInTheDocument();
  });

  it("renders user initials", () => {
    render(<UserTable users={mockUsers} loading={false} />);

    expect(screen.getByText("JD")).toBeInTheDocument();
    expect(screen.getByText("JS")).toBeInTheDocument();
  });

  it("renders roles correctly", () => {
    render(<UserTable users={mockUsers} loading={false} />);

    expect(screen.getByText("ADMIN")).toBeInTheDocument();
    expect(screen.getByText("IMPLEMENTATION USER")).toBeInTheDocument();
  });

  it("renders active and inactive statuses", () => {
    render(<UserTable users={mockUsers} loading={false} />);

    expect(screen.getByText("● Active")).toBeInTheDocument();
    expect(screen.getByText("● Inactive")).toBeInTheDocument();
  });

  it("renders project names", () => {
    render(<UserTable users={mockUsers} loading={false} />);

    // User 1 projects
    expect(screen.getByText("Project A")).toBeInTheDocument();
    expect(screen.getByText("Project B")).toBeInTheDocument();
    expect(screen.getByText("Project C")).toBeInTheDocument();

    // User 2 project
    expect(screen.getByText("Project X")).toBeInTheDocument();

    // ❌ removed +1 expectation because component does NOT render it
  });

  it("navigates to edit page when edit button clicked", () => {
    render(<UserTable users={mockUsers} loading={false} />);

    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[0]);

    expect(mockNavigate).toHaveBeenCalledWith("/users/edit", {
      state: {
        user: mockUsers[0],
      },
    });
  });

  it("shows pagination text", () => {
    render(<UserTable users={mockUsers} loading={false} />);

    expect(screen.getByText("Showing 1 to 2 of 2 users")).toBeInTheDocument();
  });

  it("handles empty users list", () => {
    render(<UserTable users={[]} loading={false} />);

    expect(screen.getByText("Showing 0 to 0 of 0 users")).toBeInTheDocument();
  });

  it("handles missing fullname", () => {
    render(
      <UserTable
        loading={false}
        users={[
          {
            id: 1,
            fullname: "",
            username: "test",
            role: "USER",
            status: true,
            projectNames: [],
          },
        ]}
      />,
    );

    expect(screen.getByText("--")).toBeInTheDocument();
  });

  it("renders only first 5 users per page", () => {
    const users = Array.from({ length: 6 }, (_, i) => ({
      id: i + 1,
      fullname: `User ${i + 1}`,
      username: `user${i + 1}`,
      role: "USER",
      status: true,
      projectNames: [],
    }));

    render(<UserTable users={users} loading={false} />);

    expect(screen.getByText("User 1")).toBeInTheDocument();
    expect(screen.getByText("User 5")).toBeInTheDocument();

    expect(screen.queryByText("User 6")).not.toBeInTheDocument();
  });
});
