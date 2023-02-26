import { ReactNode } from "react";
import {} from "primereact/button";

export interface ButtonProps {
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

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
