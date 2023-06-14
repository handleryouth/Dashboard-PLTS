import { useCallback, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Container, MemoizedMarkerDetail, NewRefetch } from "components";
import { requestHelper } from "utils";
import { PLTSMapListResponse } from "types";
import { useQuery } from "@tanstack/react-query";
import { ProgressSpinner } from "primereact/progressspinner";
import { SideDetail, SmallSideDetail } from "./component";

export default function Map() {
  const [selectedMapData, setSelectedMapData] = useState<PLTSMapListResponse>();

  const getPltsPositonList = useCallback(async () => {
    const response = await requestHelper("get_plts_map");

    if (response && response.status === 200) {
      return response.data.data;
    } else {
      throw new Error("Failed to fetch map list");
    }
  }, []);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["pltsMapList"],
    queryFn: getPltsPositonList,
  });

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

  if (isError) {
    return <NewRefetch restart={refetch} />;
  }

  return (
    <Container>
      <h1 className="mt-4">Plants Location</h1>

      {isLoading ? (
        <div className="flex items-center justify-center h-full min-h-[10rem]">
          <ProgressSpinner className="w-14 h-14" />
        </div>
      ) : (
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

              {data?.map((item) => (
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
            </MapContainer>
          </div>

          <SideDetail data={selectedMapData} />
          <SmallSideDetail
            visible={!!selectedMapData}
            toggleSideDetailClosed={() => setSelectedMapData(undefined)}
            data={selectedMapData}
          />
        </div>
      )}
    </Container>
  );
}
