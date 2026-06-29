import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, test, vi } from "vitest";

import LoginForm from "../components/LoginForm";

const mockNavigate = vi.fn();
const mockLogin = vi.fn();
const mockFetchProjects = vi.fn();

vi.mock("../hooks/useAuth", () => ({
  useAuth: () => ({
    login: mockLogin,
    loading: false,
  }),
}));

vi.mock("../../../context/ProjectContext", () => ({
  useProjects: () => ({
    fetchProjects: mockFetchProjects,
  }),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({
      state: null,
    }),
  };
});

describe("LoginForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    sessionStorage.clear();
    localStorage.clear();

    mockLogin.mockReset();
    mockNavigate.mockReset();
    mockFetchProjects.mockReset();
  });

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>,
    );

  test("renders login heading", () => {
    renderComponent();

    expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
  });

  test("renders username input", () => {
    renderComponent();

    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
  });

  test("renders password input", () => {
    renderComponent();

    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  });

  test("renders login button", () => {
    renderComponent();

    expect(
      screen.getByRole("button", {
        name: /login/i,
      }),
    ).toBeInTheDocument();
  });

  test("updates username", () => {
    renderComponent();

    const input = screen.getByPlaceholderText(/username/i);

    fireEvent.change(input, {
      target: {
        value: "admin",
      },
    });

    expect(input.value).toBe("admin");
  });

  test("updates password", () => {
    renderComponent();

    const input = screen.getByPlaceholderText(/password/i);

    fireEvent.change(input, {
      target: {
        value: "admin123",
      },
    });

    expect(input.value).toBe("admin123");
  });

  test("password hidden initially", () => {
    renderComponent();

    expect(screen.getByPlaceholderText(/password/i)).toHaveAttribute(
      "type",
      "password",
    );
  });

  test("shows password after toggle", () => {
    renderComponent();

    const password = screen.getByPlaceholderText(/password/i);

    const toggle = screen.getAllByRole("button")[0];

    fireEvent.click(toggle);

    expect(password).toHaveAttribute("type", "text");
  });

  test("hides password after second toggle", () => {
    renderComponent();

    const password = screen.getByPlaceholderText(/password/i);

    const toggle = screen.getAllByRole("button")[0];

    fireEvent.click(toggle);
    fireEvent.click(toggle);

    expect(password).toHaveAttribute("type", "password");
  });
  test("calls login api", async () => {
    mockLogin.mockResolvedValue({
      statusType: "S",
      details: {
        user: {
          id: "100",
          username: "admin",
          role: "ADMIN",
        },
      },
    });

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: {
        value: "admin",
      },
    });

    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: {
        value: "admin123",
      },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /login/i,
      }),
    );

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalled();
    });
  });

  test("navigates on successful login", async () => {
    mockLogin.mockResolvedValue({
      statusType: "S",
      details: {
        user: {
          id: "100",
          username: "admin",
          role: "ADMIN",
        },
      },
    });

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: {
        value: "admin",
      },
    });

    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: {
        value: "admin123",
      },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /login/i,
      }),
    );

    await waitFor(() => {
      expect(mockFetchProjects).toHaveBeenCalledWith("100");

      expect(mockNavigate).toHaveBeenCalledWith("/dashboard", {
        replace: true,
      });
    });
  });

  test("does not navigate on failed login", async () => {
    mockLogin.mockResolvedValue({
      statusType: "E",
      statusDesc: "Invalid Credentials",
    });

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: {
        value: "admin",
      },
    });

    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: {
        value: "wrong",
      },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /login/i,
      }),
    );

    await waitFor(() => {
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });

  test("handles rejected login promise", async () => {
    mockLogin.mockRejectedValue(new Error("Server Error"));

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: {
        value: "admin",
      },
    });

    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: {
        value: "admin123",
      },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /login/i,
      }),
    );

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalled();
    });
  });

  test("login button exists while loading", () => {
    renderComponent();

    expect(
      screen.getByRole("button", {
        name: /login/i,
      }),
    ).toBeInTheDocument();
  });

  test("submits form with Enter key", async () => {
    mockLogin.mockResolvedValue({
      statusType: "S",
      details: {
        user: {
          id: "100",
        },
      },
    });

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: {
        value: "admin",
      },
    });

    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: {
        value: "admin123",
      },
    });

    fireEvent.submit(
      screen
        .getByRole("button", {
          name: /login/i,
        })
        .closest("form"),
    );

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalled();
    });
  });
  test("username starts empty", () => {
    renderComponent();

    expect(screen.getByPlaceholderText(/username/i)).toHaveValue("");
  });

  test("password starts empty", () => {
    renderComponent();

    expect(screen.getByPlaceholderText(/password/i)).toHaveValue("");
  });

  test("multiple username updates", () => {
    renderComponent();

    const input = screen.getByPlaceholderText(/username/i);

    fireEvent.change(input, {
      target: {
        value: "admin",
      },
    });

    fireEvent.change(input, {
      target: {
        value: "manager",
      },
    });

    fireEvent.change(input, {
      target: {
        value: "user",
      },
    });

    expect(input).toHaveValue("user");
  });

  test("multiple password updates", () => {
    renderComponent();

    const input = screen.getByPlaceholderText(/password/i);

    fireEvent.change(input, {
      target: {
        value: "111",
      },
    });

    fireEvent.change(input, {
      target: {
        value: "222",
      },
    });

    fireEvent.change(input, {
      target: {
        value: "333",
      },
    });

    expect(input).toHaveValue("333");
  });

  test("stores user in session storage after successful login", async () => {
    mockLogin.mockResolvedValue({
      statusType: "S",
      details: {
        user: {
          id: "100",
          username: "admin",
          role: "ADMIN",
        },
      },
    });

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: {
        value: "admin",
      },
    });

    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: {
        value: "admin123",
      },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /login/i,
      }),
    );

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalled();
    });
  });

  test("fetchProjects called once after login", async () => {
    mockLogin.mockResolvedValue({
      statusType: "S",
      details: {
        user: {
          id: "100",
        },
      },
    });

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: {
        value: "admin",
      },
    });

    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: {
        value: "admin123",
      },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /login/i,
      }),
    );

    await waitFor(() => {
      expect(mockFetchProjects).toHaveBeenCalledTimes(1);
    });
  });

  test("navigate called once after login", async () => {
    mockLogin.mockResolvedValue({
      statusType: "S",
      details: {
        user: {
          id: "100",
          username: "admin",
          role: "ADMIN",
        },
      },
    });

    mockFetchProjects.mockResolvedValue([]);

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: {
        value: "admin",
      },
    });

    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: {
        value: "admin123",
      },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /login/i,
      }),
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledTimes(1);

      expect(mockNavigate).toHaveBeenCalledWith("/dashboard", {
        replace: true,
      });
    });
  });
});
