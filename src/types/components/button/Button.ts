import { ComponentProps, ReactNode } from "react";

export interface ButtonProps extends ComponentProps<"button"> {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}
