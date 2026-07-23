import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import AuthorizationFilters from "../components/AuthorizationFilters";

// ---------------- Mock SearchInput ----------------

vi.mock("../../../components/common/SearchInput", () => ({
  default: ({ value, onChange, placeholder }) => (
    <input
      data-testid="search-input"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  ),
}));

// ---------------- Mock CustomDropdown ----------------

vi.mock("../../../components/common/CustomDropdown", () => ({
  default: ({
    value,
    onChange,
    options,
    placeholder,
  }) => (
    <select
      data-testid={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">{placeholder}</option>

      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  ),
}));

describe("AuthorizationFilters", () => {
  const setSearch = vi.fn();
  const setRequestType = vi.fn();
  const setStatus = vi.fn();
  const setRequestedBy = vi.fn();
  const clearFilters = vi.fn();

  const logs = [
    {
      requestSource: "CREATE_ACTIVITY",
      status: "PENDING",
      requestedBy: "ADMIN_USER",
    },
    {
      requestSource: "UPDATE_ACTIVITY",
      status: "APPROVED",
      requestedBy: "SACHIN",
    },
    {
      requestSource: "CREATE_ACTIVITY",
      status: "REJECTED",
      requestedBy: "ADMIN_USER",
    },
  ];

  const defaultProps = {
    logs,
    search: "",
    setSearch,
    requestType: "",
    setRequestType,
    status: "",
    setStatus,
    requestedBy: "",
    setRequestedBy,
    clearFilters,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders search input", () => {
    render(<AuthorizationFilters {...defaultProps} />);

    expect(
      screen.getByPlaceholderText("Search Resource...")
    ).toBeInTheDocument();
  });

  it("renders request type dropdown", () => {
    render(<AuthorizationFilters {...defaultProps} />);

    expect(
      screen.getByTestId("All Request Types")
    ).toBeInTheDocument();
  });

  it("renders status dropdown", () => {
    render(<AuthorizationFilters {...defaultProps} />);

    expect(
      screen.getByTestId("All Status")
    ).toBeInTheDocument();
  });

  it("renders requested by dropdown", () => {
    render(<AuthorizationFilters {...defaultProps} />);

    expect(
      screen.getByTestId("All Users")
    ).toBeInTheDocument();
  });

  it("renders clear filters button", () => {
    render(<AuthorizationFilters {...defaultProps} />);

    expect(
      screen.getByRole("button", {
        name: /clear filters/i,
      })
    ).toBeInTheDocument();
  });

  it("updates search value", () => {
    render(<AuthorizationFilters {...defaultProps} />);

    fireEvent.change(
      screen.getByPlaceholderText("Search Resource..."),
      {
        target: {
          value: "Project",
        },
      }
    );

    expect(setSearch).toHaveBeenCalledWith("Project");
  });

  it("updates request type", () => {
    render(<AuthorizationFilters {...defaultProps} />);

    fireEvent.change(
      screen.getByTestId("All Request Types"),
      {
        target: {
          value: "CREATE_ACTIVITY",
        },
      }
    );

    expect(setRequestType).toHaveBeenCalledWith(
      "CREATE_ACTIVITY"
    );
  });

  it("updates status", () => {
    render(<AuthorizationFilters {...defaultProps} />);

    fireEvent.change(
      screen.getByTestId("All Status"),
      {
        target: {
          value: "APPROVED",
        },
      }
    );

    expect(setStatus).toHaveBeenCalledWith("APPROVED");
  });

  it("updates requested by", () => {
    render(<AuthorizationFilters {...defaultProps} />);

    fireEvent.change(
      screen.getByTestId("All Users"),
      {
        target: {
          value: "SACHIN",
        },
      }
    );

    expect(setRequestedBy).toHaveBeenCalledWith(
      "SACHIN"
    );
  });

  it("calls clearFilters", () => {
    render(<AuthorizationFilters {...defaultProps} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /clear filters/i,
      })
    );

    expect(clearFilters).toHaveBeenCalledTimes(1);
  });

  it("renders formatted request type options", () => {
    render(<AuthorizationFilters {...defaultProps} />);

    expect(
      screen.getByRole("option", {
        name: "Create_Activity",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("option", {
        name: "Update_Activity",
      })
    ).toBeInTheDocument();
  });

  it("renders formatted status options", () => {
    render(<AuthorizationFilters {...defaultProps} />);

    expect(
      screen.getByRole("option", {
        name: "Pending",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("option", {
        name: "Approved",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("option", {
        name: "Rejected",
      })
    ).toBeInTheDocument();
  });

  it("renders formatted users", () => {
    render(<AuthorizationFilters {...defaultProps} />);

    expect(
      screen.getByRole("option", {
        name: "Admin_User",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("option", {
        name: "Sachin",
      })
    ).toBeInTheDocument();
  });

  it("renders unique request types", () => {
    render(<AuthorizationFilters {...defaultProps} />);

    expect(
      screen.getAllByRole("option", {
        name: "Create_Activity",
      })
    ).toHaveLength(1);
  });

  it("renders correctly with empty logs", () => {
    render(
      <AuthorizationFilters
        {...defaultProps}
        logs={[]}
      />
    );

    expect(
      screen.getByPlaceholderText("Search Resource...")
    ).toBeInTheDocument();
  });

  it("renders selected values", () => {
    render(
      <AuthorizationFilters
        {...defaultProps}
        search="Project"
        requestType="CREATE_ACTIVITY"
        status="APPROVED"
        requestedBy="SACHIN"
      />
    );

    expect(
      screen.getByDisplayValue("Project")
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("All Request Types")
    ).toHaveValue("CREATE_ACTIVITY");

    expect(
      screen.getByTestId("All Status")
    ).toHaveValue("APPROVED");

    expect(
      screen.getByTestId("All Users")
    ).toHaveValue("SACHIN");
  });

  it("does not call handlers on initial render", () => {
    render(<AuthorizationFilters {...defaultProps} />);

    expect(setSearch).not.toHaveBeenCalled();
    expect(setRequestType).not.toHaveBeenCalled();
    expect(setStatus).not.toHaveBeenCalled();
    expect(setRequestedBy).not.toHaveBeenCalled();
    expect(clearFilters).not.toHaveBeenCalled();
  });
});