import { useCallback, useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { MAP_COORDINATES } from "const";
import { MemoizedMarkerDetail } from "components";
import { AnimatedSlideMap, requestHelper } from "utils";
import { PLTSMap } from "types";

export default function Map() {
  const [mapData, setMapData] = useState<PLTSMap>();

  const getData = useCallback(async () => {
    const response = await requestHelper("plts_get_map_overview");

    setMapData(response);
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div>
      <h1 className="text-center">Plants Location</h1>

      <div>
        <MapContainer
          center={[-7.284, 112.796]}
          zoom={17}
          scrollWheelZoom={false}
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
            <Marker position={[item.lat, item.lng]} key={key}>
              <MemoizedMarkerDetail
                lat={item.lat}
                lng={item.lng}
                description={item.address}
                title={item.name}
                data={mapData && mapData[item.dataKey]}
              />
            </Marker>
          ))}

          <AnimatedSlideMap />
        </MapContainer>
      </div>
    </div>
  );
}
