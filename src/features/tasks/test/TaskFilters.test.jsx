import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import TaskFilters from "../components/TaskFilters";
vi.mock("../../../components/common/CustomDropdown", () => ({
  default: ({
    label,
    value,
    onChange,
    options,
    placeholder,
  }) => (
    <div>
      <label>{label}</label>
      <select
        data-testid={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  ),
}));

vi.mock("../../../components/common/MultiSelectDropdown", () => ({
  default: ({
    label,
    selected,
    onChange,
  }) => (
    <div>
      <label>{label}</label>
      <button
        data-testid="milestone-dropdown"
        onClick={() => onChange(["Milestone 1"])}
      >
        {selected.join(",")}
      </button>
    </div>
  ),
}));

vi.mock("../../../components/common/SearchInput", () => ({
  default: ({
    value,
    onChange,
    placeholder,
  }) => (
    <input
      data-testid="search-input"
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  ),
}));

describe("TaskFilters", () => {
  const props = {
    phases: ["Phase 1", "Phase 2"],
    milestones: ["Milestone 1", "Milestone 2"],
    tasks: ["Task 1"],
    subTasks: ["Sub Task 1"],
    activities: ["Activity 1"],

    selectedPhase: "",
    selectedMilestone: [],
    selectedTask: "",
    selectedSubTask: "",
    selectedActivity: "",
    selectedStatus: "",
    searchTerm: "",

    setSelectedPhase: vi.fn(),
    setSelectedMilestone: vi.fn(),
    setSelectedTask: vi.fn(),
    setSelectedSubTask: vi.fn(),
    setSelectedActivity: vi.fn(),
    setSelectedStatus: vi.fn(),
    setSearchTerm: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all filters", () => {
    render(<TaskFilters {...props} />);

    expect(screen.getByTestId("Phase")).toBeInTheDocument();
    expect(screen.getByTestId("Task")).toBeInTheDocument();
    expect(screen.getByTestId("Sub Task")).toBeInTheDocument();
    expect(screen.getByTestId("Activity")).toBeInTheDocument();
    expect(screen.getByTestId("Status")).toBeInTheDocument();
    expect(screen.getByTestId("milestone-dropdown")).toBeInTheDocument();
    expect(screen.getByTestId("search-input")).toBeInTheDocument();
  });

  it("changes phase", () => {
    render(<TaskFilters {...props} />);

    fireEvent.change(screen.getByTestId("Phase"), {
      target: { value: "Phase 1" },
    });

    expect(props.setSelectedPhase).toHaveBeenCalledWith("Phase 1");
    expect(props.setSelectedMilestone).toHaveBeenCalledWith([]);
    expect(props.setSelectedTask).toHaveBeenCalledWith("");
    expect(props.setSelectedSubTask).toHaveBeenCalledWith("");
    expect(props.setSelectedActivity).toHaveBeenCalledWith("");
  });

  it("changes milestone", () => {
    render(<TaskFilters {...props} />);

    fireEvent.click(screen.getByTestId("milestone-dropdown"));

    expect(props.setSelectedMilestone).toHaveBeenCalledWith([
      "Milestone 1",
    ]);
    expect(props.setSelectedTask).toHaveBeenCalledWith("");
    expect(props.setSelectedSubTask).toHaveBeenCalledWith("");
    expect(props.setSelectedActivity).toHaveBeenCalledWith("");
  });

  it("changes task", () => {
    render(<TaskFilters {...props} />);

    fireEvent.change(screen.getByTestId("Task"), {
      target: { value: "Task 1" },
    });

    expect(props.setSelectedTask).toHaveBeenCalledWith("Task 1");
    expect(props.setSelectedSubTask).toHaveBeenCalledWith("");
    expect(props.setSelectedActivity).toHaveBeenCalledWith("");
  });

  it("changes sub task", () => {
    render(<TaskFilters {...props} />);

    fireEvent.change(screen.getByTestId("Sub Task"), {
      target: { value: "Sub Task 1" },
    });

    expect(props.setSelectedSubTask).toHaveBeenCalledWith("Sub Task 1");
    expect(props.setSelectedActivity).toHaveBeenCalledWith("");
  });

  it("changes activity", () => {
    render(<TaskFilters {...props} />);

    fireEvent.change(screen.getByTestId("Activity"), {
      target: { value: "Activity 1" },
    });

    expect(props.setSelectedActivity).toHaveBeenCalledWith("Activity 1");
  });

  it("changes status", () => {
    render(<TaskFilters {...props} />);

    fireEvent.change(screen.getByTestId("Status"), {
      target: { value: "Completed" },
    });

    expect(props.setSelectedStatus).toHaveBeenCalledWith("Completed");
  });

  it("updates search term", () => {
    render(<TaskFilters {...props} />);

    fireEvent.change(screen.getByTestId("search-input"), {
      target: { value: "Login" },
    });

    expect(props.setSearchTerm).toHaveBeenCalledWith("Login");
  });

  it("renders search placeholder", () => {
    render(<TaskFilters {...props} />);

    expect(
      screen.getByPlaceholderText("Search Tasks...")
    ).toBeInTheDocument();
  });
});