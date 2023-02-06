import { useCallback, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { MAP_COORDINATES } from "const";
import { MemoizedMarkerDetail } from "components";
import { InvalidateSizeMap } from "utils";
import { PLTSMapKey } from "types";
import { SideDetail } from "./component";

export default function Map() {
  const [forceUpdate, setForceUpdate] = useState(false);

  const [selectedData, setSelectedData] = useState<PLTSMapKey>();

  // const getData = useCallback(async () => {
  //   const response = await requestHelper("plts_get_map_overview");

  //   setMapData(response);
  // }, []);

  // useEffect(() => {
  //   getData();
  // }, [getData]);

  const handleClickEvent = useCallback(
    (value: PLTSMapKey) => {
      if (value === selectedData) {
        setSelectedData(undefined);
      } else {
        setSelectedData(value);
      }
    },
    [selectedData]
  );



  return (
    <>

      <div>
        <h1 className="mt-4">Plants Location</h1>

        <div className="flex">
          <div className="w-full">
            <MapContainer
              center={[-7.284, 112.796]}
              zoom={17}
              scrollWheelZoom={true}
              style={{
                minHeight: "100vh",
                width: "100%",
              }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {MAP_COORDINATES.map((item, key) => (
                <Marker
                  key={key}
                  position={[item.lat, item.lng]}
                  eventHandlers={{
                    click: () => handleClickEvent(item.dataKey),
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

          <SideDetail dataKey={selectedData} />
        </div>
      </div>
    </>
  );
}
