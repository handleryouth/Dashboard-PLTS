import { SelectItemOptionsType } from "primereact/selectitem";
import { PLTSAnalyticValueResponse, PLTSProfileBody } from "types";

export const ANALYTIC_DATA_INITIAL_STATE: PLTSAnalyticValueResponse = {
  capacityFactor: 0,
  compensatedPerformanceRatio: 0,
  installedPowerLoadFactor: 0,
  performanceRatio: 0,
  installedPowerLoadDuration: 0,
  maximumPowerLoadDuration: 0,
};

export const PLTS_SIGNED_VALUE_DROPDOWN: SelectItemOptionsType = [
  {
    label: "Signed",
    value: "signed",
  },
  {
    label: "Unsigned",
    value: "unsigned",
  },
];

export const PLTS_DEVICE_TYPE_DROPDOWN: SelectItemOptionsType = [
  {
    label: "PV Inverter",
    value: "pvInverter",
  },
  {
    label: "Battery Inverter",
    value: "batteryInverter",
  },
];

export const PLTS_FORM_INITIAL_STATE: PLTSProfileBody = {
  pltsName: "",
  smaDeviceName: "",
  devicePosition: "",
  ipAddress: "",
  port: 0,
  modbusAddress: [],
  deviceType: "pvInverter",
  connectedTo: "",
};
