import { beforeEach, describe, expect, it, vi } from "vitest";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import "@testing-library/jest-dom";

import { toast } from "react-toastify";
import AuthorizationRequestModal from "../components/AuthorizationRequestModal";
import { getProjectNames } from "../services/authService";

vi.mock("../services/authService", () => ({
  getProjectNames: vi.fn(),
}));

vi.mock("react-toastify", () => ({
  toast: {
    error: vi.fn(),
  },
}));

describe("AuthorizationRequestModal", () => {
  const onClose = vi.fn();
  const onApprove = vi.fn();
  const onReject = vi.fn();

  const request = {
    id: "1",
    status: "PENDING", // <-- ADD THIS
    projectId: "p1",
    activityName: "Activity A",
    requestedBy: "Sachin",
    requestedAt: "2026-06-20T10:00:00.000Z",
    oldActivity: {
      owner: "Old Owner",
      progress: 10,
    },
    newActivity: {
      owner: "New Owner",
      progress: 50,
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();

    getProjectNames.mockResolvedValue({
      statusType: "S",
      details: {
        p1: "Project Alpha",
      },
    });
  });

  it("returns null when request is null", () => {
    const { container } = render(<AuthorizationRequestModal request={null} />);

    expect(container.firstChild).toBeNull();
  });

  it("renders modal title", () => {
    render(<AuthorizationRequestModal request={request} />);

    expect(screen.getByText("Activity Approval Request")).toBeInTheDocument();
  });

  it("loads project name", async () => {
    render(<AuthorizationRequestModal request={request} />);

    await waitFor(() => {
      expect(screen.getByText("Project Alpha")).toBeInTheDocument();
    });

    expect(getProjectNames).toHaveBeenCalled();
  });

  it("renders request details", () => {
    render(<AuthorizationRequestModal request={request} />);

    expect(screen.getByText("Activity A")).toBeInTheDocument();

    expect(screen.getByText("Sachin")).toBeInTheDocument();
  });

  it("renders changed fields", () => {
    render(<AuthorizationRequestModal request={request} />);

    expect(screen.getByText("owner")).toBeInTheDocument();

    expect(screen.getByText("progress")).toBeInTheDocument();
  });

  it("shows change count", () => {
    render(<AuthorizationRequestModal request={request} />);

    expect(screen.getByText("2 Change(s)")).toBeInTheDocument();
  });

  it("calls onClose", () => {
    render(<AuthorizationRequestModal request={request} onClose={onClose} />);

    const buttons = screen.getAllByRole("button");

    fireEvent.click(buttons[0]);

    expect(onClose).toHaveBeenCalled();
  });

  it("calls onApprove", () => {
    render(
      <AuthorizationRequestModal request={request} onApprove={onApprove} />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /Approve Request/i,
      }),
    );

    expect(onApprove).toHaveBeenCalledWith("1");
  });

  it("opens reject modal", () => {
    render(<AuthorizationRequestModal request={request} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /Reject Request/i,
      }),
    );

    expect(
      screen.getByPlaceholderText("Enter rejection reason..."),
    ).toBeInTheDocument();
  });

  it("shows validation when reject reason is empty", () => {
    render(<AuthorizationRequestModal request={request} onReject={onReject} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /Reject Request/i,
      }),
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Submit",
      }),
    );

    expect(toast.error).toHaveBeenCalledWith("Please enter rejection reason");
  });

  it("calls onReject with reason", () => {
    render(<AuthorizationRequestModal request={request} onReject={onReject} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /Reject Request/i,
      }),
    );

    fireEvent.change(screen.getByPlaceholderText("Enter rejection reason..."), {
      target: {
        value: "Invalid update",
      },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: "Submit",
      }),
    );

    expect(onReject).toHaveBeenCalledWith("1", "Invalid update");
  });

  it("closes reject modal on cancel", () => {
    render(<AuthorizationRequestModal request={request} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /Reject Request/i,
      }),
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Cancel",
      }),
    );

    expect(
      screen.queryByPlaceholderText("Enter rejection reason..."),
    ).not.toBeInTheDocument();
  });

  it("shows no changes message", () => {
    render(
      <AuthorizationRequestModal
        request={{
          ...request,
          oldActivity: {
            owner: "Sachin",
          },
          newActivity: {
            owner: "Sachin",
          },
        }}
      />,
    );

    expect(screen.getByText("No changes have been made")).toBeInTheDocument();
  });

  it("handles project fetch failure", async () => {
    getProjectNames.mockRejectedValue(new Error("Failed"));

    render(<AuthorizationRequestModal request={request} />);

    await waitFor(() => {
      expect(getProjectNames).toHaveBeenCalled();
    });
  });
  it("shows change reason", () => {
    render(
      <AuthorizationRequestModal
        request={{
          ...request,
          changeReason: "Schedule updated",
        }}
      />,
    );

    expect(screen.getByText("Activity Change Reason")).toBeInTheDocument();
    expect(screen.getByText("Schedule updated")).toBeInTheDocument();
  });

  it("shows rejection reason", () => {
    render(
      <AuthorizationRequestModal
        request={{
          ...request,
          status: "REJECTED",
          rejectionReason: "Incorrect data",
        }}
      />,
    );

    expect(screen.getByText("Rejection Reason")).toBeInTheDocument();
    expect(screen.getByText("Incorrect data")).toBeInTheDocument();
  });

  it("shows rollback reason", () => {
    render(
      <AuthorizationRequestModal
        request={{
          ...request,
          status: "ROLLED_BACK",
          rollbackReason: "Rollback completed",
        }}
      />,
    );

    expect(screen.getByText("Rollback Reason")).toBeInTheDocument();
    expect(screen.getByText("Rollback completed")).toBeInTheDocument();
  });

  it("shows approved details", () => {
    render(
      <AuthorizationRequestModal
        request={{
          ...request,
          status: "APPROVED",
          approvedBy: "Admin",
          approvedAt: "2026-06-20T10:00:00.000Z",
        }}
      />,
    );

    expect(screen.getByText("Approved By")).toBeInTheDocument();
    expect(screen.getByText("Admin")).toBeInTheDocument();
  });

  it("shows rejected details", () => {
    render(
      <AuthorizationRequestModal
        request={{
          ...request,
          status: "REJECTED",
          approvedBy: "Manager",
          approvedAt: "2026-06-20T10:00:00.000Z",
        }}
      />,
    );

    expect(screen.getByText("Rejected By")).toBeInTheDocument();
    expect(screen.getByText("Manager")).toBeInTheDocument();
  });

  it("shows rolled back details", () => {
    render(
      <AuthorizationRequestModal
        request={{
          ...request,
          status: "ROLLED_BACK",
          rolledBackBy: "Admin",
          rolledBackAt: "2026-06-20T10:00:00.000Z",
        }}
      />,
    );

    expect(screen.getByText("Rolled Back By")).toBeInTheDocument();
    expect(screen.getByText("Admin")).toBeInTheDocument();
  });

  it("shows revert button for approved request", () => {
    render(
      <AuthorizationRequestModal
        request={{
          ...request,
          status: "APPROVED",
        }}
      />,
    );

    expect(
      screen.getByRole("button", {
        name: /Revert Changes/i,
      }),
    ).toBeInTheDocument();
  });

  it("opens rollback modal", () => {
    render(
      <AuthorizationRequestModal
        request={{
          ...request,
          status: "APPROVED",
        }}
      />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /Revert Changes/i,
      }),
    );

    expect(
      screen.getByPlaceholderText("Reason for rollback..."),
    ).toBeInTheDocument();
  });

  it("validates rollback reason", () => {
    const onRollback = vi.fn();

    render(
      <AuthorizationRequestModal
        request={{
          ...request,
          status: "APPROVED",
        }}
        onRollback={onRollback}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /Revert Changes/i }));

    fireEvent.click(
      screen.getByRole("button", {
        name: /Confirm Rollback/i,
      }),
    );

    expect(toast.error).toHaveBeenCalledWith("Please enter rollback reason");
  });

  it("validates admin password", () => {
    const onRollback = vi.fn();

    render(
      <AuthorizationRequestModal
        request={{
          ...request,
          status: "APPROVED",
        }}
        onRollback={onRollback}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /Revert Changes/i }));

    fireEvent.change(screen.getByPlaceholderText("Reason for rollback..."), {
      target: {
        value: "Rollback",
      },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /Confirm Rollback/i,
      }),
    );

    expect(toast.error).toHaveBeenCalledWith("Please enter admin password");
  });

  it("calls onRollback successfully", async () => {
    const onRollback = vi.fn().mockResolvedValue(true);

    render(
      <AuthorizationRequestModal
        request={{
          ...request,
          status: "APPROVED",
        }}
        onRollback={onRollback}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /Revert Changes/i }));

    fireEvent.change(screen.getByPlaceholderText("Reason for rollback..."), {
      target: {
        value: "Rollback",
      },
    });

    fireEvent.change(screen.getByPlaceholderText("Enter admin password"), {
      target: {
        value: "admin123",
      },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /Confirm Rollback/i,
      }),
    );

    await waitFor(() => {
      expect(onRollback).toHaveBeenCalledWith("1", "admin123", "Rollback");
    });
  });

  it("closes rollback modal on cancel", () => {
    render(
      <AuthorizationRequestModal
        request={{
          ...request,
          status: "APPROVED",
        }}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /Revert Changes/i }));

    fireEvent.click(
      screen.getByRole("button", {
        name: "Cancel",
      }),
    );

    expect(
      screen.queryByPlaceholderText("Reason for rollback..."),
    ).not.toBeInTheDocument();
  });

  it("renders null project when projectId is missing", async () => {
    render(
      <AuthorizationRequestModal
        request={{
          ...request,
          projectId: null,
        }}
      />,
    );

    expect(getProjectNames).not.toHaveBeenCalled();
  });

  it("formats null values", () => {
    render(
      <AuthorizationRequestModal
        request={{
          ...request,
          oldActivity: {
            owner: null,
          },
          newActivity: {
            owner: "Sachin",
          },
        }}
      />,
    );

    expect(screen.getByText("null")).toBeInTheDocument();
  });
});
