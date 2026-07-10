import { CheckCircle, Search, UserRound, Workflow } from "lucide-react";
import CustomDropdown from "../../../components/layout/CustomDropdown";

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
        p-5
        mt-[-7px]
      "
    >
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]
          gap-4
          mt-[-10px]
          mb-[-7px]
        "
      >
        {/* Search */}

        <div>
          <label className="block mb-2 ml-1 text-sm font-semibold text-slate-700">
            Search
          </label>

          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Requests..."
              className="
                w-full
                h-10
                pl-11
                pr-4
                rounded-xl
                border
                border-slate-300
                outline-none
                focus:border-blue-500
                text-sm
              "
            />
          </div>
        </div>

        {/* Request Type */}

        <CustomDropdown
          label="Request Type"
          placeholder="All Request Types"
          value={requestType}
          onChange={setRequestType}
          icon={Workflow}
          options={requestTypes.map((type) => ({
            label: formatAction(type),
            value: type,
          }))}
        />

        {/* Status */}

        <CustomDropdown
          label="Status"
          placeholder="All Status"
          value={status}
          onChange={setStatus}
          icon={CheckCircle}
          options={statuses.map((item) => ({
            label: formatAction(item),
            value: item,
          }))}
        />

        {/* Requested By */}

        <CustomDropdown
          label="Requested By"
          placeholder="All Users"
          value={requestedBy}
          onChange={setRequestedBy}
          icon={UserRound}
          options={users.map((user) => ({
            label: formatAction(user),
            value: user,
          }))}
        />
      </div>
    </div>
  );
}
 