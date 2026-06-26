import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";

import AddTaskForm from "../components/AddTaskForm";

const mockHandleChange = vi.fn();
const mockResetForm = vi.fn();
const mockHandleSubmit = vi.fn();
const mockSetProjects = vi.fn();

vi.mock("../../../context/ProjectContext", () => ({
  useProjects: () => ({
    projects: [
      {
        projectName: "Project A",
        phases: [
          {
            phaseName: "Phase 1",
            milestones: [
              {
                milestoneName: "Milestone 1",
                tasks: [
                  {
                    taskName: "Task 1",
                    subTasks: [
                      {
                        subTaskName: "Sub Task 1",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    setProjects: mockSetProjects,
  }),
}));

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

    window.alert = vi.fn();
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

  test("updates planned start date", () => {
    render(<AddTaskForm />);

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
    render(<AddTaskForm />);

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
    render(<AddTaskForm />);

    const dates = document.querySelectorAll('input[type="date"]');

    fireEvent.change(dates[2], {
      target: {
        value: "2026-06-02",
      },
    });

    expect(mockHandleChange).toHaveBeenCalledWith(
      "actualStartDate",
      "2026-06-02",
    );
  });

  test("updates actual end date", () => {
    render(<AddTaskForm />);

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

  test("updates estimated weeks", () => {
    render(<AddTaskForm />);

    fireEvent.change(screen.getByPlaceholderText("Enter Estimated Weeks"), {
      target: {
        value: "8",
      },
    });

    expect(mockHandleChange).toHaveBeenCalledWith("estimatedPeriodWeek", "8");
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

  test("updates execution status", () => {
    render(<AddTaskForm />);

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

  test("reset button calls resetForm", () => {
    render(<AddTaskForm />);

    fireEvent.click(screen.getByTestId("reset-button"));

    expect(mockResetForm).toHaveBeenCalledTimes(1);
  });

  test("submit button calls handleSubmit", () => {
    render(<AddTaskForm />);

    fireEvent.click(screen.getByTestId("submit-button"));

    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });

  test("back button calls browser history", () => {
    const backSpy = vi.fn();

    window.history.back = backSpy;

    render(<AddTaskForm />);

    fireEvent.click(screen.getByText("← Back"));

    expect(backSpy).toHaveBeenCalled();
  });

  test("reset button is enabled", () => {
    render(<AddTaskForm />);

    expect(screen.getByTestId("reset-button")).toBeEnabled();
  });

  test("submit button is enabled", () => {
    render(<AddTaskForm />);

    expect(screen.getByTestId("submit-button")).toBeEnabled();
  });

  test("progress slider exists", () => {
    render(<AddTaskForm />);

    expect(screen.getByRole("slider")).toBeInTheDocument();
  });

  test("status dropdown exists", () => {
    render(<AddTaskForm />);

    expect(screen.getByRole("combobox")).toBeInTheDocument();
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

  test("shows add sub task input", () => {
    render(<AddTaskForm />);

    fireEvent.click(screen.getByTestId("subtask-dropdown"));

    fireEvent.click(screen.getByText("+ Add New Sub Task"));

    expect(
      screen.getByPlaceholderText("Enter Sub Task Name"),
    ).toBeInTheDocument();
  });

  test("cancel add phase hides input", () => {
    render(<AddTaskForm />);

    fireEvent.click(screen.getByTestId("phase-dropdown"));

    fireEvent.click(screen.getByText("+ Add New Phase"));

    fireEvent.click(screen.getByText("Cancel"));

    expect(
      screen.queryByPlaceholderText("Enter Phase Name"),
    ).not.toBeInTheDocument();
  });

  test("cancel add milestone hides input", () => {
    render(<AddTaskForm />);

    fireEvent.click(screen.getByTestId("milestone-dropdown"));

    fireEvent.click(screen.getByText("+ Add New Milestone"));

    fireEvent.click(screen.getByText("Cancel"));

    expect(
      screen.queryByPlaceholderText("Enter Milestone Name"),
    ).not.toBeInTheDocument();
  });

  test("cancel add task hides input", () => {
    render(<AddTaskForm />);

    fireEvent.click(screen.getByTestId("task-dropdown"));

    fireEvent.click(screen.getByText("+ Add New Task"));

    fireEvent.click(screen.getByText("Cancel"));

    expect(
      screen.queryByPlaceholderText("Enter Task Name"),
    ).not.toBeInTheDocument();
  });

  test("cancel add sub task hides input", () => {
    render(<AddTaskForm />);

    fireEvent.click(screen.getByTestId("subtask-dropdown"));

    fireEvent.click(screen.getByText("+ Add New Sub Task"));

    fireEvent.click(screen.getByText("Cancel"));

    expect(
      screen.queryByPlaceholderText("Enter Sub Task Name"),
    ).not.toBeInTheDocument();
  });

  test("click outside closes phase dropdown", () => {
    render(<AddTaskForm />);

    fireEvent.click(screen.getByTestId("phase-dropdown"));

    expect(screen.getByText("Phase 1")).toBeInTheDocument();

    fireEvent.mouseDown(document);

    expect(screen.queryByText("Phase 1")).not.toBeInTheDocument();
  });

  test("click outside closes milestone dropdown", () => {
    render(<AddTaskForm />);

    fireEvent.click(screen.getByTestId("milestone-dropdown"));

    expect(screen.getByText("Milestone 1")).toBeInTheDocument();

    fireEvent.mouseDown(document);

    expect(screen.queryByText("Milestone 1")).not.toBeInTheDocument();
  });

  test("click outside closes task dropdown", () => {
    render(<AddTaskForm />);

    fireEvent.click(screen.getByTestId("task-dropdown"));

    expect(screen.getByText("Task 1")).toBeInTheDocument();

    fireEvent.mouseDown(document);

    expect(screen.queryByText("Task 1")).not.toBeInTheDocument();
  });

  test("click outside closes sub task dropdown", () => {
    render(<AddTaskForm />);

    fireEvent.click(screen.getByTestId("subtask-dropdown"));

    expect(screen.getByText("Sub Task 1")).toBeInTheDocument();

    fireEvent.mouseDown(document);

    expect(screen.queryByText("Sub Task 1")).not.toBeInTheDocument();
  });

  test("renders activity input", () => {
    render(<AddTaskForm />);

    expect(screen.getByPlaceholderText("Enter Activity")).toBeInTheDocument();
  });

  test("renders owner input", () => {
    render(<AddTaskForm />);

    expect(screen.getByPlaceholderText("Enter Owner")).toBeInTheDocument();
  });

  test("renders estimated weeks input", () => {
    render(<AddTaskForm />);

    expect(
      screen.getByPlaceholderText("Enter Estimated Weeks"),
    ).toBeInTheDocument();
  });

  test("renders four date inputs", () => {
    render(<AddTaskForm />);

    expect(screen.getAllByDisplayValue("").length).toBeGreaterThanOrEqual(4);
  });

  test("renders all dropdown buttons", () => {
    render(<AddTaskForm />);

    expect(screen.getByTestId("phase-dropdown")).toBeInTheDocument();

    expect(screen.getByTestId("milestone-dropdown")).toBeInTheDocument();

    expect(screen.getByTestId("task-dropdown")).toBeInTheDocument();

    expect(screen.getByTestId("subtask-dropdown")).toBeInTheDocument();
  });

  test("renders back button", () => {
    render(<AddTaskForm />);

    expect(screen.getByText("← Back")).toBeInTheDocument();
  });

  test("renders reset button", () => {
    render(<AddTaskForm />);

    expect(screen.getByTestId("reset-button")).toBeInTheDocument();
  });

  test("renders submit button", () => {
    render(<AddTaskForm />);

    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
  });
});
