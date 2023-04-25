import { InputTextProps } from "primereact/inputtext";

export interface InputProps extends Omit<InputTextProps, "onChange"> {
  label?: string;
  errorMessage?: string;
  inputClassName?: string;
  onChange: (e: string) => void;
  autoFocus?: boolean;
  containerClassName?: string;
}
