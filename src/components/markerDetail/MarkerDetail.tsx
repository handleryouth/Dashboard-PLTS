import { memo } from "react";
import { Tooltip } from "react-leaflet";
import { PLTSDetailResponse } from "types";

export interface MarkerDetailProps {
  title: string;
  description: string;
  lat: number;
  lng: number;
  data?: PLTSDetailResponse;
}

export default function MarkerDetail({
  description,
  title,
  lat,
  lng,
  data,
}: MarkerDetailProps) {
  return (
    <Tooltip>
      <h3>{title}</h3>
      <p>{description}</p>
      <p>Latitude: {lat}</p>
      <p>Longitude: {lng}</p>

      <ul>
        <li>Apparent Power: {data?.apparentPower}</li>
        <li>Daily Yield: {data?.dailyYield}</li>
        <li>Grid Current: {data?.gridCurrent}</li>
        <li>Power: {data?.power}</li>
        <li>Temperature: {data?.temperature}</li>
      </ul>
    </Tooltip>
  );
}

export const MemoizedMarkerDetail = memo(MarkerDetail);
