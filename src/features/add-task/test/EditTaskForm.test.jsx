import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";

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

  test("renders all sections", () => {
    render(<EditTaskForm />);

    expect(screen.getByText("Basic Information")).toBeInTheDocument();

    expect(screen.getByText("Dates & Estimate")).toBeInTheDocument();

    expect(screen.getByText("Progress & Status")).toBeInTheDocument();
  });

  test("phase field is disabled", () => {
    render(<EditTaskForm />);

    expect(screen.getByDisplayValue("Phase 1")).toBeDisabled();
  });

  test("milestone field is disabled", () => {
    render(<EditTaskForm />);

    expect(screen.getByDisplayValue("Milestone 1")).toBeDisabled();
  });

  test("task field is disabled", () => {
    render(<EditTaskForm />);

    expect(screen.getByDisplayValue("Task 1")).toBeDisabled();
  });

  test("sub task field is disabled", () => {
    render(<EditTaskForm />);

    expect(screen.getByDisplayValue("Sub Task 1")).toBeDisabled();
  });

  test("activity field is disabled", () => {
    render(<EditTaskForm />);

    expect(screen.getByDisplayValue("Activity 1")).toBeDisabled();
  });

  test("updates owner", () => {
    render(<EditTaskForm />);

    fireEvent.change(screen.getByPlaceholderText("Enter Owner"), {
      target: {
        value: "Rahul",
      },
    });

    expect(mockHandleChange).toHaveBeenCalledWith("owner", "Rahul");
  });

  test("updates estimated weeks", () => {
    render(<EditTaskForm />);

    fireEvent.change(screen.getByPlaceholderText("Enter Estimated Weeks"), {
      target: {
        value: "12",
      },
    });

    expect(mockHandleChange).toHaveBeenCalledWith("estimatedPeriodWeek", "12");
  });

  test("renders progress slider", () => {
    render(<EditTaskForm />);

    expect(screen.getByRole("slider")).toBeInTheDocument();
  });

  test("renders status dropdown", () => {
    render(<EditTaskForm />);

    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });
  test("updates planned start date", () => {
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

  test("updates planned end date", () => {
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

  test("updates actual start date", () => {
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

  test("updates actual end date", () => {
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

  test("updates progress slider", () => {
    render(<EditTaskForm />);

    fireEvent.change(screen.getByRole("slider"), {
      target: {
        value: "80",
      },
    });

    expect(mockHandleChange).toHaveBeenCalledWith("progress", "80");
  });

  test("updates execution status", () => {
    render(<EditTaskForm />);

    fireEvent.change(screen.getByRole("combobox"), {
      target: {
        value: "Completed",
      },
    });

    expect(mockHandleChange).toHaveBeenCalledWith(
      "executionStatus",
      "Completed",
    );
  });

  test("update button calls handleUpdate", () => {
    render(<EditTaskForm />);

    fireEvent.click(screen.getByText("Update Task"));

    expect(mockHandleUpdate).toHaveBeenCalledTimes(1);
  });

  test("back button calls browser history", () => {
    const backSpy = vi.fn();

    window.history.back = backSpy;

    render(<EditTaskForm />);

    fireEvent.click(screen.getByText("← Back"));

    expect(backSpy).toHaveBeenCalledTimes(1);
  });

  test("update button exists", () => {
    render(<EditTaskForm />);

    expect(screen.getByText("Update Task")).toBeInTheDocument();
  });

  test("back button exists", () => {
    render(<EditTaskForm />);

    expect(screen.getByText("← Back")).toBeInTheDocument();
  });

  test("estimated weeks input exists", () => {
    render(<EditTaskForm />);

    expect(
      screen.getByPlaceholderText("Enter Estimated Weeks"),
    ).toBeInTheDocument();
  });

  test("owner input exists", () => {
    render(<EditTaskForm />);

    expect(screen.getByPlaceholderText("Enter Owner")).toBeInTheDocument();
  });

  test("renders four date inputs", () => {
    render(<EditTaskForm />);

    expect(document.querySelectorAll('input[type="date"]').length).toBe(4);
  });

  test("progress slider displays initial value", () => {
    render(<EditTaskForm />);

    expect(screen.getByText("20%")).toBeInTheDocument();
  });
  test("does not show reason for change initially", () => {
    render(<EditTaskForm />);

    expect(
      screen.queryByPlaceholderText("Enter reason for changing planned dates"),
    ).not.toBeInTheDocument();
  });

  test("renders owner with initial value", () => {
    render(<EditTaskForm />);

    expect(screen.getByDisplayValue("Sachin")).toBeInTheDocument();
  });

  test("renders phase value", () => {
    render(<EditTaskForm />);

    expect(screen.getByDisplayValue("Phase 1")).toBeInTheDocument();
  });

  test("renders milestone value", () => {
    render(<EditTaskForm />);

    expect(screen.getByDisplayValue("Milestone 1")).toBeInTheDocument();
  });

  test("renders task value", () => {
    render(<EditTaskForm />);

    expect(screen.getByDisplayValue("Task 1")).toBeInTheDocument();
  });

  test("renders sub task value", () => {
    render(<EditTaskForm />);

    expect(screen.getByDisplayValue("Sub Task 1")).toBeInTheDocument();
  });

  test("renders activity value", () => {
    render(<EditTaskForm />);

    expect(screen.getByDisplayValue("Activity 1")).toBeInTheDocument();
  });

  test("owner input is editable", () => {
    render(<EditTaskForm />);

    expect(screen.getByPlaceholderText("Enter Owner")).not.toBeDisabled();
  });

  test("estimated weeks input is editable", () => {
    render(<EditTaskForm />);

    expect(
      screen.getByPlaceholderText("Enter Estimated Weeks"),
    ).not.toBeDisabled();
  });

  test("status dropdown contains completed option", () => {
    render(<EditTaskForm />);

    expect(
      screen.getByRole("option", {
        name: "Completed",
      }),
    ).toBeInTheDocument();
  });

  test("status dropdown contains delayed option", () => {
    render(<EditTaskForm />);

    expect(
      screen.getByRole("option", {
        name: "Delayed",
      }),
    ).toBeInTheDocument();
  });

  test("status dropdown contains in progress option", () => {
    render(<EditTaskForm />);

    expect(
      screen.getByRole("option", {
        name: "In Progress",
      }),
    ).toBeInTheDocument();
  });

  test("status dropdown contains not started option", () => {
    render(<EditTaskForm />);

    expect(
      screen.getByRole("option", {
        name: "Not Started",
      }),
    ).toBeInTheDocument();
  });

  test("progress slider has correct max value", () => {
    render(<EditTaskForm />);

    expect(screen.getByRole("slider")).toHaveAttribute("max", "100");
  });

  test("progress slider has correct min value", () => {
    render(<EditTaskForm />);

    expect(screen.getByRole("slider")).toHaveAttribute("min", "0");
  });
});
