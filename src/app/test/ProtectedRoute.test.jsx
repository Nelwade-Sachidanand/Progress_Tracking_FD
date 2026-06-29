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

import ProtectedRoute from "../routes/ProtectedRoute";

describe("ProtectedRoute", () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.clearAllMocks();
  });

  const renderRoute = (allowedRoles = ["ADMIN"]) =>
    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route element={<ProtectedRoute allowedRoles={allowedRoles} />}>
            <Route path="/protected" element={<div>Protected Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

  it("redirects to login when token is missing", () => {
    renderRoute();

    expect(screen.getByText("Navigate:/")).toBeInTheDocument();
  });

  it("renders outlet for ADMIN", () => {
    sessionStorage.setItem("accessToken", "token");
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        role: "ADMIN",
      }),
    );

    renderRoute(["ADMIN"]);

    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });

  it("renders outlet for MANAGEMENT USER", () => {
    sessionStorage.setItem("accessToken", "token");
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        role: "MANAGEMENT USER",
      }),
    );

    renderRoute(["MANAGEMENT USER"]);

    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });

  it("renders outlet for IMPLEMENTATION USER", () => {
    sessionStorage.setItem("accessToken", "token");
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        role: "IMPLEMENTATION USER",
      }),
    );

    renderRoute(["IMPLEMENTATION USER"]);

    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });

  it("renders outlet for USER", () => {
    sessionStorage.setItem("accessToken", "token");
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        role: "USER",
      }),
    );

    renderRoute(["USER"]);

    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });

  it("redirects USER to project-details when unauthorized", () => {
    sessionStorage.setItem("accessToken", "token");
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        role: "USER",
      }),
    );

    renderRoute(["ADMIN"]);

    expect(screen.getByText("Navigate:/project-details")).toBeInTheDocument();
  });

  it("redirects MANAGEMENT USER to dashboard", () => {
    sessionStorage.setItem("accessToken", "token");
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        role: "MANAGEMENT USER",
      }),
    );

    renderRoute(["ADMIN"]);

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

    renderRoute(["ADMIN"]);

    expect(screen.getByText("Navigate:/dashboard")).toBeInTheDocument();
  });

  it("redirects ADMIN when role is not allowed", () => {
    sessionStorage.setItem("accessToken", "token");
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        role: "ADMIN",
      }),
    );

    renderRoute(["USER"]);

    expect(screen.getByText("Navigate:/dashboard")).toBeInTheDocument();
  });

  it("renders outlet when allowedRoles is undefined", () => {
    sessionStorage.setItem("accessToken", "token");
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        role: "ADMIN",
      }),
    );

    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/protected" element={<div>Protected Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });

  it("redirects when user is missing", () => {
    sessionStorage.setItem("accessToken", "token");

    renderRoute(["ADMIN"]);

    expect(screen.getByText("Navigate:/dashboard")).toBeInTheDocument();
  });

  it("redirects unknown role to dashboard", () => {
    sessionStorage.setItem("accessToken", "token");
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        role: "UNKNOWN",
      }),
    );

    renderRoute(["ADMIN"]);

    expect(screen.getByText("Navigate:/dashboard")).toBeInTheDocument();
  });
});
