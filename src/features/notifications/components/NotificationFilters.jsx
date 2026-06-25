import { CheckCheck, Search } from "lucide-react";

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
      <div className="relative w-full lg:w-[420px]">
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
          type="text"
          placeholder="Search notifications..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full
            h-12
            rounded-2xl
            bg-white
            pl-11
            pr-4
            text-sm
            shadow-sm
            outline-none
            transition
            placeholder:text-slate-400
            focus:ring-2
            focus:ring-[#6D4AFF]/20
            focus:border-[#6D4AFF]
          "
        />
      </div>

      {/* Mark All Read */}
      <button
        onClick={onMarkAll}
        className="
          h-12
          px-6
          rounded-2xl
          bg-[#6D4AFF]
          text-white
          font-medium
          flex
          items-center
          justify-center
          gap-2
          shadow-sm
          hover:bg-[#5C3BE8]
          active:scale-[0.98]
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
