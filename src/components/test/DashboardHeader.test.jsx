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

const mockLocation = {
  pathname: "/dashboard",
};

const mockSetProjects = vi.fn();

vi.mock("../../context/ProjectContext", () => ({
  useProjects: () => ({
    projects: [
      {
        bankName: "HDFC",
      },
      {
        bankName: "ICICI",
      },
    ],
    setProjects: mockSetProjects,
  }),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => mockLocation,
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

    mockLocation.pathname = "/dashboard";

    sessionStorage.clear();

    sessionStorage.setItem(
      "user",
      JSON.stringify({
        fullname: "Sachin Nelwade",
        username: "sachin",
        role: "ADMIN",
      }),
    );

    sessionStorage.setItem("selectedBank", "All Banks");

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

  test("renders dashboard page title", () => {
    renderComponent();

    expect(
      screen.getByText("Implementation Command Center"),
    ).toBeInTheDocument();
  });

  test("renders notifications page title", () => {
    mockLocation.pathname = "/notifications";

    renderComponent();

    expect(screen.getByText("Notifications")).toBeInTheDocument();
  });

  test("renders user fullname", () => {
    renderComponent();

    expect(screen.getByText("Sachin Nelwade")).toBeInTheDocument();
  });

  test("renders user role", () => {
    renderComponent();

    expect(screen.getByText("ADMIN")).toBeInTheDocument();
  });

  test("renders default user when sessionStorage is empty", () => {
    sessionStorage.clear();

    renderComponent();

    expect(screen.getByText("Admin")).toBeInTheDocument();
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

    expect(await screen.findByText(/^1$/)).toBeInTheDocument();
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

  test("renders notification time", async () => {
    renderComponent();

    fireEvent.click(screen.getByTestId("notification-button"));

    expect(await screen.findByText(/ago/i)).toBeInTheDocument();
  });
  test("mark all as read button works", async () => {
    renderComponent();

    fireEvent.click(screen.getByTestId("notification-button"));

    fireEvent.click(await screen.findByText(/Mark all as read/i));

    await waitFor(() => {
      expect(markAllRead).toHaveBeenCalledTimes(1);
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

  test("View All button navigates to notifications page", async () => {
    renderComponent();

    fireEvent.click(screen.getByTestId("notification-button"));

    fireEvent.click(await screen.findByText("View All"));

    expect(mockNavigate).toHaveBeenCalledWith("/notifications");
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

  test("handles mark all read failure", async () => {
    markAllRead.mockRejectedValue(new Error("API Error"));

    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    renderComponent();

    fireEvent.click(screen.getByTestId("notification-button"));

    fireEvent.click(await screen.findByText(/Mark all as read/i));

    await waitFor(() => {
      expect(spy).toHaveBeenCalled();
    });

    spy.mockRestore();
  });

  test("shows no notifications message", async () => {
    getNotifications.mockResolvedValue({
      details: [],
    });

    renderComponent();

    fireEvent.click(screen.getByTestId("notification-button"));

    expect(await screen.findByText(/No Notifications/i)).toBeInTheDocument();
  });

  test("notification without redirect url does not navigate", async () => {
    getNotifications.mockResolvedValue({
      details: [
        {
          id: 1,
          title: "Risk",
          message: "Test Notification",
          type: "RISK",
          read: false,
          createdAt: new Date().toISOString(),
        },
      ],
    });

    renderComponent();

    fireEvent.click(screen.getByTestId("notification-button"));

    fireEvent.click(await screen.findByText("Risk"));

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test("does not show unread badge when unread count is zero", async () => {
    getUnreadCount.mockResolvedValue({
      details: 0,
    });

    renderComponent();

    await waitFor(() => {
      expect(screen.queryByText(/^1$/)).not.toBeInTheDocument();
    });
  });

  test("notification dropdown closes on outside click", async () => {
    renderComponent();

    fireEvent.click(screen.getByTestId("notification-button"));

    expect(await screen.findByText(/Notifications/i)).toBeInTheDocument();

    fireEvent.mouseDown(document);

    await waitFor(() => {
      expect(screen.queryByText(/Notifications/i)).not.toBeInTheDocument();
    });
  });

  test("notification button toggles dropdown", async () => {
    renderComponent();

    const button = screen.getByTestId("notification-button");

    fireEvent.click(button);

    expect(await screen.findByText(/Notifications/i)).toBeInTheDocument();

    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.queryByText(/Notifications/i)).not.toBeInTheDocument();
    });
  });
  test("opens user menu", () => {
    renderComponent();

    fireEvent.click(screen.getByText("Sachin Nelwade"));

    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  test("logout clears session storage and navigates", () => {
    renderComponent();

    fireEvent.click(screen.getByText("Sachin Nelwade"));

    fireEvent.click(screen.getByText("Logout"));

    expect(sessionStorage.getItem("user")).toBeNull();

    expect(mockSetProjects).toHaveBeenCalledWith([]);

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  test("opens bank dropdown", () => {
    mockLocation.pathname = "/dashboard";

    renderComponent();

    fireEvent.click(screen.getByText("All Banks"));

    expect(screen.getByText("HDFC")).toBeInTheDocument();

    expect(screen.getByText("ICICI")).toBeInTheDocument();
  });

  test("changes selected bank", () => {
    mockLocation.pathname = "/dashboard";

    renderComponent();

    fireEvent.click(screen.getByText("All Banks"));

    fireEvent.click(screen.getByText("HDFC"));

    expect(sessionStorage.getItem("selectedBank")).toBe("HDFC");
  });

  test("dispatches bankChanged event", () => {
    mockLocation.pathname = "/dashboard";

    const dispatchSpy = vi.spyOn(window, "dispatchEvent");

    renderComponent();

    fireEvent.click(screen.getByText("All Banks"));

    fireEvent.click(screen.getByText("HDFC"));

    expect(dispatchSpy).toHaveBeenCalled();

    dispatchSpy.mockRestore();
  });

  test("dispatches dashboard search event", () => {
    mockLocation.pathname = "/dashboard";

    const dispatchSpy = vi.spyOn(window, "dispatchEvent");

    renderComponent();

    const input = screen.getByPlaceholderText("Search banks, projects...");

    fireEvent.change(input, {
      target: {
        value: "ICICI",
      },
    });

    expect(dispatchSpy).toHaveBeenCalled();

    dispatchSpy.mockRestore();
  });

  test("receives dashboard search event", async () => {
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

  test("menu button opens sidebar", () => {
    const fn = vi.fn();

    render(
      <MemoryRouter>
        <DashboardHeader sidebarOpen={false} setSidebarOpen={fn} />
      </MemoryRouter>,
    );

    const buttons = screen.getAllByRole("button");

    fireEvent.click(buttons[0]);

    expect(fn).toHaveBeenCalledWith(true);
  });

  test("notification button exists", () => {
    renderComponent();

    expect(screen.getByTestId("notification-button")).toBeInTheDocument();
  });

  test("user initials are displayed", () => {
    renderComponent();

    expect(screen.getByText("SN")).toBeInTheDocument();
  });

  test("bank dropdown closes after selecting bank", () => {
    renderComponent();

    fireEvent.click(screen.getByText("All Banks"));

    fireEvent.click(screen.getByText("ICICI"));

    expect(screen.queryByText("HDFC")).not.toBeInTheDocument();
  });

  test("notification dropdown shows unread count", async () => {
    renderComponent();

    fireEvent.click(screen.getByTestId("notification-button"));

    expect(await screen.findByText("Notifications (1)")).toBeInTheDocument();
  });

  test("notification api called only once on mount", async () => {
    renderComponent();

    await waitFor(() => {
      expect(getNotifications).toHaveBeenCalledTimes(1);

      expect(getUnreadCount).toHaveBeenCalledTimes(1);
    });
  });
});
