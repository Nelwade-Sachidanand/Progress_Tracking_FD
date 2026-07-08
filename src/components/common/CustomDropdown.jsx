import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function CustomDropdown({
  label,
  placeholder,
  value,
  onChange,
  options = [],
  icon: Icon,
}) {
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  const selectedLabel =
    options.find((option) => option.value === value)?.label || placeholder;

  const formatValue = (value = "") => {
    return value
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full min-w-0">
      {/* Label */}
      <label className="block mb-1 ml-1 text-sm font-semibold text-slate-600 2xl:text-base">
        {label}
      </label>

      <div ref={dropdownRef} className="relative w-full min-w-0">
        {/* Select Button */}
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="
          w-full
          h-9
          px-4
          border
          border-slate-300
          2xl:border-slate-400
          focus:border-blue-500
          rounded-lg
          bg-white

          flex
          items-center
          justify-between

          overflow-hidden
          min-w-0

          cursor-pointer
        "
        >
          <div className="flex items-center gap-3 flex-1 min-w-0 overflow-hidden">
            {Icon && (
              <Icon
                size={18}
                className="shrink-0 text-slate-400 2xl:text-slate-500"
              />
            )}

            <span
              className="
              flex-1
              min-w-0
              overflow-hidden
              truncate
              whitespace-nowrap
              text-left
              text-sm
              2xl:text-base
              text-slate-700
              2xl:text-slate-800
            "
              title={formatValue(selectedLabel)}
            >
              {formatValue(selectedLabel)}
            </span>
          </div>

          <ChevronDown
            size={18}
            className={`
              shrink-0
              text-slate-400
              2xl:text-slate-500
              transition-transform
              duration-200
              ${open ? "rotate-180" : ""}
            `}
          />
        </button>

        {/* Dropdown */}
        {open && (
          <div
            className="
              absolute
              left-0
              top-11

              w-full

              bg-white
              rounded-xl
              border
              border-slate-200
              2xl:border-slate-300

              shadow-xl

              z-100

              max-h-72
              overflow-y-auto

              animate-in
              fade-in
              zoom-in-95
            "
          >
            {/* Placeholder */}
            <button
              type="button"
              onClick={() => {
                onChange("");
                setOpen(false);
              }}
              className="
                w-full
                px-4
                py-3

                text-left
                text-sm

                truncate

                hover:bg-slate-50

                border-b
                border-slate-100
                2xl:border-slate-200

                transition-colors

                cursor-pointer
              "
            >
              {placeholder}
            </button>

            {/* Options */}
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                title={option.label}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={`
                  w-full
                  px-4
                  py-3

                  text-left
                  text-sm

                  truncate

                  border-b
                  border-slate-100
                  2xl:border-slate-200
                  last:border-b-0

                  transition-colors

                  cursor-pointer

                  ${
                    value === option.value
                      ? "bg-blue-50 text-blue-600 font-semibold 2xl:text-blue-700"
                      : "hover:bg-slate-50 text-slate-700 2xl:text-slate-700"
                  }
                `}
              >
                {formatValue(option.label)}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
