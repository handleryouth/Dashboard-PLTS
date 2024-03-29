import { SelectItem } from "primereact/selectitem";
import { GeneratorDataProps } from "types";

export interface GeneratorDataDropdownProps extends Omit<SelectItem, "value"> {
  value?: keyof GeneratorDataProps;
}

export const GENERATOR_DATA_DROPDOWN_ITEMS: GeneratorDataDropdownProps[] = [
  {
    label: "Apparent Power",
    value: "apparentPower",
  },
  {
    label: "Daily Yield",
    value: "dailyYield",
  },
  {
    label: "Total Yield",
    value: "totalYield",
  },
  {
    label: "Temperature",
    value: "temperature",
  },
  {
    label: "Grid Frequency",
    value: "gridFrequency",
  },
  {
    label: "Power",
    value: "power",
  },
  {
    label: "Reactive Power",
    value: "reactivePower",
  },
  {
    label: "Grid Current",
    value: "gridCurrent",
  },
  {
    label: "Displacement Power Factor",
    value: "displacementPowerFactor",
  },
  {
    label: "Residual Current",
    value: "residualCurrent",
  },
  {
    label: "Power Phase L1",
    value: "powerPhaseL1",
  },
  {
    label: "Power Phase L2",
    value: "powerPhaseL2",
  },
  {
    label: "Power Phase L3",
    value: "powerPhaseL3",
  },
  {
    label: "Grid Nominal Voltage",
    value: "gridNominalVoltage",
  },
  {
    label: "Grid Voltage Phase L1",
    value: "gridVoltagePhaseL1",
  },
  {
    label: "Grid Voltage Phase L2",
    value: "gridVoltagePhaseL2",
  },
  {
    label: "Grid Voltage Phase L3",
    value: "gridVoltagePhaseL3",
  },
];

export const DROPDOWN_LOCATIONS_ITEMS: SelectItem[] = [
  {
    label: "AJ301",
    value: "aj301",
  },
  {
    label: "Research Center",
    value: "researchCenter",
  },
  {
    label: "Rektorat ITS",
    value: "rektoratIts",
  },
];
