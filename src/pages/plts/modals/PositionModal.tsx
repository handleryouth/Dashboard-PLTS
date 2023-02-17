import { useCallback, useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Dialog } from "primereact/dialog";
import { Button, Input } from "components";
import { PLTSPositionBody } from "types";
import { requestHelper } from "utils";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

export interface PositionModalProps {
  toggleModalClosed: () => void;
  visible: boolean;
  onRequestCompleted: () => void;
}

export interface EarthPosition {
  lat: number;
  lng: number;
}

export type PositionModalFormType = Omit<PLTSPositionBody, "lat" | "lng">;

export default function PositionModal({
  toggleModalClosed,
  visible,
  onRequestCompleted,
}: PositionModalProps) {
  const markerRef = useRef<any>(null);

  const [latitudeLongitude, setLatitudeLongitude] = useState<EarthPosition>();

  const { control, handleSubmit } = useForm<PositionModalFormType>({
    defaultValues: {
      address: "",
      name: "",
    },
  });

  const onSubmit = useCallback(
    async (data: PositionModalFormType) => {
      const response = await requestHelper("create_plts_position", {
        body: {
          ...data,
          lat: latitudeLongitude?.lat,
          lng: latitudeLongitude?.lng,
        },
      });
      if (response.status === 201) {
        toggleModalClosed();
        onRequestCompleted();
      }
    },
    [
      latitudeLongitude?.lat,
      latitudeLongitude?.lng,
      onRequestCompleted,
      toggleModalClosed,
    ]
  );

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        setLatitudeLongitude(markerRef.current.getLatLng());
      },
    }),
    []
  );

  const memoizedMapContainer = useMemo(() => {
    return (
      <MapContainer
        center={[-7.284, 112.796]}
        zoom={17}
        scrollWheelZoom={false}
        style={{
          minHeight: "30rem",
          width: "100%",
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker
          draggable
          ref={markerRef}
          eventHandlers={eventHandlers}
          position={[-7.284, 112.796]}
        />
      </MapContainer>
    );
  }, [eventHandlers]);

  return (
    <Dialog
      header={<h1 className="text-center">Add Position</h1>}
      onHide={toggleModalClosed}
      visible={visible}
      dismissableMask
      closable={false}
      className="w-2/5"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Controller
          name="name"
          control={control}
          rules={{
            required: "Position Name is required",
          }}
          render={({ field, fieldState }) => (
            <Input
              id={field.name}
              {...field}
              label="Name"
              errorMessage={fieldState.error?.message}
            />
          )}
        />

        <Controller
          name="address"
          control={control}
          rules={{
            required: "Address is required",
          }}
          render={({ field, fieldState }) => (
            <Input
              id={field.name}
              {...field}
              label="Address"
              errorMessage={fieldState.error?.message}
            />
          )}
        />

        {memoizedMapContainer}

        <div className="flex items-center gap-x-4 mt-4">
          <Button className="w-full" type="submit">
            Add
          </Button>
          <Button className="w-full" onClick={toggleModalClosed}>
            Cancel
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
