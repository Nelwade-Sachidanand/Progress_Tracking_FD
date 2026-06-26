import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import ActiveFilters from "../components/ActiveFilters";

describe("ActiveFilters", () => {
  const clearFilters = vi.fn();

  it("renders nothing when no filters are selected", () => {
    const { container } = render(
      <ActiveFilters
        selectedMilestone={[]}
        selectedTask="All Tasks"
        selectedStatus="All Status"
        clearFilters={clearFilters}
      />,
    );

    expect(container.firstChild).toBeNull();
  });

  it("renders milestone filter", () => {
    render(
      <ActiveFilters
        selectedMilestone={["Milestone 1"]}
        selectedTask="All Tasks"
        selectedStatus="All Status"
        clearFilters={clearFilters}
      />,
    );

    expect(screen.getByText("Milestone: Milestone 1")).toBeInTheDocument();
  });

  it("renders multiple milestones", () => {
    render(
      <ActiveFilters
        selectedMilestone={["Milestone 1", "Milestone 2"]}
        selectedTask="All Tasks"
        selectedStatus="All Status"
        clearFilters={clearFilters}
      />,
    );

    // ✅ FIX: each milestone is rendered separately
    expect(screen.getByText("Milestone: Milestone 1")).toBeInTheDocument();
    expect(screen.getByText("Milestone: Milestone 2")).toBeInTheDocument();
  });

  it("renders task filter", () => {
    render(
      <ActiveFilters
        selectedMilestone={[]}
        selectedTask="Task A"
        selectedStatus="All Status"
        clearFilters={clearFilters}
      />,
    );

    expect(screen.getByText("Task: Task A")).toBeInTheDocument();
  });

  it("renders status filter", () => {
    render(
      <ActiveFilters
        selectedMilestone={[]}
        selectedTask="All Tasks"
        selectedStatus="Completed"
        clearFilters={clearFilters}
      />,
    );

    expect(screen.getByText("Status: Completed")).toBeInTheDocument();
  });

  it("renders all filters together", () => {
    render(
      <ActiveFilters
        selectedMilestone={["Milestone 1"]}
        selectedTask="Task A"
        selectedStatus="Completed"
        clearFilters={clearFilters}
      />,
    );

    expect(screen.getByText("Milestone: Milestone 1")).toBeInTheDocument();
    expect(screen.getByText("Task: Task A")).toBeInTheDocument();
    expect(screen.getByText("Status: Completed")).toBeInTheDocument();
  });

  it("renders active filters label", () => {
    render(
      <ActiveFilters
        selectedMilestone={["Milestone 1"]}
        selectedTask="Task A"
        selectedStatus="Completed"
        clearFilters={clearFilters}
      />,
    );

    expect(screen.getByText("Active Filters:")).toBeInTheDocument();
  });

  it("calls clearFilters when button clicked", () => {
    render(
      <ActiveFilters
        selectedMilestone={["Milestone 1"]}
        selectedTask="Task A"
        selectedStatus="Completed"
        clearFilters={clearFilters}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /clear all filters/i }));

    expect(clearFilters).toHaveBeenCalledTimes(1);
  });

  it("does not render task filter when task is All Tasks", () => {
    render(
      <ActiveFilters
        selectedMilestone={["Milestone 1"]}
        selectedTask="All Tasks"
        selectedStatus="Completed"
        clearFilters={clearFilters}
      />,
    );

    expect(screen.queryByText(/Task:/)).not.toBeInTheDocument();
  });

  it("does not render status filter when status is All Status", () => {
    render(
      <ActiveFilters
        selectedMilestone={["Milestone 1"]}
        selectedTask="Task A"
        selectedStatus="All Status"
        clearFilters={clearFilters}
      />,
    );

    expect(screen.queryByText(/Status:/)).not.toBeInTheDocument();
  });

  it("handles undefined milestone array", () => {
    render(
      <ActiveFilters
        selectedMilestone={undefined}
        selectedTask="Task A"
        selectedStatus="Completed"
        clearFilters={clearFilters}
      />,
    );

    expect(screen.getByText("Task: Task A")).toBeInTheDocument();
  });

  it("renders clear button", () => {
    render(
      <ActiveFilters
        selectedMilestone={["Milestone 1"]}
        selectedTask="Task A"
        selectedStatus="Completed"
        clearFilters={clearFilters}
      />,
    );

    expect(
      screen.getByRole("button", { name: "Clear All Filters" }),
    ).toBeInTheDocument();
  });
});
