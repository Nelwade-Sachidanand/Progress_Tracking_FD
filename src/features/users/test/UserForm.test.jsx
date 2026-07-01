import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { toast } from "react-toastify";
import { beforeEach, describe, expect, it, vi } from "vitest";
import UserForm from "../components/UserForm";

/* ---------------- MOCKS ---------------- */

const mockNavigate = vi.fn();
const mockCreateUser = vi.fn();
const mockUpdateUser = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("../../../context/ProjectContext", () => ({
  useProjects: () => ({
    projects: [
      { id: "1", projectName: "Project A" },
      { id: "2", projectName: "Project B" },
    ],
  }),
}));

vi.mock("../hooks/useUsers", () => ({
  useUsers: () => ({
    createUser: mockCreateUser,
    updateUser: mockUpdateUser,
  }),
}));

/* ---------------- TEST ---------------- */

describe("UserForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders add user mode", () => {
    render(<UserForm />);

    expect(screen.getByText("Add User")).toBeInTheDocument();
  });

  it("adds project and shows selected project with testid", () => {
    render(<UserForm />);

    fireEvent.click(screen.getByText("Project A"));

    expect(screen.getByTestId("selected-project-ProjectA")).toBeInTheDocument();
  });

  it("removes selected project", () => {
    render(<UserForm />);

    // add project
    fireEvent.click(screen.getByText("Project A"));

    // verify added
    const selected = screen.getByTestId("selected-project-ProjectA");
    expect(selected).toBeInTheDocument();

    // click REMOVE BUTTON INSIDE THAT ELEMENT (IMPORTANT FIX)
    fireEvent.click(selected.querySelector("button"));

    // now verify removed
    expect(
      screen.queryByTestId("selected-project-ProjectA"),
    ).not.toBeInTheDocument();
  });

  it("calls createUser in add mode", async () => {
    mockCreateUser.mockResolvedValue({ statusType: "S" });

    render(<UserForm />);

    fireEvent.change(screen.getByPlaceholderText("Enter full name"), {
      target: { value: "Sachin" },
    });

    fireEvent.change(screen.getByPlaceholderText("Enter username"), {
      target: { value: "sachin" },
    });

    fireEvent.change(screen.getByPlaceholderText("Enter email address"), {
      target: { value: "sachin@test.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Enter password"), {
      target: { value: "Password123" },
    });

    fireEvent.click(screen.getByText("Project A"));

    fireEvent.click(screen.getByText("Save User"));

    await waitFor(() => {
      expect(mockCreateUser).toHaveBeenCalledTimes(1);
    });

    expect(mockNavigate).toHaveBeenCalledWith("/users");
  });

  it("calls updateUser in edit mode", async () => {
    mockUpdateUser.mockResolvedValue({ statusType: "S" });

    render(
      <UserForm
        mode="edit"
        userData={{
          id: "1",
          fullname: "John",
          username: "john",
          email: "john@test.com",
          role: "ADMIN",
          active: true,
          projectNames: ["Project A"],
        }}
      />,
    );

    fireEvent.click(screen.getByText("Update User"));

    await waitFor(() => {
      expect(mockUpdateUser).toHaveBeenCalledTimes(1);
    });
  });

  it("shows error when full name is empty", () => {
    render(<UserForm />);

    fireEvent.click(screen.getByText("Save User"));

    expect(toast.error).toHaveBeenCalled();
  });
});
