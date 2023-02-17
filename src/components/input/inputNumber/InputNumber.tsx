import { useId } from "react";
import {
  InputNumberProps as NativeInputNumberProps,
  InputNumber as NativeInputNumber,
} from "primereact/inputnumber";

export interface InputNumberProps extends NativeInputNumberProps {
  label?: string;
  inputClassName?: string;
}

export default function InputNumber({
  inputClassName,
  label,
  ...props
}: InputNumberProps) {
  const id = useId();
  return (
    <div className="w-full">
      <label htmlFor={id}>{label}</label>
      <NativeInputNumber
        id={id}
        {...props}
        className={`${inputClassName} w-full`}
      />
    </div>
  );
}
