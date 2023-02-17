import { useForm, Controller } from "react-hook-form";
import { TableActionProps, TableActionSearchProps } from "types";
import { Button } from "../button";
import { Input } from "../input";

export const TABLE_ACTION_INITIAL_SEARCH: TableActionSearchProps = {
  search: "",
};

export default function TableAction({
  onSubmit,
  customButtonComponent,
  buttonTitle,
  onButtonClick,
}: TableActionProps) {
  const { control, handleSubmit } = useForm({
    defaultValues: TABLE_ACTION_INITIAL_SEARCH,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center justify-between "
    >
      <Controller
        name="search"
        control={control}
        render={({ field }) => (
          <Input
            containerClassName="w-96"
            id={field.name}
            {...field}
            placeholder="Search"
          />
        )}
      />

      {customButtonComponent ? (
        customButtonComponent
      ) : (
        <Button className="w-auto" onClick={onButtonClick}>
          {buttonTitle ?? "Add"}
        </Button>
      )}
    </form>
  );
}
