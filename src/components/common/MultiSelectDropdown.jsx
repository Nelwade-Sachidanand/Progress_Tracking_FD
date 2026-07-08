import { CheckSquare, ChevronDown, Search, Square } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

export default function MultiSelectDropdown({
  label,
  placeholder = "Select",
  options = [],
  selected = [],
  onChange,
  icon: Icon,
  width = "w-full",
}) {
  const dropdownRef = useRef(null);

  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState("");

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = useMemo(() => {
    return options.filter((option) =>
      option.toLowerCase().includes(search.toLowerCase()),
    );
  }, [options, search]);

  const toggleOption = (option) => {
    if (selected.includes(option)) {
      onChange(selected.filter((item) => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  const handleSelectAll = () => {
    if (selected.length === options.length) {
      onChange([]);
    } else {
      onChange([...options]);
    }
  };

  const displayText = useMemo(() => {
    if (selected.length === 0) return placeholder;

    if (selected.length === options.length) return placeholder;

    if (selected.length <= 2) return selected.join(", ");

    return `${selected.slice(0, 2).join(", ")} +${selected.length - 2}`;
  }, [selected, options, placeholder]);

  return (
    <div className={`${width} min-w-0`}>
      {/* Label */}
      {label && (
        <label className="block mb-1 ml-1 text-sm font-semibold text-slate-600 2xl:text-base">
          {label}
        </label>
      )}

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
          rounded-lg
          bg-white
          focus:border-blue-500

          flex
          items-center
          justify-between

          overflow-x-hidden
          overflow-y-auto
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
              text-slate-700
              2xl:text-base
              2xl:text-slate-800
            "
              title={displayText}
            >
              {displayText}
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

            z-60

            overflow-x-hidden
            overflow-y-auto

            animate-in
            fade-in
            zoom-in-95
          "
          >
            {/* Search */}
            <div className="border-b border-slate-100 2xl:border-slate-200 p-3">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
                  className="
                  w-full
                  h-9
                  pl-9
                  pr-3

                  rounded-lg
                  border
                  border-slate-300

                  text-sm

                  outline-none

                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-100
                "
                />
              </div>
            </div>

            {/* Select All */}
            <button
              type="button"
              onClick={handleSelectAll}
              className="
              w-full
              px-4
              py-3

              flex
              items-center
              gap-3

              text-left
              text-sm

              border-b
              border-slate-100
              2xl:border-slate-200

              hover:bg-slate-50

              transition-colors

              cursor-pointer
            "
            >
              {selected.length === options.length ? (
                <CheckSquare className="h-4 w-4 shrink-0 text-blue-600" />
              ) : (
                <Square className="h-4 w-4 shrink-0 text-slate-500" />
              )}

              <span className="font-medium text-slate-700">Select All</span>
            </button>

            {/* Options */}
            <div className="max-h-50 overflow-y-auto">
              {filteredOptions.length === 0 ? (
                <div className="py-6 text-center text-sm text-slate-500">
                  No Results Found
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => toggleOption(option)}
                    title={option}
                    className={`
                    w-full
                    px-4
                    py-3

                    flex
                    items-center
                    gap-3

                    text-left
                    text-sm

                    border-b
                    border-slate-100
                    2xl:border-slate-200
                    last:border-b-0

                    transition-colors

                    cursor-pointer

                    ${
                      selected.includes(option)
                        ? "bg-blue-50"
                        : "hover:bg-slate-50"
                    }
                  `}
                  >
                    {selected.includes(option) ? (
                      <CheckSquare className="h-4 w-4 shrink-0 text-blue-600" />
                    ) : (
                      <Square className="h-4 w-4 shrink-0 text-slate-500" />
                    )}

                    <span className="truncate text-slate-700">{option}</span>
                  </button>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-slate-100 2xl:border-slate-200 p-2">
              <button
                type="button"
                onClick={() => onChange([])}
                className="
                w-full
                rounded-lg
                py-2

                text-sm
                font-medium
                text-red-600

                transition-colors

                hover:bg-red-50

                cursor-pointer
              "
              >
                Clear Selection
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
