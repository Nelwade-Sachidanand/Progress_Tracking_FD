import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { toast } from "react-toastify";
import RemarkModal from "../components/RemarkModal";
import { addRemark } from "../services/remarkService";

const mockFetchProjects = vi.fn();

vi.mock("../../../context/ProjectContext", () => ({
  useProjects: () => ({
    fetchProjects: mockFetchProjects,
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

describe("RemarkModal", () => {
  const mockOnClose = vi.fn();
  const mockOnRemarkSaved = vi.fn();

  const task = {
    id: 1,
    projectId: 100,
    projectName: "Demo Project",

    phaseId: 10,
    phaseName: "Phase 1",

    milestoneId: 20,
    milestoneName: "Milestone 1",

    taskId: 30,
    taskName: "Task 1",

    subTaskId: 40,
    subTaskName: "Sub Task 1",

    activityId: 50,
    activityName: "Activity 1",

    activity: "Activity 1",
    remark: "Existing Remark",
  };

  beforeEach(() => {
    vi.clearAllMocks();

    sessionStorage.setItem(
      "user",
      JSON.stringify({
        id: 1,
      })
    );
  });

  it("does not render when closed", () => {
    const { container } = render(
      <RemarkModal
        isOpen={false}
        onClose={mockOnClose}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it("renders modal", () => {
    render(
      <RemarkModal
        isOpen
        task={task}
        onClose={mockOnClose}
      />
    );

    expect(
      screen.getByRole("heading", {
        name: /task remark/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByDisplayValue("Activity 1")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Existing Remark")
    ).toBeInTheDocument();
  });

  it("updates latest remark", () => {
    render(
      <RemarkModal
        isOpen
        task={task}
        onClose={mockOnClose}
      />
    );

    const textarea = screen.getByPlaceholderText(
      /enter latest remark/i
    );

    fireEvent.change(textarea, {
      target: {
        value: "New Remark",
      },
    });

    expect(textarea).toHaveValue("New Remark");
  });

  it("calls onClose when Cancel clicked", () => {
    render(
      <RemarkModal
        isOpen
        task={task}
        onClose={mockOnClose}
      />
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /cancel/i,
      })
    );

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("saves remark successfully", async () => {
    addRemark.mockResolvedValue({
      statusType: "S",
      statusDesc: "Remark Saved",
    });

    render(
      <RemarkModal
        isOpen
        task={task}
        onClose={mockOnClose}
        onRemarkSaved={mockOnRemarkSaved}
      />
    );

    fireEvent.change(
      screen.getByPlaceholderText(/enter latest remark/i),
      {
        target: {
          value: "Updated Remark",
        },
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /save remark/i,
      })
    );

    await waitFor(() => {
      expect(addRemark).toHaveBeenCalled();

      expect(toast.success).toHaveBeenCalledWith(
        "Remark Saved"
      );

      expect(mockFetchProjects).toHaveBeenCalledWith(1);

      expect(mockOnRemarkSaved).toHaveBeenCalledWith(
        1,
        "Updated Remark"
      );

      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it("shows error toast when api returns failure", async () => {
    addRemark.mockResolvedValue({
      statusType: "E",
      statusDesc: "Failed",
    });

    render(
      <RemarkModal
        isOpen
        task={task}
        onClose={mockOnClose}
      />
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /save remark/i,
      })
    );

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Failed"
      );
    });
  });

  it("shows error toast when api throws", async () => {
    addRemark.mockRejectedValue({
      response: {
        data: {
          statusDesc: "Server Error",
        },
      },
    });

    render(
      <RemarkModal
        isOpen
        task={task}
        onClose={mockOnClose}
      />
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /save remark/i,
      })
    );

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Server Error"
      );
    });
  });

  it("shows default message when no existing remark", () => {
    render(
      <RemarkModal
        isOpen
        task={{
          ...task,
          remark: "",
        }}
        onClose={mockOnClose}
      />
    );

    expect(
      screen.getByText("No remarks available")
    ).toBeInTheDocument();
  });
});