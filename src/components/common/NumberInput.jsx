import { useState } from "react";
import { toast } from "react-toastify";

export default function NumberInput({
  name,
  value,
  onChange,
  placeholder = "",
  className = "",
  min = 0,
  max,
  defaultValue = 0,
  allowEmpty = true,
  maxLength,
  autoComplete = "off",
}) {
  const [focused, setFocused] = useState(false);

  const displayValue = focused
    ? value
    : value === "" || value == null
      ? defaultValue
      : value;

  const handleChange = (e) => {
    const value = e.target.value;

    if (!/^\d*$/.test(value)) return;

    if (maxLength && value.length > maxLength) {
      toast.error(`Maximum ${maxLength} Digits Allowed`);
      return;
    }

    if (max && Number(value) > max) return;

    onChange(e);
  };

  return (
    <input
      type="number"
      name={name}
      min={min}
      max={max}
      value={displayValue}
      onFocus={(e) => {
        setFocused(true);

        if (e.target.value === String(defaultValue)) {
          onChange({
            target: {
              name,
              value: "",
            },
          });
        }
      }}
      onBlur={(e) => {
        setFocused(false);

        if (e.target.value === "") {
          onChange({
            target: {
              name,
              value: defaultValue,
            },
          });
        }
      }}
      onChange={handleChange}
      onWheel={(e) => e.target.blur()}
      placeholder={placeholder}
      className={className}
      autoComplete={autoComplete}
    />
  );
}
