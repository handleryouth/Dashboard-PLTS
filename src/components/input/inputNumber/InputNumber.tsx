import { forwardRef, useId } from "react";
import {
  InputNumberProps as NativeInputNumberProps,
  InputNumber as NativeInputNumber,
} from "primereact/inputnumber";

export interface InputNumberProps extends NativeInputNumberProps {
  label?: string;
  inputClassName?: string;
  errorMessage?: string;
  containerClassName?: string;
}

function InputNumber(
  {
    inputClassName,
    label,
    errorMessage,
    containerClassName,
    ...props
  }: InputNumberProps,
  ref: any
) {
  const customId = useId();
  return (
    <div className={`prose field w-full ${containerClassName} relative`}>
      <label htmlFor={props.id ?? customId} className="block">
        {label}
      </label>
      <NativeInputNumber
        {...props}
        ref={ref}
        id={props.id ?? customId}
        className={`${errorMessage && "p-invalid"} block ${inputClassName} `}
        inputClassName="w-full"
        useGrouping={false}
      />
      <small id={props.id ?? customId} className="p-error block absolute">
        {errorMessage}
      </small>
    </div>
  );
}

export default forwardRef(InputNumber);
