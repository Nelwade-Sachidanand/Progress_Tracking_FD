import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";

import MilestoneTable from "../components/MilestoneTable";

describe("MilestoneTable", () => {
  const onWeightageChange = vi.fn();
  const onUpdate = vi.fn();

  const milestones = [
    {
      id: "1",
      milestoneName: "Requirement",
      phaseName: "Phase 1",
      weightage: 40,
      progress: 100,
    },
    {
      id: "2",
      milestoneName: "Development",
      phaseName: "Phase 2",
      weightage: 60,
      progress: 50,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();

    sessionStorage.setItem(
      "user",
      JSON.stringify({
        role: "ADMIN",
      })
    );
  });

  it("renders header", () => {
    render(
      <MilestoneTable
        milestones={milestones}
        onWeightageChange={onWeightageChange}
        onUpdate={onUpdate}
        loading={false}
      />
    );

    expect(
      screen.getByText("Milestone Weightage Management")
    ).toBeInTheDocument();
  });

  it("renders milestone names", () => {
    render(
      <MilestoneTable
        milestones={milestones}
        onWeightageChange={onWeightageChange}
        onUpdate={onUpdate}
        loading={false}
      />
    );

    expect(screen.getByText("Requirement")).toBeInTheDocument();
    expect(screen.getByText("Development")).toBeInTheDocument();
  });
it("enables update button when total weightage is 100", () => {
  render(
    <MilestoneTable
      milestones={milestones}
      onWeightageChange={onWeightageChange}
      onUpdate={onUpdate}
      loading={false}
    />
  );

  expect(screen.getByRole("button")).toBeEnabled();
});
  it("renders phase names", () => {
    render(
      <MilestoneTable
        milestones={milestones}
        onWeightageChange={onWeightageChange}
        onUpdate={onUpdate}
        loading={false}
      />
    );

    expect(screen.getByText("Phase 1")).toBeInTheDocument();
    expect(screen.getByText("Phase 2")).toBeInTheDocument();
  });

  it("shows completed status", () => {
    render(
      <MilestoneTable
        milestones={milestones}
        onWeightageChange={onWeightageChange}
        onUpdate={onUpdate}
        loading={false}
      />
    );

    expect(screen.getByText("Completed")).toBeInTheDocument();
  });

  it("shows in progress status", () => {
    render(
      <MilestoneTable
        milestones={milestones}
        onWeightageChange={onWeightageChange}
        onUpdate={onUpdate}
        loading={false}
      />
    );

    expect(screen.getByText("In Progress")).toBeInTheDocument();
  });

  it("shows not started status", () => {
    render(
      <MilestoneTable
        milestones={[
          {
            ...milestones[0],
            progress: 0,
          },
        ]}
        onWeightageChange={onWeightageChange}
        onUpdate={onUpdate}
        loading={false}
      />
    );

    expect(screen.getByText("Not Started")).toBeInTheDocument();
  });

  it("shows total weightage", () => {
  render(
    <MilestoneTable
      milestones={milestones}
      onWeightageChange={onWeightageChange}
      onUpdate={onUpdate}
      loading={false}
    />
  );

expect(screen.getAllByText("100%")).toHaveLength(2);
});

  it("calls onUpdate", () => {
    render(
      <MilestoneTable
        milestones={milestones}
        onWeightageChange={onWeightageChange}
        onUpdate={onUpdate}
        loading={false}
      />
    );

    fireEvent.click(screen.getByRole("button"));

    expect(onUpdate).toHaveBeenCalledTimes(1);
  });

  it("calls onWeightageChange on change", () => {
    render(
      <MilestoneTable
        milestones={milestones}
        onWeightageChange={onWeightageChange}
        onUpdate={onUpdate}
        loading={false}
      />
    );

    fireEvent.change(screen.getAllByRole("spinbutton")[0], {
      target: {
        value: "55",
      },
    });

    expect(onWeightageChange).toHaveBeenCalledWith(0, "55");
  });

  it("clears zero on focus", () => {
    render(
      <MilestoneTable
        milestones={[
          {
            ...milestones[0],
            weightage: 0,
          },
        ]}
        onWeightageChange={onWeightageChange}
        onUpdate={onUpdate}
        loading={false}
      />
    );

    fireEvent.focus(screen.getByRole("spinbutton"));

    expect(onWeightageChange).toHaveBeenCalledWith(0, "");
  });

  it("sets zero on blur", () => {
    render(
      <MilestoneTable
        milestones={[
          {
            ...milestones[0],
            weightage: "",
          },
        ]}
        onWeightageChange={onWeightageChange}
        onUpdate={onUpdate}
        loading={false}
      />
    );

    fireEvent.blur(screen.getByRole("spinbutton"));

    expect(onWeightageChange).toHaveBeenCalledWith(0, "0");
  });

  it("disables update button when total is not 100", () => {
    render(
      <MilestoneTable
        milestones={[
          {
            ...milestones[0],
            weightage: 30,
          },
        ]}
        onWeightageChange={onWeightageChange}
        onUpdate={onUpdate}
        loading={false}
      />
    );

    expect(
      screen.getByRole("button")
    ).toBeDisabled();
  });

  it("disables update button while loading", () => {
    render(
      <MilestoneTable
        milestones={milestones}
        onWeightageChange={onWeightageChange}
        onUpdate={onUpdate}
        loading={true}
      />
    );

    expect(
      screen.getByRole("button")
    ).toBeDisabled();

    expect(
      screen.getByText("Updating...")
    ).toBeInTheDocument();
  });

  it("hides update button for management user", () => {
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        role: "MANAGEMENT USER",
      })
    );

    render(
      <MilestoneTable
        milestones={milestones}
        onWeightageChange={onWeightageChange}
        onUpdate={onUpdate}
        loading={false}
      />
    );

    expect(
      screen.queryByRole("button")
    ).not.toBeInTheDocument();
  });

  it("shows empty message", () => {
    render(
      <MilestoneTable
        milestones={[]}
        onWeightageChange={onWeightageChange}
        onUpdate={onUpdate}
        loading={false}
      />
    );

    expect(
      screen.getByText("No milestones found")
    ).toBeInTheDocument();
  });

  it("renders help text", () => {
    render(
      <MilestoneTable
        milestones={milestones}
        onWeightageChange={onWeightageChange}
        onUpdate={onUpdate}
        loading={false}
      />
    );

    expect(
      screen.getByText(/Total Weightage Must be Exactly/i)
    ).toBeInTheDocument();
  });

  it("renders two inputs", () => {
    render(
      <MilestoneTable
        milestones={milestones}
        onWeightageChange={onWeightageChange}
        onUpdate={onUpdate}
        loading={false}
      />
    );

    expect(screen.getAllByRole("spinbutton")).toHaveLength(2);
  });
  
});

