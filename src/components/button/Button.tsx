import { ButtonProps } from "types";

function Button({
  children,
  className,
  onClick,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      className={`prose rounded-md bg-black text-white px-4 py-3 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
