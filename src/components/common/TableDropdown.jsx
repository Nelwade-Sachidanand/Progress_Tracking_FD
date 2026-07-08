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
          border-slate-300
          bg-white
          flex
          items-center
          justify-between
          text-sm
          text-slate-700
          cursor-pointer
          hover:border-blue-500
          focus:border-blue-500
          transition
        "
      >
        <span className="truncate">{selectedLabel}</span>

        <ChevronDown
          size={16}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {open &&
        createPortal(
          <div
            ref={dropdownRef}
            style={dropdownStyle}
            className="
              bg-white
              border
              border-slate-200
              rounded-lg
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
                  px-3
                  py-2.5
                  text-left
                  text-sm
                  transition
                  cursor-pointer

                  ${
                    value === option.value
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "hover:bg-slate-50 text-slate-700"
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
