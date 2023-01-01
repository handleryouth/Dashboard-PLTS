import { InputText } from "primereact/inputtext";
import { useId } from "react";

export interface InputProps {
  label?: string;
  errorMessage?: string;
  inputClassName?: string;
  onChange: (e: string) => void;
}

export default function Input({
  errorMessage,
  label,
  inputClassName,
  onChange,
}: InputProps) {
  const id = useId();
  return (
    <div className="field">
      <label htmlFor={id} className="block">
        {label}
      </label>
      <InputText
        onChange={(e) => onChange(e.target.value)}
        id={id}
        className={`${errorMessage && "p-invalid"} block ${inputClassName}`}
      />
      <small id={id} className="p-error block">
        {errorMessage}
      </small>
    </div>
  );
}
