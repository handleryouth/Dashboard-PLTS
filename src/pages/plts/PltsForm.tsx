import { useCallback, useState, useEffect, useMemo, useRef } from "react";
import { useForm, Controller, useFieldArray, useWatch } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { Input, Button, Container, Dropdown } from "components";
import {
  PLTSPositionDataResponse,
  PLTSProfileBody,
  PLTSProfileList,
} from "types";
import { camelCase, requestHelper } from "utils";
import { DeleteModal, PositionModal } from "./modals";
import { SelectItem, SelectItemOptionsType } from "primereact/selectitem";

export const PLTS_FORM_INITIAL_STATE: PLTSProfileBody = {
  pltsName: "",
  smaDeviceName: "",
  devicePosition: "",
  ipAddress: "",
  port: "",
  modbusAddress: [],
  globalHorizontalIrradiance: 0,
  installedPower: 0,
  pvSurfaceArea: 0,
  powerPerYear: 0,
  deviceType: "pvInverter",
};

export interface PLTSFormProps {
  edit?: boolean;
}

export const PLTS_SIGNED_VALUE_DROPDOWN: SelectItemOptionsType = [
  {
    label: "Signed",
    value: "signed",
  },
  {
    label: "Unsigned",
    value: "unsigned",
  },
];

export const PLTS_DEVICE_TYPE_DROPDOWN: SelectItemOptionsType = [
  {
    label: "PV Inverter",
    value: "pvInverter",
  },
  {
    label: "Battery Inverter",
    value: "batteryInverter",
  },
];

export type PLTSFormModalState = "delete" | "position" | undefined;

