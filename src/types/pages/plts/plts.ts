import { GeneratorDataAverageProps } from "../../common";

export interface ModbusAddress {
  dataName: string;
  modbusAddress: number;
  unit: string;
  signed: "unsigned" | "signed";
  valuePrecision: number;
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
  deviceType?: "pvInverter" | "batteryInverter";
  connectedTo?: string;
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
  deviceType: "pvInverter" | "batteryInverter";
  connectedTo?: string;
  connectedWith?: string;
}

export interface PLTSProfileEditBody
  extends Omit<PLTSProfileBody, "modbusAddress"> {
  id: string;
  modbusAddress: (ModbusAddress & {
    dataKey: string;
  })[];
}

export interface PLTSProfileDeleteParams {
  id: string;
  pltsName: string;
}

export interface PLTSDataKeyParams {
  pltsName: string;
}

export interface PLTSProfileParams {
  id?: string;
  deviceType: "pvInverter" | "batteryInverter";
}

export interface PLTSProfileList {
  _id: string;
  pltsName: string;
}

export interface PltsProfileDetail {
  id: string;
}

export type DeviceType = "pvInverter" | "batteryInverter";

export interface PLTSProfileDetailResponse {
  _id: string;
  devicePosition: PLTSPositionDataResponse;
  ipAddress: string;
  pltsName: string;
  port: string;
  smaDeviceName: string;
  globalHorizontalIrradiance: number;
  installedPower: number;
  powerPerYear: number;
  pvSurfaceArea: number;
  deviceType: DeviceType;
}

export interface PLTSProfileDetailAverageParams {
  pltsName: string;
  dataTime: string;
}

export interface PLTSCSVDownloadFileParams {
  pltsName: string;
  startDate: string;
  endDate: string;
}

export interface PLTSProfileDetailAverageResponse {
  data: GeneratorDataAverageProps[];
  dataKeyArray: string[];
}

export interface PLTSAnalyticValueParams {
  id: string;
  pltsName: string;
}

export interface PLTSAnalyticValueResponse {
  installedPowerLoadFactor: number | null;
  performanceRatio: number | null;
  compensatedPerformanceRatio: number | null;
  capacityFactor: number | null;
  installedPowerLoadDuration: number | null;
  maximumPowerLoadDuration: number | null;
}

export interface PLTSComparingValueDataProps {
  [key: string]: string | number;
  _id: string;
  time: string;
  totalData: number;
}

export interface PLTSComparingValueResponse {
  data: PLTSComparingValueDataProps[];
  pltsKey: string[];
}

export interface PLTSCumulativeValueResponse {
  data: PLTSComparingValueDataProps[];
  pltsKey: string[];
}

export interface PLTSCumulativeValueParams {
  dataName: string;
  dataTime: string;
}

export interface PLTSComparingValueParams {
  dataName: string;
}

export interface PLTSClusterValueParams {
  id: string;
  dataTime: string;
}

export interface PLTSClusterValueResponseDataProps {
  [key: string]: string | number;
  time: string;
}

export interface PLTSClusterValueResponse {
  dataKey: string[];
  data: PLTSClusterValueResponseDataProps[];
}

export interface PLTSTotalClusterParams {
  dataTime: string;
}

export interface TotalClusterDataProps {
  _id: string;
  time: string;
  batteryInverter: number;
  pvInverter: number;
  gridPower: number;
}

export interface PLTSTotalClusterResponse {
  data: TotalClusterDataProps[];
  dataKey: string[];
}

export interface PLTSAnalyticValueProps {
  id: string;
  pltsName: string;
  deviceType: DeviceType;
}
