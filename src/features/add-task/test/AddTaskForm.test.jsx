import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";

import useAddTask from "../hooks/useAddTask";
import AddTaskForm from "../components/AddTaskForm";

const mockHandleChange = vi.fn();
const mockResetForm = vi.fn();
const mockHandleSubmit = vi.fn();

vi.mock("../hooks/useAddTask", () => ({
  default: vi.fn(),
}));

const mockUseAddTask = vi.mocked(useAddTask);

beforeEach(() => {
  mockUseAddTask.mockReset();

  mockUseAddTask.mockReturnValue({
    selectedProject: { id: "1" },
    formData: {
      phaseName: "",
      milestoneName: "",
      taskName: "",
      subTaskName: "",
      activityName: "",
      owner: "",
      plannedStartDate: "",
      plannedEndDate: "",
      actualStartDate: "",
      actualEndDate: "",
      estimatedPeriodWeek: "",
      actualPeriodWeek: "",
      progress: 0,
      executionStatus: "",
    },
    handleChange: mockHandleChange,
    phases: [],
    milestones: [],
    taskOptions: [],
    subTasks: [],
    resetForm: mockResetForm,
    handleSubmit: mockHandleSubmit,
    isSubmitting: false,
  });
});
vi.mock("../../../context/ProjectContext", () => ({
  useProjects: () => ({
    projects: [],
    setProjects: vi.fn(),
  }),
}));

vi.mock("../hooks/useEditableDropdown", () => ({
  default: () => ({
    showDropdown: false,
    setShowDropdown: vi.fn(),
    showAdd: false,
    setShowAdd: vi.fn(),
    newValue: "",
    setNewValue: vi.fn(),
    editingId: null,
    editingValue: "",
    setEditingValue: vi.fn(),
    handleSelect: vi.fn(),
    handleAdd: vi.fn(),
    startEdit: vi.fn(),
    handleSave: vi.fn(),
    cancelEdit: vi.fn(),
    closeDropdown: vi.fn(),
  }),
}));

vi.mock("../EditableDropdown", () => ({
  default: ({ label }) => <div>{label}</div>,
}));


vi.mock("../../../components/common/DateInput", () => ({
  default: ({ label, value, onChange }) => (
    <div>
      <label htmlFor={label}>{label}</label>
      <input
        id={label}
        aria-label={label}
        value={value}
        onChange={onChange}
      />
    </div>
  ),
}));

vi.mock("../../../components/common/CustomDropdown", () => ({
  default: ({ label, value, onChange, options }) => (
    <>
      <label>{label}</label>
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select Status</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  ),
}));
describe("AddTaskForm Rendering", () => {
  it("should render Basic Information section", () => {
    render(<AddTaskForm />);

    expect(screen.getByText("Basic Information")).toBeInTheDocument();
  });

  it("should render Schedule & Progress section", () => {
    render(<AddTaskForm />);

    expect(screen.getByText("Schedule & Progress")).toBeInTheDocument();
  });

  it("should render Phase dropdown", () => {
    render(<AddTaskForm />);

    expect(screen.getByText("Phase")).toBeInTheDocument();
  });

  it("should render Milestone dropdown", () => {
    render(<AddTaskForm />);

    expect(screen.getByText("Milestone")).toBeInTheDocument();
  });

  it("should render Task dropdown", () => {
    render(<AddTaskForm />);

    expect(screen.getByText("Task")).toBeInTheDocument();
  });

  it("should render Sub Task dropdown", () => {
    render(<AddTaskForm />);

    expect(screen.getByText("Sub Task")).toBeInTheDocument();
  });

  it("should render Reset button", () => {
    render(<AddTaskForm />);

    expect(screen.getByTestId("reset-button")).toBeInTheDocument();
  });

  it("should render Submit button", () => {
    render(<AddTaskForm />);

    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
  });
});



