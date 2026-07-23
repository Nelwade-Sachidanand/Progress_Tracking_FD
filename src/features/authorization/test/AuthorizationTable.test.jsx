import { beforeEach, describe, expect, it, vi } from "vitest";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import "@testing-library/jest-dom";

import AuthorizationTable from "../components/AuthorizationTable";

vi.mock("../../../components/layout/Pagination", () => ({
  default: ({ currentPage }) => (
    <div data-testid="pagination">
      Pagination {currentPage}
    </div>
  ),
}));

const logs = [
  {
    id: 1,
    requestSource: "CREATE_ACTIVITY",
    requestedBy: "john_doe",
    newActivityName: "Activity One",
    requestedAt: "2026-01-01",
    status: "PENDING",
  },
  {
    id: 2,
    requestSource: "UPDATE_ACTIVITY",
    requestedBy: "admin_user",
    newActivityName: "Activity Two",
    requestedAt: "2026-01-02",
    status: "APPROVED",
  },
];

describe("AuthorizationTable", () => {
  const onView = vi.fn();
  const approveSelectedRequests = vi.fn();
  const rejectSelectedRequests = vi.fn();
  const onPageChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = (props = {}) =>
    render(
      <AuthorizationTable
        logs={logs}
        allLogs={logs}
        loading={false}
        currentPage={1}
        totalPages={1}
        totalRecords={2}
        onView={onView}
        approveSelectedRequests={approveSelectedRequests}
        rejectSelectedRequests={rejectSelectedRequests}
        onPageChange={onPageChange}
        {...props}
      />
    );

  it("renders table headers", () => {
    renderComponent();

    expect(screen.getByText("Request Type")).toBeInTheDocument();
    expect(screen.getByText("Requested By")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();
  });

  it("shows loading state", () => {
    renderComponent({ loading: true });

    expect(
      screen.getByText(/loading requests/i)
    ).toBeInTheDocument();
  });

  it("shows empty state", () => {
    renderComponent({
      logs: [],
      allLogs: [],
    });

    expect(
      screen.getByText(/no requests found/i)
    ).toBeInTheDocument();
  });

  it("renders request data", () => {
    renderComponent();

    expect(screen.getByText(/activity one/i)).toBeInTheDocument();
    expect(screen.getByText(/activity two/i)).toBeInTheDocument();
  });

  it("calls onView when eye button clicked", () => {
    renderComponent();

    fireEvent.click(
      screen.getAllByTitle("View Request")[0]
    );

    expect(onView).toHaveBeenCalledWith(logs[0]);
  });

  it("selects pending row", () => {
    renderComponent();

    const checkboxes = screen.getAllByRole("checkbox");

    fireEvent.click(checkboxes[1]);

    expect(
      screen.getByText(/1 Requests Selected/i)
    ).toBeInTheDocument();
  });

  it("selects all pending rows", () => {
    renderComponent();

    fireEvent.click(screen.getAllByRole("checkbox")[0]);

    expect(
      screen.getByText(/1 Requests Selected/i)
    ).toBeInTheDocument();
  });

  it("opens approve modal", () => {
    renderComponent();

    fireEvent.click(screen.getAllByRole("checkbox")[1]);

    fireEvent.click(
      screen.getByRole("button", {
        name: /approve selected/i,
      })
    );

    expect(
      screen.getByText(/approve requests/i)
    ).toBeInTheDocument();
  });

  it("approves selected requests", async () => {
    approveSelectedRequests.mockResolvedValue();

    renderComponent();

    fireEvent.click(screen.getAllByRole("checkbox")[1]);

    fireEvent.click(
      screen.getByRole("button", {
        name: /approve selected/i,
      })
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /^approve$/i,
      })
    );

    await waitFor(() => {
      expect(approveSelectedRequests).toHaveBeenCalledWith([1]);
    });
  });

  it("opens reject modal", () => {
    renderComponent();

    fireEvent.click(screen.getAllByRole("checkbox")[1]);

    fireEvent.click(
      screen.getByRole("button", {
        name: /reject selected/i,
      })
    );

    expect(
      screen.getByPlaceholderText(/enter rejection reason/i)
    ).toBeInTheDocument();
  });

  it("rejects selected request", async () => {
    rejectSelectedRequests.mockResolvedValue();

    renderComponent();

    fireEvent.click(screen.getAllByRole("checkbox")[1]);

    fireEvent.click(
      screen.getByRole("button", {
        name: /reject selected/i,
      })
    );

    fireEvent.change(
      screen.getByPlaceholderText(/enter rejection reason/i),
      {
        target: {
          value: "Invalid request",
        },
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /continue/i,
      })
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /confirm reject/i,
      })
    );

    await waitFor(() => {
      expect(rejectSelectedRequests).toHaveBeenCalledWith(
        [1],
        "Invalid request"
      );
    });
  });

  it("renders pagination", () => {
    renderComponent();

    expect(
      screen.getByTestId("pagination")
    ).toBeInTheDocument();
  });
});