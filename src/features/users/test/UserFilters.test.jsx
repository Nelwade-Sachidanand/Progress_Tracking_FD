import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import UserFilters from "../components/UserFilters";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("../../../components/common/CustomDropdown", () => ({
  default: ({
    label,
    value,
    onChange,
    options,
  }) => (
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
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  ),
}));

vi.mock("../../../components/common/SearchInput", () => ({
  default: ({
    value,
    onChange,
    placeholder,
  }) => (
    <input
      data-testid="search-input"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  ),
}));

describe("UserFilters", () => {
  const defaultProps = {
    searchTerm: "",
    setSearchTerm: vi.fn(),
    roleFilter: "",
    setRoleFilter: vi.fn(),
    statusFilter: "",
    setStatusFilter: vi.fn(),
    bankFilter: "",
    setBankFilter: vi.fn(),
    banks: [
      "State Bank of India (SBI)",
      "Punjab National Bank (PNB)",
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all filters", () => {
    render(<UserFilters {...defaultProps} />);

    expect(screen.getByText("Role")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Bank")).toBeInTheDocument();
    expect(screen.getByTestId("search-input")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add user/i })
    ).toBeInTheDocument();
  });

  it("calls setSearchTerm when typing", () => {
    render(<UserFilters {...defaultProps} />);

    fireEvent.change(screen.getByTestId("search-input"), {
      target: { value: "Sachin" },
    });

    expect(defaultProps.setSearchTerm).toHaveBeenCalled();
  });

  it("calls setRoleFilter", () => {
    render(<UserFilters {...defaultProps} />);

    fireEvent.change(screen.getByTestId("Role"), {
      target: { value: "ADMIN" },
    });

    expect(defaultProps.setRoleFilter).toHaveBeenCalledWith(
      "ADMIN"
    );
  });

  it("calls setStatusFilter", () => {
    render(<UserFilters {...defaultProps} />);

    fireEvent.change(screen.getByTestId("Status"), {
      target: { value: "true" },
    });

    expect(defaultProps.setStatusFilter).toHaveBeenCalledWith(
      "true"
    );
  });

  it("calls setBankFilter", () => {
    render(<UserFilters {...defaultProps} />);

    fireEvent.change(screen.getByTestId("Bank"), {
      target: {
        value: "State Bank of India (SBI)",
      },
    });

    expect(defaultProps.setBankFilter).toHaveBeenCalledWith(
      "State Bank of India (SBI)"
    );
  });

  it("shows bank short names", () => {
    render(<UserFilters {...defaultProps} />);

    expect(screen.getByText("SBI")).toBeInTheDocument();
    expect(screen.getByText("PNB")).toBeInTheDocument();
  });

  it("navigates to add user page", () => {
    render(<UserFilters {...defaultProps} />);

    fireEvent.click(
      screen.getByRole("button", { name: /add user/i })
    );

    expect(mockNavigate).toHaveBeenCalledWith("/users/add");
  });

  it("renders with empty banks", () => {
    render(
      <UserFilters
        {...defaultProps}
        banks={[]}
      />
    );

    expect(screen.getByText("Bank")).toBeInTheDocument();
  });

  it("renders placeholder text", () => {
    render(<UserFilters {...defaultProps} />);

    expect(
      screen.getByPlaceholderText("Search Users...")
    ).toBeInTheDocument();
  });
});