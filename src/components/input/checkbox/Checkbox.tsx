import { useId } from "react";
import { Checkbox as BaseCheckbox } from "primereact/checkbox";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

export interface CheckboxProps<T extends FieldValues, K extends FieldPath<T>> {
  label?: string;
  containerClassName?: string;
  errorMessage?: string;
  name: K;
  control: Control<T>;
}

export default function Checkbox<
  T extends FieldValues,
  K extends FieldPath<T>
>({
  containerClassName,
  errorMessage,
  label,
  control,
  name,
}: CheckboxProps<T, K>) {
  const id = useId();

  return (
    <div className={`${containerClassName} relative flex items-center gap-x-2`}>
      <Controller
        control={control}
        name={name}
        render={({ field: { ref, ...inputProps } }) => (
          <BaseCheckbox
            {...inputProps}
            checked={inputProps.value}
            inputId={id}
          />
        )}
      />

      {label && (
        <label className="prose" htmlFor={id}>
          {label}
        </label>
      )}

      <small id={id} className="p-error block absolute">
        {errorMessage}
      </small>
    </div>
  );
}
