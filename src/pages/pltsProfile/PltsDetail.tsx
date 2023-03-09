import { useCallback, useState, useMemo, useEffect } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { useParams } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";
import { Container, Section } from "components";
import { PLTSProfileDetailResponse } from "types";
import { requestHelper } from "utils";
import { AverageDashbord, PLTSAnalyticValue } from "./components";
import { MonitoringChart } from "../dashboard";
import { LatLngExpression } from "leaflet";

export interface ContainerWidth {
  width: number;
  height: number;
}

const MAP_DEFAULT_POSITION: LatLngExpression = [-7.284, 112.796];

export default function PltsDetail() {
  const [isLoading, setIsLoading] = useState(true);

  const [pltsDetailData, setPltsDetailData] =
    useState<PLTSProfileDetailResponse>();

  const { id } = useParams<"id">();

  const [containerWidth, setContainerWidth] = useState<ContainerWidth>({
    height: 0,
    width: 0,
  });

  const getDetailData = useCallback(async () => {
    const response = await requestHelper("get_plts_profile_detail", {
      params: {
        id,
      },
    });

    if (response && response.status === 200) {
      setPltsDetailData(response.data.data);
      setIsLoading(false);
    }
  }, [id]);

  const containerRef = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setContainerWidth(node.getBoundingClientRect());
    }
  }, []);

  useEffect(() => {
    getDetailData();
  }, [getDetailData]);

  const memoizedMapComponent = useMemo(() => {
    return (
      <MapContainer
        center={
          pltsDetailData
            ? [
                pltsDetailData.devicePosition.lat,
                pltsDetailData.devicePosition.lng,
              ]
            : MAP_DEFAULT_POSITION
        }
        zoom={17}
        scrollWheelZoom={false}
        style={{
          height: Math.max(340, containerWidth.height),
          width: "100%",
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker
          position={
            pltsDetailData
              ? [
                  pltsDetailData.devicePosition.lat,
                  pltsDetailData.devicePosition.lng,
                ]
              : MAP_DEFAULT_POSITION
          }
        />
      </MapContainer>
    );
  }, [containerWidth.height, pltsDetailData]);

  return (
    <Container>
      <h1>PLTS Detail {pltsDetailData?.pltsName ?? "-"}</h1>
      {isLoading ? (
        <ProgressSpinner className="text-center" />
      ) : pltsDetailData ? (
        <>
          <div
            className="grid  grid-cols-1 mediumDisplay:grid-cols-2 items-center gap-x-4"
            ref={containerRef}
          >
            {memoizedMapComponent}
            <MonitoringChart title={pltsDetailData.pltsName} />
          </div>

          <AverageDashbord pltsName={pltsDetailData.pltsName} />

          <PLTSAnalyticValue pltsName={pltsDetailData.pltsName} id={id!} />

          <div>
            <h3>About</h3>
            <div className="grid grid-cols-2">
              <Section title="PLTS Name" value="PLTS 1" direction="column" />
              <Section
                title="SMA Device Name"
                value={pltsDetailData?.smaDeviceName ?? "-"}
                direction="column"
              />
              <Section
                title="IP Address"
                value={pltsDetailData.ipAddress ?? "-"}
                direction="column"
              />
              <Section
                title="Port"
                value={pltsDetailData?.port ?? "-"}
                direction="column"
              />
              <Section
                title="Global Horizontal Irradiance (kWh/m^2)"
                value={pltsDetailData?.globalHorizontalIrradiance ?? "-"}
                direction="column"
              />

              <Section
                title="Power per Year (kWh)"
                value={pltsDetailData?.powerPerYear ?? "-"}
                direction="column"
              />

              <Section
                title="PV Surface Area (m^2)"
                value={pltsDetailData?.pvSurfaceArea ?? "-"}
                direction="column"
              />
            </div>
          </div>
        </>
      ) : (
        <div>
          <h3>No data found.</h3>
        </div>
      )}
    </Container>
  );
}
