import { useCallback, useEffect, useState } from "react";
import { Section } from "components";
import { requestHelper } from "utils";
import { PLTSAnalyticValueProps, PLTSAnalyticValueResponse } from "types";
import { ANALYTIC_DATA_INITIAL_STATE } from "const";

export default function PLTSAnalyticValue({
  id,
  pltsName,
  deviceType,
}: PLTSAnalyticValueProps) {
  const [analyticData, setAnalyticData] = useState<PLTSAnalyticValueResponse>(
    ANALYTIC_DATA_INITIAL_STATE
  );

  const handleLoadData = useCallback(async () => {
    const response = await requestHelper("get_plts_analytic_value", {
      params: {
        id,
        pltsName,
      },
    });

    if (response && response.status) {
      setAnalyticData(response.data.data);
    }
  }, [id, pltsName]);

  useEffect(() => {
    if (deviceType === "pvInverter") {
      handleLoadData();
    }
  }, [deviceType, handleLoadData]);

  return (
    <>
      <div className="prose !max-w-none bg-white px-4 rounded-sm my-4">
        <h3 className="my-0">Performance Detail</h3>

        <div className="grid grid-cols-1 smallToMediumDisplay:grid-cols-2  w-full gap-4">
          <Section
            title="Performance Ratio"
            value={analyticData.performanceRatio ?? "-"}
            direction="column"
            tooltipId="performanceRatio"
            valueClassName="w-min"
            valueTooltip="The ratio of the actual and theoretically possible energy outputs. to calculate this value, provide power, Global Horizontal Irradiance (GHI) (kWh/m^2), and PV Surface Area (m^2) in the profile."
          />
          <Section
            title="Installed Power Load Factor"
            value={analyticData.installedPowerLoadFactor ?? "-"}
            direction="column"
            tooltipId="installedPowerLoadFactor"
            valueClassName="w-min"
            valueTooltip="Installed power load factor is the ratio of average power to installed power. To calculate this value, provide average power data in modbus address (kWh) and installed power (kW) in the profile."
          />
          <Section
            title="Installed Power Load Duration"
            value={analyticData.installedPowerLoadDuration ?? "-"}
            direction="column"
            valueClassName="w-min"
            valueTooltip="Installed power load duration  is determined based on installed power load factor  multiply by power plant’s runtime. To calculate this value, provide value of installed power load factor and operating time (s) in the profile."
            tooltipId="installedPowerLoadDuration"
          />
          <Section
            title="Maximum Power Load Duration"
            value={analyticData.maximumPowerLoadDuration ?? "-"}
            direction="column"
            valueClassName="w-min"
            valueTooltip="Maximum power load duration  is calculated as ratio between generated energy  and maximum power plant output. To calculate this value, provide operating time (s), power and installed power (kW) in the profile."
            tooltipId="maximumPowerLoadDuration"
          />
          <Section
            title="Compensated Performance Ratio"
            value={analyticData.compensatedPerformanceRatio ?? "-"}
            direction="column"
            valueTooltip="Performance Ratio with  corrected for cell temperature (CPR) over an assessment period. To calculate this value, provide temperature (in Celcius) data in modbus address  and performance ratio in the profile."
            tooltipId="compensatedPerformanceRatio"
            valueClassName="w-min"
          />
          <Section
            title="Capacity Factor"
            value={analyticData.capacityFactor ?? "-"}
            direction="column"
            valueTooltip="the ratio of its actual output over a period of time, to its potential output. To calculate this value, provide power per year (kWh) and installed power (kW) in the profile."
            tooltipId="capacityFactor"
            valueClassName="w-min"
          />
        </div>
      </div>
    </>
  );
}
