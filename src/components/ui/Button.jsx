const Button = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`
      h-12
      w-full
      rounded-xl
      bg-blue-600
      text-white
      font-semibold
      transition
      hover:bg-blue-700
      ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;