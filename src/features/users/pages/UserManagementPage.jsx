import { useState } from "react";

import UserFilters from "../components/UserFilters";
import UserManagementHeader from "../components/UserManagementHeader";
import UserStatsCards from "../components/UserStatsCards";
import UserTable from "../components/UserTable";
import Swal from "sweetalert2";

import { useUsers } from "../hooks/useUsers";

const UserManagementPage = () => {
  const { users, loading, deleteUser, fetchUsers, } = useUsers();
  const [searchTerm, setSearchTerm] = useState("");

  const [roleFilter, setRoleFilter] = useState("");

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = !roleFilter || user.role === roleFilter;

    return matchesSearch && matchesRole;
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
        <UserManagementHeader />

        <UserStatsCards users={users} />

        <UserFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
        />

        <div className="overflow-x-auto">
          <UserTable users={filteredUsers} loading={loading} onDelete={handleDeleteUser}
          />
        </div>
      </div>
    </div>
  );
};

export default UserManagementPage;
