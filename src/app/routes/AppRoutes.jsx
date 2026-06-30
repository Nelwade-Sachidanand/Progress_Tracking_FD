import { Route, Routes } from "react-router-dom";

import UploadExcel from "../../components/pages/UploadExcel";
import MainLayout from "../../layouts/MainLayout";

import AddTaskPage from "../../features/add-task/pages/AddTaskPage";
import EditTaskPage from "../../features/add-task/pages/EditTaskPage";
import AuditLogsPage from "../../features/auditLogs/pages/AuditLogsPage";
import AuthorizationRequestsPage from "../../features/authorization/pages/AuthorizationRequestsPage";
import CreateProjectPage from "../../features/create-project/pages/CreateProjectPage";
import DashboardPage from "../../features/dashboard/pages/DashboardPage";
import LoginPage from "../../features/login/pages/LoginPage";
import MilestoneManagement from "../../features/milestones/pages/MilestoneManagement";
import NotificationPage from "../../features/notifications/pages/NotificationPage";
import ProjectDetailPage from "../../features/project-details/pages/ProjectDetailPage";
import AllTasksPage from "../../features/tasks/pages/AllTasksPage";
import AddUserPage from "../../features/users/pages/AddUserPage";
import EditUserPage from "../../features/users/pages/EditUserPage";
import UserManagementPage from "../../features/users/pages/UserManagementPage";
import Documents from "../../features/documents/pages/Documents";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* ================= PUBLIC ================= */}

      <Route element={<PublicRoute />}>
        <Route path="/" element={<LoginPage />} />
      </Route>

      {/* ================= COMMON FOR ALL ROLES ================= */}

      <Route
        element={
          <ProtectedRoute
            allowedRoles={[
              "ADMIN",
              "MANAGEMENT USER",
              "IMPLEMENTATION USER",
              "USER",
            ]}
          />
        }
      >
        <Route element={<MainLayout />}>
          <Route path="/project-details" element={<ProjectDetailPage />} />
          <Route path="/tasks" element={<AllTasksPage />} />
          <Route path="/notifications" element={<NotificationPage />} />
          <Route path="/documents" element={<Documents />} />
        </Route>
      </Route>

      {/* ================= ADMIN + MANAGEMENT + IMPLEMENTATION ================= */}

      <Route
        element={
          <ProtectedRoute
            allowedRoles={["ADMIN", "MANAGEMENT USER", "IMPLEMENTATION USER"]}
          />
        }
      >
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
      </Route>

      {/* ================= ADMIN + IMPLEMENTATION ================= */}

      <Route
        element={
          <ProtectedRoute allowedRoles={["ADMIN", "IMPLEMENTATION USER"]} />
        }
      >
        <Route element={<MainLayout />}>
          <Route path="/milestones" element={<MilestoneManagement />} />
          <Route path="/tasks/add-task" element={<AddTaskPage />} />
          <Route path="/edit-task" element={<EditTaskPage />} />
        </Route>
      </Route>

      {/* ================= ADMIN ONLY ================= */}

      <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
        <Route element={<MainLayout />}>
          <Route path="/users" element={<UserManagementPage />} />
          <Route path="/users/add" element={<AddUserPage />} />
          <Route path="/users/edit" element={<EditUserPage />} />

          <Route path="/create-project" element={<CreateProjectPage />} />
          <Route path="/upload-excel" element={<UploadExcel />} />
          <Route path="/audits" element={<AuditLogsPage />} />

          <Route
            path="/authorization"
            element={<AuthorizationRequestsPage />}
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
