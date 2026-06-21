import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import MainLayout from "../layouts/MainLayout";

const mockUseIdleLogout = vi.fn();

vi.mock("../services/useIdleLogout", () => ({
  default: () => mockUseIdleLogout(),
}));

vi.mock("react-router-dom", () => ({
  Outlet: () => <div data-testid="outlet">Outlet Content</div>,
}));

vi.mock("../components/layout/Sidebar", () => ({
  default: ({ open }) => (
    <div data-testid="sidebar">Sidebar - {String(open)}</div>
  ),
}));

vi.mock("../components/layout/DashboardHeader", () => ({
  default: ({ sidebarOpen, setSidebarOpen }) => (
    <div data-testid="dashboard-header">
      <span>Header - {String(sidebarOpen)}</span>

      <button
        data-testid="toggle-sidebar"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        Toggle
      </button>
    </div>
  ),
}));

describe("MainLayout", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders Sidebar", () => {
    render(<MainLayout />);

    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
  });

  it("renders DashboardHeader", () => {
    render(<MainLayout />);

    expect(screen.getByTestId("dashboard-header")).toBeInTheDocument();
  });

  it("renders Outlet", () => {
    render(<MainLayout />);

    expect(screen.getByTestId("outlet")).toBeInTheDocument();

    expect(screen.getByText("Outlet Content")).toBeInTheDocument();
  });

  it("calls useIdleLogout hook", () => {
    render(<MainLayout />);

    expect(mockUseIdleLogout).toHaveBeenCalledTimes(1);
  });

  it("initializes sidebar as closed", () => {
    render(<MainLayout />);

    expect(screen.getByText(/Sidebar - false/)).toBeInTheDocument();

    expect(screen.getByText(/Header - false/)).toBeInTheDocument();
  });

  it("toggles sidebar state", async () => {
    render(<MainLayout />);

    fireEvent.click(screen.getByTestId("toggle-sidebar"));

    await waitFor(() => {
      expect(screen.getByText(/Sidebar - true/)).toBeInTheDocument();

      expect(screen.getByText(/Header - true/)).toBeInTheDocument();
    });
  });

  it("renders main content area", () => {
    render(<MainLayout />);

    const outlet = screen.getByTestId("outlet");

    expect(outlet).toBeInTheDocument();
  });
});
