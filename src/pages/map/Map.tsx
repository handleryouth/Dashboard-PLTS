import { useCallback, useState, useEffect } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Container, MemoizedMarkerDetail } from "components";
import { InvalidateSizeMap, requestHelper } from "utils";
import { PLTSMapListResponse } from "types";
import { SideDetail, SmallSideDetail } from "./component";

export default function Map() {
  const [forceUpdate, setForceUpdate] = useState(false);

  const [selectedMapData, setSelectedMapData] = useState<PLTSMapListResponse>();

  const [mapList, setMapList] = useState<PLTSMapListResponse[]>([]);

  const handleClickEvent = useCallback(
    (value: PLTSMapListResponse) => {
      if (value.name === selectedMapData?.name) {
        setSelectedMapData(undefined);
      } else {
        setSelectedMapData(value);
      }
    },
    [selectedMapData]
  );

  const getPltsPositonList = useCallback(async () => {
    const response = await requestHelper("get_plts_map");

    if (response && response.status === 200) {
      setMapList(response.data.data);
    }
  }, []);

  useEffect(() => {
    getPltsPositonList();
  }, [getPltsPositonList]);

  console.log("selected", selectedMapData);

  return (
    <Container>
      <h1 className="mt-4">Plants Location</h1>

      <div className="flex">
        <div className="w-full">
          <MapContainer
            center={[-7.284, 112.796]}
            zoom={17}
            scrollWheelZoom={false}
            style={{
              minHeight: "100vh",
              width: "100%",
              zIndex: 0,
            }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {mapList.map((item) => (
              <Marker
                key={item._id}
                position={[item.lat, item.lng]}
                eventHandlers={{
                  click: () => handleClickEvent(item),
                }}
              >
                <MemoizedMarkerDetail
                  lat={item.lat}
                  lng={item.lng}
                  description={item.address}
                  title={item.name}
                />
              </Marker>
            ))}

            {/* <AnimatedSlideMap /> */}
            <InvalidateSizeMap
              updateMap={forceUpdate}
              afterUpdate={() => setForceUpdate(false)}
            />
          </MapContainer>
        </div>

        <SideDetail data={selectedMapData} />
        <SmallSideDetail
          visible={Boolean(selectedMapData)}
          // toggleSideDetailClosed={() => setSelectedMapData(undefined)}
          toggleSideDetailClosed={() => console.log("called sidebar closed")}
          data={selectedMapData}
        />
      </div>
    </Container>
  );
}
