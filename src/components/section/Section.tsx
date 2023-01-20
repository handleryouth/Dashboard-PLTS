import { ReactNode } from "react";

export interface SectionProps {
  title?: string;
  titleClassName?: string;
  value?: string;
  valueClassName?: string;
  children?: ReactNode;
  customTitle?: ReactNode;
  direction?: "row" | "column";
}

export default function Section({
  children,
  title,
  value,
  customTitle,
  titleClassName,
  valueClassName,
  direction = "row",
}: SectionProps) {
  return (
    <div
      className={`flex items-center  w-full ${
        direction === "row" ? "flex-row justify-between" : "flex-col"
      }`}
    >
      {title ? (
        <h3 className={`my-0 ${titleClassName}`}>{title}</h3>
      ) : (
        customTitle
      )}
      {value ? <p className={`my-0 ${valueClassName}`}>{value}</p> : children}
    </div>
  );
}
