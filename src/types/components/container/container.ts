import { ReactNode } from "react";
import { CardProps } from "primereact/card";

export interface ContainerProps extends CardProps {
  children?: ReactNode;
  className?: string;
}
