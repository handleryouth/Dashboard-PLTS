import { GeneratorDataAverageProps } from "../../common";

export interface ModbusAddress {
  dataName: string;
  modbusAddress: number;
  unit: string;
  signed: "unsigned" | "signed";
  valuePrecision: number;
  includeInAverage: boolean;
}

export interface PLTSProfileBody {
  pltsName: string;
  smaDeviceName: string;
  devicePosition: string;
  ipAddress: string;
  port: string;
  modbusAddress: ModbusAddress[];
  deviceType?: "pvInverter" | "batteryInverter";
  connectedTo?: string;
}

export interface PLTSPositionBody {
  name: string;
  address: string;
  lat: number;
  lng: number;
}

export interface PLTSPositionParams {
  search?: string;
  page?: number;
  limit: number;
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
  haveModbusData?: string;
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

export interface PltsUnitProps {
  unit: string;
  dataKey: string;
}

export interface PLTSFormProps {
  edit?: boolean;
}

export type PLTSFormModalState =
  | "delete"
  | "position"
  | "confirmation"
  | undefined;

export interface PLTSProfileDetailAverageResponse {
  data: GeneratorDataAverageProps[];
  dataKeyArray: string[];
  unit: PltsUnitProps[];
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
  dataType?: "power" | "energy";
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
  dataType?: "power" | "energy";
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
  pltsName: string;
  deviceType: DeviceType;
}

export interface PLTSDetailEnergyParams {
  dataTime: string;
  pltsName: string;
}

export interface PLTSDetailEnergyResponse {
  _id: string;
  power: number;
  time: string;
}

export interface PLTSDetailPowerParams {
  pltsName: string;
}

export interface PLTSDetailPowerResponse {
  time: string;
  power: number;
}

export type DataTimeType = "daily" | "monthly" | "yearly" | "hourly";

export interface PLTSGetPowerParams {
  pltsName: string;
  dataTime: DataTimeType;
}

export interface PLTSGetPowerResponse {
  _id: string;
  time: string;
  power: number;
}
