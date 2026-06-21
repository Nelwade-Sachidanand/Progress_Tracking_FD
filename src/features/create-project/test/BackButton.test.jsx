import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import BackButton from "../components/tabs/BackButton";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

describe("BackButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders with default label", () => {
    render(<BackButton />);

    expect(
      screen.getByRole("button", {
        name: /back to dashboard/i,
      }),
    ).toBeInTheDocument();
  });

  test("renders custom label", () => {
    render(<BackButton label="Go Back" />);

    expect(
      screen.getByRole("button", {
        name: /go back/i,
      }),
    ).toBeInTheDocument();
  });

  test("navigates to default path when clicked", () => {
    render(<BackButton />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /back to dashboard/i,
      }),
    );

    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
  });

  test("navigates to custom path when clicked", () => {
    render(<BackButton path="/projects" />);

    fireEvent.click(screen.getByRole("button"));

    expect(mockNavigate).toHaveBeenCalledWith("/projects");
  });

  test("calls navigate exactly once on click", () => {
    render(<BackButton />);

    fireEvent.click(screen.getByRole("button"));

    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });

  test("button has type button", () => {
    render(<BackButton />);

    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  test("renders arrow icon", () => {
    const { container } = render(<BackButton />);

    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});
