import { KeyRound, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../../../components/layout/Pagination";

const getInitials = (name = "") => {
  if (!name) return "--";

  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
};

const formatValue = (value = "") => {
  return value
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// const getRoleStyle = (role) => {
//   switch (role) {
//     case "ADMIN":
//       return "bg-purple-100 text-purple-600";

//     case "USER":
//       return "bg-blue-100 text-blue-600";

//     case "IMPLEMENTATION USER":
//       return "bg-pink-100 text-pink-700";

//     case "MANAGEMENT USER":
//     case "MANAGER":
//       return "bg-orange-100 text-orange-600";

//     default:
//       return "bg-slate-100 text-slate-600";
//   }
// };
const getRoleStyle = (role) => {
  switch (role) {
    case "ADMIN":
      return "text-purple-600";

    case "USER":
      return "text-blue-600";

    case "IMPLEMENTATION USER":
      return "text-pink-600";

    case "MANAGEMENT USER":
    case "MANAGER":
      return "text-orange-600";

    default:
      return "text-slate-600";
  }
};
const UserTable = ({ users = [], loading, onDelete, onResetPassword, currentPage, totalPages, totalRecords, onPageChange }) => {
  const navigate = useNavigate();

  if (loading) {
    return <div className="bg-white rounded-3xl p-8">Loading users...</div>;
  }

  return (
    <div
      className="
    bg-white
    rounded-2xl
    border
    border-[#CDD7E3]
    shadow-sm
    overflow-hidden
  "
    >
      {/* Responsive Table Wrapper */}

      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="border-b border-[#CDD7E3] bg-blue-100">
              <th className="px-6 py-4 text-left text-base font-semibold text-slate-600 whitespace-nowrap">
                Full Name
              </th>

              <th className="px-6 py-4 text-left text-base font-semibold text-slate-600 whitespace-nowrap">
                Username
              </th>

              <th className="px-6 py-4 text-left text-base font-semibold text-slate-600 whitespace-nowrap">
                Role
              </th>

              <th className="px-7 py-4 text-left text-base font-semibold text-slate-600 whitespace-nowrap">
                Projects
              </th>

              <th className="px-6 py-4 text-left text-base font-semibold text-slate-600 whitespace-nowrap">
                Status
              </th>

              <th className="px-6 py-4 text-center text-base font-semibold text-slate-600 whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="
                  border-b
                  border-[#CDD7E3]
                "
                >
                  {/* Full Name */}
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div
                        className="
                          h-9
                          w-9
                          rounded-full
                          bg-purple-100
                          text-purple-600
                          flex
                          items-center
                          justify-center
                          font-bold
                          shrink-0
                          2xl:h-10
                          2xl:w-10
                        "
                      >
                        {getInitials(user.fullname)}
                      </div>

                      <span
                        className="
                          flex-1
                          min-w-0
                          truncate
                          font-semibold
                          text-slate-900
                          text-sm
                          xl:text-base
                          2xl:text-base
                        "
                        title={user.fullname}
                      >
                        {user.fullname}
                      </span>
                    </div>
                  </td>

                  {/* Username */}
                  <td className="px-6 py-2">
                    <span
                      className="
                        block
                        truncate
                        text-slate-700
                        text-sm
                        xl:text-base
                        2xl:text-base
                      "
                      title={user.username}
                    >
                      {user.username}
                    </span>
                  </td>

                  {/* Role */}
                  <td className="px-6 py-2">
                    <span
                      className={`
                        inline-flex
                        items-center
                        px-2
                        py-1.5
                        rounded-full
                        text-sm
                        font-semibold
                        whitespace-nowrap
                        ${getRoleStyle(user.role)}
                      `}
                    >
                      {formatValue(user.role.replaceAll("_", " "))}
                    </span>
                  </td>

                  {/* Projects */}
                  <td className="px-6 py-2">
                    <div
                      className="flex flex-wrap items-center gap-2"
                      title={user.projectNames?.join(", ")}
                    >
                      {user.projectNames?.slice(0, 2).map((project) => (
                        <span
                          key={project}
                          className="
                            px-3
                            py-1
                            rounded-full
                            bg-blue-100
                            text-blue-700
                            text-xs
                            xl:text-sm
                            font-medium
                            whitespace-nowrap
                          "
                        >
                          {project}
                        </span>
                      ))}

                      {user.projectNames?.length > 2 && (
                        <span
                          className="
                            px-3
                            py-1
                            rounded-full
                            bg-blue-50
                            text-blue-600
                            text-xs
                            xl:text-sm
                            font-semibold
                            whitespace-nowrap
                          "
                        >
                          +{user.projectNames.length - 2}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-2">
                    <span
                      className={`
                        inline-flex
                        items-center
                        gap-1
                        px-3
                        py-1.5
                        rounded-full
                        text-sm
                        font-semibold
                        whitespace-nowrap
                        ${user.status
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                        }
                        `}
                    >
                      <span className="text-xs">●</span>
                      {user.status ? "Active" : "Inactive"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-2">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() =>
                          navigate("/users/edit", { state: { user } })
                        }
                        title="Edit User"
                        className="
                          h-9
                          w-9
                          rounded-lg
                          bg-blue-50
                          text-blue-600
                          flex
                          items-center
                          justify-center
                          hover:bg-blue-100
                          transition-colors
                          cursor-pointer
                        "
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() => onResetPassword?.(user)}
                        title="Reset Password"
                        className="
                          h-9
                          w-9
                          rounded-lg
                          bg-amber-50
                          text-amber-600
                          flex
                          items-center
                          justify-center
                          hover:bg-amber-100
                          transition-colors
                          cursor-pointer
                        "
                      >
                        <KeyRound size={16} />
                      </button>

                      <button
                        onClick={() => onDelete(user.id)}
                        title="Delete User"
                        className="
                          h-9
                          w-9
                          rounded-lg
                          bg-red-50
                          text-red-600
                          flex
                          items-center
                          justify-center
                          hover:bg-red-100
                          transition-colors
                          cursor-pointer
                        "
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="
                  py-14
                  text-center
                  text-sm
                  text-slate-500
                "
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalRecords={totalRecords}
        recordsPerPage={10}
        label="Users"
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default UserTable;
