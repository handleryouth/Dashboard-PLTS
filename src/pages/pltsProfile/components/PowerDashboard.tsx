import { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SelectButton } from "primereact/selectbutton";
import { LineChart } from "components";
import { BUTTON_LABEL_TIME_SELECTION } from "const";
import { DataTimeType, PLTSGetPowerResponse, RenderedChartItem } from "types";
import { generateDateLocale, requestHelper } from "utils";

export interface PowerDashboardProps {
  pltsName?: string;
}

export default function PowerDashboard({ pltsName }: PowerDashboardProps) {
  const [period, setPeriod] = useState<DataTimeType>("daily");

  const getPowerData = useCallback(async () => {
    const response = await requestHelper("plts_get_power", {
      params: {
        dataTime: period,
        pltsName: pltsName,
      },
    });

    if (response && response.status === 200) {
      return response.data.data;
    } else {
      throw new Error("failed to get power data");
    }
  }, [period, pltsName]);

  const { data: powerData, isFetching: powerDataIsFetching } = useQuery({
    queryKey: ["powerData", pltsName, period],
    queryFn: getPowerData,
    enabled: !!pltsName,
  });

  const handleRenderItem = useCallback(
    (item: PLTSGetPowerResponse): RenderedChartItem<PLTSGetPowerResponse> => ({
      ...item,
      time: generateDateLocale(period, item.time),
    }),
    [period]
  );

  return (
    <LineChart
      isLoading={powerDataIsFetching}
      singleChartData={powerData ?? []}
      coordinate={{
        x: "time",
        y: "power",
      }}
      yUnit="W"
      title="Power Graph"
      renderItem={handleRenderItem}
      customDropdownComponent={
        <div className="flex items-center justify-center  mediumToBigDisplay:justify-end gap-x-4 w-full flex-wrap gap-y-4">
          <SelectButton
            className="text-center"
            value={period}
            options={BUTTON_LABEL_TIME_SELECTION}
            onChange={(e) => setPeriod(e.value)}
            unselectable={false}
          />
        </div>
      }
    />
  );
}
