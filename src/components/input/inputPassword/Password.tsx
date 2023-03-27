import { useId } from "react";
import {
  Password as PrimereactPassword,
  PasswordProps as PrimereactPasswordProps,
} from "primereact/password";

export interface PasswordProps extends PrimereactPasswordProps {
  containerClassName?: string;
  errorMessage?: string;
  label?: string;
  inputClassName?: string;
}

export default function Password({
  containerClassName,
  errorMessage,
  label,
  ...rest
}: PasswordProps) {
  const id = useId();

  return (
    <div className={`field w-full ${containerClassName} relative`}>
      <label htmlFor={rest.id ?? id} className="block">
        {label ?? "Password"}
      </label>
      <PrimereactPassword
        {...rest}
        inputClassName={rest.inputClassName + " w-full"}
        id={id}
        feedback={false}
        toggleMask
        className={`${errorMessage && "p-invalid"} block w-full`}
      />
      <small id={rest.id ?? id} className="p-error block absolute">
        {errorMessage}
      </small>
    </div>
  );
}
