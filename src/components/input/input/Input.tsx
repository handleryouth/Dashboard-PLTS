import { InputText } from "primereact/inputtext";
import { useId } from "react";

export interface InputProps {
  label?: string;
  errorMessage?: string;
}

export default function Input({ errorMessage, label }: InputProps) {
  const id = useId();
  return (
    <div className="field">
      <label htmlFor={id} className="block">
        {label}
      </label>
      <InputText id={id} className={`${errorMessage && "p-invalid"} block`} />
      <small id={id} className="p-error block">
        {errorMessage}
      </small>
    </div>
  );
}
