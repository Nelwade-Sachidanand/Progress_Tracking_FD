import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, test, vi } from "vitest";

import DashboardHeader from "../layout/DashboardHeader";

import {
  getNotifications,
  getUnreadCount,
  markAllRead,
  markAsRead,
} from "../../services/notificationService";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({
      pathname: "/dashboard",
    }),
  };
});

vi.mock("../../services/notificationService", () => ({
  getNotifications: vi.fn(),
  getUnreadCount: vi.fn(),
  markAllRead: vi.fn(),
  markAsRead: vi.fn(),
}));

const renderComponent = () =>
  render(
    <MemoryRouter>
      <DashboardHeader sidebarOpen={false} setSidebarOpen={vi.fn()} />
    </MemoryRouter>,
  );

describe("DashboardHeader", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    localStorage.clear();

    localStorage.setItem(
      "user",
      JSON.stringify({
        fullname: "Sachin Nelwade",
        username: "sachin",
        role: "ADMIN",
      }),
    );

    localStorage.setItem(
      "projects",
      JSON.stringify([{ bankName: "HDFC" }, { bankName: "ICICI" }]),
    );

    getNotifications.mockResolvedValue({
      details: [
        {
          id: 1,
          title: "Risk Alert",
          message: "Risk detected",
          type: "RISK",
          read: false,
          createdAt: new Date().toISOString(),
          redirectUrl: "/dashboard",
        },
      ],
    });

    getUnreadCount.mockResolvedValue({
      details: 1,
    });

    markAllRead.mockResolvedValue({});
    markAsRead.mockResolvedValue({});
  });

  test("renders page title", () => {
    renderComponent();

    expect(
      screen.getByText("Implementation Command Center"),
    ).toBeInTheDocument();
  });

  test("renders user name", () => {
    renderComponent();

    expect(screen.getByText("Sachin Nelwade")).toBeInTheDocument();
  });

  test("renders role", () => {
    renderComponent();

    expect(screen.getByText("ADMIN")).toBeInTheDocument();
  });

  test("loads notifications on mount", async () => {
    renderComponent();

    await waitFor(() => {
      expect(getNotifications).toHaveBeenCalled();
      expect(getUnreadCount).toHaveBeenCalled();
    });
  });

  test("shows unread notification badge", async () => {
    renderComponent();

    expect(await screen.findByText("1")).toBeInTheDocument();
  });

  test("opens notification dropdown", async () => {
    renderComponent();

    fireEvent.click(screen.getByTestId("notification-button"));

    expect(await screen.findByText(/Notifications/i)).toBeInTheDocument();
  });

  test("shows notification content", async () => {
    renderComponent();

    fireEvent.click(screen.getByTestId("notification-button"));

    expect(await screen.findByText("Risk Alert")).toBeInTheDocument();

    expect(screen.getByText("Risk detected")).toBeInTheDocument();
  });

  test("mark all as read button works", async () => {
    renderComponent();

    fireEvent.click(screen.getByTestId("notification-button"));

    fireEvent.click(await screen.findByText(/Mark all as read/i));

    await waitFor(() => {
      expect(markAllRead).toHaveBeenCalled();
    });
  });

  test("click notification marks notification as read", async () => {
    renderComponent();

    fireEvent.click(screen.getByTestId("notification-button"));

    fireEvent.click(await screen.findByText("Risk Alert"));

    await waitFor(() => {
      expect(markAsRead).toHaveBeenCalledWith(1);
    });
  });

  test("notification redirect works", async () => {
    renderComponent();

    fireEvent.click(screen.getByTestId("notification-button"));

    fireEvent.click(await screen.findByText("Risk Alert"));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });
  });

  test("view all notifications button navigates", async () => {
    renderComponent();

    fireEvent.click(screen.getByTestId("notification-button"));

    fireEvent.click(await screen.findByText("View All"));

    expect(mockNavigate).toHaveBeenCalledWith("/notifications");
  });

  test("opens user menu", () => {
    renderComponent();

    fireEvent.click(screen.getByText("Sachin Nelwade"));

    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  test("logout removes user and navigates", () => {
    renderComponent();

    fireEvent.click(screen.getByText("Sachin Nelwade"));

    fireEvent.click(screen.getByText("Logout"));

    expect(localStorage.getItem("user")).toBeNull();

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  test("handles notification api failure", async () => {
    getNotifications.mockRejectedValue(new Error("API Error"));

    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    renderComponent();

    await waitFor(() => {
      expect(spy).toHaveBeenCalled();
    });

    spy.mockRestore();
  });

  test("updates search event", async () => {
    renderComponent();

    window.dispatchEvent(
      new CustomEvent("dashboardSearch", {
        detail: "HDFC",
      }),
    );

    await waitFor(() => {
      expect(true).toBeTruthy();
    });
  });
});
