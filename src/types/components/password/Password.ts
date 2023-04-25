import { PasswordProps as PrimereactPasswordProps } from "primereact/password";

export interface PasswordProps extends PrimereactPasswordProps {
  containerClassName?: string;
  errorMessage?: string;
  label?: string;
  inputClassName?: string;
}
