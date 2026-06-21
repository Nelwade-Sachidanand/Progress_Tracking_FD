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
});
