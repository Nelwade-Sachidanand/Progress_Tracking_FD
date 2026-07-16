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
  dropdownWidth,
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
    return options.filter((option) => {
      const text =
        typeof option === "string"
          ? option
          : option?.name || option?.label || "";

      return text.toLowerCase().includes(search.toLowerCase());
    });
  }, [options, search]);

  const toggleOption = (value) => {
    if (selected.includes(value)) {
      onChange(selected.filter((item) => item !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  const handleSelectAll = () => {
    if (selected.length === options.length) {
      onChange([]);
    } else {
      onChange(options.map((option) => option.value));
    }
  };

  const displayText = useMemo(() => {
    if (selected.length === 0) return placeholder;

    if (selected.length === options.length) return placeholder;

    const selectedLabels = options
      .filter((option) => selected.includes(option.value))
      .map((option) => option.label);

    if (selectedLabels.length <= 2) {
      return selectedLabels.join(", ");
    }

    return `${selectedLabels.slice(0, 2).join(", ")} +${selectedLabels.length - 2}`;

  }, [selected, options, placeholder]);

  return (
    <div className={`${width} min-w-0`}>
      {/* Label */}
      {label && (
        <label className="block mb-1 ml-1 text-sm font-medium text-slate-800 2xl:text-base">
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
          2xl:h-10
          px-4
          border
          border-[#B8C4D1]
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
          disabled:bg-slate-100
          disabled:text-slate-500
          disabled:border-slate-300
          disabled:cursor-not-allowed
          disabled:opacity-100
        "
        >
          <div className="flex items-center gap-3 flex-1 min-w-0 overflow-hidden">
            {Icon && (
              <Icon
                size={18}
                className="shrink-0 text-slate-500 2xl:text-slate-500 2xl:h-5 2xl:w-5"
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
              text-slate-800
              2xl:text-lg
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
            text-slate-600
            2xl:text-slate-600
            transition-transform
            duration-200
            ${open ? "rotate-180" : ""}
          `}
          />
        </button>

        {/* Dropdown */}
        {open && (
          <div
            className={`
            absolute
            right-0
            top-11

            ${dropdownWidth || width || "w-full"}

            bg-white
            rounded-xl
            border
            border-[#CDD7E3]
            shadow-xl
            z-60
            overflow-x-hidden
            overflow-y-auto

            animate-in
            fade-in
            zoom-in-95
          `}
          >
            {/* Search */}
            <div className="border-b border-[#E1E7EF] p-3">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
                  className="
                  w-full
                  h-9
                  2xl:h-10
                  pl-9
                  pr-3

                  rounded-lg
                  border
                  border-[#B8C4D1]

                  text-sm
                  2xl:text-base

                  outline-none

                  focus:border-blue-500
                  
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
              2xl:text-base

              border-b
              border-[#E1E7EF]

              hover:bg-slate-50

              transition-colors

              cursor-pointer
            "
            >
              {selected.length === options.length ? (
                <CheckSquare className="h-4 w-4 2xl:h-5 2xl:w-5 shrink-0 text-blue-600" />
              ) : (
                <Square className="h-4 w-4 2xl:h-5 2xl:w-5 shrink-0 text-slate-600" />
              )}

              <span className="font-medium text-slate-700">Select All</span>
            </button>

            {/* Options */}
            <div className="max-h-50 overflow-y-auto">
              {filteredOptions.length === 0 ? (
                <div className="py-6 text-center text-sm 2xl:text-base text-slate-800">
                  No Results Found
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => toggleOption(option.value)}
                    title={option.label}
                    className={`
                    w-full
                    px-4
                    py-3

                    flex
                    items-center
                    gap-3

                    text-left
                    text-sm
                    2xl:text-base

                    border-b
                    border-[#E1E7EF]
                    last:border-b-0

                    transition-colors

                    cursor-pointer

                    ${selected.includes(option.value)
                        ? "bg-blue-50"
                        : "hover:bg-slate-50"
                      }
                  `}
                  >
                    {selected.includes(option.value) ? (
                      <CheckSquare className="h-4 w-4 2xl:h-5 2xl:w-5 shrink-0 text-blue-600" />
                    ) : (
                      <Square className="h-4 w-4 2xl:h-5 2xl:w-5 shrink-0 text-slate-500" />
                    )}

                    <span className="truncate text-slate-800">{option.label}</span>
                  </button>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-[#E1E7EF] p-2">
              <button
                type="button"
                onClick={() => {onChange([]); setSearch("")}}
                className="
                w-full
                rounded-lg
                py-2

                text-sm
                2xl:text-base
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
