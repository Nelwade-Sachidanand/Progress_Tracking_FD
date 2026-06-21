import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import KpiCards from "../components/KpiCards";

describe("KpiCards", () => {
  const mockData = {
    totalBanks: 12,
    totalProjects: 25,
    overallProgress: 78,
    upcomingGoLive: 5,
    onTrackProjects: 18,
    delayedProjects: 3,
  };

  it("renders all KPI card titles", () => {
    render(<KpiCards data={mockData} />);

    expect(screen.getByText("Total Banks")).toBeInTheDocument();

    expect(screen.getByText("Active Projects")).toBeInTheDocument();

    expect(screen.getByText("Overall Progress")).toBeInTheDocument();

    expect(screen.getByText("Go-Live This Year")).toBeInTheDocument();

    expect(screen.getByText("On Track Projects")).toBeInTheDocument();

    expect(screen.getByText("At Risk / Delayed")).toBeInTheDocument();
  });

  it("renders all KPI values", () => {
    render(<KpiCards data={mockData} />);

    expect(screen.getByText("12")).toBeInTheDocument();

    expect(screen.getByText("25")).toBeInTheDocument();

    expect(screen.getByText("78%")).toBeInTheDocument();

    expect(screen.getByText("5")).toBeInTheDocument();

    expect(screen.getByText("18")).toBeInTheDocument();

    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("renders all subtitles", () => {
    render(<KpiCards data={mockData} />);

    expect(screen.getByText("Active")).toBeInTheDocument();

    expect(screen.getByText("Across All Products")).toBeInTheDocument();

    expect(screen.getByText("Portfolio Progress")).toBeInTheDocument();

    expect(screen.getByText("Upcoming")).toBeInTheDocument();

    expect(screen.getByText("Healthy")).toBeInTheDocument();

    expect(screen.getByText("Attention")).toBeInTheDocument();
  });

  it("renders six KPI cards", () => {
    const { container } = render(<KpiCards data={mockData} />);

    const cards = container.querySelectorAll(".bg-white");

    expect(cards).toHaveLength(6);
  });

  it("renders zero values correctly", () => {
    render(
      <KpiCards
        data={{
          totalBanks: 0,
          totalProjects: 0,
          overallProgress: 0,
          upcomingGoLive: 0,
          onTrackProjects: 0,
          delayedProjects: 0,
        }}
      />,
    );

    const zeros = screen.getAllByText("0");

    expect(zeros.length).toBeGreaterThan(0);

    expect(screen.getByText("0%")).toBeInTheDocument();
  });

  it("renders percentage sign for overall progress", () => {
    render(<KpiCards data={mockData} />);

    expect(screen.getByText("78%")).toBeInTheDocument();
  });

  it("does not crash with large numbers", () => {
    render(
      <KpiCards
        data={{
          totalBanks: 999,
          totalProjects: 9999,
          overallProgress: 100,
          upcomingGoLive: 500,
          onTrackProjects: 850,
          delayedProjects: 149,
        }}
      />,
    );

    expect(screen.getByText("999")).toBeInTheDocument();

    expect(screen.getByText("9999")).toBeInTheDocument();

    expect(screen.getByText("100%")).toBeInTheDocument();
  });
});
