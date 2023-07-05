import {
  useCallback,
  useState,
  useEffect,
  useMemo,
  useRef,
  Fragment,
} from "react";
import { useForm, Controller, useFieldArray, useWatch } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { SelectItem } from "primereact/selectitem";
import { Toast } from "primereact/toast";
import {
  Input,
  Button,
  Container,
  Dropdown,
  Checkbox,
  InputNumber,
  NotificationModal,
} from "components";
import {
  PLTSFormModalState,
  PLTSFormProps,
  PLTSPositionDataResponse,
  PLTSProfileBody,
  PLTSProfileList,
} from "types";
import { camelCase, requestHelper } from "utils";
import {
  PLTS_DEVICE_TYPE_DROPDOWN,
  PLTS_FORM_INITIAL_STATE,
  PLTS_SIGNED_VALUE_DROPDOWN,
} from "const";
import { DeleteModal, FormConfirmationModal, PositionModal } from "./modals";

export interface PltsFormNotificationModalProps {
  visible: boolean;
  message: string;
}

export const PLTS_FORM_NOTIFICATION_MODAL_INITIAL_STATES: PltsFormNotificationModalProps =
  {
    message: "",
    visible: false,
  };

export default function PltsForm({ edit }: PLTSFormProps) {
  const [showModal, setShowModal] = useState<PLTSFormModalState>();

  const [notificationModal, setNotificationModal] = useState(
    PLTS_FORM_NOTIFICATION_MODAL_INITIAL_STATES
  );

  const { state } = useLocation();

  const toast = useRef<Toast>(null);

  const navigate = useNavigate();

  const [pltsLocation, setPltsLocation] = useState<PLTSPositionDataResponse[]>(
    []
  );

  const [pltsProfile, setPltsProfile] = useState<PLTSProfileList[]>([]);

  const previousDeviceType = useRef<string | undefined>(
    edit ? state.deviceType : "deviceType"
  );

  const { control, handleSubmit, trigger, resetField, setValue } =
    useForm<PLTSProfileBody>({
      defaultValues: edit
        ? {
            devicePosition: state.devicePosition?._id ?? "-",
            ipAddress: state.ipAddress,
            modbusAddress: state.modbusAddress,
            port: state.port,
            pltsName: state.pltsName,
            smaDeviceName: state.smaDeviceName,
            deviceType: state.deviceType,
            capacity: state.capacity,
            connectedTo: state?.connectedTo ?? state.connectedWith ?? "",
          }
        : PLTS_FORM_INITIAL_STATE,
      shouldUnregister: true,
    });

  const onSubmitButton = useCallback(() => {
    trigger().then((isValid) => {
      if (isValid) {
        setShowModal("confirmation");
      }
    });
  }, [trigger]);

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
        resetField("connectedTo", {
          defaultValue: "",
        });

        previousDeviceType.current = deviceType;
      }
    } else {
      toast.current?.show({
        severity: "error",
        summary: "Error fetch profile list",
      });
    }
  }, [edit, state?._id, deviceType, resetField]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "modbusAddress",
  });

  const handleSaveData = useCallback(
    async (data: PLTSProfileBody) => {
      const response = await requestHelper("create_plts_profile", {
        body: {
          ...data,
          connectedTo:
            data?.connectedTo === "" || data?.connectedTo === undefined
              ? undefined
              : data.connectedTo,
          modbusAddress: data.modbusAddress.map((item) => ({
            dataName: item.dataName,
            unit: item.unit,
            modbusAddress: item.modbusAddress,
            dataKey: camelCase(item.dataName),
            signed: item.signed,
            valuePrecision: item.valuePrecision || 1,
            includeInAverage: item.includeInAverage,
            maximumValue: item.maximumValue,
          })),
        },
      });

      if (response && response.status === 201) {
        navigate(-1);
      } else {
        setNotificationModal({
          message: response.response.data.message,
          visible: true,
        });
      }
    },
    [navigate]
  );

  const handleEditData = useCallback(
    async (data: PLTSProfileBody) => {
      const response = await requestHelper("patch_plts_profile", {
        body: {
          ...data,
          connectedTo:
            data?.connectedTo === "" || data?.connectedTo === undefined
              ? undefined
              : data.connectedTo,
          modbusAddress: data.modbusAddress.map((item) => ({
            dataName: item.dataName,
            unit: item.unit,
            modbusAddress: item.modbusAddress,
            dataKey: camelCase(item.dataName),
            signed: item.signed,
            valuePrecision: item.valuePrecision || 1,
            includeInAverage: item.includeInAverage,
            maximumValue: item.maximumValue,
          })),
          id: state._id,
        },
      });

      if (response.status === 200) {
        navigate(-1);
      } else {
        setNotificationModal({
          message: response.response.data.message,
          visible: true,
        });
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
    } else {
      toast.current?.show({
        severity: "error",
        summary: "Error fetch plts location",
      });
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
    } else {
      toast.current?.show({
        severity: "error",
        summary: "Error delete plts profile",
      });
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
      <Toast ref={toast} />

      <NotificationModal
        message={notificationModal.message}
        visible={notificationModal.visible}
        onButtonClicked={() =>
          setNotificationModal(PLTS_FORM_NOTIFICATION_MODAL_INITIAL_STATES)
        }
      />
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

      <FormConfirmationModal
        visible={showModal === "confirmation"}
        toggleClosedModal={() => setShowModal(undefined)}
        onSubmit={handleSubmit(onSubmit)}
      />

      <Container>
        <form className="mx-auto w-[90%] flex flex-col gap-y-5">
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
                label="Inverter Name"
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
                  onChange={(e) => {
                    setValue("connectedTo", "");
                    return field.onChange(e);
                  }}
                  id={field.name}
                  label="Device Type"
                  errorMessage={fieldState.error?.message}
                  options={PLTS_DEVICE_TYPE_DROPDOWN}
                />
              );
            }}
          />

          <Controller
            name="capacity"
            control={control}
            render={({ field, fieldState }) => (
              <InputNumber
                id={field.name}
                inputRef={field.ref}
                value={field.value}
                onBlur={field.onBlur}
                onValueChange={(e) => field.onChange(e)}
                label="Plant Capacity (Wp)"
                errorMessage={fieldState.error?.message}
              />
            )}
          />

          <div className="flex items-end gap-2  flex-col mediumDisplay:flex-row">
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
                resetField("connectedTo", {
                  defaultValue: "",
                });
              }}
            >
              Remove connected to
            </Button>
          </div>

          <div className="flex items-end gap-2 justify-between flex-col mediumDisplay:flex-row">
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
            render={({ field, fieldState }) => (
              <Input
                id={field.name}
                {...field}
                label="IP Address"
                errorMessage={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="port"
            rules={{
              required: "Port is required",
            }}
            control={control}
            render={({ field, fieldState }) => (
              <InputNumber
                id={field.name}
                inputRef={field.ref}
                value={field.value}
                onBlur={field.onBlur}
                onValueChange={(e) => field.onChange(e)}
                label="Port"
                errorMessage={fieldState.error?.message}
              />
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
                    includeInAverage: true,
                  })
                }
              >
                Add Modbus Address
              </Button>
            </div>

            <div className="flex flex-col gap-y-8">
              {fields.map((item, index) => {
                return (
                  <Fragment key={item.id}>
                    <div className="flex flex-wrap items-center mediumDisplay:grid mediumDisplay:grid-cols-7 gap-x-4 gap-y-2  mediumDisplay:items-end">
                      <Controller
                        name={`modbusAddress.${index}.dataName`}
                        control={control}
                        rules={{
                          required: "Data Name is required",
                        }}
                        render={({ field, fieldState }) => (
                          <Input
                            {...field}
                            id={field.name}
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
                          <InputNumber
                            id={field.name}
                            inputRef={field.ref}
                            value={field.value}
                            onBlur={field.onBlur}
                            onValueChange={(e) => field.onChange(e)}
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
                            {...field}
                            id={field.name}
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
                          <InputNumber
                            id={field.name}
                            inputRef={field.ref}
                            value={field.value}
                            onBlur={field.onBlur}
                            onValueChange={(e) => field.onChange(e)}
                            label="Value Precision"
                            errorMessage={fieldState.error?.message}
                          />
                        )}
                      />

                      <Controller
                        name={`modbusAddress.${index}.maximumValue`}
                        control={control}
                        render={({ field, fieldState }) => (
                          <InputNumber
                            id={field.name}
                            inputRef={field.ref}
                            value={field.value}
                            onBlur={field.onBlur}
                            onValueChange={(e) => field.onChange(e)}
                            label="Maximum Value"
                            errorMessage={fieldState.error?.message}
                          />
                        )}
                      />

                      <Checkbox
                        label="include in average"
                        control={control}
                        name={`modbusAddress.${index}.includeInAverage`}
                      />

                      <Button
                        className="basis-2/4 bg-red-500"
                        onClick={() => remove(index)}
                      >
                        Delete
                      </Button>
                    </div>

                    {!(fields.length === index + 1) && (
                      <div className="w-full h-1 bg-gray-200 my-4 mediumDisplay:hidden" />
                    )}
                  </Fragment>
                );
              })}
            </div>

            <div className="flex items-center justify-center gap-8 mt-8">
              <Button onClick={onSubmitButton} className="bg-blue-500 w-full">
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
