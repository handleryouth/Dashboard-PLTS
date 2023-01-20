import { ReactNode } from "react";
import {
  ButtonProps as PrimereactButtonProps,
  Button as PrimereactButton,
} from "primereact/button";

export interface ButtonProps extends PrimereactButtonProps {
  children?: ReactNode;
}

function Button({ children, className, ...props }: ButtonProps) {
  return (
    <PrimereactButton
      {...props}
      className={`prose flex justify-center ${className}`}
    >
      {children}
    </PrimereactButton>
  );
}

export default Button;
