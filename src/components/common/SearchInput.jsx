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
      <label className="block mb-1 ml-1 text-sm font-semibold text-slate-600 2xl:text-base">
        {label}
      </label>

      <div className="relative">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 2xl:text-slate-500"
        />

        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete="off"
          className="
            w-full
            h-9
            pl-11
            pr-4
            rounded-lg
            border
            border-slate-300
            2xl:border-slate-400
            outline-none
            focus:border-blue-500
            text-slate-600
            2xl:text-slate-700
            placeholder:text-slate-600
            2xl:placeholder:text-slate-700
            text-sm
            2xl:text-base
          "
        />
      </div>
    </div>
  );
}
