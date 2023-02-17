import { GeneratorDataProps } from "../../common";
import { PLTSListResponse } from "../plts";

export type PLTSMapKey = "aj301" | "researchCenter" | "rektoratITS";

export interface SideDetailProps {
  data?: PLTSMapListResponse;
}

export interface PLTSMapDetailData {
  data: GeneratorDataProps;
}

export interface PLTSMapListResponse {
  _id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  plantProfile: PLTSListResponse[];
}
