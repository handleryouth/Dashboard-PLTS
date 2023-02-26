import { GeneratorDataPropsExcludeDeviceType } from "../../common";

export interface ModbusAddress {
  dataName: string;
  modbusAddress: number;
  unit: string;
}

export interface PLTSProfileBody {
  pltsName: string;
  smaDeviceName: string;
  devicePosition: string;
  ipAddress: string;
  port: string;
  modbusAddress: ModbusAddress[];
  installedPower: number;
  globalHorizontalIrradiance: number;
  pvSurfaceArea: number;
  powerPerYear: number;
}

export interface PLTSPositionBody {
  name: string;
  address: string;
  lat: number;
  lng: number;
}

export interface PLTSPositionDataResponse {
  _id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  plantProfile: string[];
}

export interface PLTSPositionEditDataBody {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  plantProfile: string[];
}

export interface PLTSListParams {
  page: number;
  limit: number;
  search: string;
}

export interface PLTSListResponse {
  _id: string;
  devicePosition: PLTSPositionDataResponse;
  ipAddress: string;
  modbusAddress: ModbusAddress[];
  pltsName: string;
  port: string;
  smaDeviceName: string;
  globalHorizontalIrradiance: number;
  installedPower: number;
  powerPerYear: number;
  pvSurfaceArea: number;
}

export interface PLTSProfileEditBody extends PLTSProfileBody {
  id: string;
}

export interface PLTSProfileDeleteParams {
  id: string;
}

export interface PLTSProfileList {
  _id: string;
  pltsName: string;
}

export interface PltsProfileDetail {
  id: string;
}

export interface PLTSProfileDetailResponse {
  _id: string;
  devicePosition: PLTSPositionDataResponse;
  ipAddress: string;
  pltsName: string;
  port: string;
  smaDeviceName: string;
}

export interface PLTSProfileDetailAverageParams {
  pltsName: string;
  startDate?: string;
  endDate?: string;
}

export interface PLTSProfileDetailAverageResponse {
  data: GeneratorDataPropsExcludeDeviceType[];
  dataKeyArray: string[];
}

export interface PLTSAnalyticValueParams {
  id: string;
  pltsName: string;
}

export interface PLTSAnalyticValueResponse {
  installedPowerLoadFactor: number;
  performanceRatio: number;
  compensatedPerformanceRatio: number;
  capacityFactor: number;
}
