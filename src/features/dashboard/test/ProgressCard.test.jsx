import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ProgressCard from "../components/ProgressCard";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("../utils/projectMetrics", () => ({
  getProjectMetrics: vi.fn(() => ({
    status: "On Track",
    overallProgress: 75,
    projectStartDate: "2026-01-01",
    goLiveDate: "2026-12-31",
    daysRemaining: 120,
    delayWeeks: 1,
    currentPhase: "Implementation",
    currentMilestone: "Development",
    readiness: 80,
  })),
}));

describe("ProgressCard", () => {
  const mockProjects = [
    {
      id: "1",
      projectName: "CBS Upgrade",
      bankName: "State Bank (SBI)",
    },
  ];

  it("renders no projects message", () => {
    render(<ProgressCard projects={[]} />);

    expect(screen.getByText("No Projects Found")).toBeInTheDocument();
  });

  it("renders projects heading", () => {
    render(<ProgressCard projects={mockProjects} />);

    expect(screen.getByText("Projects")).toBeInTheDocument();
  });

  it("renders project count", () => {
    render(<ProgressCard projects={mockProjects} />);

    expect(screen.getByText("1 Project")).toBeInTheDocument();
  });

  it("renders bank name", () => {
    render(<ProgressCard projects={mockProjects} />);

    expect(screen.getByText("SBI")).toBeInTheDocument();
  });

  it("renders project name", () => {
    render(<ProgressCard projects={mockProjects} />);

    expect(screen.getByText("CBS Upgrade")).toBeInTheDocument();
  });

it("renders status", () => {
  render(<ProgressCard projects={mockProjects} />);

  const status = screen.getAllByText("On Track");

  expect(status).toHaveLength(2);
});

  it("renders progress", () => {
    render(<ProgressCard projects={mockProjects} />);

    expect(screen.getByText("75%")).toBeInTheDocument();
    expect(screen.getByText("Progress")).toBeInTheDocument();
  });

  it("renders start date", () => {
    render(<ProgressCard projects={mockProjects} />);

    expect(screen.getByText("Start Date")).toBeInTheDocument();
    expect(screen.getByText("01-01-2026")).toBeInTheDocument();
  });

  it("renders go live date", () => {
    render(<ProgressCard projects={mockProjects} />);

    expect(screen.getByText("Go Live")).toBeInTheDocument();
    expect(screen.getByText("31-12-2026")).toBeInTheDocument();
  });

  it("renders days left", () => {
    render(<ProgressCard projects={mockProjects} />);

    expect(screen.getByText("Days Left")).toBeInTheDocument();
    expect(screen.getByText("120")).toBeInTheDocument();
  });

  it("renders delay", () => {
    render(<ProgressCard projects={mockProjects} />);

    expect(screen.getByText("Delay")).toBeInTheDocument();
    expect(screen.getByText("1 week")).toBeInTheDocument();
  });

  it("renders current phase", () => {
    render(<ProgressCard projects={mockProjects} />);

    expect(screen.getByText("Current Phase")).toBeInTheDocument();
    expect(screen.getByText("Implementation")).toBeInTheDocument();
  });

  it("renders current milestone", () => {
    render(<ProgressCard projects={mockProjects} />);

    expect(screen.getByText("Development")).toBeInTheDocument();
  });

  it("renders readiness", () => {
    render(<ProgressCard projects={mockProjects} />);

    expect(screen.getByText("Readiness")).toBeInTheDocument();
    expect(screen.getByText("80%")).toBeInTheDocument();
  });

  it("renders health", () => {
    render(<ProgressCard projects={mockProjects} />);

    expect(screen.getByText("Health")).toBeInTheDocument();
    expect(screen.getAllByText("On Track")).toHaveLength(2);
  });

  it("renders view project details button", () => {
    render(<ProgressCard projects={mockProjects} />);

    expect(
      screen.getByRole("button", {
        name: /View Project Details/i,
      })
    ).toBeInTheDocument();
  });
});