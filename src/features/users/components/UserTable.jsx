import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const USERS_PER_PAGE = 5;

const getInitials = (name = "") => {
  if (!name) return "--";

  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
};

const getRoleStyle = (role) => {
  switch (role) {
    case "ADMIN":
      return "bg-purple-100 text-purple-600";

    case "SUPER_ADMIN":
      return "bg-purple-100 text-purple-600";

    case "IMPLEMENTATION_USER":
      return "bg-green-100 text-green-700";

    case "MANAGEMENT":
    case "MANAGER":
      return "bg-orange-100 text-orange-600";

    default:
      return "bg-slate-100 text-slate-600";
  }
};

const UserTable = ({ users = [], loading, onDelete, }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  if (loading) {
    return <div className="bg-white rounded-3xl p-8">Loading users...</div>;
  }

  const totalPages = Math.ceil(users.length / USERS_PER_PAGE);

  const startIndex = (currentPage - 1) * USERS_PER_PAGE;

  const endIndex = startIndex + USERS_PER_PAGE;

  const paginatedUsers = users.slice(startIndex, endIndex);

  return (
    <div
      className="
    bg-white
    rounded-[24px]
    border
    border-[#E8EDF5]
    shadow-sm
    overflow-hidden
    "
    >
      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto">
        <table className="min-w-[1000px] w-full">
          <thead>
            <tr className="border-b border-[#EDF2F7] bg-white">
              <th className="px-4 md:px-6 py-4 text-left text-xs md:text-sm font-semibold text-[#64748B] whitespace-nowrap 2xl:text-lg 2xl:whitespace-normal">
                Full Name
              </th>

              <th className="px-4 md:px-6 py-4 text-left text-xs md:text-sm font-semibold text-[#64748B] whitespace-nowrap 2xl:text-lg 2xl:whitespace-normal">
                Username
              </th>

              <th className="px-4 md:px-6 py-4 text-left text-xs md:text-sm font-semibold text-[#64748B] whitespace-nowrap 2xl:text-lg 2xl:whitespace-normal">
                Role
              </th>

              <th className="px-4 md:px-6 py-4 text-left text-xs md:text-sm font-semibold text-[#64748B] whitespace-nowrap 2xl:text-lg 2xl:whitespace-normal">
                Projects
              </th>

              <th className="px-4 md:px-6 py-4 text-left text-xs md:text-sm font-semibold text-[#64748B] whitespace-nowrap 2xl:text-lg 2xl:whitespace-normal">
                Status
              </th>

              <th className="px-4 md:px-6 py-4 text-center text-xs md:text-sm font-semibold text-[#64748B] whitespace-nowrap 2xl:text-lg 2xl:whitespace-normal">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {paginatedUsers.map((user) => (
              <tr key={user.id} className="border-b border-[#EDF2F7]">
                {/* Name */}
                <td className="px-4 md:px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="
                    w-8 h-8
                    md:w-10 md:h-10
                    rounded-full
                    bg-purple-100
                    text-purple-600
                    flex
                    items-center
                    justify-center
                    font-bold
                    text-xs md:text-sm
                    2xl:text-lg
                      whitespace-nowrap
                      2xl:whitespace-normal
                      2xl:w-12 2xl:h-12
                      2xl:font-semibold
                      2xl:tracking-wide
                    "
                    >
                      {getInitials(user.fullname)}
                    </div>

                    <span
                      className="
                    font-semibold
                    text-[#0F172A]
                    text-sm
                    2xl:text-xl
                      whitespace-nowrap
                      2xl:whitespace-normal
                    md:text-base
                    whitespace-nowrap
                    "
                    >
                      {user.fullname}
                    </span>
                  </div>
                </td>

                {/* Username */}
                <td className="px-4 md:px-6 py-4 text-[#0F172A] whitespace-nowrap 2xl:whitespace-normal 2xl:text-xl">
                  {user.username}
                </td>

                {/* Role */}
                <td className="px-4 md:px-6 py-4">
                  <span
                    className={`
                    px-2 md:px-4
                    py-1 md:py-2
                    rounded-full
                    text-[11px] md:text-[13px]
                    font-medium
                    2xl:text-lg
                      whitespace-nowrap
                      2xl:whitespace-normal
                    ${getRoleStyle(user.role)}
                  `}
                  >
                    {user.role.replaceAll("_", " ")}
                  </span>
                </td>

                {/* Projects */}
                <td className="px-4 md:px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    {user.projectNames?.slice(0, 2).map((project) => (
                      <span
                        key={project}
                        className="
                      px-3
                      py-1
                      rounded-full
                      bg-[#F1F5F9]
                      text-[#475569]
                      text-sm
                      font-medium
                      2xl:text-lg
                      whitespace-nowrap
                      2xl:whitespace-normal
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
                      bg-[#F1F5F9]
                      text-[#475569]
                      text-xs
                      2xl:text-lg
                      whitespace-nowrap
                      2xl:whitespace-normal
                      "
                      >
                        +{user.projectNames.length - 2}
                      </span>
                    )}
                  </div>
                </td>

                {/* Status */}
                <td className="px-4 md:px-6 py-4">
                  <span
                    className={`
                    px-2 md:px-4
                    py-1 md:py-2
                    rounded-full
                    text-[11px] md:text-[13px]
                    font-medium
                    2xl:text-lg
                      whitespace-nowrap
                      2xl:whitespace-normal
                    ${user.status
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                      }
                  `}
                  >
                    ● {user.status === true ? "Active" : "Inactive"}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-4 md:px-6 py-4">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() =>
                        navigate("/users/edit", {state: { user },})
                      }
                      className="
                    w-8 h-8
                    md:w-10 md:h-10
                    rounded-xl
                    bg-[#EEF4FF]
                    flex
                    items-center
                    justify-center
                    cursor-pointer
                    2xl:w-12 2xl:h-12
                    2xl:text-lg
                    2xl:font-medium
                    "
                    >
                      <Pencil size={14} className="text-[#2563EB]" />
                    </button>

                    <button
                      onClick={() => onDelete(user.id)}
                      className="
                    w-8 h-8
                    md:w-10 md:h-10
                    rounded-xl
                    bg-[#FFF1F2]
                    flex
                    items-center
                    justify-center
                    2xl:w-12 2xl:h-12
                    2xl:text-lg
                    2xl:font-medium
                    cursor-pointer
                    "
                    >
                      <Trash2 size={14} className="text-[#EF4444]" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div
        className="
      flex
      flex-col
      md:flex-row
      md:items-center
      md:justify-between
      gap-4
      px-4
      md:px-6
      py-4
      "
      >
        <span className="text-sm text-[#64748B] 2xl:text-[17px] 2xl:font-medium 2xl:tracking-wide">
          Showing {users.length === 0 ? 0 : startIndex + 1} to{" "}
          {Math.min(endIndex, users.length)} of {users.length} users
        </span>

        <div className="flex flex-wrap items-center gap-2">
          {/* Your existing pagination buttons remain unchanged */}
        </div>
      </div>
    </div>
  );
};

export default UserTable;
