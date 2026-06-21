import { beforeEach, describe, expect, it, vi } from "vitest";

import { fireEvent, render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";

import AuditFilters from "../components/AuditFilters";

describe("AuditFilters", () => {
  const setSearchTerm = vi.fn();
  const setEntityType = vi.fn();
  const setActionType = vi.fn();
  const setSelectedDate = vi.fn();

  const defaultProps = {
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

    expect(screen.getByDisplayValue("USER")).toBeInTheDocument();

    expect(screen.getByDisplayValue("CREATE_USER")).toBeInTheDocument();

    expect(document.querySelector('input[type="date"]').value).toBe(
      "2026-06-20",
    );
  });

  it("contains all entity type options", () => {
    render(<AuditFilters {...defaultProps} />);

    expect(
      screen.getByRole("option", {
        name: "USER",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("option", {
        name: "PROJECT",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("option", {
        name: "TASK",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("option", {
        name: "ACTIVITY",
      }),
    ).toBeInTheDocument();
  });

  it("contains all action type options", () => {
    render(<AuditFilters {...defaultProps} />);

    expect(
      screen.getByRole("option", {
        name: "CREATE_USER",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("option", {
        name: "UPDATE_USER",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("option", {
        name: "DELETE_USER",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("option", {
        name: "CREATE_PROJECT",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("option", {
        name: "UPDATE_PROJECT",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("option", {
        name: "DELETE_PROJECT",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("option", {
        name: "Export_Excel",
      }),
    ).toBeInTheDocument();
  });
});
