import { Search } from "lucide-react";

export default function AuthorizationFilters({
  logs = [],
  search,
  setSearch,
  requestType,
  setRequestType,
  status,
  setStatus,
  requestedBy,
  setRequestedBy,
}) {
  const requestTypes = [
    ...new Set(logs.map((log) => log.requestSource).filter(Boolean)),
  ];

  const statuses = [...new Set(logs.map((log) => log.status).filter(Boolean))];

  const users = [
    ...new Set(logs.map((log) => log.requestedBy).filter(Boolean)),
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
      p-4
      md:p-5
      shadow-sm
      "
    >
      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-1
        md:grid-cols-2
        xl:grid-cols-4
        gap-3
        xl:gap-4
        "
      >
        {/* Search */}

        <div className="relative w-full min-w-0">
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search requests..."
            className="
            w-full
            h-11
            xl:h-12
            rounded-xl
            border
            border-slate-300
            pl-11
            pr-4
            text-sm
            outline-none
            focus:border-blue-500
            2xl:text-[17px]
            2xl:font-medium
            2xl:tracking-wide
            "
          />
        </div>

        {/* Request Type */}

        <select
          value={requestType}
          onChange={(e) => setRequestType(e.target.value)}
          className="
          sm:max-w-[425px]
          min-w-0
          h-11
          xl:h-12
          px-3
          xl:px-4
          rounded-xl
          border
          border-slate-300
          text-sm
          outline-none 
          focus:border-blue-500
          cursor-pointer
          sm:text-sm
          2xl:text-[17px]
          2xl:font-medium
          2xl:tracking-wide
          "
        >
          <option value="">All Request Types</option>

          {requestTypes.map((type) => (
            <option key={type} value={type}>
              {formatAction(type)}
            </option>
          ))}
        </select>

        {/* Status */}

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="
          w-full
          min-w-0
          h-11
          xl:h-12
          px-3
          xl:px-4
          rounded-xl
          border
          border-slate-300
          text-sm
          outline-none
          focus:border-blue-500
          cursor-pointer
          2xl:text-[17px]
                  2xl:font-medium
                  2xl:tracking-wide
          "
        >
          <option value="">All Status</option>

          {statuses.map((item) => (
            <option key={item} value={item}>
              {formatAction(item)}
            </option>
          ))}
        </select>

        {/* Requested By */}

        <select
          value={requestedBy}
          onChange={(e) => setRequestedBy(e.target.value)}
          className="
          w-full
          min-w-0
          h-11
          xl:h-12
          px-3
          xl:px-4
          rounded-xl
          border
          border-slate-300
          text-sm
          outline-none
          focus:border-blue-500
          cursor-pointer
          2xl:text-[17px]
                  2xl:font-medium
                  2xl:tracking-wide
          "
        >
          <option value="">All Users</option>

          {users.map((user) => (
            <option key={user} value={user}>
              {user}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
