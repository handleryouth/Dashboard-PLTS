import researchCenterImage from "assets/img/research-center.jpg";
import rektoratItsImage from "assets/img/rektorat-its.jpg";
import aj301Image from "assets/img/aj301.png";
import { PLTSMapKey } from "types";

export type ImageNameType = PLTSMapKey;

export type ImageType = Record<ImageNameType, string>;

const IMAGE_NAME_LOOKUP: ImageType = {
  researchCenter: researchCenterImage,
  rektoratITS: rektoratItsImage,
  aj301: aj301Image,
};

export function imageHelper(image: ImageNameType) {
  return IMAGE_NAME_LOOKUP[image];
}
