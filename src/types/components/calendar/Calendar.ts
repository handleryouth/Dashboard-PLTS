import { CalendarProps } from "primereact/calendar";

export interface CustomCalendarProps extends CalendarProps {
  label?: string;
  className?: string;
  errorMessage?: string;
}
