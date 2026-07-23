import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { toast } from "react-toastify";
import { beforeEach, describe, expect, it, vi } from "vitest";
import UserForm from "../components/UserForm";

const mockNavigate = vi.fn();
const mockCreateUser = vi.fn();
const mockUpdateUser = vi.fn();
const mockToastError = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

const mocks = vi.hoisted(() => ({
  toastError: vi.fn(),
  toastSuccess: vi.fn(),
}));

vi.mock("react-toastify", () => ({
  toast: {
    error: mocks.toastError,
    success: mocks.toastSuccess,
  },
}));

vi.mock("../../../context/ProjectContext", () => ({
  useProjects: () => ({
    projects: [
      { id: 1, projectName: "Project A" },
      { id: 2, projectName: "Project B" },
    ],
  }),
}));

vi.mock("../hooks/useUsers", () => ({
  useUsers: () => ({
    createUser: mockCreateUser,
    updateUser: mockUpdateUser,
  }),
}));

vi.mock("../../../components/common/CustomDropdown", () => ({
  default: ({ label }) => <div>{label}</div>,
}));

vi.mock("../../../components/common/MultiSelectDropdown", () => ({
  default: ({ label }) => <div>{label}</div>,
}));

describe("UserForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders add mode", () => {
    render(<UserForm mode="add" />);

    expect(screen.getByText("Add User")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /save user/i })).toBeInTheDocument();
  });

  it("renders edit mode", () => {
    render(
      <UserForm
        mode="edit"
        userData={{
          id: 1,
          fullname: "Sachin",
          username: "sachin",
          email: "test@test.com",
          role: "ADMIN",
          status: true,
          projectNames: [],
        }}
      />
    );

    expect(screen.getByText("Edit User")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /update user/i })
    ).toBeInTheDocument();
  });

  it("renders all input fields", () => {
    render(<UserForm mode="add" />);

    expect(screen.getByPlaceholderText("Enter Full Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter Password")).toBeInTheDocument();
  });

  it("changes input values", () => {
    render(<UserForm mode="add" />);

    fireEvent.change(
      screen.getByPlaceholderText("Enter Full Name"),
      {
        target: { value: "Sachin Nelwade" },
      }
    );

    expect(
      screen.getByPlaceholderText("Enter Full Name")
    ).toHaveValue("Sachin Nelwade");
  });

  it("toggles password visibility", () => {
    render(<UserForm mode="add" />);

    const passwordInput = screen.getByPlaceholderText("Enter Password");

    expect(passwordInput).toHaveAttribute("type", "password");

    fireEvent.click(screen.getAllByRole("button")[1]);

    expect(passwordInput).toHaveAttribute("type", "text");
  });

  it("shows validation when full name is empty", async () => {
    render(<UserForm mode="add" />);

    fireEvent.click(
      screen.getByRole("button", { name: /save user/i })
    );

    await waitFor(() => {
      expect(mocks.toastError).toHaveBeenCalled();
    });
  });

  it("navigates when cancel is clicked", () => {
    render(<UserForm mode="add" />);

    fireEvent.click(
      screen.getByRole("button", { name: /cancel/i })
    );

    expect(mockNavigate).toHaveBeenCalledWith("/users");
  });

  it("renders dropdown labels", () => {
    render(<UserForm mode="add" />);

    expect(screen.getByText("Role")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Assign Project")).toBeInTheDocument();
  });

  it("shows no selected projects initially", () => {
    render(<UserForm mode="add" />);

    expect(
      screen.getByText("No project selected")
    ).toBeInTheDocument();
  });

  it("shows update button in edit mode", () => {
    render(
      <UserForm
        mode="edit"
        userData={{
          id: 1,
          fullname: "Sachin",
          username: "sachin",
          email: "abc@test.com",
          role: "ADMIN",
          status: true,
          projectNames: [],
        }}
      />
    );

    expect(
      screen.getByRole("button", {
        name: /update user/i,
      })
    ).toBeInTheDocument();
  });
});