import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import DocumentFilters from "../components/DocumentFilters";


/* -------------------- Mock Components -------------------- */

vi.mock("../../../components/common/CustomDropdown", () => ({
  default: ({ label, value, onChange, options }) => (
    <div>
      <label>{label}</label>
      <select
        data-testid={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select</option>
        {options?.map((option) => (
          <option
            key={option.value ?? option}
            value={option.value ?? option}
          >
            {option.label ?? option}
          </option>
        ))}
      </select>
    </div>
  ),
}));

vi.mock("../../../components/common/MultiSelectDropdown", () => ({
  default: ({ label, onChange }) => (
    <button
      data-testid="milestone-dropdown"
      onClick={() => onChange(["Milestone 1"])}
    >
      {label}
    </button>
  ),
}));

vi.mock("../../../components/common/SearchInput", () => ({
  default: ({ value, onChange }) => (
    <input
      data-testid="search-input"
      value={value}
      onChange={onChange}
    />
  ),
}));

describe("DocumentFilters", () => {
  const defaultProps = {
    phases: [
      { label: "Phase 1", value: "Phase 1" },
      { label: "Phase 2", value: "Phase 2" },
    ],
    milestones: [
      { label: "Milestone 1", value: "Milestone 1" },
    ],
    tasks: [
      { label: "Task 1", value: "Task 1" },
    ],
    subTasks: [
      { label: "SubTask 1", value: "SubTask 1" },
    ],
    activities: [
      { label: "Activity 1", value: "Activity 1" },
    ],

    selectedPhase: "",
    selectedMilestone: [],
    selectedTask: "",
    selectedSubTask: "",
    selectedActivity: "",
    selectedStatus: "",
    searchTerm: "",

    setSelectedMilestone: vi.fn(),
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

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all filters", () => {
    render(<DocumentFilters {...defaultProps} />);

    expect(screen.getByTestId("Phase")).toBeInTheDocument();
    expect(screen.getByTestId("Task")).toBeInTheDocument();
    expect(screen.getByTestId("Sub Task")).toBeInTheDocument();
    expect(screen.getByTestId("Activity")).toBeInTheDocument();
    expect(screen.getByTestId("Upload Status")).toBeInTheDocument();
    expect(screen.getByTestId("search-input")).toBeInTheDocument();
    expect(screen.getByText("Clear Filters")).toBeInTheDocument();
  });

  it("calls handlePhaseChange", () => {
    render(<DocumentFilters {...defaultProps} />);

    fireEvent.change(screen.getByTestId("Phase"), {
      target: { value: "Phase 1" },
    });

    expect(defaultProps.handlePhaseChange).toHaveBeenCalledWith("Phase 1");
  });

  it("calls handleTaskChange", () => {
    render(<DocumentFilters {...defaultProps} />);

    fireEvent.change(screen.getByTestId("Task"), {
      target: { value: "Task 1" },
    });

    expect(defaultProps.handleTaskChange).toHaveBeenCalledWith("Task 1");
  });

  it("calls handleSubTaskChange", () => {
    render(<DocumentFilters {...defaultProps} />);

    fireEvent.change(screen.getByTestId("Sub Task"), {
      target: { value: "SubTask 1" },
    });

    expect(defaultProps.handleSubTaskChange).toHaveBeenCalledWith("SubTask 1");
  });

  it("calls setSelectedActivity", () => {
    render(<DocumentFilters {...defaultProps} />);

    fireEvent.change(screen.getByTestId("Activity"), {
      target: { value: "Activity 1" },
    });

    expect(defaultProps.setSelectedActivity).toHaveBeenCalledWith("Activity 1");
  });

  it("calls setSelectedStatus", () => {
    render(<DocumentFilters {...defaultProps} />);

    fireEvent.change(screen.getByTestId("Upload Status"), {
      target: { value: "Uploaded" },
    });

    expect(defaultProps.setSelectedStatus).toHaveBeenCalledWith("Uploaded");
  });

  it("calls setSelectedMilestone", () => {
    render(<DocumentFilters {...defaultProps} />);

    fireEvent.click(screen.getByTestId("milestone-dropdown"));

    expect(defaultProps.setSelectedMilestone).toHaveBeenCalledWith([
      "Milestone 1",
    ]);
  });

  it("updates search text", () => {
    render(<DocumentFilters {...defaultProps} />);

    fireEvent.change(screen.getByTestId("search-input"), {
      target: { value: "abc" },
    });

    expect(defaultProps.setSearchTerm).toHaveBeenCalledWith("abc");
  });

  it("calls clearFilters", () => {
    render(<DocumentFilters {...defaultProps} />);

    fireEvent.click(screen.getByText("Clear Filters"));

    expect(defaultProps.clearFilters).toHaveBeenCalledTimes(1);
  });
});