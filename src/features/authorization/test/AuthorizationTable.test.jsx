import { beforeEach, describe, expect, it, vi } from "vitest";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import "@testing-library/jest-dom";

import AuthorizationTable from "../components/AuthorizationTable";

describe("AuthorizationTable", () => {
  const onView = vi.fn();
  const approveSelectedRequests = vi.fn();
  const rejectSelectedRequests = vi.fn();

  const mockLogs = Array.from({ length: 15 }, (_, index) => ({
    id: index + 1,
    requestSource: index % 2 === 0 ? "CREATE_ACTIVITY" : "UPDATE_ACTIVITY",
    requestedBy: "Sachin",
    activityName: `Activity ${index + 1}`,
    requestedAt: "2026-06-20T10:00:00.000Z",
    status:
      index % 3 === 0 ? "PENDING" : index % 3 === 1 ? "APPROVED" : "REJECTED",
  }));

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state", () => {
    render(<AuthorizationTable logs={[]} loading={true} />);

    expect(screen.getByText("Loading requests...")).toBeInTheDocument();
  });

  it("renders table headers", () => {
    render(<AuthorizationTable logs={mockLogs} loading={false} />);

    expect(screen.getByText("Sr No.")).toBeInTheDocument();

    expect(screen.getByText("Request Type")).toBeInTheDocument();

    expect(screen.getByText("Requested By")).toBeInTheDocument();

    expect(screen.getByText("Status")).toBeInTheDocument();
  });

  it("renders first page records", () => {
    render(<AuthorizationTable logs={mockLogs} loading={false} />);

    expect(screen.getByText("Activity 1")).toBeInTheDocument();

    expect(screen.getByText("Activity 10")).toBeInTheDocument();

    expect(screen.queryByText("Activity 11")).not.toBeInTheDocument();
  });

  it("renders empty state", () => {
    render(<AuthorizationTable logs={[]} loading={false} />);

    expect(screen.getByText("No requests found")).toBeInTheDocument();
  });

  it("calls onView", () => {
    render(
      <AuthorizationTable logs={mockLogs} loading={false} onView={onView} />,
    );

    const buttons = screen.getAllByRole("button");

    fireEvent.click(buttons[2]);

    expect(onView).toHaveBeenCalled();
  });

  it("selects a row", () => {
    render(<AuthorizationTable logs={mockLogs} loading={false} />);

    const checkboxes = screen.getAllByRole("checkbox");

    fireEvent.click(checkboxes[1]);

    expect(screen.getByText("1 Requests Selected")).toBeInTheDocument();
  });

  it("selects all rows", () => {
    render(<AuthorizationTable logs={mockLogs} loading={false} />);

    const checkboxes = screen.getAllByRole("checkbox");

    fireEvent.click(checkboxes[0]);

    expect(screen.getByText("10 Requests Selected")).toBeInTheDocument();
  });

  it("opens approve modal", () => {
    render(<AuthorizationTable logs={mockLogs} loading={false} />);

    const checkboxes = screen.getAllByRole("checkbox");

    fireEvent.click(checkboxes[1]);

    fireEvent.click(screen.getByText("Approve Selected"));

    expect(screen.getByText("Approve Requests")).toBeInTheDocument();
  });

  it("approves selected requests", async () => {
    approveSelectedRequests.mockResolvedValue();

    render(
      <AuthorizationTable
        logs={mockLogs}
        loading={false}
        approveSelectedRequests={approveSelectedRequests}
      />,
    );

    const checkboxes = screen.getAllByRole("checkbox");

    fireEvent.click(checkboxes[1]);

    fireEvent.click(screen.getByText("Approve Selected"));

    fireEvent.click(
      screen.getByRole("button", {
        name: "Approve",
      }),
    );

    await waitFor(() => {
      expect(approveSelectedRequests).toHaveBeenCalled();
    });
  });

  it("opens reject modal", () => {
    render(<AuthorizationTable logs={mockLogs} loading={false} />);

    const checkboxes = screen.getAllByRole("checkbox");

    fireEvent.click(checkboxes[1]);

    fireEvent.click(screen.getByText("Reject Selected"));

    expect(
      screen.getByPlaceholderText("Enter rejection reason..."),
    ).toBeInTheDocument();
  });

  it("enables continue button after entering reason", () => {
    render(<AuthorizationTable logs={mockLogs} loading={false} />);

    const checkboxes = screen.getAllByRole("checkbox");

    fireEvent.click(checkboxes[1]);

    fireEvent.click(screen.getByText("Reject Selected"));

    const textarea = screen.getByPlaceholderText("Enter rejection reason...");

    fireEvent.change(textarea, {
      target: {
        value: "Invalid",
      },
    });

    expect(
      screen.getByRole("button", {
        name: "Continue",
      }),
    ).not.toBeDisabled();
  });

  it("opens reject confirmation modal", () => {
    render(<AuthorizationTable logs={mockLogs} loading={false} />);

    const checkboxes = screen.getAllByRole("checkbox");

    fireEvent.click(checkboxes[1]);

    fireEvent.click(screen.getByText("Reject Selected"));

    fireEvent.change(screen.getByPlaceholderText("Enter rejection reason..."), {
      target: {
        value: "Invalid Data",
      },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: "Continue",
      }),
    );

    expect(screen.getByText("Confirm Rejection")).toBeInTheDocument();
  });

  it("rejects selected requests", async () => {
    rejectSelectedRequests.mockResolvedValue();

    render(
      <AuthorizationTable
        logs={mockLogs}
        loading={false}
        rejectSelectedRequests={rejectSelectedRequests}
      />,
    );

    const checkboxes = screen.getAllByRole("checkbox");

    fireEvent.click(checkboxes[1]);

    fireEvent.click(screen.getByText("Reject Selected"));

    fireEvent.change(screen.getByPlaceholderText("Enter rejection reason..."), {
      target: {
        value: "Reason",
      },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: "Continue",
      }),
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Confirm Reject",
      }),
    );

    await waitFor(() => {
      expect(rejectSelectedRequests).toHaveBeenCalled();
    });
  });

  it("handles next page", () => {
    render(<AuthorizationTable logs={mockLogs} loading={false} />);

    const buttons = screen.getAllByRole("button");

    const nextButton = buttons[buttons.length - 1];

    fireEvent.click(nextButton);

    expect(screen.getByText("Activity 11")).toBeInTheDocument();
  });

  it("shows pagination info", () => {
    render(<AuthorizationTable logs={mockLogs} loading={false} />);

    expect(
      screen.getByText(/Showing 1 to 10 of 15 requests/),
    ).toBeInTheDocument();
  });
});
