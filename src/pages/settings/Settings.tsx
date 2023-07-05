import { useCallback, useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { Toast } from "primereact/toast";
import { Button, Container, InputNumber } from "components";
import { SettingsBodyProps } from "types";
import { requestHelper } from "utils";

export default function Settings() {
  const { control, handleSubmit, setValue } = useForm<SettingsBodyProps>();

  const getPltsSettings = useCallback(async () => {
    const response = await requestHelper("plts_get_settings");

    if (response.status === 200) {
      setValue("totalCapacity", response.data.data.totalCapacity);
      setValue("totalEnergy", response.data.data.totalEnergy);
    } else if (response.response.status === 404) {
      setValue("totalCapacity", 0);
      setValue("totalEnergy", 0);
    } else {
      toastRef.current?.show({
        severity: "error",
        detail: "Failed to connect to server",
      });
    }
  }, [setValue]);

  useEffect(() => {
    getPltsSettings();
  }, [getPltsSettings]);

  const toastRef = useRef<Toast>(null);

  const onSubmitData = useCallback(async (data: SettingsBodyProps) => {
    const response = await requestHelper("plts_post_settings", {
      body: {
        totalCapacity: data.totalCapacity,
        totalEnergy: data.totalEnergy,
      },
    });

    if (response.status === 200) {
      toastRef.current?.show({
        severity: "success",
        detail: "Successfully saved",
      });
    } else {
      toastRef.current?.show({
        severity: "error",
        detail: "Failed to connect to server",
      });
    }
  }, []);

  return (
    <>
      <Toast ref={toastRef} />
      <Container>
        <h1>Total Plant Settings</h1>
        <form
          className="flex flex-col gap-y-5"
          onSubmit={handleSubmit(onSubmitData)}
        >
          <Controller
            name="totalCapacity"
            rules={{
              required: "Total capacity is required",
            }}
            control={control}
            render={({ field, fieldState }) => (
              <InputNumber
                id={field.name}
                inputRef={field.ref}
                value={field.value}
                onBlur={field.onBlur}
                onValueChange={(e) => field.onChange(e)}
                label="Total Capacity (Wp)"
                errorMessage={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="totalEnergy"
            rules={{
              required: "Total energy is required",
            }}
            control={control}
            render={({ field, fieldState }) => (
              <InputNumber
                id={field.name}
                inputRef={field.ref}
                value={field.value}
                onBlur={field.onBlur}
                onValueChange={(e) => field.onChange(e)}
                label="Total Energy Per Year (Wh)"
                errorMessage={fieldState.error?.message}
              />
            )}
          />

          <Button type="submit" className="bg-blue-500">
            Save
          </Button>
        </form>
      </Container>
    </>
  );
}
