import {
  DropdownProps as BaseDropdownProps,
  Dropdown as BaseDropdown,
} from "primereact/dropdown";
import { useId } from "react";

export interface DropdownProps extends BaseDropdownProps {
  label?: string;
}

export default function Dropdown({ label, ...props }: DropdownProps) {
  const id = useId();
  return (
    <span>
      {label && (
        <label htmlFor={id} className="block">
          {label}
        </label>
      )}
      <BaseDropdown
        {...props}
        id={id}
        className={`${props.className} w-full`}
      />
    </span>
  );
}
