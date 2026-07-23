import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import ActiveFilters from "../components/ActiveFilters";

describe("ActiveFilters", () => {
  const defaultProps = {
    milestones: [
      { value: "m1", label: "Milestone 1" },
      { value: "m2", label: "Milestone 2" },
    ],

    selectedPhase: "",
    selectedMilestone: [],
    selectedTask: "",
    selectedSubTask: "",
    selectedActivity: "",
    selectedStatus: "",

    setSelectedPhase: vi.fn(),
    setSelectedMilestone: vi.fn(),
    setSelectedTask: vi.fn(),
    setSelectedSubTask: vi.fn(),
    setSelectedActivity: vi.fn(),
    setSelectedStatus: vi.fn(),

    clearFilters: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders nothing when no filters are selected", () => {
    const { container } = render(<ActiveFilters {...defaultProps} />);

    expect(container.firstChild).toBeNull();
  });

  it("renders phase filter", () => {
    render(
      <ActiveFilters
        {...defaultProps}
        selectedPhase="Phase 1"
      />
    );

    expect(
      screen.getByText("Phase: Phase 1")
    ).toBeInTheDocument();
  });

  it("renders milestone filters", () => {
    render(
      <ActiveFilters
        {...defaultProps}
        selectedMilestone={["m1", "m2"]}
      />
    );

    expect(
      screen.getByText("Milestone: Milestone 1")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Milestone: Milestone 2")
    ).toBeInTheDocument();
  });

  it("renders task filter", () => {
    render(
      <ActiveFilters
        {...defaultProps}
        selectedTask="Task A"
      />
    );

    expect(
      screen.getByText("Task: Task A")
    ).toBeInTheDocument();
  });

  it("renders sub task filter", () => {
    render(
      <ActiveFilters
        {...defaultProps}
        selectedSubTask="Sub Task A"
      />
    );

    expect(
      screen.getByText("Sub Task: Sub Task A")
    ).toBeInTheDocument();
  });

  it("renders activity filter", () => {
    render(
      <ActiveFilters
        {...defaultProps}
        selectedActivity="Activity A"
      />
    );

    expect(
      screen.getByText("Activity: Activity A")
    ).toBeInTheDocument();
  });

  it("renders status filter", () => {
    render(
      <ActiveFilters
        {...defaultProps}
        selectedStatus="Completed"
      />
    );

    expect(
      screen.getByText("Status: Completed")
    ).toBeInTheDocument();
  });

  it("calls clearFilters when Clear All Filters is clicked", () => {
    render(
      <ActiveFilters
        {...defaultProps}
        selectedPhase="Phase 1"
      />
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /clear all filters/i,
      })
    );

    expect(defaultProps.clearFilters).toHaveBeenCalled();
  });

  it("clears phase filter", () => {
    render(
      <ActiveFilters
        {...defaultProps}
        selectedPhase="Phase 1"
      />
    );

    fireEvent.click(screen.getAllByRole("button")[0]);

    expect(defaultProps.setSelectedPhase).toHaveBeenCalledWith("");
  });

  it("clears task filter", () => {
    render(
      <ActiveFilters
        {...defaultProps}
        selectedTask="Task A"
      />
    );

    fireEvent.click(screen.getAllByRole("button")[0]);

    expect(defaultProps.setSelectedTask).toHaveBeenCalledWith("");
  });

  it("clears status filter", () => {
    render(
      <ActiveFilters
        {...defaultProps}
        selectedStatus="Completed"
      />
    );

    fireEvent.click(screen.getAllByRole("button")[0]);

    expect(defaultProps.setSelectedStatus).toHaveBeenCalledWith("");
  });

  it("clears sub task filter", () => {
    render(
      <ActiveFilters
        {...defaultProps}
        selectedSubTask="Sub Task A"
      />
    );

    fireEvent.click(screen.getAllByRole("button")[0]);

    expect(defaultProps.setSelectedSubTask).toHaveBeenCalledWith("");
  });

  it("clears activity filter", () => {
    render(
      <ActiveFilters
        {...defaultProps}
        selectedActivity="Activity A"
      />
    );

    fireEvent.click(screen.getAllByRole("button")[0]);

    expect(defaultProps.setSelectedActivity).toHaveBeenCalledWith("");
  });

  it("removes milestone filter", () => {
    render(
      <ActiveFilters
        {...defaultProps}
        selectedMilestone={["m1"]}
      />
    );

    fireEvent.click(screen.getAllByRole("button")[0]);

    expect(defaultProps.setSelectedMilestone).toHaveBeenCalled();
  });

  it("renders multiple filters together", () => {
    render(
      <ActiveFilters
        {...defaultProps}
        selectedPhase="Phase 1"
        selectedTask="Task A"
        selectedStatus="Completed"
      />
    );

    expect(screen.getByText("Phase: Phase 1")).toBeInTheDocument();
    expect(screen.getByText("Task: Task A")).toBeInTheDocument();
    expect(screen.getByText("Status: Completed")).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /clear all filters/i,
      })
    ).toBeInTheDocument();
  });
});