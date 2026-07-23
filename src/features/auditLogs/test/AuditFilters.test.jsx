import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import AuditFilters from "../components/AuditFilters";

// -------------------- Mock Components --------------------

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

vi.mock("../../../components/common/DateInput", () => ({
  default: ({ value, onChange }) => (
    <input
      data-testid="date-input"
      type="date"
      value={value}
      onChange={onChange}
    />
  ),
}));

vi.mock("../../../components/common/CustomDropdown", () => ({
  default: ({
    value,
    onChange,
    placeholder,
    options,
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

// -------------------- Tests --------------------

describe("AuditFilters", () => {
  const setSearchTerm = vi.fn();
  const setEntityType = vi.fn();
  const setActionType = vi.fn();
  const setSelectedDate = vi.fn();
  const clearFilters = vi.fn();

  const logs = [
    {
      entityType: "USER",
      actionType: "CREATE_USER",
    },
    {
      entityType: "PROJECT",
      actionType: "UPDATE_PROJECT",
    },
    {
      entityType: "TASK",
      actionType: "DELETE_USER",
    },
    {
      entityType: "ACTIVITY",
      actionType: "EXPORT_EXCEL",
    },
    {
      entityType: "PROJECT",
      actionType: "CREATE_PROJECT",
    },
    {
      entityType: "USER",
      actionType: "UPDATE_USER",
    },
    {
      entityType: "PROJECT",
      actionType: "DELETE_PROJECT",
    },
  ];

  const defaultProps = {
    logs,
    searchTerm: "",
    setSearchTerm,
    entityType: "",
    setEntityType,
    actionType: "",
    setActionType,
    selectedDate: "",
    setSelectedDate,
    clearFilters,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders search input", () => {
    render(<AuditFilters {...defaultProps} />);

    expect(
      screen.getByPlaceholderText(
        "Search Entity Name or User..."
      )
    ).toBeInTheDocument();
  });

  it("renders date input", () => {
    render(<AuditFilters {...defaultProps} />);

    expect(
      screen.getByTestId("date-input")
    ).toBeInTheDocument();
  });

  it("renders entity dropdown", () => {
    render(<AuditFilters {...defaultProps} />);

    expect(
      screen.getByTestId("All Entity Types")
    ).toBeInTheDocument();
  });

  it("renders action dropdown", () => {
    render(<AuditFilters {...defaultProps} />);

    expect(
      screen.getByTestId("All Actions")
    ).toBeInTheDocument();
  });

  it("renders clear filters button", () => {
    render(<AuditFilters {...defaultProps} />);

    expect(
      screen.getByRole("button", {
        name: /clear filters/i,
      })
    ).toBeInTheDocument();
  });

  it("updates search value", () => {
    render(<AuditFilters {...defaultProps} />);

    fireEvent.change(
      screen.getByPlaceholderText(
        "Search Entity Name or User..."
      ),
      {
        target: {
          value: "Sachin",
        },
      }
    );

    expect(setSearchTerm).toHaveBeenCalledWith("Sachin");
  });

  it("updates entity type", () => {
    render(<AuditFilters {...defaultProps} />);

    fireEvent.change(
      screen.getByTestId("All Entity Types"),
      {
        target: {
          value: "USER",
        },
      }
    );

    expect(setEntityType).toHaveBeenCalledWith("USER");
  });

  it("updates action type", () => {
    render(<AuditFilters {...defaultProps} />);

    fireEvent.change(
      screen.getByTestId("All Actions"),
      {
        target: {
          value: "CREATE_USER",
        },
      }
    );

    expect(setActionType).toHaveBeenCalledWith(
      "CREATE_USER"
    );
  });

  it("updates selected date", () => {
    render(<AuditFilters {...defaultProps} />);

    fireEvent.change(
      screen.getByTestId("date-input"),
      {
        target: {
          value: "2026-06-20",
        },
      }
    );

    expect(setSelectedDate).toHaveBeenCalledWith(
      "2026-06-20"
    );
  });

  it("calls clearFilters", () => {
    render(<AuditFilters {...defaultProps} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /clear filters/i,
      })
    );

    expect(clearFilters).toHaveBeenCalledTimes(1);
  });

  it("renders formatted entity options", () => {
    render(<AuditFilters {...defaultProps} />);

    expect(
      screen.getByRole("option", {
        name: "User",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("option", {
        name: "Project",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("option", {
        name: "Task",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("option", {
        name: "Activity",
      })
    ).toBeInTheDocument();
  });

  it("renders formatted action options", () => {
    render(<AuditFilters {...defaultProps} />);

    expect(
      screen.getByRole("option", {
        name: "Create User",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("option", {
        name: "Update User",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("option", {
        name: "Delete User",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("option", {
        name: "Create Project",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("option", {
        name: "Update Project",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("option", {
        name: "Delete Project",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("option", {
        name: "Export Excel",
      })
    ).toBeInTheDocument();
  });

  it("renders unique entity types only", () => {
    render(<AuditFilters {...defaultProps} />);

    expect(
      screen.getAllByRole("option", {
        name: "Project",
      })
    ).toHaveLength(1);

    expect(
      screen.getAllByRole("option", {
        name: "User",
      })
    ).toHaveLength(1);
  });

  it("renders correctly with empty logs", () => {
    render(
      <AuditFilters
        {...defaultProps}
        logs={[]}
      />
    );

    expect(
      screen.getByPlaceholderText(
        "Search Entity Name or User..."
      )
    ).toBeInTheDocument();
  });

 it("renders selected values", () => {
  render(
    <AuditFilters
      {...defaultProps}
      searchTerm="Sachin"
      entityType="USER"
      actionType="CREATE_USER"
      selectedDate="2026-06-20"
    />
  );

  expect(screen.getByDisplayValue("Sachin")).toBeInTheDocument();

  expect(
    screen.getByTestId("All Entity Types")
  ).toHaveValue("USER");

  expect(
    screen.getByTestId("All Actions")
  ).toHaveValue("CREATE_USER");

  expect(screen.getByTestId("date-input")).toHaveValue(
    "2026-06-20"
  );
});

  it("does not call handlers on initial render", () => {
    render(<AuditFilters {...defaultProps} />);

    expect(setSearchTerm).not.toHaveBeenCalled();
    expect(setEntityType).not.toHaveBeenCalled();
    expect(setActionType).not.toHaveBeenCalled();
    expect(setSelectedDate).not.toHaveBeenCalled();
    expect(clearFilters).not.toHaveBeenCalled();
  });
});