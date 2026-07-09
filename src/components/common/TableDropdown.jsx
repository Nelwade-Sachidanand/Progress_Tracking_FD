import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function TableDropdown({
  value,
  onChange,
  options = [],
  placeholder = "Select",
}) {
  const wrapperRef = useRef(null);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState({});

  const selectedLabel =
    options.find((item) => item.value === value)?.label || placeholder;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        wrapperRef.current?.contains(e.target) ||
        dropdownRef.current?.contains(e.target)
      ) {
        return;
      }

      setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!open) return;

    const updatePosition = () => {
      if (!buttonRef.current) return;

      const rect = buttonRef.current.getBoundingClientRect();

      setDropdownStyle({
        position: "fixed",
        top: rect.bottom + 4,
        left: rect.left,
        width: Math.max(rect.width, 180),
        zIndex: 99999,
      });
    };

    updatePosition();

    window.addEventListener("resize", updatePosition, true);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition, true);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open]);

  return (
    <div ref={wrapperRef} className="relative w-full">
      {/* Button */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="
        w-full
        h-9
        px-3

        rounded-lg
        border
        border-[#B8C4D1]
        bg-white

        flex
        items-center
        justify-between

        text-sm
        text-slate-700

        outline-none

        transition-all
        duration-200

        focus:border-blue-500
        cursor-pointer
      "
      >
        <span className="truncate">{selectedLabel}</span>

        <ChevronDown
          size={16}
          className={`
          text-slate-500
          transition-transform
          duration-200
          ${open ? "rotate-180" : ""}
        `}
        />
      </button>

      {/* Dropdown */}
      {open &&
        createPortal(
          <div
            ref={dropdownRef}
            style={dropdownStyle}
            className="
            overflow-hidden

            rounded-xl
            border
            border-[#CDD7E3]
            bg-white

            shadow-xl

            max-h-45
            overflow-y-auto
          "
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={`
                w-full
                px-4
                py-3

                border-b
                border-[#E1E7EF]
                last:border-b-0

                text-left
                text-sm
                text-slate-700

                transition-colors

                cursor-pointer

                ${value === option.value
                    ? "bg-blue-50 font-semibold text-blue-600"
                    : "hover:bg-slate-50"
                  }
              `}
              >
                {option.label}
              </button>
            ))}
          </div>,
          document.body,
        )}
    </div>
  );
}