it("should update activity name", () => {
  render(<AddTaskForm />);

  const input = screen.getByPlaceholderText("Enter Activity");

  fireEvent.change(input, {
    target: { value: "Development" },
  });

  expect(mockHandleChange).toHaveBeenCalledWith(
    "activityName",
    "Development"
  );
});
it("should update owner", () => {
  render(<AddTaskForm />);

  const input = screen.getByPlaceholderText("Enter Owner");

  fireEvent.change(input, {
    target: { value: "Sachin" },
  });

  expect(mockHandleChange).toHaveBeenCalledWith(
    "owner",
    "Sachin"
  );
});
it("should update planned start date", () => {
  render(<AddTaskForm />);

  const input = screen.getByLabelText("Planned Start");

  fireEvent.change(input, {
    target: { value: "2026-07-22" },
  });

  expect(mockHandleChange).toHaveBeenCalledWith(
    "plannedStartDate",
    "2026-07-22"
  );
});
it("should update planned end date", () => {
  render(<AddTaskForm />);

  const input = screen.getByLabelText("Planned End");

  fireEvent.change(input, {
    target: { value: "2026-07-30" },
  });

  expect(mockHandleChange).toHaveBeenCalledWith(
    "plannedEndDate",
    "2026-07-30"
  );
});
it("should update actual start date", () => {
  render(<AddTaskForm />);

  const input = screen.getByLabelText("Actual Start");

  fireEvent.change(input, {
    target: { value: "2026-07-24" },
  });

  expect(mockHandleChange).toHaveBeenCalledWith(
    "actualStartDate",
    "2026-07-24"
  );
});
it("should update actual end date", () => {
  render(<AddTaskForm />);

  const input = screen.getByLabelText("Actual End");

  fireEvent.change(input, {
    target: { value: "2026-08-01" },
  });

  expect(mockHandleChange).toHaveBeenCalledWith(
    "actualEndDate",
    "2026-08-01"
  );
});
it("should update progress when valid value is entered", () => {
  render(<AddTaskForm />);

  const progressInput = screen.getByPlaceholderText("0");

  fireEvent.change(progressInput, {
    target: { value: "50" },
  });

  expect(mockHandleChange).toHaveBeenCalledWith(
    "progress",
    "50"
  );
});
it("should allow empty progress value", () => {
  render(<AddTaskForm />);

  const progressInput = screen.getByPlaceholderText("0");

  fireEvent.change(progressInput, {
    target: { value: "" },
  });

  expect(mockHandleChange).toHaveBeenCalledWith(
    "progress",
    ""
  );
});
it("should not update progress when value is greater than 100", () => {
  render(<AddTaskForm />);

  const progressInput = screen.getByPlaceholderText("0");

  fireEvent.change(progressInput, {
    target: { value: "120" },
  });

  expect(mockHandleChange).not.toHaveBeenCalledWith(
    "progress",
    "120"
  );
});
it("should update progress using slider", () => {
  render(<AddTaskForm />);

  const slider = screen.getByRole("slider");

  fireEvent.change(slider, {
    target: { value: "80" },
  });

  expect(mockHandleChange).toHaveBeenCalledWith(
    "progress",
    "80"
  );
});
it("should display progress percentage", () => {
  render(<AddTaskForm />);

  expect(screen.getByText("0%")).toBeInTheDocument();
});
it("should update execution status", () => {
  render(<AddTaskForm />);

  const status = screen.getByLabelText("Status");

  fireEvent.change(status, {
    target: {
      value: "Completed",
    },
  });

  expect(mockHandleChange).toHaveBeenCalledWith(
    "executionStatus",
    "Completed"
  );
});

