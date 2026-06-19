import { Calendar, Search } from "lucide-react";

export default function AuditFilters({
  searchTerm,
  setSearchTerm,
  entityType,
  setEntityType,
  actionType,
  setActionType,
  selectedDate,
  setSelectedDate,
}) {
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
            2xl:h-5
            2xl:w-5
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
          2xl:text-[17px]
          2xl:font-medium
          2xl:tracking-wide
          "
        >
          <option value="">All Entity Types</option>

          <option value="USER">USER</option>

          <option value="PROJECT">PROJECT</option>

          <option value="TASK">TASK</option>

          <option value="ACTIVITY">ACTIVITY</option>
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
          2xl:text-[17px]
          2xl:font-medium
          2xl:tracking-wide
          "
        >
          <option value="">All Actions</option>

          <option value="CREATE_USER">CREATE_USER</option>

          <option value="UPDATE_USER">UPDATE_USER</option>

          <option value="DELETE_USER">DELETE_USER</option>

          <option value="CREATE_PROJECT">CREATE_PROJECT</option>

          <option value="UPDATE_PROJECT">UPDATE_PROJECT</option>

          <option value="DELETE_PROJECT">DELETE_PROJECT</option>

          <option value="Export_Excel">Export_Excel</option>
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
            2xl:h-5
            2xl:w-5
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
