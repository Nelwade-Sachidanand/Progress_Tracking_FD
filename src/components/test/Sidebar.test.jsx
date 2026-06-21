import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Sidebar from "../layout/Sidebar";

describe("Sidebar", () => {
  const renderSidebar = () =>
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>,
    );

  test("renders logo", () => {
    renderSidebar();

    expect(screen.getByAltText("Logo")).toBeInTheDocument();
  });

  test("renders portfolio section", () => {
    renderSidebar();

    expect(screen.getByText("PORTFOLIO")).toBeInTheDocument();
  });

  test("renders monitoring section", () => {
    renderSidebar();

    expect(screen.getByText("MONITORING")).toBeInTheDocument();
  });

  test("renders administration section", () => {
    renderSidebar();

    expect(screen.getByText("ADMINISTRATION")).toBeInTheDocument();
  });

  test("renders dashboard menu", () => {
    renderSidebar();

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  test("renders users menu", () => {
    renderSidebar();

    expect(screen.getByText("Users")).toBeInTheDocument();
  });

  test("renders help section", () => {
    renderSidebar();

    expect(screen.getByText("Help & Support")).toBeInTheDocument();
  });

  test("dashboard link exists", () => {
    renderSidebar();

    expect(
      screen.getByRole("link", {
        name: /Dashboard/i,
      }),
    ).toHaveAttribute("href", "/dashboard");
  });

  test("users link exists", () => {
    renderSidebar();

    expect(
      screen.getByRole("link", {
        name: /Users/i,
      }),
    ).toHaveAttribute("href", "/users");
  });

  test("opens sidebar on menu click", () => {
    renderSidebar();

    const menuButton = screen.getByTestId("menu-button");

    fireEvent.click(menuButton);

    expect(screen.getByTestId("sidebar-overlay")).toBeInTheDocument();
  });

  test("closes sidebar on overlay click", () => {
    renderSidebar();

    fireEvent.click(screen.getByTestId("menu-button"));

    fireEvent.click(screen.getByTestId("sidebar-overlay"));

    expect(screen.queryByTestId("sidebar-overlay")).not.toBeInTheDocument();
  });
});
