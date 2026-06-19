const Input = ({
  icon,
  type = "text",
  placeholder,
  ...props
}) => {
  return (
    <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        {icon}
      </span>

      <input
        type={type}
        placeholder={placeholder}
        className="
        w-full
        rounded-xl
        border
        border-gray-200
        bg-white
        py-3
        pl-12
        pr-4
        outline-none
        transition
        focus:border-blue-500
        "
        {...props}
      />
    </div>
  );
};

export default Input;