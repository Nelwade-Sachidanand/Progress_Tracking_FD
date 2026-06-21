import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import TaskFilters from "../components/TaskFilters";

describe("TaskFilters", () => {
  const props = {
    phases: ["Phase 1", "Phase 2"],
    milestones: ["Milestone 1", "Milestone 2"],
    tasks: ["Task 1", "Task 2"],
    subTasks: ["SubTask 1"],
    activities: ["Activity 1"],

    selectedPhase: "All Phases",
    selectedMilestone: [],
    selectedTask: "All Tasks",
    selectedSubTask: "All Sub Tasks",
    selectedActivity: "All Activities",
    selectedStatus: "All Status",
    searchTerm: "",

    setSelectedPhase: vi.fn(),
    setSelectedMilestone: vi.fn(),
    setSelectedTask: vi.fn(),
    setSelectedSubTask: vi.fn(),
    setSelectedActivity: vi.fn(),
    setSelectedStatus: vi.fn(),
    setSearchTerm: vi.fn(),

    handleMilestoneChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all filters", () => {
    render(<TaskFilters {...props} />);

    expect(screen.getByDisplayValue("All Phases")).toBeInTheDocument();

    expect(screen.getByDisplayValue("All Tasks")).toBeInTheDocument();

    expect(screen.getByDisplayValue("All Sub Tasks")).toBeInTheDocument();

    expect(screen.getByDisplayValue("All Activities")).toBeInTheDocument();

    expect(screen.getByDisplayValue("All Status")).toBeInTheDocument();
  });

  it("changes phase", () => {
    render(<TaskFilters {...props} />);

    const selects = screen.getAllByRole("combobox");

    fireEvent.change(selects[0], {
      target: {
        value: "Phase 1",
      },
    });

    expect(props.setSelectedPhase).toHaveBeenCalledWith("Phase 1");
  });

  it("changes task", () => {
    render(<TaskFilters {...props} />);

    const selects = screen.getAllByRole("combobox");

    fireEvent.change(selects[1], {
      target: {
        value: "Task 1",
      },
    });

    expect(props.setSelectedTask).toHaveBeenCalledWith("Task 1");
  });

  it("changes sub task", () => {
    render(<TaskFilters {...props} />);

    const selects = screen.getAllByRole("combobox");

    fireEvent.change(selects[2], {
      target: {
        value: "SubTask 1",
      },
    });

    expect(props.setSelectedSubTask).toHaveBeenCalledWith("SubTask 1");
  });

  it("changes activity", () => {
    render(<TaskFilters {...props} />);

    const selects = screen.getAllByRole("combobox");

    fireEvent.change(selects[3], {
      target: {
        value: "Activity 1",
      },
    });

    expect(props.setSelectedActivity).toHaveBeenCalledWith("Activity 1");
  });

  it("changes status", () => {
    render(<TaskFilters {...props} />);

    const selects = screen.getAllByRole("combobox");

    fireEvent.change(selects[4], {
      target: {
        value: "Completed",
      },
    });

    expect(props.setSelectedStatus).toHaveBeenCalledWith("Completed");
  });

  it("changes search text", () => {
    render(<TaskFilters {...props} />);

    const input = screen.getByPlaceholderText(
      "Search activity, task, milestone...",
    );

    fireEvent.change(input, {
      target: {
        value: "test activity",
      },
    });

    expect(props.setSearchTerm).toHaveBeenCalledWith("test activity");
  });

  it("opens milestone dropdown", () => {
    render(<TaskFilters {...props} />);

    fireEvent.click(screen.getByText("Select Milestones"));

    expect(screen.getByText("Milestone 1")).toBeInTheDocument();

    expect(screen.getByText("Milestone 2")).toBeInTheDocument();
  });

  it("calls handleMilestoneChange when milestone selected", () => {
    render(<TaskFilters {...props} />);

    fireEvent.click(screen.getByText("Select Milestones"));

    const checkbox = screen.getAllByRole("checkbox")[0];

    fireEvent.click(checkbox);

    expect(props.handleMilestoneChange).toHaveBeenCalledWith("Milestone 1");
  });

  it("clears milestones", () => {
    render(<TaskFilters {...props} selectedMilestone={["Milestone 1"]} />);

    fireEvent.click(screen.getByText("Milestones (1)"));

    fireEvent.click(screen.getByText("Clear"));

    expect(props.setSelectedMilestone).toHaveBeenCalledWith([]);
  });

  it("shows selected milestone count", () => {
    render(<TaskFilters {...props} selectedMilestone={["M1", "M2"]} />);

    expect(screen.getByText("Milestones (2)")).toBeInTheDocument();
  });

  it("closes milestone dropdown when clicking outside", () => {
    render(<TaskFilters {...props} />);

    fireEvent.click(screen.getByText("Select Milestones"));

    expect(screen.getByText("Milestone 1")).toBeInTheDocument();

    fireEvent.mouseDown(document);

    expect(screen.queryByText("Milestone 1")).not.toBeInTheDocument();
  });
});
