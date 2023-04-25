import { ButtonProps } from "types";

function Button({
  children,
  className,
  onClick,
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`prose !max-w-none rounded-md bg-black text-white px-4 py-3 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
