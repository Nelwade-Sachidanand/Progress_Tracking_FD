import { beforeEach, describe, expect, it, vi } from "vitest";

import { fireEvent, render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";

import AuthorizationFilters from "../components/AuthorizationFilters";

describe("AuthorizationFilters", () => {
  const setSearch = vi.fn();
  const setRequestType = vi.fn();
  const setStatus = vi.fn();
  const setRequestedBy = vi.fn();

  const mockLogs = [
    {
      requestSource: "Create_User",
      status: "Pending",
      requestedBy: "Sachin",
    },
    {
      requestSource: "Update_User",
      status: "Approved",
      requestedBy: "Admin",
    },
    {
      requestSource: "Create_User",
      status: "Pending",
      requestedBy: "Sachin",
    },
  ];

  const defaultProps = {
    logs: mockLogs,
    search: "",
    setSearch,
    requestType: "",
    setRequestType,
    status: "",
    setStatus,
    requestedBy: "",
    setRequestedBy,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders search input", () => {
    render(<AuthorizationFilters {...defaultProps} />);

    expect(
      screen.getByPlaceholderText("Search requests..."),
    ).toBeInTheDocument();
  });

  it("renders all dropdowns", () => {
    render(<AuthorizationFilters {...defaultProps} />);

    const selects = screen.getAllByRole("combobox");

    expect(selects).toHaveLength(3);
  });

  it("calls setSearch on input change", () => {
    render(<AuthorizationFilters {...defaultProps} />);

    fireEvent.change(screen.getByPlaceholderText("Search requests..."), {
      target: {
        value: "test",
      },
    });

    expect(setSearch).toHaveBeenCalledWith("test");
  });

  it("calls setRequestType on change", () => {
    render(<AuthorizationFilters {...defaultProps} />);

    const selects = screen.getAllByRole("combobox");

    fireEvent.change(selects[0], {
      target: {
        value: "Create_User",
      },
    });

    expect(setRequestType).toHaveBeenCalledWith("Create_User");
  });

  it("calls setStatus on change", () => {
    render(<AuthorizationFilters {...defaultProps} />);

    const selects = screen.getAllByRole("combobox");

    fireEvent.change(selects[1], {
      target: {
        value: "Pending",
      },
    });

    expect(setStatus).toHaveBeenCalledWith("Pending");
  });

  it("calls setRequestedBy on change", () => {
    render(<AuthorizationFilters {...defaultProps} />);

    const selects = screen.getAllByRole("combobox");

    fireEvent.change(selects[2], {
      target: {
        value: "Sachin",
      },
    });

    expect(setRequestedBy).toHaveBeenCalledWith("Sachin");
  });

  it("renders request type options", () => {
    render(<AuthorizationFilters {...defaultProps} />);

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
  });

  it("renders status options", () => {
    render(<AuthorizationFilters {...defaultProps} />);

    expect(
      screen.getByRole("option", {
        name: "Pending",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("option", {
        name: "Approved",
      }),
    ).toBeInTheDocument();
  });

  it("renders requested by options", () => {
    render(<AuthorizationFilters {...defaultProps} />);

    expect(
      screen.getByRole("option", {
        name: "Sachin",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("option", {
        name: "Admin",
      }),
    ).toBeInTheDocument();
  });

  it("renders selected values", () => {
    render(
      <AuthorizationFilters
        {...defaultProps}
        search="abc"
        requestType="Create_User"
        status="Pending"
        requestedBy="Sachin"
      />,
    );

    expect(screen.getByDisplayValue("abc")).toBeInTheDocument();

    expect(screen.getByDisplayValue("Create_User")).toBeInTheDocument();

    expect(screen.getByDisplayValue("Pending")).toBeInTheDocument();

    expect(screen.getByDisplayValue("Sachin")).toBeInTheDocument();
  });

  it("handles empty logs", () => {
    render(<AuthorizationFilters {...defaultProps} logs={[]} />);

    expect(
      screen.getByRole("option", {
        name: "All Request Types",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("option", {
        name: "All Status",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("option", {
        name: "All Users",
      }),
    ).toBeInTheDocument();
  });

  it("removes duplicate values from dropdowns", () => {
    render(<AuthorizationFilters {...defaultProps} />);

    const createUserOptions = screen.getAllByRole("option", {
      name: "Create_User",
    });

    const pendingOptions = screen.getAllByRole("option", {
      name: "Pending",
    });

    const sachinOptions = screen.getAllByRole("option", {
      name: "Sachin",
    });

    expect(createUserOptions).toHaveLength(1);

    expect(pendingOptions).toHaveLength(1);

    expect(sachinOptions).toHaveLength(1);
  });
});
