import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, test, vi } from "vitest";

import Sidebar from "../layout/Sidebar";

vi.mock("../../assets/images/Novillex-Logo.png", () => ({
  default: "logo.png",
}));

const renderSidebar = () =>
  render(
    <MemoryRouter>
      <Sidebar />
    </MemoryRouter>,
  );

describe("Sidebar", () => {
  beforeEach(() => {
    sessionStorage.clear();

    sessionStorage.setItem(
      "user",
      JSON.stringify({
        fullname: "Sachin Nelwade",
        username: "sachin",
        role: "ADMIN",
      }),
    );
  });

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

  test("renders banks menu", () => {
    renderSidebar();

    expect(screen.getByText("Banks / Clients")).toBeInTheDocument();
  });

  test("renders products menu", () => {
    renderSidebar();

    expect(screen.getByText("Products")).toBeInTheDocument();
  });

  test("renders projects menu", () => {
    renderSidebar();

    expect(screen.getByText("Projects")).toBeInTheDocument();
  });

  test("renders upload excel menu for admin", () => {
    renderSidebar();

    expect(screen.getByText("Upload Excel")).toBeInTheDocument();
  });

  test("renders milestones menu", () => {
    renderSidebar();

    expect(screen.getByText("Milestones")).toBeInTheDocument();
  });

  test("renders tasks menu", () => {
    renderSidebar();

    expect(screen.getByText("Tasks")).toBeInTheDocument();
  });

  test("renders issues menu", () => {
    renderSidebar();

    expect(screen.getByText("Issues")).toBeInTheDocument();
  });

  test("renders risks menu", () => {
    renderSidebar();

    expect(screen.getByText("Risks")).toBeInTheDocument();
  });

  test("renders reports menu", () => {
    renderSidebar();

    expect(screen.getByText("Reports")).toBeInTheDocument();
  });

  test("renders documents menu", () => {
    renderSidebar();

    expect(screen.getByText("Documents")).toBeInTheDocument();
  });

  test("renders users menu", () => {
    renderSidebar();

    expect(screen.getByText("Users")).toBeInTheDocument();
  });

  test("renders settings menu", () => {
    renderSidebar();

    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  test("renders audit logs menu", () => {
    renderSidebar();

    expect(screen.getByText("Audit Logs")).toBeInTheDocument();
  });

  test("renders authorization menu", () => {
    renderSidebar();

    expect(screen.getByText("Authorization")).toBeInTheDocument();
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

  test("upload excel link exists", () => {
    renderSidebar();

    expect(
      screen.getByRole("link", {
        name: /Upload Excel/i,
      }),
    ).toHaveAttribute("href", "/upload-excel");
  });

  test("reports link exists", () => {
    renderSidebar();

    expect(
      screen.getByRole("link", {
        name: /Reports/i,
      }),
    ).toHaveAttribute("href", "/reports");
  });
  test("USER role shows project details dashboard", () => {
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        role: "USER",
      }),
    );

    renderSidebar();

    expect(
      screen.getByRole("link", {
        name: /Dashboard/i,
      }),
    ).toHaveAttribute("href", "/project-details");
  });

  test("USER role does not show monitoring section", () => {
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        role: "USER",
      }),
    );

    renderSidebar();

    expect(screen.queryByText("MONITORING")).not.toBeInTheDocument();
  });

  test("USER role does not show administration section", () => {
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        role: "USER",
      }),
    );

    renderSidebar();

    expect(screen.queryByText("ADMINISTRATION")).not.toBeInTheDocument();
  });

  test("USER role does not show Upload Excel", () => {
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        role: "USER",
      }),
    );

    renderSidebar();

    expect(screen.queryByText("Upload Excel")).not.toBeInTheDocument();
  });

  test("USER role only has Dashboard and Tasks", () => {
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        role: "USER",
      }),
    );

    renderSidebar();

    expect(screen.getByText("Dashboard")).toBeInTheDocument();

    expect(screen.getByText("Tasks")).toBeInTheDocument();
  });

  test("MANAGEMENT USER shows monitoring section", () => {
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        role: "MANAGEMENT USER",
      }),
    );

    renderSidebar();

    expect(screen.getByText("MONITORING")).toBeInTheDocument();
  });

  test("MANAGEMENT USER does not show administration", () => {
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        role: "MANAGEMENT USER",
      }),
    );

    renderSidebar();

    expect(screen.queryByText("ADMINISTRATION")).not.toBeInTheDocument();
  });

  test("MANAGEMENT USER does not show Upload Excel", () => {
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        role: "MANAGEMENT USER",
      }),
    );

    renderSidebar();

    expect(screen.queryByText("Upload Excel")).not.toBeInTheDocument();
  });

  test("IMPLEMENTATION USER shows Upload Excel", () => {
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        role: "IMPLEMENTATION USER",
      }),
    );

    renderSidebar();

    expect(screen.getByText("Upload Excel")).toBeInTheDocument();
  });

  test("IMPLEMENTATION USER shows monitoring section", () => {
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        role: "IMPLEMENTATION USER",
      }),
    );

    renderSidebar();

    expect(screen.getByText("MONITORING")).toBeInTheDocument();
  });

  test("IMPLEMENTATION USER does not show administration section", () => {
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        role: "IMPLEMENTATION USER",
      }),
    );

    renderSidebar();

    expect(screen.queryByText("ADMINISTRATION")).not.toBeInTheDocument();
  });

  test("ADMIN sees Upload Excel", () => {
    renderSidebar();

    expect(screen.getByText("Upload Excel")).toBeInTheDocument();
  });

  test("ADMIN sees Authorization", () => {
    renderSidebar();

    expect(screen.getByText("Authorization")).toBeInTheDocument();
  });

  test("ADMIN sees Settings", () => {
    renderSidebar();

    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  test("default role hides administration", () => {
    sessionStorage.clear();

    renderSidebar();

    expect(screen.queryByText("ADMINISTRATION")).not.toBeInTheDocument();
  });

  test("default role hides monitoring", () => {
    sessionStorage.clear();

    renderSidebar();

    expect(screen.queryByText("MONITORING")).not.toBeInTheDocument();
  });

  test("default role still renders portfolio", () => {
    sessionStorage.clear();

    renderSidebar();

    expect(screen.getByText("PORTFOLIO")).toBeInTheDocument();
  });

  test("default role does not render Upload Excel", () => {
    sessionStorage.clear();

    renderSidebar();

    expect(screen.queryByText("Upload Excel")).not.toBeInTheDocument();
  });
  test("opens sidebar on menu button click", () => {
    renderSidebar();

    fireEvent.click(screen.getByTestId("menu-button"));

    expect(screen.getByTestId("sidebar-overlay")).toBeInTheDocument();
  });

  test("closes sidebar on overlay click", () => {
    renderSidebar();

    fireEvent.click(screen.getByTestId("menu-button"));

    fireEvent.click(screen.getByTestId("sidebar-overlay"));

    expect(screen.queryByTestId("sidebar-overlay")).not.toBeInTheDocument();
  });

  test("closes sidebar using close button", () => {
    renderSidebar();

    fireEvent.click(screen.getByTestId("menu-button"));

    fireEvent.click(screen.getByTestId("close-sidebar"));

    expect(screen.queryByTestId("sidebar-overlay")).not.toBeInTheDocument();
  });

  test("close button exists after opening sidebar", () => {
    renderSidebar();

    fireEvent.click(screen.getByTestId("menu-button"));

    expect(screen.getByTestId("close-sidebar")).toBeInTheDocument();
  });

  test("menu button exists", () => {
    renderSidebar();

    expect(screen.getByTestId("menu-button")).toBeInTheDocument();
  });

  test("overlay is not rendered initially", () => {
    renderSidebar();

    expect(screen.queryByTestId("sidebar-overlay")).not.toBeInTheDocument();
  });

  test("clicking Dashboard closes sidebar", () => {
    renderSidebar();

    fireEvent.click(screen.getByTestId("menu-button"));

    fireEvent.click(
      screen.getByRole("link", {
        name: /Dashboard/i,
      }),
    );

    expect(screen.queryByTestId("sidebar-overlay")).not.toBeInTheDocument();
  });

  test("clicking Tasks closes sidebar", () => {
    renderSidebar();

    fireEvent.click(screen.getByTestId("menu-button"));

    fireEvent.click(
      screen.getByRole("link", {
        name: /Tasks/i,
      }),
    );

    expect(screen.queryByTestId("sidebar-overlay")).not.toBeInTheDocument();
  });

  test("logo is always visible", () => {
    renderSidebar();

    expect(screen.getByAltText("Logo")).toBeVisible();
  });

  test("help section is always visible", () => {
    renderSidebar();

    expect(screen.getByText("Help & Support")).toBeVisible();
  });

  test("sidebar contains multiple navigation links", () => {
    renderSidebar();

    const links = screen.getAllByRole("link");

    expect(links.length).toBeGreaterThan(5);
  });

  test("Dashboard link has correct href", () => {
    renderSidebar();

    expect(
      screen.getByRole("link", {
        name: /Dashboard/i,
      }),
    ).toHaveAttribute("href");
  });

  test("Tasks link has correct href", () => {
    renderSidebar();

    expect(
      screen.getByRole("link", {
        name: /Tasks/i,
      }),
    ).toHaveAttribute("href");
  });

  test("clicking menu button twice does not crash", () => {
    renderSidebar();

    const button = screen.getByTestId("menu-button");

    fireEvent.click(button);
    fireEvent.click(button);

    expect(screen.getByTestId("sidebar-overlay")).toBeInTheDocument();
  });

  test("opening then closing sidebar works correctly", () => {
    renderSidebar();

    fireEvent.click(screen.getByTestId("menu-button"));

    expect(screen.getByTestId("sidebar-overlay")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("close-sidebar"));

    expect(screen.queryByTestId("sidebar-overlay")).not.toBeInTheDocument();
  });

  test("all navigation groups render correctly for admin", () => {
    renderSidebar();

    expect(screen.getByText("PORTFOLIO")).toBeInTheDocument();

    expect(screen.getByText("MONITORING")).toBeInTheDocument();

    expect(screen.getByText("ADMINISTRATION")).toBeInTheDocument();
  });

  test("sidebar renders without user session", () => {
    sessionStorage.clear();

    renderSidebar();

    expect(screen.getByAltText("Logo")).toBeInTheDocument();
  });

  test("sidebar renders Help section without user session", () => {
    sessionStorage.clear();

    renderSidebar();

    expect(screen.getByText("Help & Support")).toBeInTheDocument();
  });
});
