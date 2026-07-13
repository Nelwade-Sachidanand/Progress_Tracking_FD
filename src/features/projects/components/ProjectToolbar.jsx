import { Plus,CheckCircle,Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import CustomDropdown from "../../../components/common/CustomDropdown";
import SearchInput from "../../../components/common/SearchInput";

export default function ProjectToolbar({
  search,
  setSearch,

  selectedBank,
  setSelectedBank,

  selectedStatus,
  setSelectedStatus,

  banks = [],

  onRefresh,
  onExport,
}) {
  const navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("user"));

  return (
    <div
      className="
      bg-white
      rounded-xl
      border
      border-[#CDD7E3]
      p-5
      mt-[-10px]
    "
    >
      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-3
        xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.6fr)_auto]
        gap-4
        items-end
        mt-[-10px]
        mb-[-7px]
      "
      >
        {/* Bank */}

        <CustomDropdown
          label="Bank"
          placeholder="All Banks"
          value={selectedBank}
          onChange={setSelectedBank}
          icon={Building2}
          options={[
            {
              label: "All Banks",
              value: "",
            },
            ...banks.map((bank) => ({
              label: bank,
              value: bank,
            })),
          ]}
        />

        {/* Status */}

        <CustomDropdown 
          label="Status"
          placeholder="All Status"
          value={selectedStatus}
          onChange={setSelectedStatus}
          icon={CheckCircle}
          options={[
            {
              label: "All Status",
              value: "",
            },
            {
              label: "On Track",
              value: "On Track",
            },
            {
              label: "In Progress",
              value: "In Progress",
            },
            {
              label: "Delayed",
              value: "Delayed",
            },
            {
              label: "Completed",
              value: "Completed",
            },
          ]}
        />

        {/* Search */}

        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Project, Bank or Manager..."
        />

        {/* Create Project Button */}

        {user?.role === "ADMIN" && (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => navigate("create")}
              className="
              flex
              items-center
              justify-center
              gap-2
              h-9
              px-5
              rounded-xl
              bg-[#2563EB]
              text-white
              font-medium
              transition-all
              duration-200
              hover:bg-[#1D4ED8]
              shadow-sm
              hover:shadow-md
              whitespace-nowrap
              cursor-pointer

              2xl:h-12
              2xl:px-6
              2xl:text-lg
              2xl:font-semibold
            "
            >
              <Plus size={18} />
              Create Project
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
