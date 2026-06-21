import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import EditTaskForm from "../components/EditTaskForm";

const mockHandleChange = vi.fn();
const mockResetForm = vi.fn();
const mockHandleUpdate = vi.fn();

vi.mock("../hooks/useEditTask", () => ({
  default: () => ({
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
      progress: 0,
      executionStatus: "",
    },

    phases: [],
    milestones: [],
    taskOptions: [],
    subTasks: [],

    handleChange: mockHandleChange,
    resetForm: mockResetForm,
    handleUpdate: mockHandleUpdate,
  }),
}));

describe("EditTaskForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders all sections", () => {
    render(<EditTaskForm />);

    expect(screen.getByText("Basic Information")).toBeInTheDocument();

    expect(screen.getByText("Dates & Estimate")).toBeInTheDocument();

    expect(screen.getByText("Progress & Status")).toBeInTheDocument();
  });

  test("updates phase", () => {
    render(<EditTaskForm />);

    fireEvent.change(screen.getByPlaceholderText("Enter Phase"), {
      target: {
        value: "Phase A",
      },
    });

    expect(mockHandleChange).toHaveBeenCalledWith("phaseName", "Phase A");
  });

  test("updates milestone", () => {
    render(<EditTaskForm />);

    fireEvent.change(screen.getByPlaceholderText("Enter Milestone"), {
      target: {
        value: "Milestone A",
      },
    });

    expect(mockHandleChange).toHaveBeenCalledWith(
      "milestoneName",
      "Milestone A",
    );
  });

  test("updates task", () => {
    render(<EditTaskForm />);

    fireEvent.change(screen.getByPlaceholderText("Enter Task"), {
      target: {
        value: "Task A",
      },
    });

    expect(mockHandleChange).toHaveBeenCalledWith("taskName", "Task A");
  });

  test("updates sub task", () => {
    render(<EditTaskForm />);

    fireEvent.change(screen.getByPlaceholderText("Enter Sub Task"), {
      target: {
        value: "Sub Task A",
      },
    });

    expect(mockHandleChange).toHaveBeenCalledWith("subTaskName", "Sub Task A");
  });

  test("updates activity", () => {
    render(<EditTaskForm />);

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

  test("updates owner", () => {
    render(<EditTaskForm />);

    fireEvent.change(screen.getByPlaceholderText("Enter Owner"), {
      target: {
        value: "Sachin",
      },
    });

    expect(mockHandleChange).toHaveBeenCalledWith("owner", "Sachin");
  });

  test("updates estimated weeks", () => {
    render(<EditTaskForm />);

    fireEvent.change(screen.getByPlaceholderText("Enter Estimated Weeks"), {
      target: {
        value: "8",
      },
    });

    expect(mockHandleChange).toHaveBeenCalledWith("estimatedPeriodWeek", "8");
  });

  test("updates planned start date", () => {
    render(<EditTaskForm />);

    const inputs = screen.getAllByDisplayValue("");

    fireEvent.change(inputs[6], {
      target: {
        value: "2026-01-01",
      },
    });

    expect(mockHandleChange).toHaveBeenCalled();
  });

  test("updates progress slider", () => {
    render(<EditTaskForm />);

    const slider = screen.getByRole("slider");

    fireEvent.change(slider, {
      target: {
        value: "80",
      },
    });

    expect(mockHandleChange).toHaveBeenCalledWith("progress", "80");
  });

  test("updates status", () => {
    render(<EditTaskForm />);

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
    render(<EditTaskForm />);

    fireEvent.click(screen.getByText("Reset"));

    expect(mockResetForm).toHaveBeenCalledTimes(1);
  });

  test("calls handleUpdate", () => {
    render(<EditTaskForm />);

    fireEvent.click(screen.getByText("Update Task"));

    expect(mockHandleUpdate).toHaveBeenCalledTimes(1);
  });

  test("calls browser back", () => {
    const backSpy = vi.fn();

    window.history.back = backSpy;

    render(<EditTaskForm />);

    fireEvent.click(screen.getByText("← Back"));

    expect(backSpy).toHaveBeenCalledTimes(1);
  });
});
