import { Building2, CheckCircle, Plus, SlidersHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CustomDropdown from "../../../components/common/CustomDropdown";
import SearchInput from "../../../components/common/SearchInput";

const UserFilters = ({
  searchTerm,
  setSearchTerm,
  roleFilter,
  setRoleFilter,
  statusFilter,
  setStatusFilter,
  bankFilter,
  setBankFilter,
  banks,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="
        bg-white
        rounded-2xl
        border
        border-[#CDD7E3]
        p-5
        mt-[-7px]
      "
    >
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-3
          xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,2fr)_150px]
          gap-4
          mt-[-10px]
          mb-[-7px]
        "
      >
        {/* Role */}

        <CustomDropdown
          label="Role"
          placeholder="All Roles"
          value={roleFilter}
          onChange={setRoleFilter}
          icon={SlidersHorizontal}
          options={[
            { label: "Administrator", value: "ADMIN" },
            { label: "Bank User", value: "USER" },
            { label: "Management User", value: "MANAGEMENT USER" },
            {
              label: "Implementation User",
              value: "IMPLEMENTATION USER",
            },
          ]}
        />

        {/* Status */}

        <CustomDropdown
          label="Status"
          placeholder="All Status"
          value={statusFilter}
          onChange={setStatusFilter}
          icon={CheckCircle}
          options={[
            { label: "Active", value: "true" },
            { label: "Inactive", value: "false" },
          ]}
        />

        {/* User Type */}

        <CustomDropdown
          label="Bank"
          placeholder="All Banks"
          value={bankFilter}
          onChange={setBankFilter}
          icon={Building2}
          options={banks.map((bank) => ({
            label: bank,
            value: bank,
          }))}
        />

        {/* Search */}

        <SearchInput
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Users..."
        />

        {/* Add User */}

        <div className="flex items-end">
          <button
            onClick={() => navigate("/users/add")}
            className="
              w-full
              h-9
              2xl:h-10
              rounded-xl
              bg-gradient-to-r
              from-[#7C3AED]
              to-[#A855F7]
              text-white
              font-semibold
              flex
              items-center
              justify-center
              gap-2
              shadow-lg
              shadow-purple-500/20
              cursor-pointer
            "
          >
            <Plus size={18} />
            Add User
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserFilters;
