import { ReactNode } from "react";
import {} from "primereact/button";

export interface ButtonProps {
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
}

function Button({ children, className, onClick }: ButtonProps) {
  return (
    <button
      className={`prose rounded-md bg-black text-white px-4 py-3 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
