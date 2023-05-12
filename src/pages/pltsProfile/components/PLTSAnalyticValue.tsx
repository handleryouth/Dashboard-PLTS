import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Section } from "components";
import { requestHelper } from "utils";
import { PLTSAnalyticValueProps } from "types";

export default function PLTSAnalyticValue({
  pltsName,
  deviceType,
}: PLTSAnalyticValueProps) {
  const { id } = useParams<"id">();

  const handleLoadData = useCallback(async () => {
    const response = await requestHelper("get_plts_analytic_value", {
      params: {
        id,
        pltsName,
      },
    });

    if (response && response.status === 200) {
      return response.data.data;
    }
  }, [id, pltsName]);

  const { data: analyticData } = useQuery({
    queryKey: ["get_plts_analytic_value", id, pltsName],
    queryFn: handleLoadData,
    enabled: deviceType === "pvInverter",
  });

  return (
    <>
      <div className="prose !max-w-none bg-white  rounded-sm ">
        <h3 className="mt-0">Performance Detail</h3>

        <div className="grid grid-cols-1 smallToMediumDisplay:grid-cols-2  w-full gap-4">
          <Section
            title="Installed Power Load Factor"
            value={analyticData?.installedPowerLoadFactor ?? "-"}
            direction="column"
            tooltipId="installedPowerLoadFactor"
            valueClassName="w-min"
            valueTooltip="Installed power load factor is the ratio of average power to installed power. To calculate this value, provide average power data in modbus address and installed power  in the profile."
          />
          <Section
            title="Installed Power Load Duration"
            value={analyticData?.installedPowerLoadDuration ?? "-"}
            direction="column"
            valueClassName="w-min"
            valueTooltip="Installed power load duration  is determined based on installed power load factor  multiply by power plant’s runtime. To calculate this value, provide value of installed power load factor and operating time in the profile."
            tooltipId="installedPowerLoadDuration"
          />
          <Section
            title="Maximum Power Load Duration"
            value={analyticData?.maximumPowerLoadDuration ?? "-"}
            direction="column"
            valueClassName="w-min"
            valueTooltip="Maximum power load duration  is calculated as ratio between generated energy  and maximum power plant output. To calculate this value, provide operating time, power and installed power  in the profile."
            tooltipId="maximumPowerLoadDuration"
          />

          <Section
            title="Capacity Factor"
            value={analyticData?.capacityFactor ?? "-"}
            direction="column"
            valueTooltip="the ratio of its actual output over a period of time, to its potential output. To calculate this value, provide installed power (kW) in the profile."
            tooltipId="capacityFactor"
            valueClassName="w-min"
          />
        </div>
      </div>
    </>
  );
}
