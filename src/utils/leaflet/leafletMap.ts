import { useEffect } from "react";
import { useMap, useMapEvent } from "react-leaflet";

export const AnimatedSlideMap = () => {
  const map = useMapEvent("click", (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: true,
    });
  });
  return null;
};

export interface InvalidateSizeMapProps {
  updateMap: boolean;
  afterUpdate: () => void;
}

export const InvalidateSizeMap = ({
  updateMap,
  afterUpdate,
}: InvalidateSizeMapProps) => {
  const map = useMap();
  useEffect(() => {
    if (updateMap) {
      map.invalidateSize();
      afterUpdate();
    }
  }, [updateMap, map, afterUpdate]);
  return null;
};
