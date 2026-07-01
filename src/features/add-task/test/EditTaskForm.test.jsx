import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import EditTaskForm from "../components/EditTaskForm";

const mockHandleChange = vi.fn();
const mockHandleUpdate = vi.fn();

vi.mock("../hooks/useEditTask", () => ({
  default: () => ({
    selectedProject: {
      projectName: "Project A",
    },

    formData: {
      phaseName: "Phase 1",
      milestoneName: "Milestone 1",
      taskName: "Task 1",
      subTaskName: "Sub Task 1",
      activityName: "Activity 1",
      owner: "Sachin",

      plannedStartDate: "",
      plannedEndDate: "",
      actualStartDate: "",
      actualEndDate: "",

      estimatedPeriodWeek: "",

      progress: 20,

      executionStatus: "",

      scheduleHealth: "",

      changeReason: "",
    },

    phases: [],
    milestones: [],
    taskOptions: [],
    subTasks: [],

    handleChange: mockHandleChange,
    handleUpdate: mockHandleUpdate,
  }),
}));

describe("EditTaskForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all sections", () => {
    render(<EditTaskForm />);

    expect(screen.getByText("Basic Information")).toBeInTheDocument();
    expect(screen.getByText("Dates & Estimate")).toBeInTheDocument();
    expect(screen.getByText("Progress & Status")).toBeInTheDocument();
  });

  it("phase field is disabled", () => {
    render(<EditTaskForm />);

    expect(screen.getByDisplayValue("Phase 1")).toBeDisabled();
  });

  it("milestone field is disabled", () => {
    render(<EditTaskForm />);

    expect(screen.getByDisplayValue("Milestone 1")).toBeDisabled();
  });

  it("task field is disabled", () => {
    render(<EditTaskForm />);

    expect(screen.getByDisplayValue("Task 1")).toBeDisabled();
  });

  it("sub task field is disabled", () => {
    render(<EditTaskForm />);

    expect(screen.getByDisplayValue("Sub Task 1")).toBeDisabled();
  });

  it("activity field is disabled", () => {
    render(<EditTaskForm />);

    expect(screen.getByDisplayValue("Activity 1")).toBeDisabled();
  });

  it("updates owner", () => {
    render(<EditTaskForm />);

    fireEvent.change(screen.getByPlaceholderText("Enter Owner"), {
      target: {
        value: "Rahul",
      },
    });

    expect(mockHandleChange).toHaveBeenCalledWith("owner", "Rahul");
  });

  it("updates estimated weeks", () => {
    render(<EditTaskForm />);

    fireEvent.change(screen.getByPlaceholderText("Enter Estimated Weeks"), {
      target: {
        value: "12",
      },
    });

    expect(mockHandleChange).toHaveBeenCalledWith("estimatedPeriodWeek", "12");
  });

  it("renders progress slider", () => {
    render(<EditTaskForm />);

    expect(screen.getByRole("slider")).toBeInTheDocument();
  });

  it("shows calculated status as In Progress", () => {
    render(<EditTaskForm />);

    expect(screen.getByText("In Progress")).toBeInTheDocument();
  });

  it("updates planned start date", () => {
    render(<EditTaskForm />);

    const dates = document.querySelectorAll('input[type="date"]');

    fireEvent.change(dates[0], {
      target: {
        value: "2026-06-01",
      },
    });

    expect(mockHandleChange).toHaveBeenCalledWith(
      "plannedStartDate",
      "2026-06-01",
    );
  });

  it("updates planned end date", () => {
    render(<EditTaskForm />);

    const dates = document.querySelectorAll('input[type="date"]');

    fireEvent.change(dates[1], {
      target: {
        value: "2026-06-15",
      },
    });

    expect(mockHandleChange).toHaveBeenCalledWith(
      "plannedEndDate",
      "2026-06-15",
    );
  });

  it("updates actual start date", () => {
    render(<EditTaskForm />);

    const dates = document.querySelectorAll('input[type="date"]');

    fireEvent.change(dates[2], {
      target: {
        value: "2026-06-03",
      },
    });

    expect(mockHandleChange).toHaveBeenCalledWith(
      "actualStartDate",
      "2026-06-03",
    );
  });

  it("updates actual end date", () => {
    render(<EditTaskForm />);

    const dates = document.querySelectorAll('input[type="date"]');

    fireEvent.change(dates[3], {
      target: {
        value: "2026-06-18",
      },
    });

    expect(mockHandleChange).toHaveBeenCalledWith(
      "actualEndDate",
      "2026-06-18",
    );
  });

  it("updates progress slider", () => {
    render(<EditTaskForm />);

    fireEvent.change(screen.getByRole("slider"), {
      target: {
        value: "80",
      },
    });

    expect(mockHandleChange).toHaveBeenCalledWith("progress", "80");
  });

  it("update button calls handleUpdate", () => {
    render(<EditTaskForm />);

    fireEvent.click(screen.getByText("Update Task"));

    expect(mockHandleUpdate).toHaveBeenCalledTimes(1);
  });

  it("back button calls browser history", () => {
    const backSpy = vi.fn();

    window.history.back = backSpy;

    render(<EditTaskForm />);

    fireEvent.click(screen.getByText("← Back"));

    expect(backSpy).toHaveBeenCalledTimes(1);
  });

  it("update button exists", () => {
    render(<EditTaskForm />);

    expect(screen.getByText("Update Task")).toBeInTheDocument();
  });

  it("back button exists", () => {
    render(<EditTaskForm />);

    expect(screen.getByText("← Back")).toBeInTheDocument();
  });

  it("estimated weeks input exists", () => {
    render(<EditTaskForm />);

    expect(
      screen.getByPlaceholderText("Enter Estimated Weeks"),
    ).toBeInTheDocument();
  });

  it("owner input exists", () => {
    render(<EditTaskForm />);

    expect(screen.getByPlaceholderText("Enter Owner")).toBeInTheDocument();
  });

  it("renders four date inputs", () => {
    render(<EditTaskForm />);

    expect(document.querySelectorAll('input[type="date"]')).toHaveLength(4);
  });

  it("progress slider displays initial value", () => {
    render(<EditTaskForm />);

    expect(screen.getByText("20%")).toBeInTheDocument();
  });

  it("does not show reason for change initially", () => {
    render(<EditTaskForm />);

    expect(
      screen.queryByPlaceholderText("Enter reason for changing planned dates"),
    ).not.toBeInTheDocument();
  });

  it("renders owner with initial value", () => {
    render(<EditTaskForm />);

    expect(screen.getByDisplayValue("Sachin")).toBeInTheDocument();
  });

  it("renders phase value", () => {
    render(<EditTaskForm />);

    expect(screen.getByDisplayValue("Phase 1")).toBeInTheDocument();
  });

  it("renders milestone value", () => {
    render(<EditTaskForm />);

    expect(screen.getByDisplayValue("Milestone 1")).toBeInTheDocument();
  });

  it("renders task value", () => {
    render(<EditTaskForm />);

    expect(screen.getByDisplayValue("Task 1")).toBeInTheDocument();
  });

  it("renders sub task value", () => {
    render(<EditTaskForm />);

    expect(screen.getByDisplayValue("Sub Task 1")).toBeInTheDocument();
  });

  it("renders activity value", () => {
    render(<EditTaskForm />);

    expect(screen.getByDisplayValue("Activity 1")).toBeInTheDocument();
  });

  it("owner input is editable", () => {
    render(<EditTaskForm />);

    expect(screen.getByPlaceholderText("Enter Owner")).not.toBeDisabled();
  });

  it("estimated weeks input is editable", () => {
    render(<EditTaskForm />);

    expect(
      screen.getByPlaceholderText("Enter Estimated Weeks"),
    ).not.toBeDisabled();
  });

  it("shows status label", () => {
    render(<EditTaskForm />);

    expect(screen.getByText("Status")).toBeInTheDocument();
  });

  it("shows calculated status as In Progress", () => {
    render(<EditTaskForm />);

    expect(screen.getByText("In Progress")).toBeInTheDocument();
  });

  it("does not render status dropdown", () => {
    render(<EditTaskForm />);

    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
  });

  it("progress slider has correct max value", () => {
    render(<EditTaskForm />);

    expect(screen.getByRole("slider")).toHaveAttribute("max", "100");
  });

  it("progress slider has correct min value", () => {
    render(<EditTaskForm />);

    expect(screen.getByRole("slider")).toHaveAttribute("min", "0");
  });

  it("progress slider has correct current value", () => {
    render(<EditTaskForm />);

    expect(screen.getByRole("slider")).toHaveValue("20");
  });

  it("shows progress percentage", () => {
    render(<EditTaskForm />);

    expect(screen.getByText("20%")).toBeInTheDocument();
  });

  it("shows progress lower bound", () => {
    render(<EditTaskForm />);

    expect(screen.getByText("0%")).toBeInTheDocument();
  });

  it("shows progress upper bound", () => {
    render(<EditTaskForm />);

    expect(screen.getByText("100%")).toBeInTheDocument();
  });
});
