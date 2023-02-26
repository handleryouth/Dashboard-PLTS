import { Button, Container, Input } from "components";
import { useState, useMemo, useRef, useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { useLocation, useNavigate } from "react-router-dom";
import {
  EarthPosition,
  PLTSPositionDataResponse,
  PositionModalFormType,
} from "types";
import { requestHelper } from "utils";

export interface PositionFormProps {
  edit?: boolean;
}

export interface PositionFormLocationState {
  state: PLTSPositionDataResponse;
}

const POSITION_FORM_INITIAL_STATE: PositionModalFormType = {
  address: "",
  name: "",
};

export default function PositionForm({ edit }: PositionFormProps) {
  const navigate = useNavigate();

  const { state }: PositionFormLocationState = useLocation();

  const markerRef = useRef<any>(null);
  const [latitudeLongitude, setLatitudeLongitude] = useState<EarthPosition>({
    lat: state?.lat ?? -7.284,
    lng: state?.lng ?? 112.796,
  });

  const { control, handleSubmit } = useForm<PositionModalFormType>({
    defaultValues: edit ? state : POSITION_FORM_INITIAL_STATE,
  });

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        setLatitudeLongitude(markerRef.current.getLatLng());
      },
    }),
    []
  );

  const handleCreatePosition = useCallback(
    async (data: PositionModalFormType) => {
      const response = await requestHelper("create_plts_position", {
        body: {
          ...data,
          lat: latitudeLongitude?.lat,
          lng: latitudeLongitude?.lng,
        },
      });
      if (response.status === 201) {
        navigate(-1);
      }
    },
    [latitudeLongitude, navigate]
  );

  const handleEditPosition = useCallback(
    async (data: PositionModalFormType) => {
      const response = await requestHelper("patch_plts_position", {
        body: {
          ...data,
          lat: latitudeLongitude?.lat,
          lng: latitudeLongitude?.lng,
        },
      });

      if (response && response.status === 201) {
        navigate(-1);
      }
    },
    [latitudeLongitude?.lat, latitudeLongitude?.lng, navigate]
  );

  const handleSubmitEvent = useCallback(
    (data: PositionModalFormType) => {
      edit ? handleEditPosition(data) : handleCreatePosition(data);
    },
    [edit, handleCreatePosition, handleEditPosition]
  );

  const memoizedMapContainer = useMemo(() => {
    return (
      <MapContainer
        center={edit ? [state?.lat, state?.lng] : [-7.284, 112.796]}
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
          position={edit ? [state?.lat, state?.lng] : [-7.284, 112.796]}
        />
      </MapContainer>
    );
  }, [edit, eventHandlers, state?.lat, state?.lng]);

  return (
    <Container>
      <form
        onSubmit={handleSubmit(handleSubmitEvent)}
        className="flex flex-col gap-y-4"
      >
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

        <div className="flex items-center gap-x-4 mt-4 justify-center">
          <Button className="w-full bg-blue-500" type="submit">
            Add
          </Button>
          <Button className="w-full bg-red-500" onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </div>
      </form>
    </Container>
  );
}
