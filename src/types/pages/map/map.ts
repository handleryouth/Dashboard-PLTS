import { PLTSDetailResponse } from "../../common";

export type PLTSMapKey = "aj301" | "researchCenter" | "rektoratITS";

export type PLTSMap = Record<PLTSMapKey, PLTSDetailResponse>;
