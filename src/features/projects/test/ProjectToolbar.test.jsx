import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import ProjectToolbar from "../components/ProjectToolbar";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("../../../components/common/CustomDropdown", () => ({
  default: ({ label, value, onChange, options }) => (
    <div>
      <label>{label}</label>
      <select
        data-testid={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">All</option>
        {options.map((option) => (
          <option
            key={option.value ?? option}
            value={option.value ?? option}
          >
            {option.label ?? option}
          </option>
        ))}
      </select>
    </div>
  ),
}));

vi.mock("../../../components/common/SearchInput", () => ({
  default: ({ value, onChange, placeholder }) => (
    <input
      data-testid="search-input"
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  ),
}));

describe("ProjectToolbar", () => {
  const setSearch = vi.fn();
  const setSelectedBank = vi.fn();
  const setSelectedStatus = vi.fn();

  const defaultProps = {
    search: "",
    setSearch,
    selectedBank: "",
    setSelectedBank,
    selectedStatus: "",
    setSelectedStatus,
    banks: ["SBI", "ICICI"],
    onRefresh: vi.fn(),
    onExport: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();

    sessionStorage.setItem(
      "user",
      JSON.stringify({
        role: "ADMIN",
      })
    );
  });

  it("renders all controls", () => {
    render(<ProjectToolbar {...defaultProps} />);

    expect(screen.getByTestId("Bank")).toBeInTheDocument();
    expect(screen.getByTestId("Status")).toBeInTheDocument();
    expect(screen.getByTestId("search-input")).toBeInTheDocument();
  });

  it("renders Create Project button for ADMIN", () => {
    render(<ProjectToolbar {...defaultProps} />);

    expect(
      screen.getByRole("button", {
        name: /create project/i,
      })
    ).toBeInTheDocument();
  });

  it("does not render Create Project button for USER", () => {
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        role: "USER",
      })
    );

    render(<ProjectToolbar {...defaultProps} />);

    expect(
      screen.queryByRole("button", {
        name: /create project/i,
      })
    ).not.toBeInTheDocument();
  });

  it("calls setSelectedBank", () => {
    render(<ProjectToolbar {...defaultProps} />);

    fireEvent.change(screen.getByTestId("Bank"), {
      target: { value: "SBI" },
    });

    expect(setSelectedBank).toHaveBeenCalledWith("SBI");
  });

  it("calls setSelectedStatus", () => {
    render(<ProjectToolbar {...defaultProps} />);

    fireEvent.change(screen.getByTestId("Status"), {
      target: { value: "Completed" },
    });

    expect(setSelectedStatus).toHaveBeenCalledWith("Completed");
  });

  it("calls setSearch", () => {
    render(<ProjectToolbar {...defaultProps} />);

    fireEvent.change(screen.getByTestId("search-input"), {
      target: { value: "Core Banking" },
    });

    expect(setSearch).toHaveBeenCalledWith("Core Banking");
  });

  it("navigates to create page", () => {
    render(<ProjectToolbar {...defaultProps} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /create project/i,
      })
    );

    expect(mockNavigate).toHaveBeenCalledWith("create");
  });

  it("renders bank options", () => {
    render(<ProjectToolbar {...defaultProps} />);

    expect(screen.getByText("SBI")).toBeInTheDocument();
    expect(screen.getByText("ICICI")).toBeInTheDocument();
  });

  it("renders status options", () => {
    render(<ProjectToolbar {...defaultProps} />);

    expect(screen.getByText("On Track")).toBeInTheDocument();
    expect(screen.getByText("Completed")).toBeInTheDocument();
    expect(screen.getByText("Delayed")).toBeInTheDocument();
    expect(screen.getByText("In Progress")).toBeInTheDocument();
  });

  it("renders search placeholder", () => {
    render(<ProjectToolbar {...defaultProps} />);

    expect(
      screen.getByPlaceholderText(
        "Search Project, Bank or Manager..."
      )
    ).toBeInTheDocument();
  });
});