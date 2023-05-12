import { Card } from "primereact/card";
import { ContainerProps } from "types";

export default function Container({
  children,
  className,
  ...props
}: ContainerProps) {
  return (
    <Card
      className={`prose bg-white rounded-md shadow-md  mx-8 bigDisplay:mx-0 ${className}`}
      {...props}
    >
      {children}
    </Card>
  );
}
