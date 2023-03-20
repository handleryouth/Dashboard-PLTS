import { PLTSPositionBody, PLTSPositionDataResponse } from "../plts";

export interface EarthPosition {
  lat: number;
  lng: number;
}

export type PositionModalFormType = Omit<PLTSPositionBody, "lat" | "lng">;

export interface PositionFormProps {
  edit?: boolean;
}

export interface PositionFormLocationState {
  state: PLTSPositionDataResponse;
}

export type PositionTableHeaderProps =
  | keyof PLTSPositionDataResponse
  | "actionButton";


