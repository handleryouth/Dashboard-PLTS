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
  enableButton = true,
}: TableActionProps) {
  const { control, handleSubmit } = useForm({
    defaultValues: TABLE_ACTION_INITIAL_SEARCH,
  });

  return (
    <div className="flex items-start justify-between flex-col gap-y-3 smallToMediumDisplay:gap-y-0 smallToMediumDisplay:items-center smallToMediumDisplay:flex-row ">
      <form onSubmit={handleSubmit(onSubmit)}>
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
      </form>

      {enableButton &&
        (customButtonComponent ? (
          customButtonComponent
        ) : (
          <Button className="w-auto bg-blue-500" onClick={onButtonClick}>
            {buttonTitle ?? "Add"}
          </Button>
        ))}
    </div>
  );
}
