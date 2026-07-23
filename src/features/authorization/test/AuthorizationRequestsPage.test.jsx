import "@testing-library/jest-dom";

import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AuthorizationRequestsPage from "../pages/AuthorizationRequestsPage";

const mockUseLocation = vi.fn();
const mockUseAuthRequests = vi.fn();

vi.mock("react-router-dom", () => ({
  useLocation: () => mockUseLocation(),
}));

vi.mock("../hooks/useAuthRequests", () => ({
  useAuthRequests: () => mockUseAuthRequests(),
}));

vi.mock("../components/AuthorizationSummaryCards", () => ({
  default: ({ auths }) => (
    <div data-testid="summary">
      Summary {auths.length}
    </div>
  ),
}));

vi.mock("../components/AuthorizationFilters", () => ({
  default: (props) => (
    <div data-testid="filters">
      <button onClick={() => props.setSearch("One")}>
        Search
      </button>

      <button onClick={props.clearFilters}>
        Clear
      </button>
    </div>
  ),
}));

vi.mock("../components/AuthorizationTable", () => ({
  default: (props) => (
    <div data-testid="table">
      <div>Rows : {props.logs.length}</div>

      <button
        onClick={() => props.onView(props.logs[0])}
      >
        View
      </button>

      <button
        onClick={() => props.onPageChange(2)}
      >
        Page2
      </button>
    </div>
  ),
}));

vi.mock("../components/AuthorizationRequestModal", () => ({
  default: ({ request, onClose }) => (
    <div data-testid="modal">
      {request.newActivityName}

      <button onClick={onClose}>
        Close
      </button>
    </div>
  ),
}));

describe("AuthorizationRequestsPage", () => {
  const auths = [
    {
      id: "1",
      requestSource: "CREATE_ACTIVITY",
      requestedBy: "Admin",
      newActivityName: "Activity One",
      oldActivityName: "",
      status: "PENDING",
      requestedAt: "2026-01-02",
      approvedAt: null,
    },
    {
      id: "2",
      requestSource: "UPDATE_ACTIVITY",
      requestedBy: "User",
      newActivityName: "Activity Two",
      oldActivityName: "",
      status: "APPROVED",
      requestedAt: "2026-01-01",
      approvedAt: "2026-01-03",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();

    mockUseLocation.mockReturnValue({
      search: "",
    });

    mockUseAuthRequests.mockReturnValue({
      auths,
      allAuths: auths,
      loading: false,
      approveRequest: vi.fn(),
      rejectRequest: vi.fn(),
      rollbackRequest: vi.fn(),
      approveSelectedRequests: vi.fn(),
      rejectSelectedRequests: vi.fn(),
      getAuthRequestById: vi.fn(),
    });
  });

  it("renders all child components", () => {
    render(<AuthorizationRequestsPage />);

    expect(
      screen.getByTestId("summary")
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("filters")
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("table")
    ).toBeInTheDocument();
  });

  it("opens modal when view clicked", () => {
    render(<AuthorizationRequestsPage />);

    fireEvent.click(screen.getByText("View"));

    expect(
      screen.getByTestId("modal")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Activity One")
    ).toBeInTheDocument();
  });

  it("closes modal", () => {
    render(<AuthorizationRequestsPage />);

    fireEvent.click(screen.getByText("View"));

    fireEvent.click(screen.getByText("Close"));

    expect(
      screen.queryByTestId("modal")
    ).not.toBeInTheDocument();
  });

  it("loads request from query parameter", async () => {
    const getAuthRequestById = vi.fn().mockResolvedValue(auths[1]);

    mockUseLocation.mockReturnValue({
      search: "?requestId=2",
    });

    mockUseAuthRequests.mockReturnValue({
      auths,
      allAuths: auths,
      loading: false,
      approveRequest: vi.fn(),
      rejectRequest: vi.fn(),
      rollbackRequest: vi.fn(),
      approveSelectedRequests: vi.fn(),
      rejectSelectedRequests: vi.fn(),
      getAuthRequestById,
    });

    render(<AuthorizationRequestsPage />);

    await waitFor(() => {
      expect(getAuthRequestById).toHaveBeenCalledWith("2");
    });

    expect(
      screen.getByTestId("modal")
    ).toBeInTheDocument();
  });

  it("filters logs by search", () => {
    render(<AuthorizationRequestsPage />);

    expect(
      screen.getByText("Rows : 2")
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText("Search"));

    expect(
      screen.getByText("Rows : 1")
    ).toBeInTheDocument();
  });

  it("clears filters", () => {
    render(<AuthorizationRequestsPage />);

    fireEvent.click(screen.getByText("Search"));

    expect(
      screen.getByText("Rows : 1")
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText("Clear"));

    expect(
      screen.getByText("Rows : 2")
    ).toBeInTheDocument();
  });

  it("changes page", () => {
    render(<AuthorizationRequestsPage />);

    fireEvent.click(screen.getByText("Page2"));

    expect(
      screen.getByTestId("table")
    ).toBeInTheDocument();
  });

  it("renders loading table", () => {
    mockUseAuthRequests.mockReturnValue({
      auths: [],
      allAuths: [],
      loading: true,
      approveRequest: vi.fn(),
      rejectRequest: vi.fn(),
      rollbackRequest: vi.fn(),
      approveSelectedRequests: vi.fn(),
      rejectSelectedRequests: vi.fn(),
      getAuthRequestById: vi.fn(),
    });

    render(<AuthorizationRequestsPage />);

    expect(
      screen.getByTestId("table")
    ).toBeInTheDocument();
  });

  it("renders empty data", () => {
    mockUseAuthRequests.mockReturnValue({
      auths: [],
      allAuths: [],
      loading: false,
      approveRequest: vi.fn(),
      rejectRequest: vi.fn(),
      rollbackRequest: vi.fn(),
      approveSelectedRequests: vi.fn(),
      rejectSelectedRequests: vi.fn(),
      getAuthRequestById: vi.fn(),
    });

    render(<AuthorizationRequestsPage />);

    expect(
      screen.getByText("Rows : 0")
    ).toBeInTheDocument();
  });
});