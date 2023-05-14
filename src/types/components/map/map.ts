import { PLTSMapKey, PLTSMapListResponse } from "../../pages";

export interface MapCoordinates {
  name: string;
  address: string;
  lat: number;
  lng: number;
  dataKey: PLTSMapKey;
}

export interface SmallSideDetailProps {
  visible: boolean;
  toggleSideDetailClosed: () => void;
  data?: PLTSMapListResponse;
}
