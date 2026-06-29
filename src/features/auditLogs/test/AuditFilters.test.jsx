import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import AuditFilters from "../components/AuditFilters";

describe("AuditFilters", () => {
  const setSearchTerm = vi.fn();
  const setEntityType = vi.fn();
  const setActionType = vi.fn();
  const setSelectedDate = vi.fn();

  const mockLogs = [
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
    logs: mockLogs,
    searchTerm: "",
    setSearchTerm,
    entityType: "",
    setEntityType,
    actionType: "",
    setActionType,
    selectedDate: "",
    setSelectedDate,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders search input", () => {
    render(<AuditFilters {...defaultProps} />);

    expect(
      screen.getByPlaceholderText("Search entity name, user..."),
    ).toBeInTheDocument();
  });

  it("renders entity type dropdown", () => {
    render(<AuditFilters {...defaultProps} />);

    expect(
      screen.getByRole("option", {
        name: "All Entity Types",
      }),
    ).toBeInTheDocument();
  });

  it("renders action type dropdown", () => {
    render(<AuditFilters {...defaultProps} />);

    expect(
      screen.getByRole("option", {
        name: "All Actions",
      }),
    ).toBeInTheDocument();
  });

  it("renders date input", () => {
    render(<AuditFilters {...defaultProps} />);

    const dateInput = document.querySelector('input[type="date"]');

    expect(dateInput).toBeInTheDocument();
  });

  it("calls setSearchTerm when search changes", () => {
    render(<AuditFilters {...defaultProps} />);

    fireEvent.change(
      screen.getByPlaceholderText("Search entity name, user..."),
      {
        target: {
          value: "Sachin",
        },
      },
    );

    expect(setSearchTerm).toHaveBeenCalledWith("Sachin");
  });

  it("calls setEntityType when entity type changes", () => {
    render(<AuditFilters {...defaultProps} />);

    const selects = screen.getAllByRole("combobox");

    fireEvent.change(selects[0], {
      target: {
        value: "USER",
      },
    });

    expect(setEntityType).toHaveBeenCalledWith("USER");
  });

  it("calls setActionType when action type changes", () => {
    render(<AuditFilters {...defaultProps} />);

    const selects = screen.getAllByRole("combobox");

    fireEvent.change(selects[1], {
      target: {
        value: "CREATE_USER",
      },
    });

    expect(setActionType).toHaveBeenCalledWith("CREATE_USER");
  });

  it("calls setSelectedDate when date changes", () => {
    render(<AuditFilters {...defaultProps} />);

    const dateInput = document.querySelector('input[type="date"]');

    fireEvent.change(dateInput, {
      target: {
        value: "2026-06-20",
      },
    });

    expect(setSelectedDate).toHaveBeenCalledWith("2026-06-20");
  });

  it("shows selected values", () => {
    render(
      <AuditFilters
        {...defaultProps}
        searchTerm="Sachin"
        entityType="USER"
        actionType="CREATE_USER"
        selectedDate="2026-06-20"
      />,
    );

    expect(screen.getByDisplayValue("Sachin")).toBeInTheDocument();

    // Displayed label, not option value
    expect(screen.getByDisplayValue("User")).toBeInTheDocument();

    expect(screen.getByDisplayValue("Create_User")).toBeInTheDocument();

    expect(document.querySelector('input[type="date"]')).toHaveValue(
      "2026-06-20",
    );
  });

  it("contains all entity type options", () => {
    render(<AuditFilters {...defaultProps} />);

    expect(
      screen.getByRole("option", {
        name: "User",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("option", {
        name: "Project",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("option", {
        name: "Task",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("option", {
        name: "Activity",
      }),
    ).toBeInTheDocument();
  });

  it("contains all action type options", () => {
    render(<AuditFilters {...defaultProps} />);

    expect(
      screen.getByRole("option", {
        name: "Create_User",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("option", {
        name: "Update_User",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("option", {
        name: "Delete_User",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("option", {
        name: "Create_Project",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("option", {
        name: "Update_Project",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("option", {
        name: "Delete_Project",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("option", {
        name: "Export_Excel",
      }),
    ).toBeInTheDocument();
  });

  it("renders with initial search value", () => {
    render(<AuditFilters {...defaultProps} searchTerm="John" />);

    expect(screen.getByDisplayValue("John")).toBeInTheDocument();
  });

  it("renders selected entity type", () => {
    render(<AuditFilters {...defaultProps} entityType="PROJECT" />);

    const selects = screen.getAllByRole("combobox");

    expect(selects[0]).toHaveValue("PROJECT");
  });

  it("renders selected action type", () => {
    render(<AuditFilters {...defaultProps} actionType="DELETE_PROJECT" />);

    const selects = screen.getAllByRole("combobox");

    expect(selects[1]).toHaveValue("DELETE_PROJECT");
  });

  it("renders selected date", () => {
    render(<AuditFilters {...defaultProps} selectedDate="2026-01-10" />);

    expect(document.querySelector('input[type="date"]')).toHaveValue(
      "2026-01-10",
    );
  });

  it("allows clearing search text", () => {
    render(<AuditFilters {...defaultProps} searchTerm="Sachin" />);

    fireEvent.change(
      screen.getByPlaceholderText("Search entity name, user..."),
      {
        target: {
          value: "",
        },
      },
    );

    expect(setSearchTerm).toHaveBeenCalledWith("");
  });

  it("allows clearing entity type", () => {
    render(<AuditFilters {...defaultProps} entityType="USER" />);

    const selects = screen.getAllByRole("combobox");

    fireEvent.change(selects[0], {
      target: {
        value: "",
      },
    });

    expect(setEntityType).toHaveBeenCalledWith("");
  });

  it("allows clearing action type", () => {
    render(<AuditFilters {...defaultProps} actionType="CREATE_USER" />);

    const selects = screen.getAllByRole("combobox");

    fireEvent.change(selects[1], {
      target: {
        value: "",
      },
    });

    expect(setActionType).toHaveBeenCalledWith("");
  });
  it("allows clearing selected date", () => {
    render(<AuditFilters {...defaultProps} selectedDate="2026-06-20" />);

    const input = document.querySelector('input[type="date"]');

    fireEvent.change(input, {
      target: {
        value: "",
      },
    });

    expect(setSelectedDate).toHaveBeenCalledWith("");
  });

  it("renders exactly two select boxes", () => {
    render(<AuditFilters {...defaultProps} />);

    expect(screen.getAllByRole("combobox")).toHaveLength(2);
  });

  it("renders exactly one search input", () => {
    render(<AuditFilters {...defaultProps} />);

    expect(
      screen.getAllByPlaceholderText("Search entity name, user..."),
    ).toHaveLength(1);
  });

  it("renders one date input", () => {
    render(<AuditFilters {...defaultProps} />);

    expect(document.querySelectorAll('input[type="date"]')).toHaveLength(1);
  });

  it("contains Search icon", () => {
    const { container } = render(<AuditFilters {...defaultProps} />);

    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("does not call handlers on initial render", () => {
    render(<AuditFilters {...defaultProps} />);

    expect(setSearchTerm).not.toHaveBeenCalled();
    expect(setEntityType).not.toHaveBeenCalled();
    expect(setActionType).not.toHaveBeenCalled();
    expect(setSelectedDate).not.toHaveBeenCalled();
  });
});
