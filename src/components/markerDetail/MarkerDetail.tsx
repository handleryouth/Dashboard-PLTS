import React from "react";
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
      <h3>{title}</h3>
      <p>{description}</p>
      <p>Latitude: {lat}</p>
      <p>Longitude: {lng}</p>

      <ul>
        <li>yield: 1234</li>
        <li>yield: 1234</li>
        <li>yield: 1234</li>
        <li>yield: 1234</li>
        <li>yield: 1234</li>
      </ul>
    </Tooltip>
  );
}
