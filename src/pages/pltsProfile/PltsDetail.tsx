import { useCallback, useState, useMemo } from "react";
import { LatLngExpression } from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";
import { Container, Section, ErrorRefetch } from "components";
import { convertCamelCaseToPascalCase, requestHelper } from "utils";
import {
  AverageDashbord,
  ClusterPowerDashboard,
  EnergyDashboard,
  PLTSAnalyticValue,
} from "./components";
import { MonitoringChart } from "../dashboard";

export interface ContainerWidth {
  width: number;
  height: number;
}

const MAP_DEFAULT_POSITION: LatLngExpression = [-7.284, 112.796];

export default function PltsDetail() {
  const { id } = useParams<"id">();

  const getDetailData = useCallback(async () => {
    const response = await requestHelper("get_plts_profile_detail", {
      params: {
        id,
      },
    });

    if (response && response.status === 200) {
      return response.data.data;
    } else {
      throw new Error("Failed to get data");
    }
  }, [id]);

  const {
    isLoading,
    isError,
    data: pltsDetailData,
  } = useQuery({
    queryKey: ["pltsDetail", id],
    queryFn: getDetailData,
    cacheTime: 0,
    staleTime: 0,
  });

  const [containerWidth, setContainerWidth] = useState<ContainerWidth>({
    height: 0,
    width: 0,
  });

  const containerRef = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setContainerWidth(node.getBoundingClientRect());
    }
  }, []);

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

  if (isError) {
    return <ErrorRefetch />;
  }

  return (
    <Container>
      <h1>PLTS Detail </h1>
      <h3>{pltsDetailData?.pltsName ?? "-"}</h3>

      {isLoading ? (
        <ProgressSpinner className="h-14 w-full mx-auto" />
      ) : (
        <div className="flex flex-col gap-y-12">
          <div
            className="grid  grid-cols-1 mediumDisplay:grid-cols-2 items-center gap-x-4"
            ref={containerRef}
          >
            {memoizedMapComponent}
            <ErrorRefetch>
              <MonitoringChart title={pltsDetailData?.pltsName ?? "-"} />
            </ErrorRefetch>
          </div>

          <ErrorRefetch>
            <AverageDashbord pltsName={pltsDetailData?.pltsName ?? "-"} />
          </ErrorRefetch>

          {pltsDetailData?.deviceType === "pvInverter" && (
            <ErrorRefetch>
              <PLTSAnalyticValue
                pltsName={pltsDetailData?.pltsName}
                deviceType={pltsDetailData?.deviceType}
              />
            </ErrorRefetch>
          )}

          <ErrorRefetch>
            <ClusterPowerDashboard />
          </ErrorRefetch>

          <ErrorRefetch>
            <EnergyDashboard />
          </ErrorRefetch>

          <div>
            <h3 className="mt-0">About</h3>
            <div className="grid grid-cols-2">
              <Section
                title="Inverter Name"
                value={pltsDetailData?.pltsName ?? "-"}
                direction="column"
              />
              <Section
                title="Device Type"
                value={
                  pltsDetailData?.deviceType
                    ? convertCamelCaseToPascalCase(pltsDetailData?.deviceType)
                    : "-"
                }
                direction="column"
              />

              <Section
                title="SMA Device Name"
                value={pltsDetailData?.smaDeviceName ?? "-"}
                direction="column"
              />
              <Section
                title="IP Address"
                value={pltsDetailData?.ipAddress ?? "-"}
                direction="column"
              />
              <Section
                title="Port"
                value={pltsDetailData?.port ?? "-"}
                direction="column"
              />
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}
