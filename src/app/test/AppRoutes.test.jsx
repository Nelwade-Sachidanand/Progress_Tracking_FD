import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import AppRoutes from "../routes/AppRoutes";

// ------------------ Mock Layout ------------------
vi.mock("../../layouts/MainLayout", () => ({
  default: () => <div>Main Layout</div>,
}));

// ------------------ Mock Protected/Public ------------------
vi.mock("../routes/ProtectedRoute", () => ({
  default: () => <div>Protected Route</div>,
}));

vi.mock("../routes/PublicRoute", () => ({
  default: () => <div>Public Route</div>,
}));

// ------------------ Mock Pages ------------------
vi.mock("../../features/login/pages/LoginPage", () => ({
  default: () => <div>Login Page</div>,
}));

vi.mock("../../features/dashboard/pages/DashboardPage", () => ({
  default: () => <div>Dashboard Page</div>,
}));

vi.mock("../../features/project-details/pages/ProjectDetailPage", () => ({
  default: () => <div>Project Details</div>,
}));

vi.mock("../../features/tasks/pages/AllTasksPage", () => ({
  default: () => <div>All Tasks</div>,
}));

vi.mock("../../features/notifications/pages/NotificationPage", () => ({
  default: () => <div>Notifications</div>,
}));

vi.mock("../../features/milestones/pages/MilestoneManagement", () => ({
  default: () => <div>Milestones</div>,
}));

vi.mock("../../features/add-task/pages/AddTaskPage", () => ({
  default: () => <div>Add Task</div>,
}));

vi.mock("../../features/add-task/pages/EditTaskPage", () => ({
  default: () => <div>Edit Task</div>,
}));

vi.mock("../../features/users/pages/UserManagementPage", () => ({
  default: () => <div>User Management</div>,
}));

vi.mock("../../features/users/pages/AddUserPage", () => ({
  default: () => <div>Add User</div>,
}));

vi.mock("../../features/users/pages/EditUserPage", () => ({
  default: () => <div>Edit User</div>,
}));

vi.mock("../../features/create-project/pages/CreateProjectPage", () => ({
  default: () => <div>Create Project</div>,
}));

vi.mock("../../components/pages/UploadExcel", () => ({
  default: () => <div>Upload Excel</div>,
}));

vi.mock("../../features/auditLogs/pages/AuditLogsPage", () => ({
  default: () => <div>Audit Logs</div>,
}));

vi.mock("../../features/authorization/pages/AuthorizationRequestsPage", () => ({
  default: () => <div>Authorization Requests</div>,
}));

const renderRoute = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>,
  );

describe("AppRoutes", () => {
  it("renders public route", () => {
    renderRoute("/");
    expect(screen.getByText("Public Route")).toBeInTheDocument();
  });

  it("renders dashboard wrapper", () => {
    renderRoute("/dashboard");
    expect(screen.getByText("Protected Route")).toBeInTheDocument();
  });

  it("renders project details wrapper", () => {
    renderRoute("/project-details");
    expect(screen.getByText("Protected Route")).toBeInTheDocument();
  });

  it("renders tasks wrapper", () => {
    renderRoute("/tasks");
    expect(screen.getByText("Protected Route")).toBeInTheDocument();
  });

  it("renders notifications wrapper", () => {
    renderRoute("/notifications");
    expect(screen.getByText("Protected Route")).toBeInTheDocument();
  });

  it("renders milestones wrapper", () => {
    renderRoute("/milestones");
    expect(screen.getByText("Protected Route")).toBeInTheDocument();
  });

  it("renders add task wrapper", () => {
    renderRoute("/tasks/add-task");
    expect(screen.getByText("Protected Route")).toBeInTheDocument();
  });

  it("renders edit task wrapper", () => {
    renderRoute("/edit-task");
    expect(screen.getByText("Protected Route")).toBeInTheDocument();
  });

  it("renders users wrapper", () => {
    renderRoute("/users");
    expect(screen.getByText("Protected Route")).toBeInTheDocument();
  });

  it("renders add user wrapper", () => {
    renderRoute("/users/add");
    expect(screen.getByText("Protected Route")).toBeInTheDocument();
  });

  it("renders edit user wrapper", () => {
    renderRoute("/users/edit");
    expect(screen.getByText("Protected Route")).toBeInTheDocument();
  });

  it("renders create project wrapper", () => {
    renderRoute("/create-project");
    expect(screen.getByText("Protected Route")).toBeInTheDocument();
  });

  it("renders upload excel wrapper", () => {
    renderRoute("/upload-excel");
    expect(screen.getByText("Protected Route")).toBeInTheDocument();
  });

  it("renders audit logs wrapper", () => {
    renderRoute("/audits");
    expect(screen.getByText("Protected Route")).toBeInTheDocument();
  });

  it("renders authorization wrapper", () => {
    renderRoute("/authorization");
    expect(screen.getByText("Protected Route")).toBeInTheDocument();
  });

  it("renders login route", () => {
    renderRoute("/");
    expect(screen.getByText("Public Route")).toBeInTheDocument();
  });

  it("renders without crashing", () => {
    renderRoute("/");
    expect(screen.getByText("Public Route")).toBeInTheDocument();
  });

  it("supports dashboard route", () => {
    renderRoute("/dashboard");
    expect(screen.getByText("Protected Route")).toBeInTheDocument();
  });

  it("supports project details route", () => {
    renderRoute("/project-details");
    expect(screen.getByText("Protected Route")).toBeInTheDocument();
  });

  it("supports tasks route", () => {
    renderRoute("/tasks");
    expect(screen.getByText("Protected Route")).toBeInTheDocument();
  });

  it("supports notifications route", () => {
    renderRoute("/notifications");
    expect(screen.getByText("Protected Route")).toBeInTheDocument();
  });

  it("supports milestones route", () => {
    renderRoute("/milestones");
    expect(screen.getByText("Protected Route")).toBeInTheDocument();
  });

  it("supports users route", () => {
    renderRoute("/users");
    expect(screen.getByText("Protected Route")).toBeInTheDocument();
  });

  it("supports add user route", () => {
    renderRoute("/users/add");
    expect(screen.getByText("Protected Route")).toBeInTheDocument();
  });

  it("supports edit user route", () => {
    renderRoute("/users/edit");
    expect(screen.getByText("Protected Route")).toBeInTheDocument();
  });

  it("supports create project route", () => {
    renderRoute("/create-project");
    expect(screen.getByText("Protected Route")).toBeInTheDocument();
  });

  it("supports upload excel route", () => {
    renderRoute("/upload-excel");
    expect(screen.getByText("Protected Route")).toBeInTheDocument();
  });

  it("supports audit logs route", () => {
    renderRoute("/audits");
    expect(screen.getByText("Protected Route")).toBeInTheDocument();
  });

  it("supports authorization route", () => {
    renderRoute("/authorization");
    expect(screen.getByText("Protected Route")).toBeInTheDocument();
  });

  it("renders unknown route without crashing", () => {
    renderRoute("/unknown");
  });

  it("renders memory router successfully", () => {
    renderRoute("/");
    expect(screen.getByText("Public Route")).toBeInTheDocument();
  });

  it("supports multiple renders", () => {
    renderRoute("/");
    renderRoute("/dashboard");
  });

  it("supports admin routes", () => {
    renderRoute("/users");
    expect(screen.getByText("Protected Route")).toBeInTheDocument();
  });
});
