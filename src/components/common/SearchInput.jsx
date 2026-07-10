import { Search } from "lucide-react";

export default function SearchInput({
  label = "Search",
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}) {
  return (
    <div className={className}>
      {/* Label */}
      <label className="mb-1 ml-1 block text-sm font-medium text-slate-700 2xl:text-base">
        {label}
      </label>

      <div className="relative">
        {/* Search Icon */}
        <Search
          size={18}
          className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          pointer-events-none
          text-slate-500
        "
        />

        {/* Search Input */}
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete="off"
          className="
          w-full
          h-9
          2xl:h-10
          pl-11
          pr-4

          rounded-lg
          border
          border-[#B8C4D1]
          bg-white

          text-sm
          text-slate-700
          placeholder:text-slate-700
          2xl:text-base

          outline-none

          transition-all
          duration-200

          focus:border-blue-500
        "
        />
      </div>
    </div>
  );
}
