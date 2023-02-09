import { GeneratorDataProps } from "../../common";

export type PLTSMapKey = "aj301" | "researchCenter" | "rektoratITS";

export interface SideDetailProps {
  dataKey?: PLTSMapKey;
}

export interface PLTSMapDetailData {
  data: GeneratorDataProps;
}
