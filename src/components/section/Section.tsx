import { ReactNode } from "react";
import { Tooltip } from "primereact/tooltip";

export interface SectionProps {
  title?: string;
  titleClassName?: string;
  value?: string | number;
  valueClassName?: string;
  valueContainerClassName?: string;
  children?: ReactNode;
  customTitle?: ReactNode;
  direction?: "row" | "column";
  valueTooltip?: string;
  tooltipId?: string;
}

export default function Section({
  children,
  title,
  value,
  customTitle,
  titleClassName,
  valueClassName,
  direction = "row",
  valueTooltip,
  tooltipId,
  valueContainerClassName,
}: SectionProps) {
  return (
    <div
      className={`flex  w-full ${
        direction === "row"
          ? " items-center flex-row justify-between"
          : "flex-col"
      }`}
    >
      {title ? (
        <h3 className={`my-0 ${titleClassName ?? ""}`}>{title}</h3>
      ) : (
        customTitle
      )}
      {value !== undefined ? (
        <div className={`${valueContainerClassName ?? ""} `}>
          {valueTooltip && (
            <Tooltip
              target={`.${tooltipId ?? ""}`}
              content={valueTooltip}
              position="bottom"
              className="w-96"
            />
          )}
          <p className={`${tooltipId ?? ""} my-0 ${valueClassName ?? ""}`}>
            {value}
          </p>
        </div>
      ) : (
        children
      )}
    </div>
  );
}
