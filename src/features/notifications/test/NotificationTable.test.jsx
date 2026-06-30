import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import NotificationTable from "../components/NotificationTable";

vi.mock("../components/NotificationRow", () => ({
  default: ({ notification }) => (
    <div data-testid="notification-row">{notification.title}</div>
  ),
}));

describe("NotificationTable", () => {
  const reload = vi.fn();

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
  });

  it("renders loading state", () => {
    render(
      <NotificationTable loading={true} notifications={[]} reload={reload} />,
    );

    expect(screen.getByText(/Loading notifications/i)).toBeInTheDocument();
  });

  it("renders empty state", () => {
    render(
      <NotificationTable loading={false} notifications={[]} reload={reload} />,
    );

    expect(screen.getByText("No Notifications")).toBeInTheDocument();

    expect(screen.getByText("You're all caught up.")).toBeInTheDocument();
  });

  it("renders table header", () => {
    render(
      <NotificationTable
        loading={false}
        notifications={notifications}
        reload={reload}
      />,
    );

    expect(screen.getByText("Notifications")).toBeInTheDocument();
  });

  it("renders notification count", () => {
    render(
      <NotificationTable
        loading={false}
        notifications={notifications}
        reload={reload}
      />,
    );

    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("renders notification rows", () => {
    render(
      <NotificationTable
        loading={false}
        notifications={notifications}
        reload={reload}
      />,
    );

    expect(screen.getAllByTestId("notification-row")).toHaveLength(2);
  });

  it("renders first notification", () => {
    render(
      <NotificationTable
        loading={false}
        notifications={notifications}
        reload={reload}
      />,
    );

    expect(screen.getByText("Approved")).toBeInTheDocument();
  });

  it("renders second notification", () => {
    render(
      <NotificationTable
        loading={false}
        notifications={notifications}
        reload={reload}
      />,
    );

    expect(screen.getByText("Rejected")).toBeInTheDocument();
  });

  it("passes notifications to NotificationRow", () => {
    render(
      <NotificationTable
        loading={false}
        notifications={notifications}
        reload={reload}
      />,
    );

    expect(screen.getAllByTestId("notification-row")).toHaveLength(
      notifications.length,
    );
  });

  it("renders notification count badge correctly", () => {
    render(
      <NotificationTable
        loading={false}
        notifications={notifications}
        reload={reload}
      />,
    );

    expect(screen.getByText(String(notifications.length))).toBeInTheDocument();
  });

  it("renders zero count when notifications array is empty", () => {
    render(
      <NotificationTable loading={false} notifications={[]} reload={reload} />,
    );

    expect(screen.queryByText("0")).not.toBeInTheDocument();
  });

  it("renders only one loading message", () => {
    render(
      <NotificationTable
        loading={true}
        notifications={notifications}
        reload={reload}
      />,
    );

    expect(screen.getAllByText(/Loading notifications/i)).toHaveLength(1);
  });

  it("does not render rows while loading", () => {
    render(
      <NotificationTable
        loading={true}
        notifications={notifications}
        reload={reload}
      />,
    );

    expect(screen.queryByTestId("notification-row")).not.toBeInTheDocument();
  });

  it("does not render header while loading", () => {
    render(
      <NotificationTable
        loading={true}
        notifications={notifications}
        reload={reload}
      />,
    );

    expect(screen.queryByText("Notifications")).not.toBeInTheDocument();
  });

  it("does not render empty state while loading", () => {
    render(
      <NotificationTable loading={true} notifications={[]} reload={reload} />,
    );

    expect(screen.queryByText("No Notifications")).not.toBeInTheDocument();
  });

  it("renders correctly with one notification", () => {
    render(
      <NotificationTable
        loading={false}
        notifications={[notifications[0]]}
        reload={reload}
      />,
    );

    expect(screen.getAllByTestId("notification-row")).toHaveLength(1);

    expect(screen.getByText("Approved")).toBeInTheDocument();

    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("renders correctly with many notifications", () => {
    const many = [...notifications, ...notifications];

    render(
      <NotificationTable
        loading={false}
        notifications={many}
        reload={reload}
      />,
    );

    expect(screen.getAllByTestId("notification-row")).toHaveLength(4);

    expect(screen.getByText("4")).toBeInTheDocument();
  });

  it("renders without crashing", () => {
    const { container } = render(
      <NotificationTable
        loading={false}
        notifications={notifications}
        reload={reload}
      />,
    );

    expect(container).toBeInTheDocument();
  });

  it("contains notification container", () => {
    const { container } = render(
      <NotificationTable
        loading={false}
        notifications={notifications}
        reload={reload}
      />,
    );

    expect(container.querySelector(".divide-y")).toBeTruthy();
  });

  it("contains notification count badge", () => {
    render(
      <NotificationTable
        loading={false}
        notifications={notifications}
        reload={reload}
      />,
    );

    expect(screen.getByText("2")).toBeVisible();
  });

  it("renders notification title once", () => {
    render(
      <NotificationTable
        loading={false}
        notifications={notifications}
        reload={reload}
      />,
    );

    expect(screen.getAllByText("Approved")).toHaveLength(1);
  });

  it("renders notification header once", () => {
    render(
      <NotificationTable
        loading={false}
        notifications={notifications}
        reload={reload}
      />,
    );

    expect(screen.getAllByText("Notifications")).toHaveLength(1);
  });

  it("passes reload prop to NotificationRow", () => {
    render(
      <NotificationTable
        loading={false}
        notifications={notifications}
        reload={reload}
      />,
    );

    expect(screen.getAllByTestId("notification-row")).toHaveLength(2);
  });

  it("renders correctly when notification array changes", () => {
    const { rerender } = render(
      <NotificationTable
        loading={false}
        notifications={notifications}
        reload={reload}
      />,
    );

    expect(screen.getByText("2")).toBeInTheDocument();

    rerender(
      <NotificationTable
        loading={false}
        notifications={[notifications[0]]}
        reload={reload}
      />,
    );

    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("matches notification row count", () => {
    render(
      <NotificationTable
        loading={false}
        notifications={notifications}
        reload={reload}
      />,
    );

    const rows = screen.getAllByTestId("notification-row");

    expect(rows.length).toBe(notifications.length);
  });
});
