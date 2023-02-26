import { useId } from "react";
import { InputText, InputTextProps } from "primereact/inputtext";

export interface InputProps extends Omit<InputTextProps, "onChange"> {
  label?: string;
  errorMessage?: string;
  inputClassName?: string;
  onChange: (e: string) => void;
  autoFocus?: boolean;
  containerClassName?: string;
}

export default function Input({
  errorMessage,
  containerClassName,
  label,
  inputClassName,
  onChange,
  autoFocus,
  ...props
}: InputProps) {
  const customId = useId();
  return (
    <div className={`field w-full ${containerClassName} relative`}>
      <label htmlFor={props.id ?? customId} className="block">
        {label}
      </label>
      <InputText
        {...props}
        onChange={(e) => onChange(e.target.value)}
        id={props.id ?? customId}
        autoFocus={autoFocus}
        className={`${
          errorMessage && "p-invalid"
        } block ${inputClassName} w-full`}
      />
      <small id={props.id ?? customId} className="p-error block absolute">
        {errorMessage}
      </small>
    </div>
  );
}