it("should display estimated weeks value", () => {
  render(<AddTaskForm />);
expect(
  screen.getByPlaceholderText("Est. Weeks")
).toHaveAttribute("readonly");
 
});
it("should display actual weeks value", () => {
  render(<AddTaskForm />);

expect(
  screen.getByPlaceholderText("Act. Weeks")
).toHaveAttribute("readonly");
});
it("should call resetForm when Reset button is clicked", () => {
  render(<AddTaskForm />);

  fireEvent.click(screen.getByTestId("reset-button"));

  expect(mockResetForm).toHaveBeenCalledTimes(1);
});
it("should call handleSubmit when Add Activity button is clicked", () => {
  render(<AddTaskForm />);

  fireEvent.click(screen.getByTestId("submit-button"));

  expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
});
it("should display Add Activity text", () => {
  render(<AddTaskForm />);

  expect(
    screen.getByRole("button", { name: /Add Activity/i })
  ).toBeInTheDocument();
});
it("should call window.history.back when Cancel is clicked", () => {
  const backSpy = vi
    .spyOn(window.history, "back")
    .mockImplementation(() => {});

  render(<AddTaskForm />);

  fireEvent.click(
    screen.getByRole("button", { name: /Cancel/i })
  );

  expect(backSpy).toHaveBeenCalledTimes(1);

  backSpy.mockRestore();
});
it("should disable submit button while submitting", () => {
mockUseAddTask.mockReturnValue({
  selectedProject: { id: "1" },
  formData: {
    phaseName: "",
    milestoneName: "",
    taskName: "",
    subTaskName: "",
    activityName: "",
    owner: "",
    plannedStartDate: "",
    plannedEndDate: "",
    actualStartDate: "",
    actualEndDate: "",
    estimatedPeriodWeek: "",
    actualPeriodWeek: "",
    progress: 0,
    executionStatus: "",
  },
  handleChange: mockHandleChange,
  phases: [],
  milestones: [],
  taskOptions: [],
  subTasks: [],
  resetForm: mockResetForm,
  handleSubmit: mockHandleSubmit,
  isSubmitting: true,
});
  render(<AddTaskForm />);

  expect(
    screen.getByTestId("submit-button")
  ).toBeDisabled();
});
it("should show Adding... while submitting", () => {
 mockUseAddTask.mockReturnValue({
  selectedProject: { id: "1" },
  formData: {
    phaseName: "",
    milestoneName: "",
    taskName: "",
    subTaskName: "",
    activityName: "",
    owner: "",
    plannedStartDate: "",
    plannedEndDate: "",
    actualStartDate: "",
    actualEndDate: "",
    estimatedPeriodWeek: "",
    actualPeriodWeek: "",
    progress: 0,
    executionStatus: "",
  },
  handleChange: mockHandleChange,
  phases: [],
  milestones: [],
  taskOptions: [],
  subTasks: [],
  resetForm: mockResetForm,
  handleSubmit: mockHandleSubmit,
  isSubmitting: true,
});

  render(<AddTaskForm />);

  expect(
    screen.getByRole("button", {
      name: /Adding.../i,
    })
  ).toBeInTheDocument();
});
it("should not show Add Activity while submitting", () => {
 mockUseAddTask.mockReturnValue({
  selectedProject: { id: "1" },
  formData: {
    phaseName: "",
    milestoneName: "",
    taskName: "",
    subTaskName: "",
    activityName: "",
    owner: "",
    plannedStartDate: "",
    plannedEndDate: "",
    actualStartDate: "",
    actualEndDate: "",
    estimatedPeriodWeek: "",
    actualPeriodWeek: "",
    progress: 0,
    executionStatus: "",
  },
  handleChange: mockHandleChange,
  phases: [],
  milestones: [],
  taskOptions: [],
  subTasks: [],
  resetForm: mockResetForm,
  handleSubmit: mockHandleSubmit,
  isSubmitting: true,
});

  render(<AddTaskForm />);

  expect(
    screen.queryByText("Add Activity")
  ).not.toBeInTheDocument();
});
it("should enable submit button when not submitting", () => {
  render(<AddTaskForm />);

  expect(
    screen.getByTestId("submit-button")
  ).toBeEnabled();
});