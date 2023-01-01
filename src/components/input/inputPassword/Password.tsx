import { useId } from "react";
import {
  Password as PrimereactPassword,
  PasswordProps as PrimereactPasswordProps,
} from "primereact/password";

export interface PasswordProps extends PrimereactPasswordProps {
  containerClassName?: string;
}

export default function Password({
  containerClassName,
  ...rest
}: PasswordProps) {
  const id = useId();

  return (
    <div className={`flex flex-col ${containerClassName}`}>
      <label htmlFor={id}>Password</label>
      <PrimereactPassword
        id={id}
        feedback={false}
        toggleMask
        inputClassName={`w-full ${rest.inputClassName}`}
        {...rest}
      />
    </div>
  );
}
