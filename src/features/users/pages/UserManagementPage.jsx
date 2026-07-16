import { useEffect, useState } from "react";
import { useLocation,useNavigate  } from "react-router-dom";

import Swal from "sweetalert2";
import { useProjects } from "../../../context/ProjectContext";
import UserFilters from "../components/UserFilters";
import UserStatsCards from "../components/UserStatsCards";
import UserTable from "../components/UserTable";
import ResetPasswordModal from "./ResetPasswordModal";

import { useUsers } from "../hooks/useUsers";

const UserManagementPage = () => {
  const { projects } = useProjects();
  const { users, loading, deleteUser, fetchUsers, resetPassword } = useUsers();
  const [searchTerm, setSearchTerm] = useState("");

  const [roleFilter, setRoleFilter] = useState("");

  const [statusFilter, setStatusFilter] = useState("");
  const [bankFilter, setBankFilter] = useState("");

  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const location = useLocation();

  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);

  const userId = queryParams.get("userId");

  const action = queryParams.get("action");

  const banks = [
    ...new Set(projects.map((project) => project.bankName).filter(Boolean)),
  ];

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = !roleFilter || user.role === roleFilter;

    const matchesStatus = !statusFilter || String(user.status) === statusFilter;

    const matchesBank =
      !bankFilter ||
      (user.role === "USER" &&
        projects.some(
          (project) =>
            project.bankName === bankFilter &&
            user.projectIds?.includes(project.id),
        ));

    return matchesSearch && matchesRole && matchesStatus && matchesBank;
  });

  const handleDeleteUser = async (userId) => {
    const result = await Swal.fire({
      title: "Delete User?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DC2626",
      cancelButtonColor: "#64748B",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    const response = await deleteUser(userId);

    if (response?.statusType === "S") {
      await fetchUsers();
    }
  };

  const handleResetPassword = async (user, newPassword, confirmPassword) => {
    const response = await resetPassword(user.id, newPassword, confirmPassword);

    if (response?.statusType === "S") {
      toast.success(response.statusDesc);
    } else {
      toast.error(response?.statusDesc || "Failed to reset password");
    }
  };

  const USERS_PER_PAGE = 5;

  const totalPages = Math.ceil(users.length / USERS_PER_PAGE);

  const startIndex = (currentPage - 1) * USERS_PER_PAGE;

  const endIndex = startIndex + USERS_PER_PAGE;

  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, roleFilter, bankFilter, statusFilter])

  useEffect(() => {
    if (!userId || action !== "resetPassword") return;

    const user = users.find((u) => String(u.id) === String(userId));

    if (!user) return;

    setSearchTerm(user.username);
    setSelectedUser(user);
    setShowResetPasswordModal(true);

    // Remove query parameters so refresh doesn't reopen the modal
    navigate("/users", { replace: true });

  }, [users, userId, action, navigate]);

  return (
    <div
      className="
      p-4
      sm:p-5
      md:p-6
      lg:p-8
      "
    >
      <div
        className="
        w-full
        mx-auto
        space-y-4
        md:space-y-5
        lg:space-y-6
        "
      >
        {/* <UserManagementHeader /> */}

        <UserStatsCards users={users} />

        <UserFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          bankFilter={bankFilter}
          setBankFilter={setBankFilter}
          banks={banks}
        />

        <div className="overflow-x-auto mt-[-7px]">
          <UserTable
            users={paginatedUsers}
            loading={loading}
            onDelete={handleDeleteUser}
            onResetPassword={(user) => {
              setSelectedUser(user);
              setShowResetPasswordModal(true);
            }}
            currentPage={currentPage}
            totalPages={totalPages}
            totalRecords={filteredUsers.length}
            onPageChange={setCurrentPage}
          />
        </div>

        <ResetPasswordModal
          isOpen={showResetPasswordModal}
          user={selectedUser}
          onClose={() => setShowResetPasswordModal(false)}
          onReset={(user, password, confirmPassword) => {
            console.log(user, password, confirmPassword);
            handleResetPassword(user, password, confirmPassword);
          }}
        />
      </div>
    </div>
  );
};

export default UserManagementPage;
