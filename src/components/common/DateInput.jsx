import { Calendar } from "lucide-react";

export default function DateInput({
  label = "Date",
  value,
  onChange,
  className = "",
  min,
  max,
}) {
  return (
    <div className={className}>
      <label className="block mb-1 ml-1 text-sm font-semibold text-slate-600 2xl:text-base">
        {label}
      </label>

      <div className="relative">
        <Calendar
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 2xl:text-slate-500 pointer-events-none"
        />

        <input
          type="date"
          value={value}
          onChange={onChange}
          min={min}
          max={max}
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
            text-sm
            2xl:text-base
            text-slate-600 
            2xl:text-slate-700
            cursor-pointer
          "
        />
      </div>
    </div>
  );
}
