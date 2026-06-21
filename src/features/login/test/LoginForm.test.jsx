import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import LoginForm from "../components/LoginForm";

const mockNavigate = vi.fn();
const mockLogin = vi.fn();

vi.mock("../hooks/useAuth", () => ({
  useAuth: () => ({
    login: mockLogin,
    loading: false,
  }),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("LoginForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>,
    );

  test("renders login form", () => {
    renderComponent();

    expect(screen.getByText("Welcome Back")).toBeInTheDocument();
  });

  test("updates username field", () => {
    renderComponent();

    const input = screen.getByPlaceholderText("Enter your username");

    fireEvent.change(input, {
      target: { value: "admin" },
    });

    expect(input.value).toBe("admin");
  });

  test("updates password field", () => {
    renderComponent();

    const input = screen.getByPlaceholderText("Enter your password");

    fireEvent.change(input, {
      target: { value: "password" },
    });

    expect(input.value).toBe("password");
  });

  test("toggle password visibility", () => {
    renderComponent();

    const passwordInput = screen.getByPlaceholderText("Enter your password");

    const toggleBtn = screen.getAllByRole("button")[0];

    expect(passwordInput.type).toBe("password");

    fireEvent.click(toggleBtn);

    expect(passwordInput.type).toBe("text");
  });

  test("successful login", async () => {
    mockLogin.mockResolvedValue({
      statusType: "S",
    });

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText("Enter your username"), {
      target: { value: "admin" },
    });

    fireEvent.change(screen.getByPlaceholderText("Enter your password"), {
      target: { value: "admin123" },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: "Login",
      }),
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });
  });

  test("failed login does not navigate", async () => {
    mockLogin.mockResolvedValue({
      statusType: "E",
    });

    renderComponent();

    fireEvent.click(
      screen.getByRole("button", {
        name: "Login",
      }),
    );

    await waitFor(() => {
      expect(mockNavigate).not.toHaveBeenCalledWith("/dashboard");
    });
  });
});
