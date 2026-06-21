import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import AddTaskForm from "../components/AddTaskForm";

const mockHandleChange = vi.fn();
const mockResetForm = vi.fn();
const mockHandleSubmit = vi.fn();

vi.mock("../hooks/useAddTask", () => ({
  default: () => ({
    selectedProject: {
      projectName: "Project A",
    },

    formData: {
      phaseName: "",
      milestoneName: "",
      taskName: "",
      subTaskName: "",
      activityName: "",
      owner: "",
      progress: 0,
      executionStatus: "",
      plannedStartDate: "",
      plannedEndDate: "",
      actualStartDate: "",
      actualEndDate: "",
      estimatedPeriodWeek: "",
    },

    phases: ["Phase 1", "Phase 2"],
    milestones: ["Milestone 1"],
    taskOptions: ["Task 1"],
    subTasks: ["Sub Task 1"],

    handleChange: mockHandleChange,
    resetForm: mockResetForm,
    handleSubmit: mockHandleSubmit,
  }),
}));

describe("AddTaskForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders all sections", () => {
    render(<AddTaskForm />);

    expect(screen.getByText("Basic Information")).toBeInTheDocument();

    expect(screen.getByText("Dates & Estimate")).toBeInTheDocument();

    expect(screen.getByText("Progress & Status")).toBeInTheDocument();
  });

  test("opens phase dropdown", () => {
    render(<AddTaskForm />);

    fireEvent.click(screen.getByTestId("phase-dropdown"));

    expect(screen.getByText("Phase 1")).toBeInTheDocument();

    expect(screen.getByText("Phase 2")).toBeInTheDocument();
  });

  test("selects phase", () => {
    render(<AddTaskForm />);

    fireEvent.click(screen.getByTestId("phase-dropdown"));

    fireEvent.click(screen.getByText("Phase 1"));

    expect(mockHandleChange).toHaveBeenCalledWith("phaseName", "Phase 1");
  });

  test("opens milestone dropdown", () => {
    render(<AddTaskForm />);

    fireEvent.click(screen.getByTestId("milestone-dropdown"));

    expect(screen.getByText("Milestone 1")).toBeInTheDocument();
  });

  test("selects milestone", () => {
    render(<AddTaskForm />);

    fireEvent.click(screen.getByTestId("milestone-dropdown"));

    fireEvent.click(screen.getByText("Milestone 1"));

    expect(mockHandleChange).toHaveBeenCalledWith(
      "milestoneName",
      "Milestone 1",
    );
  });

  test("opens task dropdown", () => {
    render(<AddTaskForm />);

    fireEvent.click(screen.getByTestId("task-dropdown"));

    expect(screen.getByText("Task 1")).toBeInTheDocument();
  });

  test("selects task", () => {
    render(<AddTaskForm />);

    fireEvent.click(screen.getByTestId("task-dropdown"));

    fireEvent.click(screen.getByText("Task 1"));

    expect(mockHandleChange).toHaveBeenCalledWith("taskName", "Task 1");
  });

  test("opens subtask dropdown", () => {
    render(<AddTaskForm />);

    fireEvent.click(screen.getByTestId("subtask-dropdown"));

    expect(screen.getByText("Sub Task 1")).toBeInTheDocument();
  });

  test("selects subtask", () => {
    render(<AddTaskForm />);

    fireEvent.click(screen.getByTestId("subtask-dropdown"));

    fireEvent.click(screen.getByText("Sub Task 1"));

    expect(mockHandleChange).toHaveBeenCalledWith("subTaskName", "Sub Task 1");
  });

  test("updates activity input", () => {
    render(<AddTaskForm />);

    fireEvent.change(screen.getByPlaceholderText("Enter Activity"), {
      target: {
        value: "Testing Activity",
      },
    });

    expect(mockHandleChange).toHaveBeenCalledWith(
      "activityName",
      "Testing Activity",
    );
  });

  test("updates owner input", () => {
    render(<AddTaskForm />);

    fireEvent.change(screen.getByPlaceholderText("Enter Owner"), {
      target: {
        value: "Sachin",
      },
    });

    expect(mockHandleChange).toHaveBeenCalledWith("owner", "Sachin");
  });

  test("updates estimated weeks", () => {
    render(<AddTaskForm />);

    fireEvent.change(screen.getByPlaceholderText("Enter Estimated Weeks"), {
      target: {
        value: "10",
      },
    });

    expect(mockHandleChange).toHaveBeenCalledWith("estimatedPeriodWeek", "10");
  });

  test("updates progress slider", () => {
    render(<AddTaskForm />);

    const slider = screen.getByRole("slider");

    fireEvent.change(slider, {
      target: {
        value: "75",
      },
    });

    expect(mockHandleChange).toHaveBeenCalledWith("progress", "75");
  });

  test("updates status dropdown", () => {
    render(<AddTaskForm />);

    const select = screen.getByRole("combobox");

    fireEvent.change(select, {
      target: {
        value: "Completed",
      },
    });

    expect(mockHandleChange).toHaveBeenCalledWith(
      "executionStatus",
      "Completed",
    );
  });

  test("calls resetForm", () => {
    render(<AddTaskForm />);

    fireEvent.click(screen.getByTestId("reset-button"));

    expect(mockResetForm).toHaveBeenCalledTimes(1);
  });

  test("calls handleSubmit", () => {
    render(<AddTaskForm />);

    fireEvent.click(screen.getByTestId("submit-button"));

    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });

  test("calls browser back", () => {
    const backSpy = vi.fn();

    window.history.back = backSpy;

    render(<AddTaskForm />);

    fireEvent.click(screen.getByText("← Back"));

    expect(backSpy).toHaveBeenCalledTimes(1);
  });

  test("shows add phase input", () => {
    render(<AddTaskForm />);

    fireEvent.click(screen.getByTestId("phase-dropdown"));

    fireEvent.click(screen.getByText("+ Add New Phase"));

    expect(screen.getByPlaceholderText("Enter Phase Name")).toBeInTheDocument();
  });

  test("shows add milestone input", () => {
    render(<AddTaskForm />);

    fireEvent.click(screen.getByTestId("milestone-dropdown"));

    fireEvent.click(screen.getByText("+ Add New Milestone"));

    expect(
      screen.getByPlaceholderText("Enter Milestone Name"),
    ).toBeInTheDocument();
  });

  test("shows add task input", () => {
    render(<AddTaskForm />);

    fireEvent.click(screen.getByTestId("task-dropdown"));

    fireEvent.click(screen.getByText("+ Add New Task"));

    expect(screen.getByPlaceholderText("Enter Task Name")).toBeInTheDocument();
  });

  test("shows add subtask input", () => {
    render(<AddTaskForm />);

    fireEvent.click(screen.getByTestId("subtask-dropdown"));

    fireEvent.click(screen.getByText("+ Add New Sub Task"));

    expect(
      screen.getByPlaceholderText("Enter Sub Task Name"),
    ).toBeInTheDocument();
  });
});
