import { Route, Routes } from "react-router-dom";
import UploadExcel from "../../components/pages/UploadExcel";
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
import MainLayout from "../../layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute ";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/users" element={<UserManagementPage />} />
          <Route path="/users/add" element={<AddUserPage />} />
          <Route path="/users/edit" element={<EditUserPage />} />
          <Route path="/audits" element={<AuditLogsPage />} />
          <Route
            path="/authorization"
            element={<AuthorizationRequestsPage />}
          />
          <Route path="/create-project" element={<CreateProjectPage />} />
          <Route path="/project-details" element={<ProjectDetailPage />} />
          <Route path="/tasks" element={<AllTasksPage />} />
          <Route path="/tasks/add-task" element={<AddTaskPage />} />
          <Route path="/edit-task" element={<EditTaskPage />} />
          <Route path="/milestones" element={<MilestoneManagement />} />
          <Route path="/upload-excel" element={<UploadExcel />} />
          <Route path="/notifications" element={<NotificationPage />} />
        </Route>
      </Route>

      {/* Pages with Sidebar */}
    </Routes>
  );
};

export default AppRoutes;
