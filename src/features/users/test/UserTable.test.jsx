import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import UserTable from "../components/UserTable";



const mockNavigate = vi.fn();
const mockDelete = vi.fn();
const mockResetPassword = vi.fn();
const mockOnPageChange = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("../../../components/layout/Pagination", () => ({
  default: (props) => (
    <div data-testid="pagination">
      <button onClick={() => props.onPageChange(2)}>
        Next Page
      </button>
    </div>
  ),
}));

describe("UserTable", () => {
  const users = [
    {
      id: 1,
      fullname: "Sachin Nelwade",
      username: "sachin",
      role: "ADMIN",
      status: true,
      projectNames: ["Project A", "Project B", "Project C"],
    },
    {
      id: 2,
      fullname: "John Doe",
      username: "john",
      role: "IMPLEMENTATION USER",
      status: false,
      projectNames: ["Project X"],
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state", () => {
    render(
      <UserTable
        users={[]}
        loading={true}
        onDelete={mockDelete}
        onResetPassword={mockResetPassword}
        currentPage={1}
        totalPages={1}
        totalRecords={0}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByText("Loading users...")).toBeInTheDocument();
  });

  it("renders table headers", () => {
    render(
      <UserTable
        users={users}
        loading={false}
        onDelete={mockDelete}
        onResetPassword={mockResetPassword}
        currentPage={1}
        totalPages={1}
        totalRecords={2}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByText("Full Name")).toBeInTheDocument();
    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(screen.getByText("Role")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();
  });

  it("renders user information", () => {
    render(
      <UserTable
        users={users}
        loading={false}
        onDelete={mockDelete}
        onResetPassword={mockResetPassword}
        currentPage={1}
        totalPages={1}
        totalRecords={2}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByText("Sachin Nelwade")).toBeInTheDocument();
    expect(screen.getByText("sachin")).toBeInTheDocument();

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john")).toBeInTheDocument();
  });

  it("shows formatted role names", () => {
    render(
      <UserTable
        users={users}
        loading={false}
        onDelete={mockDelete}
        onResetPassword={mockResetPassword}
        currentPage={1}
        totalPages={1}
        totalRecords={2}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByText("Admin")).toBeInTheDocument();
    expect(screen.getByText("Implementation User")).toBeInTheDocument();
  });

  it("shows active and inactive status", () => {
    render(
      <UserTable
        users={users}
        loading={false}
        onDelete={mockDelete}
        onResetPassword={mockResetPassword}
        currentPage={1}
        totalPages={1}
        totalRecords={2}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByText("Active")).toBeInTheDocument();
    expect(screen.getByText("Inactive")).toBeInTheDocument();
  });

  it("calls navigate when edit button is clicked", () => {
    render(
      <UserTable
        users={users}
        loading={false}
        onDelete={mockDelete}
        onResetPassword={mockResetPassword}
        currentPage={1}
        totalPages={1}
        totalRecords={2}
        onPageChange={mockOnPageChange}
      />
    );

    fireEvent.click(screen.getAllByTitle("Edit User")[0]);

    expect(mockNavigate).toHaveBeenCalledWith("/users/edit", {
      state: { user: users[0] },
    });
  });

  it("calls reset password callback", () => {
    render(
      <UserTable
        users={users}
        loading={false}
        onDelete={mockDelete}
        onResetPassword={mockResetPassword}
        currentPage={1}
        totalPages={1}
        totalRecords={2}
        onPageChange={mockOnPageChange}
      />
    );

    fireEvent.click(screen.getAllByTitle("Reset Password")[0]);

    expect(mockResetPassword).toHaveBeenCalledWith(users[0]);
  });

  it("calls delete callback", () => {
    render(
      <UserTable
        users={users}
        loading={false}
        onDelete={mockDelete}
        onResetPassword={mockResetPassword}
        currentPage={1}
        totalPages={1}
        totalRecords={2}
        onPageChange={mockOnPageChange}
      />
    );

    fireEvent.click(screen.getAllByTitle("Delete User")[0]);

    expect(mockDelete).toHaveBeenCalledWith(1);
  });

  it("shows no users message", () => {
    render(
      <UserTable
        users={[]}
        loading={false}
        onDelete={mockDelete}
        onResetPassword={mockResetPassword}
        currentPage={1}
        totalPages={1}
        totalRecords={0}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByText("No users found.")).toBeInTheDocument();
  });

  it("renders pagination", () => {
    render(
      <UserTable
        users={users}
        loading={false}
        onDelete={mockDelete}
        onResetPassword={mockResetPassword}
        currentPage={1}
        totalPages={2}
        totalRecords={2}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByTestId("pagination")).toBeInTheDocument();
  });

  it("calls page change callback", () => {
    render(
      <UserTable
        users={users}
        loading={false}
        onDelete={mockDelete}
        onResetPassword={mockResetPassword}
        currentPage={1}
        totalPages={2}
        totalRecords={2}
        onPageChange={mockOnPageChange}
      />
    );

    fireEvent.click(screen.getByText("Next Page"));

    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it("shows +1 when more than two projects exist", () => {
    render(
      <UserTable
        users={[users[0]]}
        loading={false}
        onDelete={mockDelete}
        onResetPassword={mockResetPassword}
        currentPage={1}
        totalPages={1}
        totalRecords={1}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByText("+1")).toBeInTheDocument();
  });
});