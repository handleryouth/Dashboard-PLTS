import { Card, CardProps } from "primereact/card";
import { ReactNode } from "react";

export interface ContainerProps extends CardProps {
  children?: ReactNode;
  className?: string;
}

export default function Container({
  children,
  className,
  ...props
}: ContainerProps) {
  return (
    <Card
      className={`bg-white rounded-md shadow-md  mx-8 bigDisplay:mx-0 ${className}`}
      {...props}
    >
      {children}
    </Card>
  );
}
