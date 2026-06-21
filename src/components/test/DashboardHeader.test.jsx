// DashboardHeader.test.jsx

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import DashboardHeader from "../layout/DashboardHeader";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../../services/notificationService", () => ({
  getNotifications: vi.fn(),
  getUnreadCount: vi.fn(),
  markAllRead: vi.fn(),
  markAsRead: vi.fn(),
}));

import {
  getNotifications,
  getUnreadCount,
} from "../../services/notificationService";

describe("DashboardHeader", () => {
  const mockSetSidebarOpen = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    localStorage.setItem(
      "user",
      JSON.stringify({
        fullname: "Sachin Nelwade",
        username: "sachin",
        role: "ADMIN",
      }),
    );

    getNotifications.mockResolvedValue({
      details: [],
    });

    getUnreadCount.mockResolvedValue({
      details: 0,
    });
  });

  const renderComponent = (route = "/dashboard") =>
    render(
      <MemoryRouter initialEntries={[route]}>
        <DashboardHeader
          sidebarOpen={false}
          setSidebarOpen={mockSetSidebarOpen}
        />
      </MemoryRouter>,
    );

  test("renders dashboard title", async () => {
    renderComponent();

    expect(
      screen.getByText("Implementation Command Center"),
    ).toBeInTheDocument();
  });

  test("renders task title", async () => {
    renderComponent("/tasks");

    expect(screen.getByText("All Tasks")).toBeInTheDocument();
  });

  test("renders initials", async () => {
    renderComponent();

    expect(screen.getByText("SN")).toBeInTheDocument();
  });

  test("loads notifications on mount", async () => {
    renderComponent();

    await waitFor(() => {
      expect(getNotifications).toHaveBeenCalled();
      expect(getUnreadCount).toHaveBeenCalled();
    });
  });

  test("opens notification popup", async () => {
    renderComponent();

    const bellBtn = screen.getByTestId("notification-button");

    fireEvent.click(bellBtn);

    expect(
      screen.getByRole("heading", {
        name: /Notifications/i,
      }),
    ).toBeInTheDocument();
  });

  test("shows empty notification state", async () => {
    renderComponent();

    const bellBtn = screen.getAllByRole("button")[1];

    fireEvent.click(bellBtn);

    expect(screen.getByText("No Notifications")).toBeInTheDocument();
  });

  test("opens user dropdown", async () => {
    renderComponent();

    fireEvent.click(screen.getByText("SN"));

    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  test("logout works", async () => {
    renderComponent();

    fireEvent.click(screen.getByText("SN"));

    fireEvent.click(screen.getByText("Logout"));

    expect(localStorage.getItem("user")).toBeNull();

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  test("menu button opens sidebar", async () => {
    renderComponent();

    screen.debug();

    const buttons = screen.getAllByRole("button");
    console.log(buttons.length);

    fireEvent.click(buttons[0]);

    expect(mockSetSidebarOpen).toHaveBeenCalledWith(true);
  });
});
