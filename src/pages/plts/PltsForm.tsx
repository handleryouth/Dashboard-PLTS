import { useCallback, useState, useEffect, useMemo } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Input, Button, Container, Dropdown } from "components";
import { PLTSPositionDataResponse, PLTSProfileBody } from "types";
import { requestHelper } from "utils";
import { PositionModal } from "./modals";
import { SelectItem } from "primereact/selectitem";
import { useLocation, useNavigate } from "react-router-dom";

export const PLTS_FORM_INITIAL_STATE: PLTSProfileBody = {
  pltsName: "",
  smaDeviceName: "",
  devicePosition: "",
  ipAddress: "",
  port: "",
  modbusAddress: [],
};

export interface PLTSFormProps {
  edit?: boolean;
}

export default function PltsForm({ edit }: PLTSFormProps) {
  const [showModal, setShowModal] = useState(false);

  const { state } = useLocation();

  console.log("state value", state);

  const navigate = useNavigate();

  const [pltsLocation, setPltsLocation] = useState<PLTSPositionDataResponse[]>(
    []
  );

  const { control, handleSubmit } = useForm<PLTSProfileBody>({
    defaultValues: edit
      ? {
          devicePosition: state.devicePosition?._id ?? "-",
          ipAddress: state.ipAddress,
          modbusAddress: state.modbusAddress,
          port: state.port,
          pltsName: state.pltsName,
          smaDeviceName: state.smaDeviceName,
        }
      : PLTS_FORM_INITIAL_STATE,
  });

  const { fields, append } = useFieldArray({
    control,
    name: "modbusAddress",
  });

  const handleSaveData = useCallback(
    async (data: PLTSProfileBody) => {
      await requestHelper("create_plts_profile", {
        body: {
          ...data,
        },
      });

      navigate(-1);
    },
    [navigate]
  );

  const handleEditData = useCallback(
    async (data: PLTSProfileBody) => {
      await requestHelper("patch_plts_profile", {
        body: {
          ...data,
          id: state._id,
        },
      });

      navigate(-1);
    },
    [navigate, state?._id]
  );

  const onSubmit = useCallback(
    (data: PLTSProfileBody) => {
      edit ? handleEditData(data) : handleSaveData(data);
    },
    [edit, handleEditData, handleSaveData]
  );

  const getPltsLocation = useCallback(async () => {
    const response = await requestHelper("get_plts_location");

    if (response && response.status === 200) {
      setPltsLocation(response.data?.data!);
    }
  }, []);

  const generatePltsLocation = useMemo<SelectItem[]>(() => {
    return pltsLocation.length > 0
      ? pltsLocation.map((item) => ({
          label: item.name,
          value: item._id,
        }))
      : [];
  }, [pltsLocation]);

  useEffect(() => {
    getPltsLocation();
  }, [getPltsLocation]);

  return (
    <>
      <PositionModal
        toggleModalClosed={() => setShowModal(false)}
        visible={showModal}
        onRequestCompleted={getPltsLocation}
      />

      <Container>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto w-1/2 flex flex-col gap-y-4"
        >
          <Controller
            name="pltsName"
            control={control}
            rules={{
              required: "PLTS Name is required",
            }}
            render={({ field, fieldState }) => (
              <Input
                id={field.name}
                defaultValue={field.value}
                autoFocus
                {...field}
                errorMessage={fieldState.error?.message}
                label="PLTS Name"
              />
            )}
          />

          <Controller
            name="smaDeviceName"
            control={control}
            rules={{
              required: "SMA Device Name is required",
            }}
            render={({ field, fieldState }) => {
              return (
                <Input
                  id={field.name}
                  {...field}
                  errorMessage={fieldState.error?.message}
                  label="SMA Device Name"
                />
              );
            }}
          />

          <div className="flex items-end gap-x-2 justify-between">
            <Controller
              name="devicePosition"
              control={control}
              rules={{
                required: "Device Position is required",
              }}
              render={({ field, fieldState }) => {
                return (
                  <Dropdown
                    id={field.name}
                    {...field}
                    label="Device Position"
                    filter
                    errorMessage={fieldState.error?.message}
                    options={generatePltsLocation || []}
                    itemTemplate={(option) => {
                      return (
                        <div
                          className="flex items-center justify-between z-[9999]"
                          onClick={() => console.log("item clicked")}
                        >
                          <span>{option.label}</span>
                          <Button onClick={() => console.log("icon clicked")}>
                            <i className="pi pi-times" />
                          </Button>
                        </div>
                      );
                    }}
                  />
                );
              }}
            />

            <Button
              onClick={() => setShowModal(true)}
              className="h-[54px] basis-2/5"
            >
              Add Device Position
            </Button>
          </div>

          <Controller
            name="ipAddress"
            control={control}
            render={({ field }) => (
              <Input id={field.name} {...field} label="IP Address" />
            )}
          />

          <Controller
            name="port"
            control={control}
            render={({ field }) => (
              <Input id={field.name} label="Port" {...field} />
            )}
          />

          <div>
            <div className="flex items-center mt-4 justify-between">
              <h3 className="my-0">Modbus Address</h3>
              <Button
                onClick={() =>
                  append({
                    dataName: "",
                    modbusAddress: 0,
                  })
                }
              >
                Add Modbus Address
              </Button>
            </div>

            <div>
              {fields.map((item, index) => {
                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 mt-4 justify-between"
                  >
                    <Controller
                      name={`modbusAddress.${index}.dataName`}
                      control={control}
                      render={({ field }) => (
                        <Input id={field.name} {...field} label="Data Name" />
                      )}
                    />

                    <Controller
                      name={`modbusAddress.${index}.modbusAddress`}
                      control={control}
                      render={({ field }) => (
                        <Input
                          id={field.name}
                          {...field}
                          label="Modbus Address"
                        />
                      )}
                    />
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-center gap-8 mt-8">
              <Button type="submit" className="bg-blue-500 w-full">
                Save
              </Button>
              <Button className="bg-red-500 w-full">Cancel</Button>
            </div>
          </div>
        </form>
      </Container>
    </>
  );
}
