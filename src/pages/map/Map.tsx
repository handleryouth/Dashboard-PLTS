import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvent,
} from "react-leaflet";
import { MAP_COORDINATES } from "const";
import { MarkerDetail } from "components";

const AnimatedSlideMap = () => {
  const map = useMapEvent("click", (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: true,
    });
  });
  return null;
};

export default function Map() {
  return (
    <div>
      <h1>Plants Location</h1>

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
              <MarkerDetail
                lat={item.lat}
                lng={item.lng}
                description={item.address}
                title={item.name}
              />
              <Popup>{item.name}</Popup>
            </Marker>
          ))}

          <AnimatedSlideMap />
        </MapContainer>
      </div>
    </div>
  );
}
