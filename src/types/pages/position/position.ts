import { PLTSPositionBody } from "../plts";

export interface EarthPosition {
  lat: number;
  lng: number;
}

export type PositionModalFormType = Omit<PLTSPositionBody, "lat" | "lng">;
