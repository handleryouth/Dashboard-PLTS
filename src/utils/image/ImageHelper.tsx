import researchCenterImage from "assets/img/research-center.jpg";
import rektoratItsImage from "assets/img/rektorat-its.jpg";
import aj301Image from "assets/img/aj301.png";

export type ImageNameType = "researchCenter" | "aj301" | "rektoratIts";

export type ImageType = Record<ImageNameType, string>;

const IMAGE_NAME_LOOKUP: ImageType = {
  researchCenter: researchCenterImage,
  rektoratIts: rektoratItsImage,
  aj301: aj301Image,
};

export function imageHelper(image: ImageNameType) {
  return IMAGE_NAME_LOOKUP[image];
}
