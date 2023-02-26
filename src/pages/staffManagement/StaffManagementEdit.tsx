import { Button, Container, Dropdown, Input } from "components";
import { SelectItemOptionsType } from "primereact/selectitem";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { StaffDataProps, UserStaffType } from "types";
import { requestHelper } from "utils";
import { ProgressSpinner } from "primereact/progressspinner";

const STAFF_ROLE_OPTIONS: SelectItemOptionsType = [
  { label: "Admin", value: "admin" },
  { label: "User", value: "user" },
];

export default function StaffManagementEdit() {
  const { id } = useParams<"id">();

  const [isLoading, setIsLoading] = useState(true);

  const { control, handleSubmit, reset } = useForm<StaffDataProps>();

  const navigate = useNavigate();

  const getStaffData = useCallback(async () => {
    const response = await requestHelper("get_staff_detail", {
      params: {
        id,
      },
    });

    if (response && response.status === 200) {
      setIsLoading(false);
      reset(response.data.data);
    }
  }, [id, reset]);

  const handleSubmitEvent = useCallback(
    async (data: StaffDataProps) => {
      const response = await requestHelper("edit_staff", {
        body: {
          email: data.email,
          name: data.name,
          role: data.role as UserStaffType,
          id: data._id,
        },
      });
      if (response && response.status === 200) {
        navigate("/staff-management");
      }
    },
    [navigate]
  );

  useEffect(() => {
    getStaffData();
  }, [getStaffData]);

  return (
    <Container>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <ProgressSpinner className="w-14 h-14" />
        </div>
      ) : (
        <form
          className="mx-auto w-[500px] flex flex-col gap-y-4"
          onSubmit={handleSubmit(handleSubmitEvent)}
        >
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
            }}
            render={({ field, fieldState }) => (
              <Input
                defaultValue={field?.value}
                id={field.name}
                label="Email"
                {...field}
                errorMessage={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="name"
            control={control}
            rules={{
              required: "Name is required",
            }}
            render={({ field, fieldState }) => {
              return (
                <Input
                  defaultValue={field?.value}
                  id={field.name}
                  label="Name"
                  {...field}
                  errorMessage={fieldState.error?.message}
                />
              );
            }}
          />

          <Controller
            control={control}
            rules={{
              required: "Role is required",
            }}
            name="role"
            render={({ field, fieldState }) => {
              return (
                <Dropdown
                  id={field.name}
                  {...field}
                  defaultValue={field?.value}
                  label="Role"
                  filter
                  errorMessage={fieldState.error?.message}
                  options={STAFF_ROLE_OPTIONS}
                />
              );
            }}
          />

          <div className="flex items-center justify-between gap-x-8 mt-4">
            <Button className="w-full bg-blue-500" type="submit">
              Save
            </Button>
            <Button
              className="w-full bg-gray-200 text-black "
              onClick={() => navigate("/staff-management")}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </Container>
  );
}
