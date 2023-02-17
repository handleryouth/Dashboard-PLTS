export interface ModbusAddress {
  dataName?: string;
  modbusAddress?: number;
}

export interface PLTSProfileBody {
  pltsName: string;
  smaDeviceName: string;
  devicePosition: string;
  ipAddress: string;
  port: string;
  modbusAddress: ModbusAddress[];
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
}

export interface PLTSProfileEditBody extends PLTSProfileBody {
  id: string;
}
