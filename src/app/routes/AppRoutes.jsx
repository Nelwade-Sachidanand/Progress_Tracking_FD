import { Route, Routes } from "react-router-dom";
import AuditLogsPage from "../../features/auditLogs/pages/AuditLogsPage";
import LoginPage from "../../features/auth/pages/LoginPage";
import DashboardPage from "../../features/dashboard/pages/DashboardPage";
import AddUserPage from "../../features/users/pages/AddUserPage";
import EditUserPage from "../../features/users/pages/EditUserPage";
import UserManagementPage from "../../features/users/pages/UserManagementPage";
import MainLayout from "../../layouts/MainLayout";
import AuthorizationRequestsPage from "../../features/authorization/pages/AuthorizationRequestsPage";
import CreateProjectPage from "../../features/projects/pages/CreateProjectPage";
import AllTasksPage from "../../features/tasks/pages/AllTasksPage";
import AddTaskPage from "../../features/add-task/pages/AddTaskPage";
import ProjectDetailPage from "../../features/project-details/pages/ProjectDetailPage";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      {/* Pages with Sidebar */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/users" element={<UserManagementPage />} />
        <Route path="/users/add" element={<AddUserPage />} />
        <Route path="/users/edit" element={<EditUserPage />} />
        <Route path="/audits" element={<AuditLogsPage />} />
        <Route path="/authorization" element={<AuthorizationRequestsPage />} />
        <Route path="/create-project" element={<CreateProjectPage />} />
        <Route
          path="/project-details"
          element={<ProjectDetailPage />}
        />
        <Route path="/tasks" element={<AllTasksPage />} />
        <Route path="/tasks/add-task" element={<AddTaskPage />} />

        {/* <Route
          path="/add-task"
          element={<AddTaskPage />}
        /> */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
