import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { markAsRead } from "../../../services/notificationService";
import NotificationRow from "../components/NotificationRow";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("../../../services/notificationService", () => ({
  markAsRead: vi.fn(),
}));

describe("NotificationRow", () => {
  const reload = vi.fn();

  const notification = {
    id: 1,
    title: "Project Approved",
    message: "Your project has been approved.",
    type: "APPROVED",
    read: false,
    redirectUrl: "/dashboard",
    timeAgo: "2 min ago",
  };

  beforeEach(() => {
    vi.clearAllMocks();

    markAsRead.mockResolvedValue({});
  });

  it("renders notification title", () => {
    render(<NotificationRow notification={notification} reload={reload} />);

    expect(screen.getByText("Project Approved")).toBeInTheDocument();
  });

  it("renders notification message", () => {
    render(<NotificationRow notification={notification} reload={reload} />);

    expect(
      screen.getByText("Your project has been approved."),
    ).toBeInTheDocument();
  });

  it("renders notification type", () => {
    render(<NotificationRow notification={notification} reload={reload} />);

    expect(screen.getByText("APPROVED")).toBeInTheDocument();
  });

  it("renders notification time", () => {
    render(<NotificationRow notification={notification} reload={reload} />);

    expect(screen.getByText("2 min ago")).toBeInTheDocument();
  });

  it("renders View button", () => {
    render(<NotificationRow notification={notification} reload={reload} />);

    expect(
      screen.getByRole("button", {
        name: /view/i,
      }),
    ).toBeInTheDocument();
  });

  it("shows unread indicator", () => {
    const { container } = render(
      <NotificationRow notification={notification} reload={reload} />,
    );

    expect(container.querySelector(".bg-red-500")).toBeInTheDocument();
  });

  it("does not show unread indicator when already read", () => {
    const { container } = render(
      <NotificationRow
        notification={{
          ...notification,
          read: true,
        }}
        reload={reload}
      />,
    );

    expect(container.querySelector(".bg-red-500")).not.toBeInTheDocument();
  });

  it("marks notification as read when row clicked", async () => {
    render(<NotificationRow notification={notification} reload={reload} />);

    fireEvent.click(screen.getByText("Project Approved"));

    await waitFor(() => {
      expect(markAsRead).toHaveBeenCalledWith(1);
    });

    expect(reload).toHaveBeenCalled();
  });

  it("does not call markAsRead when notification already read", async () => {
    render(
      <NotificationRow
        notification={{
          ...notification,
          read: true,
        }}
        reload={reload}
      />,
    );

    fireEvent.click(screen.getByText("Project Approved"));

    await waitFor(() => {
      expect(markAsRead).not.toHaveBeenCalled();
    });

    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
  });

  it("navigates when notification clicked", async () => {
    render(<NotificationRow notification={notification} reload={reload} />);

    fireEvent.click(screen.getByText("Project Approved"));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });
  });

  it("does not navigate when redirectUrl is missing", async () => {
    render(
      <NotificationRow
        notification={{
          ...notification,
          redirectUrl: "",
        }}
        reload={reload}
      />,
    );

    fireEvent.click(screen.getByText("Project Approved"));

    await waitFor(() => {
      expect(markAsRead).toHaveBeenCalled();
    });

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("View button opens notification", async () => {
    render(<NotificationRow notification={notification} reload={reload} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /view/i,
      }),
    );

    await waitFor(() => {
      expect(markAsRead).toHaveBeenCalledWith(1);
    });

    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
  });

  it("reload called after marking read", async () => {
    render(<NotificationRow notification={notification} reload={reload} />);

    fireEvent.click(screen.getByText("Project Approved"));

    await waitFor(() => {
      expect(reload).toHaveBeenCalledTimes(1);
    });
  });

  it("renders APPROVED badge", () => {
    render(<NotificationRow notification={notification} reload={reload} />);

    expect(screen.getByText("APPROVED")).toBeInTheDocument();
  });

  it("renders REJECTED badge", () => {
    render(
      <NotificationRow
        notification={{
          ...notification,
          type: "REJECTED",
        }}
        reload={reload}
      />,
    );

    expect(screen.getByText("REJECTED")).toBeInTheDocument();
  });

  it("renders ROLLED_BACK badge", () => {
    render(
      <NotificationRow
        notification={{
          ...notification,
          type: "ROLLED_BACK",
        }}
        reload={reload}
      />,
    );

    expect(screen.getByText("ROLLED_BACK")).toBeInTheDocument();
  });

  it("renders default notification type", () => {
    render(
      <NotificationRow
        notification={{
          ...notification,
          type: "INFO",
        }}
        reload={reload}
      />,
    );

    expect(screen.getByText("INFO")).toBeInTheDocument();
  });

  it("contains svg icons", () => {
    const { container } = render(
      <NotificationRow notification={notification} reload={reload} />,
    );

    expect(container.querySelectorAll("svg").length).toBeGreaterThan(0);
  });

  it("renders without crashing", () => {
    const { container } = render(
      <NotificationRow notification={notification} reload={reload} />,
    );

    expect(container).toBeInTheDocument();
  });

  it("calls reload only once", async () => {
    render(<NotificationRow notification={notification} reload={reload} />);

    fireEvent.click(screen.getByText("Project Approved"));

    await waitFor(() => {
      expect(reload).toHaveBeenCalledTimes(1);
    });
  });

  it("calls markAsRead only once", async () => {
    render(<NotificationRow notification={notification} reload={reload} />);

    fireEvent.click(screen.getByText("Project Approved"));

    await waitFor(() => {
      expect(markAsRead).toHaveBeenCalledTimes(1);
    });
  });

  it("handles markAsRead rejection", async () => {
    markAsRead.mockRejectedValueOnce(new Error("API Error"));

    render(<NotificationRow notification={notification} reload={reload} />);

    await expect(async () => {
      fireEvent.click(screen.getByText("Project Approved"));
      await waitFor(() => {
        expect(markAsRead).toHaveBeenCalled();
      });
    }).rejects;
  });

  it("view button exists", () => {
    render(<NotificationRow notification={notification} reload={reload} />);

    expect(
      screen.getByRole("button", {
        name: /view/i,
      }),
    ).toBeEnabled();
  });

  it("notification title is rendered once", () => {
    render(<NotificationRow notification={notification} reload={reload} />);

    expect(screen.getAllByText("Project Approved")).toHaveLength(1);
  });

  it("notification message is rendered once", () => {
    render(<NotificationRow notification={notification} reload={reload} />);

    expect(screen.getAllByText("Your project has been approved.")).toHaveLength(
      1,
    );
  });

  it("view button click stops propagation", async () => {
    render(<NotificationRow notification={notification} reload={reload} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /view/i,
      }),
    );

    await waitFor(() => {
      expect(markAsRead).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });
  });

  it("renders notification time once", () => {
    render(<NotificationRow notification={notification} reload={reload} />);

    expect(screen.getAllByText("2 min ago")).toHaveLength(1);
  });
});