export default function PltsForm({ edit }: PLTSFormProps) {
  const [showModal, setShowModal] = useState<PLTSFormModalState>();

  const { state } = useLocation();

  const navigate = useNavigate();

  const [pltsLocation, setPltsLocation] = useState<PLTSPositionDataResponse[]>(
    []
  );

  const [pltsProfile, setPltsProfile] = useState<PLTSProfileList[]>([]);

  const previousDeviceType = useRef<string | undefined>(
    edit ? state.deviceType : "deviceType"
  );

  const { control, handleSubmit, reset } = useForm<PLTSProfileBody>({
    defaultValues: edit
      ? {
          devicePosition: state.devicePosition?._id ?? "-",
          ipAddress: state.ipAddress,
          modbusAddress: state.modbusAddress,
          port: state.port,
          pltsName: state.pltsName,
          smaDeviceName: state.smaDeviceName,
          globalHorizontalIrradiance: state.globalHorizontalIrradiance,
          installedPower: state.installedPower,
          pvSurfaceArea: state.pvSurfaceArea,
          powerPerYear: state.powerPerYear,
          deviceType: state.deviceType,
          connectedTo: state?.connectedTo ?? state.connectedWith,
        }
      : PLTS_FORM_INITIAL_STATE,
  });

  const deviceType = useWatch({
    control,
    name: "deviceType",
  });

  const getPLTSProfile = useCallback(async () => {
    const response = await requestHelper("get_plts_profile_list", {
      params: {
        id: edit ? state._id : undefined,
        deviceType: deviceType,
      },
    });

    if (response && response.status === 200) {
      setPltsProfile(response.data.data);

      if (deviceType !== previousDeviceType.current) {
        reset((formValues) => ({
          ...formValues,
          connectedTo: "",
        }));

        previousDeviceType.current = deviceType;
      }
    }
  }, [edit, state._id, deviceType, reset]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "modbusAddress",
  });

  const handleSaveData = useCallback(
    async (data: PLTSProfileBody) => {
      const response = await requestHelper("create_plts_profile", {
        body: {
          ...data,
          modbusAddress: data.modbusAddress.map((item) => ({
            dataName: item.dataName,
            unit: item.unit,
            modbusAddress: item.modbusAddress,
            dataKey: camelCase(item.dataName),
            signed: item.signed,
            valuePrecision: item.valuePrecision || 1,
          })),
        },
      });

      if (response && response.status === 201) {
        navigate(-1);
      }
    },
    [navigate]
  );

  const handleEditData = useCallback(
    async (data: PLTSProfileBody) => {
      console.log("form data", data);

      const response = await requestHelper("patch_plts_profile", {
        body: {
          ...data,
          modbusAddress: data.modbusAddress.map((item) => ({
            dataName: item.dataName,
            unit: item.unit,
            modbusAddress: item.modbusAddress,
            dataKey: camelCase(item.dataName),
            signed: item.signed,
            valuePrecision: item.valuePrecision || 1,
          })),
          id: state._id,
        },
      });

      if (response && response.status === 200) {
        navigate(-1);
      }
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

  const generatePltsProfile = useMemo<SelectItem[]>(() => {
    return pltsProfile.length > 0
      ? pltsProfile.map((item) => ({
          label: item.pltsName,
          value: item._id,
        }))
      : [];
  }, [pltsProfile]);

  const handleDeletePLTS = useCallback(async () => {
    const response = await requestHelper("delete_plts_profile", {
      params: {
        id: state._id,
        pltsName: state.pltsName,
      },
    });

    if (response && response.status === 202) {
      navigate(-1);
    }
  }, [navigate, state]);

  useEffect(() => {
    getPltsLocation();
  }, [getPltsLocation]);

  useEffect(() => {
    getPLTSProfile();
  }, [getPLTSProfile]);

  return (
    <>
      <DeleteModal
        onCancel={() => setShowModal(undefined)}
        onConfirm={handleDeletePLTS}
        visible={showModal === "delete"}
      />
      <PositionModal
        toggleModalClosed={() => setShowModal(undefined)}
        visible={showModal === "position"}
        onRequestCompleted={getPltsLocation}
      />

      <Container>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto w-3/4 flex flex-col gap-y-4"
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

          <Controller
            name="deviceType"
            control={control}
            rules={{
              required: "Device Type is required",
            }}
            render={({ field, fieldState }) => {
              return (
                <Dropdown
                  {...field}
                  id={field.name}
                  label="Device Type"
                  errorMessage={fieldState.error?.message}
                  options={PLTS_DEVICE_TYPE_DROPDOWN}
                />
              );
            }}
          />

          <div className="flex items-end gap-2">
            <Controller
              name="connectedTo"
              control={control}
              render={({ field, fieldState }) => {
                return (
                  <Dropdown
                    {...field}
                    id={field.name}
                    label="Connected To/With"
                    errorMessage={fieldState.error?.message}
                    options={generatePltsProfile}
                  />
                );
              }}
            />

            <Button
              className="basis-2/5 h-[54px]"
              onClick={() => {
                reset((formValues) => {
                  return {
                    ...formValues,
                    connectedTo: "",
                  };
                });
              }}
            >
              Remove connected to
            </Button>
          </div>

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
                  />
                );
              }}
            />

            <Button
              onClick={() => setShowModal("position")}
              className="h-[54px] basis-2/5 bg-blue-500"
            >
              Add Device Position
            </Button>
          </div>

          <Controller
            name="ipAddress"
            rules={{
              required: "IP Address is required",
            }}
            control={control}
            render={({ field }) => (
              <Input id={field.name} {...field} label="IP Address" />
            )}
          />

          <Controller
            name="port"
            rules={{
              required: "Port is required",
            }}
            control={control}
            render={({ field }) => (
              <Input id={field.name} label="Port" {...field} />
            )}
          />

          <Controller
            name="globalHorizontalIrradiance"
            control={control}
            rules={{
              required: "Global Horizontal Irradiance is required",
            }}
            render={({ field }) => (
              <Input
                id={field.name}
                label="Global Horizontal Irradiance (kWh/m^2)"
                {...field}
              />
            )}
          />

          <Controller
            name="pvSurfaceArea"
            control={control}
            rules={{
              required: "PV Surface Area is required",
            }}
            render={({ field }) => (
              <Input id={field.name} label="PV Surface Area (m^2)" {...field} />
            )}
          />

          <Controller
            name="installedPower"
            rules={{
              required: "Installed Power is required",
            }}
            control={control}
            render={({ field }) => (
              <Input id={field.name} label="Installed Power (Kw)" {...field} />
            )}
          />

          <Controller
            name="powerPerYear"
            rules={{
              required: "Power Per Year is required",
            }}
            control={control}
            render={({ field }) => (
              <Input id={field.name} label="Power Per Year (KWh)" {...field} />
            )}
          />

          <div>
            <div className="flex items-center mt-4 justify-between">
              <h3 className="my-0">Modbus Address</h3>
              <Button
                className="bg-blue-500"
                onClick={() =>
                  append({
                    dataName: "",
                    modbusAddress: 0,
                    unit: "",
                    signed: "unsigned",
                    valuePrecision: 1,
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
                    className="flex items-end gap-4 mt-4 justify-between "
                  >
                    <Controller
                      name={`modbusAddress.${index}.dataName`}
                      control={control}
                      rules={{
                        required: "Data Name is required",
                      }}
                      render={({ field, fieldState }) => (
                        <Input
                          id={field.name}
                          {...field}
                          label="Data Name"
                          errorMessage={fieldState.error?.message}
                        />
                      )}
                    />

                    <Controller
                      name={`modbusAddress.${index}.modbusAddress`}
                      control={control}
                      rules={{
                        required: "Modbuss Address is required",
                      }}
                      render={({ field, fieldState }) => (
                        <Input
                          id={field.name}
                          {...field}
                          label="Modbus Address"
                          errorMessage={fieldState.error?.message}
                        />
                      )}
                    />

                    <Controller
                      name={`modbusAddress.${index}.unit`}
                      control={control}
                      rules={{
                        required: "Value Unit is required",
                      }}
                      render={({ field, fieldState }) => (
                        <Input
                          id={field.name}
                          {...field}
                          label="Value Unit"
                          errorMessage={fieldState.error?.message}
                        />
                      )}
                    />

                    <Controller
                      name={`modbusAddress.${index}.signed`}
                      control={control}
                      rules={{
                        required: "Value signed format required",
                      }}
                      render={({ field, fieldState }) => (
                        <Dropdown
                          id={field.name}
                          label="Signed or Unsigned"
                          {...field}
                          errorMessage={fieldState.error?.message}
                          options={PLTS_SIGNED_VALUE_DROPDOWN}
                        />
                      )}
                    />

                    <Controller
                      name={`modbusAddress.${index}.valuePrecision`}
                      control={control}
                      rules={{
                        min: 1,
                      }}
                      render={({ field, fieldState }) => (
                        <Input
                          id={field.name}
                          {...field}
                          label="Value Precision"
                          errorMessage={fieldState.error?.message}
                        />
                      )}
                    />

                    <Button
                      className="basis-2/4 bg-red-500"
                      onClick={() => remove(index)}
                    >
                      Delete
                    </Button>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-center gap-8 mt-8">
              <Button type="submit" className="bg-blue-500 w-full">
                Save
              </Button>
              <Button
                className="bg-red-500 w-full"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
            </div>
          </div>
          {edit && (
            <Button onClick={() => setShowModal("delete")}>Delete</Button>
          )}
        </form>
      </Container>
    </>
  );
}
