import "@testing-library/jest-dom";
import {
  render,
  screen,
  fireEvent,
} from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import MilestoneJourney from "../Components/MilestoneJourney";


beforeEach(() => {
  class ResizeObserverMock {
    observe() {}
    unobserve() {}
    disconnect() {}
  }

  global.ResizeObserver = ResizeObserverMock;

  HTMLElement.prototype.getBoundingClientRect = vi.fn(() => ({
    width: 1000,
    height: 400,
    top: 100,
    left: 100,
    right: 1100,
    bottom: 500,
  }));
});

describe("MilestoneJourney", () => {
  const project = {
    phases: [
      {
        milestones: [
          {
            milestoneName: "M1 - Planning",
            tasks: [
              {
                subTasks: [
                  {
                    activities: [
                      { progress: 100 },
                      { progress: 100 },
                    ],
                  },
                ],
              },
            ],
          },
          {
            milestoneName: "M2 - Development",
            tasks: [
              {
                subTasks: [
                  {
                    activities: [
                      { progress: 50 },
                      { progress: 0 },
                    ],
                  },
                ],
              },
            ],
          },
          {
            milestoneName: "M3 - Testing",
            tasks: [
              {
                subTasks: [
                  {
                    activities: [
                      { progress: 0 },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  it("renders title", () => {
    render(<MilestoneJourney project={project} />);

    expect(
      screen.getByText("Milestone Journey")
    ).toBeInTheDocument();
  });

  it("renders svg", () => {
    const { container } = render(
      <MilestoneJourney project={project} />
    );

    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("shows milestone names", () => {
    render(<MilestoneJourney project={project} />);

    expect(screen.getByText("M1")).toBeInTheDocument();
    expect(screen.getByText("M2")).toBeInTheDocument();
    expect(screen.getByText("M3")).toBeInTheDocument();
  });

  it("shows percentages", () => {
    render(<MilestoneJourney project={project} />);

    expect(screen.getByText("100%")).toBeInTheDocument();
    expect(screen.getByText("25%")).toBeInTheDocument();
    expect(screen.getByText("0%")).toBeInTheDocument();
  });

  it("shows statuses", () => {
    render(<MilestoneJourney project={project} />);

    expect(screen.getByText("Completed")).toBeInTheDocument();

    expect(screen.getByText("In Progress")).toBeInTheDocument();

    expect(screen.getByText("Not Started")).toBeInTheDocument();
  });

  it("shows tooltip on hover", () => {
    const { container } = render(
      <MilestoneJourney project={project} />
    );

    const circles = container.querySelectorAll("g");

    fireEvent.mouseEnter(circles[0]);

    expect(
      screen.getByText("M1 - Planning")
    ).toBeInTheDocument();
  });

  it("hides tooltip on mouse leave", () => {
    const { container } = render(
      <MilestoneJourney project={project} />
    );

    const circles = container.querySelectorAll("g");

    fireEvent.mouseEnter(circles[0]);

    fireEvent.mouseLeave(circles[0]);

    expect(
      screen.queryByText("M1 - Planning")
    ).not.toBeInTheDocument();
  });

  it("renders empty project", () => {
    render(<MilestoneJourney project={{ phases: [] }} />);

    expect(
      screen.getByText("Milestone Journey")
    ).toBeInTheDocument();
  });

  it("renders undefined project", () => {
    render(<MilestoneJourney />);

    expect(
      screen.getByText("Milestone Journey")
    ).toBeInTheDocument();
  });
});