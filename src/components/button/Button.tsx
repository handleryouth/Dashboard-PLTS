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
      className={`prose rounded-md text-white py-3 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
