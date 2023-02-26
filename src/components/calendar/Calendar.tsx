import { useId } from "react";
import { CalendarProps } from "primereact/calendar";
import { Calendar as NativeCalendar } from "primereact/calendar";

export interface CustomCalendarProps extends CalendarProps {
  label?: string;
  className?: string;
  errorMessage?: string;
}

export default function Calendar({
  label,
  className,
  errorMessage,
  ...props
}: CustomCalendarProps) {
  const customId = useId();
  return (
    <div className="field">
      <label htmlFor={customId}>{label}</label>
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
