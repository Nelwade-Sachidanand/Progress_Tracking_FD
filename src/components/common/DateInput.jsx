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
      {/* Label */}
      <label className="mb-1 ml-1 block text-sm font-medium text-slate-800 2xl:text-base">
        {label}
      </label>

      <div className="relative">
        {/* Calendar Icon */}
        <Calendar
          size={18}
          className="
          pointer-events-none
          absolute
          left-2
          top-1/2
          -translate-y-1/2
          text-slate-500
        "
        />

        {/* Date Input */}
        <input
          type="date"
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          className="
          w-full
          h-9
          2xl:h-10
          pl-8
          pr-2

          rounded-lg
          border
          border-[#B8C4D1]
          bg-white

          text-sm
          text-slate-800
          2xl:text-base

          outline-none

          transition-all
          duration-200

          focus:border-blue-500
          cursor-pointer
        "
        />
      </div>
    </div>
  );
}
