import { PLTSMapKey } from "../../pages";

export interface MapCoordinates {
  name: string;
  address: string;
  lat: number;
  lng: number;
  dataKey: PLTSMapKey;
}
