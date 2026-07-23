import "@testing-library/jest-dom";
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";

import AuthorizationRequestModal from "../components/AuthorizationRequestModal";
import { getProjectNames } from "../services/authService";


vi.mock("../services/authService", () => ({
  getProjectNames: vi.fn(),
}));

vi.mock("../components/RejectRequestModal", () => ({
  default: ({ open, onSubmit, onClose }) =>
    open ? (
      <div data-testid="reject-modal">
        <button onClick={onSubmit}>Submit Reject</button>
        <button onClick={onClose}>Close Reject</button>
      </div>
    ) : null,
}));

vi.mock("../components/RollbackRequestModal", () => ({
  default: ({ open, onSubmit, onClose }) =>
    open ? (
      <div data-testid="rollback-modal">
        <button onClick={onSubmit}>Submit Rollback</button>
        <button onClick={onClose}>Close Rollback</button>
      </div>
    ) : null,
}));

describe("AuthorizationRequestModal", () => {
  const onClose = vi.fn();
  const onApprove = vi.fn();
  const onReject = vi.fn();
  const onRollback = vi.fn();

  const request = {
    id: "1",
    projectId: "101",
    status: "PENDING",
    requestedBy: "Sachin",
    requestedAt: "2026-01-01T10:00:00",
    newActivityName: "Activity A",
    oldActivity: {
      name: "Old Activity",
      owner: "John",
    },
    newActivity: {
      name: "New Activity",
      owner: "Sachin",
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();

    getProjectNames.mockResolvedValue({
      statusType: "S",
      details: {
        101: "Project Alpha",
      },
    });
  });

  it("renders nothing when request is null", () => {
    const { container } = render(
      <AuthorizationRequestModal request={null} />
    );

    expect(container.firstChild).toBeNull();
  });

  it("renders request details", async () => {
    render(
      <AuthorizationRequestModal
        request={request}
        onClose={onClose}
        onApprove={onApprove}
        onReject={onReject}
        onRollback={onRollback}
      />
    );

    expect(
      screen.getByText("Activity Approval Request")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Activity A")
    ).toBeInTheDocument();

    await waitFor(() =>
      expect(
        screen.getByText("Project Alpha")
      ).toBeInTheDocument()
    );
  });

  it("calls onClose", () => {
    render(
      <AuthorizationRequestModal
        request={request}
        onClose={onClose}
      />
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "",
      })
    );

    expect(onClose).toHaveBeenCalled();
  });

  it("calls approve", () => {
    render(
      <AuthorizationRequestModal
        request={request}
        onApprove={onApprove}
      />
    );

    fireEvent.click(
      screen.getByText("Approve Request")
    );

    expect(onApprove).toHaveBeenCalledWith("1");
  });

  it("opens reject modal", () => {
    render(
      <AuthorizationRequestModal
        request={request}
        onReject={onReject}
      />
    );

    fireEvent.click(
      screen.getByText("Reject Request")
    );

    expect(
      screen.getByTestId("reject-modal")
    ).toBeInTheDocument();
  });

  it("submits reject request", () => {
    render(
      <AuthorizationRequestModal
        request={request}
        onReject={onReject}
      />
    );

    fireEvent.click(screen.getByText("Reject Request"));

    fireEvent.click(
      screen.getByText("Submit Reject")
    );

    expect(onReject).toHaveBeenCalled();
  });

  it("shows rollback button for approved request", () => {
    render(
      <AuthorizationRequestModal
        request={{
          ...request,
          status: "APPROVED",
        }}
        onRollback={onRollback}
      />
    );

    expect(
      screen.getByText("Revert Changes")
    ).toBeInTheDocument();
  });

  it("opens rollback modal", () => {
    render(
      <AuthorizationRequestModal
        request={{
          ...request,
          status: "APPROVED",
        }}
        onRollback={onRollback}
      />
    );

    fireEvent.click(
      screen.getByText("Revert Changes")
    );

    expect(
      screen.getByTestId("rollback-modal")
    ).toBeInTheDocument();
  });

  it("submits rollback request", async () => {
    onRollback.mockResolvedValue(true);

    render(
      <AuthorizationRequestModal
        request={{
          ...request,
          status: "APPROVED",
        }}
        onRollback={onRollback}
      />
    );

    fireEvent.click(
      screen.getByText("Revert Changes")
    );

    fireEvent.click(
      screen.getByText("Submit Rollback")
    );

    await waitFor(() => {
      expect(onRollback).toHaveBeenCalled();
    });
  });

  it("renders changes summary", () => {
    render(
      <AuthorizationRequestModal
        request={request}
      />
    );

    expect(
      screen.getByText("Changes Summary")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Old Activity")
    ).toBeInTheDocument();

    expect(
      screen.getByText("New Activity")
    ).toBeInTheDocument();
  });

  it("renders Go Back button", () => {
    render(
      <AuthorizationRequestModal
        request={request}
        onClose={onClose}
      />
    );

    expect(
      screen.getByText("Go Back")
    ).toBeInTheDocument();
  });

  it("clicking Go Back calls onClose", () => {
    render(
      <AuthorizationRequestModal
        request={request}
        onClose={onClose}
      />
    );

    fireEvent.click(
      screen.getByText("Go Back")
    );

    expect(onClose).toHaveBeenCalled();
  });
});