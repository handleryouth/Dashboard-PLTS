import { useCallback, useState, useMemo } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import {
  Container,
  Dropdown,
  LineChart,
  RenderedChartItem,
  Section,
} from "components";
import { GeneratorDataPropsExcludeDeviceType } from "types";
import { GENERATOR_DATA_DROPDOWN_ITEMS, DROPDOWN_LOCATIONS_ITEMS } from "const";
import { PLTSAnalyticValue } from "./components";

export interface ContainerWidth {
  width: number;
  height: number;
}

export default function PltsDetail() {
  const [containerWidth, setContainerWidth] = useState<ContainerWidth>({
    height: 0,
    width: 0,
  });

  const containerRef = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setContainerWidth(node.getBoundingClientRect());
    }
  }, []);

  const handleRenderItem = useCallback(
    (
      item: GeneratorDataPropsExcludeDeviceType
    ): RenderedChartItem<GeneratorDataPropsExcludeDeviceType> => ({
      ...item,
      time: new Date(item.time).toLocaleTimeString(),
    }),
    []
  );

  const memoizedMapComponent = useMemo(() => {
    return (
      <MapContainer
        center={[-7.284, 112.796]}
        zoom={17}
        scrollWheelZoom={false}
        style={{
          height: Math.max(340, containerWidth.height),
          width: "100%",
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[-7.284, 112.796]} />
      </MapContainer>
    );
  }, [containerWidth?.height]);

  return (
    <Container>
      <div className="grid grid-cols-2 items-center" ref={containerRef}>
        {memoizedMapComponent}
        <LineChart
          chartData={[]}
          coordinate={{
            x: "time",
            y: "dailyYield",
          }}
          title="Average Value"
          renderItem={handleRenderItem}
          customDropdownComponent={
            <div className="flex items-center gap-x-4 w-full">
              <Dropdown
                options={GENERATOR_DATA_DROPDOWN_ITEMS}
                filter
                onChange={(e) => null}
                className="w-full"
              />

              <Dropdown
                options={DROPDOWN_LOCATIONS_ITEMS}
                filter
                onChange={(e) => null}
                className="w-full"
              />
            </div>
          }
        />

        <PLTSAnalyticValue />

        <LineChart
          chartData={[]}
          coordinate={{
            x: "time",
            y: "dailyYield",
          }}
          title="Average Value"
          renderItem={handleRenderItem}
          customDropdownComponent={
            <div className="flex items-center gap-x-4 w-full">
              <Dropdown
                options={GENERATOR_DATA_DROPDOWN_ITEMS}
                filter
                onChange={(e) => null}
                className="w-full"
              />

              <Dropdown
                options={DROPDOWN_LOCATIONS_ITEMS}
                filter
                onChange={(e) => null}
                className="w-full"
              />
            </div>
          }
        />
      </div>

      <div>
        <h3>About</h3>
        <div className="grid grid-cols-2">
          <Section title="PLTS Name" value="PLTS 1" direction="column" />
          <Section
            title="SMA Device Name"
            value="Sunny Tri Power"
            direction="column"
          />
          <Section title="IP Address" value="1.1.1.1" direction="column" />
          <Section title="Port" value="502" direction="column" />
        </div>
      </div>
    </Container>
  );
}
