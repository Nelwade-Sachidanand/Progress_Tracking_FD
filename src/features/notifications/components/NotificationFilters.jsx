import { CheckCheck, Search } from "lucide-react";
import SearchInput from "../../../components/common/SearchInput";

export default function NotificationFilters({ search, setSearch, onMarkAll }) {
  return (
    <div
      className="
        flex
        flex-col
        lg:flex-row
        lg:items-center
        lg:justify-between
        gap-4
        mb-6 
      "
    >
      {/* Search */}
      <div className="w-full lg:w-[420px]">
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search notifications..."
        />
      </div>

      {/* Mark All Read */}
      <button
        onClick={onMarkAll}
        className="
          h-10
          px-6
          rounded-xl
          bg-[#6D4AFF]
          hover:bg-[#5B3DF4]
          text-white
          font-medium
          flex
          items-center
          justify-center
          gap-2
          shadow-sm
          transition
          cursor-pointer
        "
      >
        <CheckCheck size={18} />
        Mark All as Read
      </button>
    </div>
  );
}
