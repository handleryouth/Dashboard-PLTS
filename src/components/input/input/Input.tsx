import { forwardRef, useId } from "react";
import { InputText } from "primereact/inputtext";
import { InputProps } from "types";

function Input(
  {
    errorMessage,
    containerClassName,
    label,
    inputClassName,
    onChange,
    autoFocus,
    ...props
  }: InputProps,
  ref: any
) {
  const customId = useId();
  return (
    <div className={`prose field w-full ${containerClassName} relative`}>
      <label htmlFor={props.id ?? customId} className="block">
        {label}
      </label>
      <InputText
        {...props}
        ref={ref}
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

export default forwardRef(Input);
