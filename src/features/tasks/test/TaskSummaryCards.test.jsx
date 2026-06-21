import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import TaskSummaryCards from "../components/TaskSummaryCards";

describe("TaskSummaryCards", () => {
  const defaultProps = {
    total: 100,
    completed: 65,
    delayed: 15,
    notStarted: 20,
  };

  it("renders all card titles", () => {
    render(<TaskSummaryCards {...defaultProps} />);

    expect(screen.getByText("Total Tasks")).toBeInTheDocument();

    expect(screen.getByText("Completed")).toBeInTheDocument();

    expect(screen.getByText("Delayed")).toBeInTheDocument();

    expect(screen.getByText("Not Started")).toBeInTheDocument();
  });

  it("renders all values", () => {
    render(<TaskSummaryCards {...defaultProps} />);

    expect(screen.getByText("100")).toBeInTheDocument();

    expect(screen.getByText("65")).toBeInTheDocument();

    expect(screen.getByText("15")).toBeInTheDocument();

    expect(screen.getByText("20")).toBeInTheDocument();
  });

  it("renders all subtitles", () => {
    render(<TaskSummaryCards {...defaultProps} />);

    expect(screen.getByText("All tasks")).toBeInTheDocument();

    expect(screen.getByText("Completed tasks")).toBeInTheDocument();

    expect(screen.getByText("Delayed tasks")).toBeInTheDocument();

    expect(screen.getByText("Pending tasks")).toBeInTheDocument();
  });

  it("renders zero values correctly", () => {
    render(
      <TaskSummaryCards total={0} completed={0} delayed={0} notStarted={0} />,
    );

    expect(screen.getAllByText("0")).toHaveLength(4);
  });

  it("renders four summary cards", () => {
    const { container } = render(<TaskSummaryCards {...defaultProps} />);

    const cards = container.querySelectorAll(".rounded-2xl");

    expect(cards.length).toBe(4);
  });

  it("renders without crashing when values are undefined", () => {
    render(
      <TaskSummaryCards
        total={undefined}
        completed={undefined}
        delayed={undefined}
        notStarted={undefined}
      />,
    );

    expect(screen.getByText("Total Tasks")).toBeInTheDocument();
  });

  it("renders correct number of subtitles", () => {
    render(<TaskSummaryCards {...defaultProps} />);

    expect(screen.getByText("All tasks")).toBeInTheDocument();

    expect(screen.getByText("Completed tasks")).toBeInTheDocument();

    expect(screen.getByText("Delayed tasks")).toBeInTheDocument();

    expect(screen.getByText("Pending tasks")).toBeInTheDocument();
  });
});
