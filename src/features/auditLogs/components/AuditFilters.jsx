import { Database, Workflow } from "lucide-react";
import CustomDropdown from "../../../components/common/CustomDropdown";
import DateInput from "../../../components/common/DateInput";
import SearchInput from "../../../components/common/SearchInput";

export default function AuditFilters({
  logs = [],
  searchTerm,
  setSearchTerm,
  entityType,
  setEntityType,
  actionType,
  setActionType,
  selectedDate,
  setSelectedDate,
  clearFilters,
}) {
  const entityTypes = [
    ...new Set(logs.map((log) => log.entityType).filter(Boolean)),
  ];

  const actionTypes = [
    ...new Set(logs.map((log) => log.actionType).filter(Boolean)),
  ];

  const formatAction = (value = "") => {
    return value
      .toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

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
          md:grid-cols-2
          xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,2fr)]
          gap-4
          mt-[-10px]
          mb-[-7px]
        "
      >

        {/* Date */}

        <DateInput
          label="Date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        {/* Entity Type */}

        <CustomDropdown
          label="Entity Type"
          placeholder="All Entity Types"
          value={entityType}
          onChange={setEntityType}
          icon={Database}
          options={entityTypes.map((type) => ({
            label: formatAction(type),
            value: type,
          }))}
        />

        {/* Action Type */}

        <CustomDropdown
          label="Action Type"
          placeholder="All Actions"
          value={actionType}
          onChange={setActionType}
          icon={Workflow}
          options={actionTypes.map((action) => ({
            label: formatAction(action),
            value: action,
          }))}
        />

        <div className="flex items-end gap-3">
          <div className="flex-1">
            <SearchInput
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Entity Name or User..."
            />
          </div>

          <button
            type="button"
            onClick={clearFilters}
            className="
            h-9
            px-4
            rounded-lg
            border
            border-red-200
            bg-red-50
            text-sm
            text-red-600
            font-semibold
            transition
            hover:bg-red-100
            cursor-pointer
            whitespace-nowrap
          "
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
}
