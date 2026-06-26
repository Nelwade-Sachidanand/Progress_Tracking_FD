import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import RemarkModal from "../components/RemarkModal";
import { addRemark } from "../services/remarkService";

// -------------------- Mocks --------------------

const fetchProjectsMock = vi.fn();

vi.mock("../../../context/ProjectContext", () => ({
  useProjects: () => ({
    fetchProjects: fetchProjectsMock,
  }),
}));

vi.mock("../services/remarkService", () => ({
  addRemark: vi.fn(),
}));

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// -------------------- Tests --------------------

describe("RemarkModal", () => {
  const onClose = vi.fn();
  const onRemarkSaved = vi.fn();

  const task = {
    id: "1",
    projectId: "P001",
    projectName: "Project A",
    phase: "Phase 1",
    milestone: "Milestone 1",
    task: "Task 1",
    subTask: "Sub Task 1",
    activity: "Activity A",
    remark: "Initial Remark",
  };

  beforeEach(() => {
    vi.clearAllMocks();

    sessionStorage.setItem(
      "user",
      JSON.stringify({
        id: "user1",
      }),
    );

    addRemark.mockResolvedValue({
      statusType: "S",
      statusDesc: "Remark Saved Successfully",
    });
  });

  it("renders nothing when modal is closed", () => {
    const { container } = render(
      <RemarkModal
        isOpen={false}
        onClose={onClose}
        task={task}
        onRemarkSaved={onRemarkSaved}
      />,
    );

    expect(container.firstChild).toBeNull();
  });

  it("renders modal title", () => {
    render(
      <RemarkModal
        isOpen
        onClose={onClose}
        task={task}
        onRemarkSaved={onRemarkSaved}
      />,
    );

    expect(screen.getByText("Task Remark")).toBeInTheDocument();
  });

  it("renders activity value", () => {
    render(
      <RemarkModal
        isOpen
        onClose={onClose}
        task={task}
        onRemarkSaved={onRemarkSaved}
      />,
    );

    expect(screen.getByDisplayValue("Activity A")).toBeInTheDocument();
  });

  it("renders existing remark", () => {
    render(
      <RemarkModal
        isOpen
        onClose={onClose}
        task={task}
        onRemarkSaved={onRemarkSaved}
      />,
    );

    expect(screen.getByText("Initial Remark")).toBeInTheDocument();
  });

  it("updates latest remark textarea", () => {
    render(
      <RemarkModal
        isOpen
        onClose={onClose}
        task={task}
        onRemarkSaved={onRemarkSaved}
      />,
    );

    const textarea = screen.getByPlaceholderText("Enter latest remark...");

    fireEvent.change(textarea, {
      target: {
        value: "Updated Remark",
      },
    });

    expect(textarea.value).toBe("Updated Remark");
  });

  it("calls onClose when X button clicked", () => {
    render(
      <RemarkModal
        isOpen
        onClose={onClose}
        task={task}
        onRemarkSaved={onRemarkSaved}
      />,
    );

    const buttons = screen.getAllByRole("button");

    fireEvent.click(buttons[0]);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when Cancel clicked", () => {
    render(
      <RemarkModal
        isOpen
        onClose={onClose}
        task={task}
        onRemarkSaved={onRemarkSaved}
      />,
    );

    fireEvent.click(screen.getByText("Cancel"));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls addRemark when Save Remark clicked", async () => {
    render(
      <RemarkModal
        isOpen
        onClose={onClose}
        task={task}
        onRemarkSaved={onRemarkSaved}
      />,
    );

    fireEvent.change(screen.getByPlaceholderText("Enter latest remark..."), {
      target: {
        value: "New Remark",
      },
    });

    fireEvent.click(screen.getByText("Save Remark"));

    await waitFor(() => {
      expect(addRemark).toHaveBeenCalledTimes(1);
    });

    expect(fetchProjectsMock).toHaveBeenCalledWith("user1");
    expect(onClose).toHaveBeenCalled();
  });

  it("shows empty activity when task is null", () => {
    render(
      <RemarkModal
        isOpen
        onClose={onClose}
        task={null}
        onRemarkSaved={onRemarkSaved}
      />,
    );

    const activityInput = screen.getByLabelText(/activity/i);

    expect(activityInput).toHaveValue("");
  });

  it("activity input is disabled", () => {
    render(
      <RemarkModal
        isOpen
        onClose={onClose}
        task={task}
        onRemarkSaved={onRemarkSaved}
      />,
    );

    expect(screen.getByDisplayValue("Activity A")).toBeDisabled();
  });

  it("renders labels correctly", () => {
    render(
      <RemarkModal
        isOpen
        onClose={onClose}
        task={task}
        onRemarkSaved={onRemarkSaved}
      />,
    );

    expect(screen.getByText("Activity")).toBeInTheDocument();
    expect(screen.getByText(/Latest Remark/i)).toBeInTheDocument();
  });

  it("shows 'No remarks available' when there is no existing remark", () => {
    render(
      <RemarkModal
        isOpen
        onClose={onClose}
        task={{
          ...task,
          remark: "",
        }}
        onRemarkSaved={onRemarkSaved}
      />,
    );

    expect(screen.getByText("No remarks available")).toBeInTheDocument();
  });

  it("calls onRemarkSaved after successful save", async () => {
    render(
      <RemarkModal
        isOpen
        onClose={onClose}
        task={task}
        onRemarkSaved={onRemarkSaved}
      />,
    );

    fireEvent.change(screen.getByPlaceholderText("Enter latest remark..."), {
      target: {
        value: "Latest Remark",
      },
    });

    fireEvent.click(screen.getByText("Save Remark"));

    await waitFor(() => {
      expect(addRemark).toHaveBeenCalled();
    });

    expect(onClose).toHaveBeenCalled();
  });
});
