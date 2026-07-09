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
      <label className="mb-1 ml-1 block text-sm font-medium text-slate-700 2xl:text-base">
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
          rounded-lg
          border
          border-[#B8C4D1]
          bg-white
          outline-none
          transition-all
          duration-200
          focus:border-blue-500
          
          flex
          items-center
          justify-between

          overflow-hidden
          min-w-0

          cursor-pointer
        "
        >
          <div className="flex flex-1 min-w-0 items-center gap-3 overflow-hidden">
            {Icon && (
              <Icon
                size={18}
                className="shrink-0 text-slate-500"
              />
            )}

            <span
              className="
              flex-1
              min-w-0
              truncate
              whitespace-nowrap
              text-left
              text-sm
              text-slate-700
              2xl:text-base
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
            text-slate-500
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
            z-[100]

            w-full

            overflow-hidden
            rounded-xl
            border
            border-[#CDD7E3]
            bg-white

            shadow-xl

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

              truncate
              text-left
              text-sm
              text-slate-600

              border-b
              border-[#E1E7EF]

              transition-colors
              hover:bg-slate-50

              cursor-pointer
            "
            >
              {placeholder}
            </button>

            {/* Options */}

            <div className="max-h-72 overflow-y-auto">
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

                  truncate
                  text-left
                  text-sm

                  border-b
                  border-[#E1E7EF]
                  last:border-b-0

                  transition-colors

                  cursor-pointer

                  ${value === option.value
                      ? "bg-blue-50 font-semibold text-blue-600"
                      : "text-slate-700 hover:bg-slate-50"
                    }
                `}
                >
                  {formatValue(option.label)}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
