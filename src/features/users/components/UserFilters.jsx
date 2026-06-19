import { ChevronDown, Search, SlidersHorizontal } from "lucide-react";

const UserFilters = ({
  searchTerm,
  setSearchTerm,
  roleFilter,
  setRoleFilter,
}) => {
  return (
    <div className="grid grid-cols-[1fr_260px] gap-4">
      <div
        className="
        bg-white
        h-[52px]
        rounded-xl
        border
        border-[#E8EDF5]
        flex
        items-center
        px-4
        shadow-sm
        "
      >
        <Search
          size={18}
          className="text-[#94A3B8] 2xl:text-[17px] 2xl:h-6 2xl:w-6"
        />

        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name or username..."
          className="
          flex-1
          ml-3
          outline-none
          bg-transparent
          text-[14px]
          2xl:text-[17px]
          2xl:font-medium
          2xl:tracking-wide
          "
        />
      </div>

      <div className="relative">
        <SlidersHorizontal
          size={16}
          className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-[#64748B]
          2xl:h-5
          2xl:w-5
          "
        />

        <ChevronDown
          size={16}
          className="
          absolute
          right-4
          top-1/2
          -translate-y-1/2
          pointer-events-none
          text-[#64748B]
          2xl:h-5
          2xl:w-5
          "
        />

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="
          w-full
          h-[52px]
          pl-11
          pr-10
          bg-white
          border
          border-[#E8EDF5]
          rounded-xl
          shadow-sm
          appearance-none
          cursor-pointer
          2xl:text-[17px]
          2xl:font-medium
          2xl:tracking-wide
          "
        >
          <option value="">All Roles</option>

          <option value="ADMIN">Admin</option>

          <option value="SUPER_ADMIN">Super Admin</option>

          <option value="MANAGEMENT">Manager</option>

          <option value="IMPLEMENTATION USER">Implementation User</option>
        </select>
      </div>
    </div>
  );
};

export default UserFilters;
