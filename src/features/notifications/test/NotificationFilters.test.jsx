import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import NotificationFilters from "../components/NotificationFilters";

describe("NotificationFilters", () => {
  const setSearch = vi.fn();
  const onMarkAll = vi.fn();

  const defaultProps = {
    search: "",
    setSearch,
    onMarkAll,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders search input", () => {
    render(<NotificationFilters {...defaultProps} />);

    expect(
      screen.getByPlaceholderText("Search notifications..."),
    ).toBeInTheDocument();
  });

  it("renders mark all button", () => {
    render(<NotificationFilters {...defaultProps} />);

    expect(
      screen.getByRole("button", {
        name: /mark all as read/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders search icon", () => {
    const { container } = render(<NotificationFilters {...defaultProps} />);

    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders with initial search value", () => {
    render(<NotificationFilters {...defaultProps} search="approval" />);

    expect(screen.getByDisplayValue("approval")).toBeInTheDocument();
  });

  it("calls setSearch on typing", () => {
    render(<NotificationFilters {...defaultProps} />);

    fireEvent.change(screen.getByPlaceholderText("Search notifications..."), {
      target: {
        value: "approved",
      },
    });

    expect(setSearch).toHaveBeenCalledWith("approved");
  });

  it("updates search multiple times", () => {
    render(<NotificationFilters {...defaultProps} />);

    const input = screen.getByPlaceholderText("Search notifications...");

    fireEvent.change(input, {
      target: {
        value: "a",
      },
    });

    fireEvent.change(input, {
      target: {
        value: "ab",
      },
    });

    fireEvent.change(input, {
      target: {
        value: "abc",
      },
    });

    expect(setSearch).toHaveBeenCalledTimes(3);
  });

  it("calls onMarkAll when button clicked", () => {
    render(<NotificationFilters {...defaultProps} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /mark all as read/i,
      }),
    );

    expect(onMarkAll).toHaveBeenCalledTimes(1);
  });

  it("allows clearing search", () => {
    render(<NotificationFilters {...defaultProps} search="notification" />);

    fireEvent.change(screen.getByPlaceholderText("Search notifications..."), {
      target: {
        value: "",
      },
    });

    expect(setSearch).toHaveBeenCalledWith("");
  });

  it("renders exactly one search input", () => {
    render(<NotificationFilters {...defaultProps} />);

    expect(
      screen.getAllByPlaceholderText("Search notifications..."),
    ).toHaveLength(1);
  });

  it("renders exactly one button", () => {
    render(<NotificationFilters {...defaultProps} />);

    expect(screen.getAllByRole("button")).toHaveLength(1);
  });

  it("search input is text type", () => {
    render(<NotificationFilters {...defaultProps} />);

    expect(
      screen.getByPlaceholderText("Search notifications..."),
    ).toHaveAttribute("type", "text");
  });

  it("button contains correct text", () => {
    render(<NotificationFilters {...defaultProps} />);

    expect(screen.getByRole("button")).toHaveTextContent("Mark All as Read");
  });

  it("search input starts empty", () => {
    render(<NotificationFilters {...defaultProps} />);

    expect(screen.getByPlaceholderText("Search notifications...")).toHaveValue(
      "",
    );
  });

  it("does not call handlers on initial render", () => {
    render(<NotificationFilters {...defaultProps} />);

    expect(setSearch).not.toHaveBeenCalled();
    expect(onMarkAll).not.toHaveBeenCalled();
  });

  it("accepts long search text", () => {
    render(<NotificationFilters {...defaultProps} />);

    const longText = "This is a very long notification search text";

    fireEvent.change(screen.getByPlaceholderText("Search notifications..."), {
      target: {
        value: longText,
      },
    });

    expect(setSearch).toHaveBeenCalledWith(longText);
  });

  it("accepts special characters", () => {
    render(<NotificationFilters {...defaultProps} />);

    fireEvent.change(screen.getByPlaceholderText("Search notifications..."), {
      target: {
        value: "@#$%^&*",
      },
    });

    expect(setSearch).toHaveBeenCalledWith("@#$%^&*");
  });

  it("button can be clicked multiple times", () => {
    render(<NotificationFilters {...defaultProps} />);

    const button = screen.getByRole("button", {
      name: /mark all as read/i,
    });

    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    expect(onMarkAll).toHaveBeenCalledTimes(3);
  });

  it("search input has correct placeholder", () => {
    render(<NotificationFilters {...defaultProps} />);

    expect(
      screen.getByPlaceholderText("Search notifications..."),
    ).toHaveAttribute("placeholder", "Search notifications...");
  });

  it("button is enabled by default", () => {
    render(<NotificationFilters {...defaultProps} />);

    expect(
      screen.getByRole("button", {
        name: /mark all as read/i,
      }),
    ).toBeEnabled();
  });

  it("renders without crashing", () => {
    const { container } = render(<NotificationFilters {...defaultProps} />);

    expect(container).toBeInTheDocument();
  });

  it("contains two svg icons", () => {
    const { container } = render(<NotificationFilters {...defaultProps} />);

    expect(container.querySelectorAll("svg")).toHaveLength(2);
  });

  it("search input receives typed value through props", () => {
    const { rerender } = render(<NotificationFilters {...defaultProps} />);

    rerender(
      <NotificationFilters {...defaultProps} search="Approved Notification" />,
    );

    expect(
      screen.getByDisplayValue("Approved Notification"),
    ).toBeInTheDocument();
  });
});
