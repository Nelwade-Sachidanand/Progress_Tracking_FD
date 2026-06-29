import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    Navigate: ({ to }) => <div>Navigate:{to}</div>,
  };
});

import PublicRoute from "../routes/PublicRoute";

describe("PublicRoute", () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.clearAllMocks();
  });

  const renderRoute = () =>
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/" element={<div>Login Page</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

  it("renders login page when token is missing", () => {
    renderRoute();

    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  it("redirects ADMIN to dashboard", () => {
    sessionStorage.setItem("accessToken", "token");
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        role: "ADMIN",
      }),
    );

    renderRoute();

    expect(screen.getByText("Navigate:/dashboard")).toBeInTheDocument();
  });

  it("redirects MANAGEMENT USER to dashboard", () => {
    sessionStorage.setItem("accessToken", "token");
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        role: "MANAGEMENT USER",
      }),
    );

    renderRoute();

    expect(screen.getByText("Navigate:/dashboard")).toBeInTheDocument();
  });

  it("redirects IMPLEMENTATION USER to dashboard", () => {
    sessionStorage.setItem("accessToken", "token");
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        role: "IMPLEMENTATION USER",
      }),
    );

    renderRoute();

    expect(screen.getByText("Navigate:/dashboard")).toBeInTheDocument();
  });

  it("redirects USER to project-details", () => {
    sessionStorage.setItem("accessToken", "token");
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        role: "USER",
      }),
    );

    renderRoute();

    expect(screen.getByText("Navigate:/project-details")).toBeInTheDocument();
  });

  it("redirects unknown role to dashboard", () => {
    sessionStorage.setItem("accessToken", "token");
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        role: "UNKNOWN",
      }),
    );

    renderRoute();

    expect(screen.getByText("Navigate:/dashboard")).toBeInTheDocument();
  });

  it("redirects when user object is missing but token exists", () => {
    sessionStorage.setItem("accessToken", "token");

    renderRoute();

    expect(screen.getByText("Navigate:/dashboard")).toBeInTheDocument();
  });

  it("renders login page after clearing session storage", () => {
    sessionStorage.setItem("accessToken", "token");
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        role: "ADMIN",
      }),
    );

    sessionStorage.clear();

    renderRoute();

    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  it("redirects USER when token and user are present", () => {
    sessionStorage.setItem("accessToken", "123");
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        role: "USER",
      }),
    );

    renderRoute();

    expect(screen.getByText("Navigate:/project-details")).toBeInTheDocument();
  });

  it("redirects ADMIN when token and user are present", () => {
    sessionStorage.setItem("accessToken", "123");
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        role: "ADMIN",
      }),
    );

    renderRoute();

    expect(screen.getByText("Navigate:/dashboard")).toBeInTheDocument();
  });
});
