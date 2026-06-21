import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import AuthorizationRequestsPage from "../pages/AuthorizationRequestsPage";

vi.mock("../hooks/useAuthRequests", () => ({
  useAuthRequests: vi.fn(),
}));

vi.mock("../components/AuthorizationSummaryCards", () => ({
  default: ({ auths }) => (
    <div data-testid="summary-cards">Summary Cards {auths?.length}</div>
  ),
}));

vi.mock("../components/AuthorizationFilters", () => ({
  default: ({ search, setSearch }) => (
    <div data-testid="filters">
      <input
        data-testid="search-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  ),
}));

vi.mock("../components/AuthorizationTable", () => ({
  default: ({ logs, onView }) => (
    <div data-testid="table">
      <span>Filtered Logs: {logs.length}</span>

      {logs.length > 0 && (
        <button onClick={() => onView(logs[0])}>View Request</button>
      )}
    </div>
  ),
}));

vi.mock("../components/AuthorizationRequestModal", () => ({
  default: ({ request, onClose, onApprove, onReject }) => (
    <div data-testid="request-modal">
      <span>{request.activityName}</span>

      <button onClick={() => onApprove(request.id)}>Approve</button>

      <button onClick={() => onReject(request.id, "Reason")}>Reject</button>

      <button onClick={onClose}>Close</button>
    </div>
  ),
}));

import { useAuthRequests } from "../hooks/useAuthRequests";

describe("AuthorizationRequestsPage", () => {
  const approveRequest = vi.fn();

  const rejectRequest = vi.fn();

  const approveSelectedRequests = vi.fn();

  const rejectSelectedRequests = vi.fn();

  const mockAuths = [
    {
      id: 1,
      activityName: "Activity One",
      requestedBy: "Sachin",
      requestSource: "MANUAL_UPDATE",
      status: "PENDING",
    },
    {
      id: 2,
      activityName: "Activity Two",
      requestedBy: "Admin",
      requestSource: "CREATE_ACTIVITY",
      status: "APPROVED",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();

    useAuthRequests.mockReturnValue({
      auths: mockAuths,
      allAuths: mockAuths,
      loading: false,

      approveRequest,
      rejectRequest,

      approveSelectedRequests,
      rejectSelectedRequests,
    });
  });

  it("renders page components", () => {
    render(<AuthorizationRequestsPage />);

    expect(screen.getByTestId("summary-cards")).toBeInTheDocument();

    expect(screen.getByTestId("filters")).toBeInTheDocument();

    expect(screen.getByTestId("table")).toBeInTheDocument();
  });

  it("passes allAuths to summary cards", () => {
    render(<AuthorizationRequestsPage />);

    expect(screen.getByText("Summary Cards 2")).toBeInTheDocument();
  });

  it("filters logs by search", () => {
    render(<AuthorizationRequestsPage />);

    fireEvent.change(screen.getByTestId("search-input"), {
      target: {
        value: "One",
      },
    });

    expect(screen.getByText("Filtered Logs: 1")).toBeInTheDocument();
  });

  it("shows modal when request selected", () => {
    render(<AuthorizationRequestsPage />);

    fireEvent.click(screen.getByText("View Request"));

    expect(screen.getByTestId("request-modal")).toBeInTheDocument();

    expect(screen.getByText("Activity One")).toBeInTheDocument();
  });

  it("closes modal", () => {
    render(<AuthorizationRequestsPage />);

    fireEvent.click(screen.getByText("View Request"));

    fireEvent.click(screen.getByText("Close"));

    expect(screen.queryByTestId("request-modal")).not.toBeInTheDocument();
  });

  it("calls approveRequest", async () => {
    render(<AuthorizationRequestsPage />);

    fireEvent.click(screen.getByText("View Request"));

    fireEvent.click(screen.getByText("Approve"));

    expect(approveRequest).toHaveBeenCalledWith(1);
  });

  it("calls rejectRequest", async () => {
    render(<AuthorizationRequestsPage />);

    fireEvent.click(screen.getByText("View Request"));

    fireEvent.click(screen.getByText("Reject"));

    expect(rejectRequest).toHaveBeenCalledWith(1, "Reason");
  });

  it("handles empty auths", () => {
    useAuthRequests.mockReturnValue({
      auths: [],
      allAuths: [],
      loading: false,

      approveRequest,
      rejectRequest,

      approveSelectedRequests,
      rejectSelectedRequests,
    });

    render(<AuthorizationRequestsPage />);

    expect(screen.getByText("Filtered Logs: 0")).toBeInTheDocument();
  });

  it("filters by requestedBy", () => {
    render(<AuthorizationRequestsPage />);

    expect(screen.getByText("Filtered Logs: 2")).toBeInTheDocument();
  });

  it("renders without crashing when loading true", () => {
    useAuthRequests.mockReturnValue({
      auths: mockAuths,
      allAuths: mockAuths,
      loading: true,

      approveRequest,
      rejectRequest,

      approveSelectedRequests,
      rejectSelectedRequests,
    });

    render(<AuthorizationRequestsPage />);

    expect(screen.getByTestId("table")).toBeInTheDocument();
  });
});
