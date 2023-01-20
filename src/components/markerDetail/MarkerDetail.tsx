import { memo } from "react";
import { Tooltip } from "react-leaflet";

export interface MarkerDetailProps {
  title: string;
  description: string;
  lat: number;
  lng: number;
}

export default function MarkerDetail({
  description,
  title,
  lat,
  lng,
}: MarkerDetailProps) {
  return (
    <Tooltip>
      <h3 className="text-xl  ">{title}</h3>
      <p className="text-sm">{description}</p>
    </Tooltip>
  );
}

export const MemoizedMarkerDetail = memo(MarkerDetail);
