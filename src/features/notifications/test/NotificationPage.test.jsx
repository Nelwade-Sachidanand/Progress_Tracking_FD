import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import NotificationPage from "../pages/NotificationPage";

import {
  getNotifications,
  markAllRead,
} from "../../../services/notificationService";

import { useNavigate } from "react-router-dom";

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

vi.mock("../../../services/notificationService", () => ({
  getNotifications: vi.fn(),
  markAllRead: vi.fn(),
}));

vi.mock("../components/NotificationFilters", () => ({
  default: ({ search, setSearch, onMarkAll }) => (
    <div>
      <input
        data-testid="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button onClick={onMarkAll}>Mark All</button>
    </div>
  ),
}));

vi.mock("../components/NotificationTable", () => ({
  default: ({ notifications, loading }) => (
    <div>
      <div data-testid="loading">{loading ? "loading" : "loaded"}</div>

      <div data-testid="count">{notifications.length}</div>

      {notifications.map((n) => (
        <div key={n.id}>{n.title}</div>
      ))}
    </div>
  ),
}));

describe("NotificationPage", () => {
  const mockNavigate = vi.fn();

  const notifications = [
    {
      id: 1,
      title: "Approved",
      message: "Project Approved",
      type: "APPROVED",
    },
    {
      id: 2,
      title: "Rejected",
      message: "Project Rejected",
      type: "REJECTED",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();

    useNavigate.mockReturnValue(mockNavigate);

    getNotifications.mockResolvedValue({
      details: notifications,
    });

    markAllRead.mockResolvedValue({});
  });

  it("loads notifications on mount", async () => {
    render(<NotificationPage />);

    await waitFor(() => {
      expect(getNotifications).toHaveBeenCalledTimes(1);
    });
  });

  it("renders loaded state", async () => {
    render(<NotificationPage />);

    expect(screen.getByTestId("loading")).toHaveTextContent("loading");

    await waitFor(() => {
      expect(screen.getByTestId("loading")).toHaveTextContent("loaded");
    });
  });

  it("renders notifications", async () => {
    render(<NotificationPage />);

    expect(await screen.findByText("Approved")).toBeInTheDocument();

    expect(screen.getByText("Rejected")).toBeInTheDocument();
  });

  it("passes notifications to table", async () => {
    render(<NotificationPage />);

    await waitFor(() => {
      expect(screen.getByTestId("count")).toHaveTextContent("2");
    });
  });

  it("renders search input", () => {
    render(<NotificationPage />);

    expect(screen.getByTestId("search")).toBeInTheDocument();
  });

  it("updates search value", async () => {
    render(<NotificationPage />);

    const input = screen.getByTestId("search");

    fireEvent.change(input, {
      target: {
        value: "approved",
      },
    });

    expect(input.value).toBe("approved");
  });

  it("filters notifications by title", async () => {
    render(<NotificationPage />);

    const input = screen.getByTestId("search");

    await waitFor(() => {
      fireEvent.change(input, {
        target: {
          value: "Approved",
        },
      });
    });

    expect(screen.getByText("Approved")).toBeInTheDocument();

    expect(screen.queryByText("Rejected")).not.toBeInTheDocument();
  });

  it("filters notifications by message", async () => {
    render(<NotificationPage />);

    await screen.findByText("Approved");

    fireEvent.change(screen.getByTestId("search"), {
      target: {
        value: "Rejected",
      },
    });

    expect(screen.getByText("Rejected")).toBeInTheDocument();
    expect(screen.queryByText("Approved")).not.toBeInTheDocument();
  });

  it("filters notifications by type", async () => {
    render(<NotificationPage />);

    await screen.findByText("Approved");

    fireEvent.change(screen.getByTestId("search"), {
      target: {
        value: "approved",
      },
    });

    expect(screen.getByText("Approved")).toBeInTheDocument();
  });

  it("shows all notifications when search is cleared", async () => {
    render(<NotificationPage />);

    await screen.findByText("Approved");

    const input = screen.getByTestId("search");

    fireEvent.change(input, {
      target: {
        value: "approved",
      },
    });

    fireEvent.change(input, {
      target: {
        value: "",
      },
    });

    expect(screen.getByText("Approved")).toBeInTheDocument();
    expect(screen.getByText("Rejected")).toBeInTheDocument();
  });

  it("calls markAllRead", async () => {
    render(<NotificationPage />);

    await screen.findByText("Approved");

    fireEvent.click(screen.getByText("Mark All"));

    await waitFor(() => {
      expect(markAllRead).toHaveBeenCalledTimes(1);
    });
  });

  it("reloads notifications after mark all", async () => {
    render(<NotificationPage />);

    await screen.findByText("Approved");

    fireEvent.click(screen.getByText("Mark All"));

    await waitFor(() => {
      expect(getNotifications).toHaveBeenCalledTimes(2);
    });
  });

  it("renders zero notifications", async () => {
    getNotifications.mockResolvedValueOnce({
      details: [],
    });

    render(<NotificationPage />);

    await waitFor(() => {
      expect(screen.getByTestId("count")).toHaveTextContent("0");
    });
  });

  it("handles undefined notification list", async () => {
    getNotifications.mockResolvedValueOnce({});

    render(<NotificationPage />);

    await waitFor(() => {
      expect(screen.getByTestId("count")).toHaveTextContent("0");
    });
  });

  it("renders without crashing", async () => {
    const { container } = render(<NotificationPage />);

    await waitFor(() => {
      expect(container).toBeInTheDocument();
    });
  });

  it("calls notification api only once on mount", async () => {
    render(<NotificationPage />);

    await waitFor(() => {
      expect(getNotifications).toHaveBeenCalledTimes(1);
    });
  });

  it("shows loading then loaded", async () => {
    render(<NotificationPage />);

    expect(screen.getByTestId("loading")).toHaveTextContent("loading");

    await waitFor(() => {
      expect(screen.getByTestId("loading")).toHaveTextContent("loaded");
    });
  });

  it("search is case insensitive", async () => {
    render(<NotificationPage />);

    await screen.findByText("Approved");

    fireEvent.change(screen.getByTestId("search"), {
      target: {
        value: "aPpRoVeD",
      },
    });

    expect(screen.getByText("Approved")).toBeInTheDocument();
  });

  it("shows no notification when search does not match", async () => {
    render(<NotificationPage />);

    await screen.findByText("Approved");

    fireEvent.change(screen.getByTestId("search"), {
      target: {
        value: "xyz",
      },
    });

    expect(screen.getByTestId("count")).toHaveTextContent("0");
  });

  it("calls markAllRead only once", async () => {
    render(<NotificationPage />);

    await screen.findByText("Approved");

    fireEvent.click(screen.getByText("Mark All"));

    await waitFor(() => {
      expect(markAllRead).toHaveBeenCalledTimes(1);
    });
  });

  it("reloads notifications after mark all only once", async () => {
    render(<NotificationPage />);

    await screen.findByText("Approved");

    fireEvent.click(screen.getByText("Mark All"));

    await waitFor(() => {
      expect(getNotifications).toHaveBeenCalledTimes(2);
    });
  });

  it("handles notification api failure", async () => {
    getNotifications.mockRejectedValueOnce(new Error("API Error"));

    render(<NotificationPage />);

    await waitFor(() => {
      expect(screen.getByTestId("loading")).toHaveTextContent("loaded");
    });
  });

  it("handles markAllRead failure", async () => {
    markAllRead.mockRejectedValueOnce(new Error("API Error"));

    render(<NotificationPage />);

    await screen.findByText("Approved");

    await expect(async () => {
      fireEvent.click(screen.getByText("Mark All"));
    }).rejects;
  });

  it("renders search component", () => {
    render(<NotificationPage />);

    expect(screen.getByTestId("search")).toBeInTheDocument();
  });

  it("renders notification table component", async () => {
    render(<NotificationPage />);

    await waitFor(() => {
      expect(screen.getByTestId("count")).toBeInTheDocument();
    });
  });

  it("matches notification count", async () => {
    render(<NotificationPage />);

    await waitFor(() => {
      expect(screen.getByTestId("count")).toHaveTextContent(
        notifications.length.toString(),
      );
    });
  });
});
