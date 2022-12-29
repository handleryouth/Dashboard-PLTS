import { useId } from "react";
import { InputText } from "primereact/inputtext";

export interface InputFloatLabelProps {
  label: string;
}

export default function InputFloatLabel({ label }: InputFloatLabelProps) {
  const id = useId();

  return (
    <div className="p-float-label">
      <InputText id={id} />
      <label htmlFor={id}>id</label>
    </div>
  );
}
