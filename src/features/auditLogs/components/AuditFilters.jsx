import { Calendar, Search } from "lucide-react";

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
      .join("_");
  };

  return (
    <div
      className="
      bg-white
      rounded-3xl
      border
      border-slate-200
      p-5
      mt-5
    "
    >
      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-5
        gap-4
      "
      >
        {/* Search */}

        <div className="xl:col-span-2 relative">
          <Search
            size={18}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search entity name, user..."
            className="
              w-full
              h-12
              pl-11
              pr-4
              rounded-xl
              border
              border-slate-300
              outline-none
              focus:border-blue-500
              text-sm
              2xl:text-[17px]
              2xl:font-medium
              2xl:tracking-wide
            "
          />
        </div>

        {/* Entity Type */}

        <select
          value={entityType}
          onChange={(e) => setEntityType(e.target.value)}
          className="
            h-12
            px-4
            rounded-xl
            border
            border-slate-300
            outline-none
            focus:border-blue-500
            cursor-pointer
            text-sm
            2xl:text-[17px]
            2xl:font-medium
            2xl:tracking-wide
          "
        >
          <option value="">All Entity Types</option>

          {entityTypes.map((type) => (
            <option key={type} value={type}>
              {formatAction(type)}
            </option>
          ))}
        </select>

        {/* Action Type */}

        <select
          value={actionType}
          onChange={(e) => setActionType(e.target.value)}
          className="
            h-12
            px-4
            rounded-xl
            border
            border-slate-300
            outline-none
            focus:border-blue-500
            cursor-pointer
            text-sm
            2xl:text-[17px]
            2xl:font-medium
            2xl:tracking-wide
          "
        >
          <option value="">All Actions</option>

          {actionTypes.map((action) => (
            <option key={action} value={action}>
              {formatAction(action)}
            </option>
          ))}
        </select>

        {/* Date */}

        <div className="relative">
          <Calendar
            size={18}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="
              w-full
              h-12
              pl-11
              pr-4
              rounded-xl
              border
              border-slate-300
              outline-none
              focus:border-blue-500
              text-sm
              2xl:text-[17px]
              2xl:font-medium
              2xl:tracking-wide
            "
          />
        </div>
      </div>
    </div>
  );
}
