import {
  DropdownProps as BaseDropdownProps,
  Dropdown as BaseDropdown,
} from "primereact/dropdown";
import { SelectItem } from "primereact/selectitem";
import { useId } from "react";

export interface DropdownProps extends BaseDropdownProps {
  label?: string;
  containerClassName?: string;
  value?: keyof SelectItem["value"];
}

export default function Dropdown({
  label,
  containerClassName,
  ...props
}: DropdownProps) {
  const id = useId();
  return (
    <span className={`w-full ${containerClassName}`}>
      {label && (
        <label htmlFor={id} className="block">
          {label}
        </label>
      )}
      <BaseDropdown
        {...props}
        id={id}
        className={`w-full  ${props.className} `}
      />
    </span>
  );
}
