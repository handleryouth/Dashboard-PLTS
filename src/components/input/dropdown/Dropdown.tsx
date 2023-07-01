import { forwardRef, useId } from "react";
import {
  DropdownProps as BaseDropdownProps,
  Dropdown as BaseDropdown,
} from "primereact/dropdown";
import { SelectItem } from "primereact/selectitem";

export interface DropdownProps extends BaseDropdownProps {
  label?: string;
  containerClassName?: string;
  value?: keyof SelectItem["value"];
  errorMessage?: string;
}

function Dropdown(
  { label, containerClassName, errorMessage, ...props }: DropdownProps,
  ref: any
) {
  const id = useId();
  return (
    <span className={`prose w-full ${containerClassName}`}>
      {label && (
        <label htmlFor={id} className="block">
          {label}
        </label>
      )}
      <BaseDropdown
        {...props}
        ref={ref}
        id={id}
        className={`w-full  ${props.className} ${errorMessage && "p-invalid"}`}
      />
      <small id={id} className=" p-error block absolute">
        {errorMessage}
      </small>
    </span>
  );
}

export default forwardRef(Dropdown);
