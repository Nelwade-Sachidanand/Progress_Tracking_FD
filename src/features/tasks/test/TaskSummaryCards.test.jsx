import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import TaskSummaryCards from "../components/TaskSummaryCards";

describe("TaskSummaryCards", () => {
  const defaultProps = {
    total: 25,
    completed: 10,
    delayed: 2,
    notStarted: 5,
    inProgress: 10,
  };

  it("renders all summary cards", () => {
    render(<TaskSummaryCards {...defaultProps} />);

    expect(screen.getByText("Total Tasks")).toBeInTheDocument();
    expect(screen.getByText("Completed")).toBeInTheDocument();
    expect(screen.getByText("In Progress")).toBeInTheDocument();
    expect(screen.getByText("Not Started")).toBeInTheDocument();
  });

  it("renders correct values", () => {
    render(<TaskSummaryCards {...defaultProps} />);

expect(screen.getByText("25")).toBeInTheDocument();
expect(screen.getAllByText("10")).toHaveLength(2);
expect(screen.getByText("5")).toBeInTheDocument();

    // value 10 appears twice (Completed & In Progress)
    expect(screen.getAllByText("10")).toHaveLength(2);
  });

  it("renders four cards", () => {
    const { container } = render(
      <TaskSummaryCards {...defaultProps} />
    );

    const cards = container.querySelectorAll(
      ".rounded-2xl"
    );

    expect(cards).toHaveLength(4);
  });

  it("renders zero values", () => {
    render(
      <TaskSummaryCards
        total={0}
        completed={0}
        delayed={0}
        notStarted={0}
        inProgress={0}
      />
    );

    expect(screen.getAllByText("0")).toHaveLength(4);
  });

  it("renders large values", () => {
    render(
      <TaskSummaryCards
        total={1000}
        completed={900}
        delayed={50}
        notStarted={20}
        inProgress={80}
      />
    );

    expect(screen.getByText("1000")).toBeInTheDocument();
    expect(screen.getByText("900")).toBeInTheDocument();
    expect(screen.getByText("80")).toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument();
  });

  it("renders icons", () => {
    const { container } = render(
      <TaskSummaryCards {...defaultProps} />
    );

    // lucide icons render svg elements
    const icons = container.querySelectorAll("svg");

    expect(icons).toHaveLength(4);
  });

  it("renders with undefined props", () => {
    render(<TaskSummaryCards />);

    expect(screen.getByText("Total Tasks")).toBeInTheDocument();
    expect(screen.getByText("Completed")).toBeInTheDocument();
    expect(screen.getByText("In Progress")).toBeInTheDocument();
    expect(screen.getByText("Not Started")).toBeInTheDocument();
  });

  it("matches card titles with values", () => {
  render(<TaskSummaryCards {...defaultProps} />);

  expect(screen.getByText("Total Tasks")).toBeInTheDocument();
  expect(screen.getByText("Completed")).toBeInTheDocument();
  expect(screen.getByText("In Progress")).toBeInTheDocument();
  expect(screen.getByText("Not Started")).toBeInTheDocument();

  expect(screen.getByText("25")).toBeInTheDocument();
  expect(screen.getAllByText("10")).toHaveLength(2);
  expect(screen.getByText("5")).toBeInTheDocument();
});
});