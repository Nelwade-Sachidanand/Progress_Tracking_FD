import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import DocumentFilters from "../components/DocumentFilters";
const mockProps = {
  phases: ["Phase 1"],
  milestones: ["M1", "M2"],
  tasks: ["Task1"],
  subTasks: ["Sub1"],
  activities: ["Act1"],

  selectedPhase: "All Phases",
  selectedMilestone: [],
  selectedTask: "All Tasks",
  selectedSubTask: "All Sub Tasks",
  selectedActivity: "All Activities",
  selectedStatus: "All Status",
  searchTerm: "",

  setSelectedStatus: vi.fn(),
  setSearchTerm: vi.fn(),
  setSelectedActivity: vi.fn(),

  handlePhaseChange: vi.fn(),
  handleMilestoneChange: vi.fn(),
  handleTaskChange: vi.fn(),
  handleSubTaskChange: vi.fn(),

  onExportExcel: vi.fn(),
  clearFilters: vi.fn(),
};

describe("DocumentFilters", () => {
  it("renders all filter fields", () => {
    render(<DocumentFilters {...mockProps} />);

    expect(screen.getByText("Phase")).toBeInTheDocument();
    expect(screen.getByText("Milestone")).toBeInTheDocument();
    expect(screen.getByText("Task")).toBeInTheDocument();
    expect(screen.getByText("Sub Task")).toBeInTheDocument();
    expect(screen.getByText("Activity")).toBeInTheDocument();
    expect(screen.getByText("Upload Status")).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
  });

  it("calls phase change handler", () => {
    render(<DocumentFilters {...mockProps} />);

    fireEvent.change(screen.getByDisplayValue("All Phases"), {
      target: { value: "Phase 1" },
    });

    expect(mockProps.handlePhaseChange).toHaveBeenCalledWith("Phase 1");
  });

  it("calls task change handler", () => {
    render(<DocumentFilters {...mockProps} />);

    fireEvent.change(screen.getByDisplayValue("All Tasks"), {
      target: { value: "Task1" },
    });

    expect(mockProps.handleTaskChange).toHaveBeenCalledWith("Task1");
  });

  it("calls sub task change handler", () => {
    render(<DocumentFilters {...mockProps} />);

    fireEvent.change(screen.getByDisplayValue("All Sub Tasks"), {
      target: { value: "Sub1" },
    });

    expect(mockProps.handleSubTaskChange).toHaveBeenCalledWith("Sub1");
  });

  it("calls activity change handler", () => {
    render(<DocumentFilters {...mockProps} />);

    fireEvent.change(screen.getByDisplayValue("All Activities"), {
      target: { value: "Act1" },
    });

    expect(mockProps.setSelectedActivity).toHaveBeenCalledWith("Act1");
  });

  it("calls status change handler", () => {
    render(<DocumentFilters {...mockProps} />);

    fireEvent.change(screen.getByDisplayValue("All Status"), {
      target: { value: "Uploaded" },
    });

    expect(mockProps.setSelectedStatus).toHaveBeenCalledWith("Uploaded");
  });

  it("clears filters when clear button clicked", () => {
    render(<DocumentFilters {...mockProps} />);

    fireEvent.click(screen.getByText("Clear Filters"));

    expect(mockProps.clearFilters).toHaveBeenCalled();
  });
});