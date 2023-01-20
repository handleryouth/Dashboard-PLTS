export interface GeneratorDataProps {
  deviceType: number;
  time: string;
  totalYield: number;
  temperature: number;
  gridFrequency: number;
  power: number;
  powerPhaseL1: number;
  powerPhaseL2: number;
  powerPhaseL3: number;
  operatingTime: number;
  dailyYield: number;
  reactivePower: number;
  apparentPower: number;
  gridCurrent: number;
  residualCurrent: number;
  displacementPowerFactor: number;
  gridNominalVoltage: number;
  gridVoltagePhaseL1: number;
  gridVoltagePhaseL2: number;
  gridVoltagePhaseL3: number;
}
