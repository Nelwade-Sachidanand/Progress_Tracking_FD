import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import BackButton from "../components/tabs/BackButton";

// Mock react-router-dom
const mockNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

describe("BackButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders default label", () => {
    render(<BackButton />);

    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByText("Back to Projects")).toBeInTheDocument();
  });

  it("renders custom label", () => {
    render(<BackButton label="Go Back" />);

    expect(screen.getByText("Go Back")).toBeInTheDocument();
  });

  it("navigates to default path when clicked", () => {
    render(<BackButton />);

    fireEvent.click(screen.getByRole("button"));

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("/projects");
  });

  it("navigates to custom path when clicked", () => {
    render(<BackButton path="/dashboard" />);

    fireEvent.click(screen.getByRole("button"));

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
  });

  it("renders arrow icon", () => {
    const { container } = render(<BackButton />);

    // lucide-react icons render an SVG
    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});