import { useId } from "react";
import { Calendar as NativeCalendar } from "primereact/calendar";
import { CustomCalendarProps } from "types";

export default function Calendar({
  label,
  className,
  errorMessage,
  ...props
}: CustomCalendarProps) {
  const customId = useId();
  return (
    <div className="field">
      <label htmlFor={customId} className="block">
        {label}
      </label>
      <NativeCalendar
        {...props}
        dateFormat="dd/mm/yy"
        id={customId}
        className={`w-full ${className} ${errorMessage && "p-invalid"}`}
      />
      <small id={customId} className="p-error block">
        {errorMessage}
      </small>
    </div>
  );
}
