import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PortfolioProgress from "../components/PortfolioProgress";

describe("PortfolioProgress", () => {
  const mockData = {
    overallProgress: 75,
    completedMilestones: 12,
    inProgressMilestones: 5,
    delayedMilestones: 2,
  };

  it("renders overall portfolio progress title", () => {
    render(<PortfolioProgress data={mockData} />);

    expect(screen.getByText("Overall Portfolio Progress")).toBeInTheDocument();
  });

  it("renders overall progress percentage", () => {
    render(<PortfolioProgress data={mockData} />);

    expect(screen.getByText("75%")).toBeInTheDocument();
  });

  it("renders completed milestones count", () => {
    render(<PortfolioProgress data={mockData} />);

    expect(screen.getByText("12")).toBeInTheDocument();

    expect(screen.getByText("Completed")).toBeInTheDocument();
  });

  it("renders in progress milestones count", () => {
    render(<PortfolioProgress data={mockData} />);

    expect(screen.getByText("5")).toBeInTheDocument();

    expect(screen.getByText("In Progress")).toBeInTheDocument();
  });

  it("renders delayed milestones count", () => {
    render(<PortfolioProgress data={mockData} />);

    expect(screen.getByText("2")).toBeInTheDocument();

    expect(screen.getByText("Delayed")).toBeInTheDocument();
  });

  it("renders milestone labels", () => {
    render(<PortfolioProgress data={mockData} />);

    const labels = screen.getAllByText("Milestones");

    expect(labels).toHaveLength(3);
  });

  it("renders progress bar width correctly", () => {
    const { container } = render(<PortfolioProgress data={mockData} />);

    const progressBar = container.querySelector('[style="width: 75%;"]');

    expect(progressBar).toBeInTheDocument();
  });

  it("renders zero values when data values are zero", () => {
    render(
      <PortfolioProgress
        data={{
          overallProgress: 0,
          completedMilestones: 0,
          inProgressMilestones: 0,
          delayedMilestones: 0,
        }}
      />,
    );

    expect(screen.getByText("0%")).toBeInTheDocument();

    const zeros = screen.getAllByText("0");

    expect(zeros).toHaveLength(3);
  });

  it("renders fallback values when data is undefined", () => {
    render(<PortfolioProgress />);

    expect(screen.getByText("0%")).toBeInTheDocument();

    const zeros = screen.getAllByText("0");

    expect(zeros).toHaveLength(3);
  });

  it("renders 100 percent progress correctly", () => {
    render(
      <PortfolioProgress
        data={{
          overallProgress: 100,
          completedMilestones: 20,
          inProgressMilestones: 0,
          delayedMilestones: 0,
        }}
      />,
    );

    expect(screen.getByText("100%")).toBeInTheDocument();

    expect(screen.getByText("20")).toBeInTheDocument();
  });
});
