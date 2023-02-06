import { GeneratorDataProps } from "../../common";

export type PLTSMapKey = "aj301" | "researchCenter" | "rektoratITS";

export type PLTSMap = Record<PLTSMapKey, GeneratorDataProps>;

export interface SideDetailProps {
  dataKey?: PLTSMapKey;
}
