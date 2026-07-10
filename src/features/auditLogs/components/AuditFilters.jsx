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

        {/* Date */}

        <DateInput
          label="Date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        <SearchInput
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Entity Name or User..."
        />
      </div>
    </div>
  );
}
