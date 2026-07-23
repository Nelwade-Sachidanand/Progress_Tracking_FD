import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import UserManagementPage from "../pages/UserManagementPage";

const mockNavigate = vi.fn();
const mockDeleteUser = vi.fn();
const mockFetchUsers = vi.fn();
const mockResetPassword = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
  useLocation: () => ({
    search: "",
  }),
}));

vi.mock("../../../context/ProjectContext", () => ({
  useProjects: () => ({
    projects: [
      {
        id: 1,
        bankName: "State Bank of India (SBI)",
      },
    ],
  }),
}));

vi.mock("../hooks/useUsers", () => ({
  useUsers: () => ({
    users: [
      {
        id: 1,
        fullname: "Sachin",
        username: "sachin",
        role: "ADMIN",
        status: true,
        projectIds: [1],
      },
      {
        id: 2,
        fullname: "John",
        username: "john",
        role: "USER",
        status: false,
        projectIds: [1],
      },
    ],
    loading: false,
    deleteUser: mockDeleteUser,
    fetchUsers: mockFetchUsers,
    resetPassword: mockResetPassword,
  }),
}));

vi.mock("sweetalert2", () => ({
  default: {
    fire: vi.fn(() =>
      Promise.resolve({
        isConfirmed: true,
      })
    ),
  },
}));

vi.mock("../components/UserStatsCards", () => ({
  default: () => <div>UserStatsCards</div>,
}));

vi.mock("../components/UserFilters", () => ({
  default: (props) => (
    <div>
      UserFilters
      <button
        onClick={() => props.setSearchTerm("Sachin")}
      >
        Search
      </button>
    </div>
  ),
}));

vi.mock("../components/UserTable", () => ({
  default: (props) => (
    <div>
      UserTable
      <button
        onClick={() => props.onDelete(1)}
      >
        Delete User
      </button>

      <button
        onClick={() =>
          props.onResetPassword({
            id: 1,
            username: "sachin",
          })
        }
      >
        Reset Password
      </button>
    </div>
  ),
}));

vi.mock("../ResetPasswordModal", () => ({
  default: ({ isOpen }) =>
    isOpen ? (
      <div>ResetPasswordModal</div>
    ) : null,
}));

describe("UserManagementPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all child components", () => {
    render(<UserManagementPage />);

    expect(screen.getByText("UserStatsCards")).toBeInTheDocument();
    expect(screen.getByText("UserFilters")).toBeInTheDocument();
    expect(screen.getByText("UserTable")).toBeInTheDocument();
  });

 it("opens reset password modal", () => {
  render(<UserManagementPage />);

  fireEvent.click(screen.getByText("Reset Password"));

  expect(
    screen.getByText("Generate Temprary Password")
  ).toBeInTheDocument();
});

 it("deletes user after confirmation", async () => {
  mockDeleteUser.mockResolvedValue({
    statusType: "S",
  });

  render(<UserManagementPage />);

  fireEvent.click(
    screen.getByText("Delete User")
  );

  await waitFor(() => {
    expect(mockDeleteUser).toHaveBeenCalledWith(1);
    expect(mockFetchUsers).toHaveBeenCalled();
  });
});

  it("changes search term", () => {
    render(<UserManagementPage />);

    fireEvent.click(
      screen.getByText("Search")
    );

    expect(
      screen.getByText("UserTable")
    ).toBeInTheDocument();
  });

  it("renders without crashing when users list is empty", () => {
    vi.doMock("../hooks/useUsers", () => ({
      useUsers: () => ({
        users: [],
        loading: false,
        deleteUser: vi.fn(),
        fetchUsers: vi.fn(),
        resetPassword: vi.fn(),
      }),
    }));

    render(<UserManagementPage />);

    expect(screen.getByText("UserTable")).toBeInTheDocument();
  });
});