import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import UserForm from "../components/UserForm";

const mockNavigate = vi.fn();
const mockCreateUser = vi.fn();
const mockUpdateUser = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("../hooks/useUsers", () => ({
  useUsers: () => ({
    createUser: mockCreateUser,
    updateUser: mockUpdateUser,
  }),
}));

describe("UserForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    localStorage.clear();

    localStorage.setItem(
      "projects",
      JSON.stringify([
        {
          id: "1",
          projectName: "Project A",
        },
        {
          id: "2",
          projectName: "Project B",
        },
      ]),
    );
  });

  it("renders add user mode", () => {
    render(<UserForm />);

    expect(screen.getByText("Add User")).toBeInTheDocument();

    expect(
      screen.getByText("Create and assign a new user"),
    ).toBeInTheDocument();
  });

  it("renders edit user mode", () => {
    render(
      <UserForm
        mode="edit"
        userData={{
          fullname: "Sachin",
          username: "sachin",
          role: "ADMIN",
          active: true,
          projectNames: ["Project A"],
        }}
      />,
    );

    expect(screen.getByText("Edit User")).toBeInTheDocument();

    expect(screen.getByText("Update user information")).toBeInTheDocument();
  });

  it("updates form fields", () => {
    render(<UserForm />);

    fireEvent.change(screen.getByPlaceholderText("Enter full name"), {
      target: {
        value: "Sachin",
      },
    });

    fireEvent.change(screen.getByPlaceholderText("Enter username"), {
      target: {
        value: "sachin",
      },
    });

    fireEvent.change(screen.getByPlaceholderText("Enter password"), {
      target: {
        value: "123456",
      },
    });

    expect(screen.getByDisplayValue("Sachin")).toBeInTheDocument();

    expect(screen.getByDisplayValue("sachin")).toBeInTheDocument();

    expect(screen.getByDisplayValue("123456")).toBeInTheDocument();
  });

  it("adds project", () => {
    render(<UserForm />);

    fireEvent.click(screen.getByText("Project A"));

    expect(screen.getAllByText("Project A").length).toBeGreaterThan(1);
  });

  it("removes selected project", () => {
    render(<UserForm />);

    fireEvent.click(screen.getByText("Project A"));

    const removeButtons = screen.getAllByRole("button");

    fireEvent.click(removeButtons[1]);

    expect(screen.getByText("Project A")).toBeInTheDocument();
  });

  it("calls createUser in add mode", async () => {
    mockCreateUser.mockResolvedValue({
      statusType: "S",
    });

    render(<UserForm />);

    fireEvent.change(screen.getByPlaceholderText("Enter full name"), {
      target: {
        value: "Sachin",
      },
    });

    fireEvent.change(screen.getByPlaceholderText("Enter username"), {
      target: {
        value: "sachin",
      },
    });

    fireEvent.change(screen.getByPlaceholderText("Enter password"), {
      target: {
        value: "123",
      },
    });

    fireEvent.click(screen.getByText("Project A"));

    fireEvent.click(screen.getByText("Save User"));

    await waitFor(() => {
      expect(mockCreateUser).toHaveBeenCalledTimes(1);
    });

    expect(mockNavigate).toHaveBeenCalledWith("/users");
  });

  it("calls updateUser in edit mode", async () => {
    mockUpdateUser.mockResolvedValue({
      statusType: "S",
    });

    render(
      <UserForm
        mode="edit"
        userData={{
          fullname: "Sachin",
          username: "sachin",
          role: "ADMIN",
          active: true,
          projectNames: [],
        }}
      />,
    );

    fireEvent.click(screen.getByText("Update User"));

    await waitFor(() => {
      expect(mockUpdateUser).toHaveBeenCalledTimes(1);
    });

    expect(mockNavigate).toHaveBeenCalledWith("/users");
  });

  it("navigates back when cancel clicked", () => {
    render(<UserForm />);

    fireEvent.click(screen.getByText("Cancel"));

    expect(mockNavigate).toHaveBeenCalledWith("/users");
  });

  it("navigates back when back button clicked", () => {
    render(<UserForm />);

    const buttons = screen.getAllByRole("button");

    fireEvent.click(buttons[0]);

    expect(mockNavigate).toHaveBeenCalledWith("/users");
  });

  it("loads user data in edit mode", () => {
    render(
      <UserForm
        mode="edit"
        userData={{
          fullname: "John Doe",
          username: "john",
          role: "ADMIN",
          active: true,
          projectNames: ["Project A"],
        }}
      />,
    );

    expect(screen.getByDisplayValue("John Doe")).toBeInTheDocument();

    expect(screen.getByDisplayValue("john")).toBeInTheDocument();

    expect(screen.getByDisplayValue("ADMIN")).toBeInTheDocument();

    expect(screen.getByDisplayValue("ACTIVE")).toBeInTheDocument();
  });

  it("handles createUser failure", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    mockCreateUser.mockRejectedValue(new Error("API Error"));

    render(<UserForm />);

    fireEvent.click(screen.getByText("Save User"));

    await waitFor(() => {
      expect(errorSpy).toHaveBeenCalled();
    });

    errorSpy.mockRestore();
  });
});
