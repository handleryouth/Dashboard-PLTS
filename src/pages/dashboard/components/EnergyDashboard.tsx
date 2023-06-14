import { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SelectButton } from "primereact/selectbutton";
import { BarChart, NewRefetch } from "components";
import { ENERGY_LABEL_TIME_SELECTION } from "const";
import { TotalClusterDataProps } from "types";
import { generateDateLocale, requestHelper } from "utils";

export default function EnergyDashboard() {
  const [period, setPeriod] = useState("daily");

  const {
    data: energyData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["clusterTotalEnergyGraph", period],
    queryFn: () =>
      requestHelper("get_plts_total_cluster", {
        params: {
          dataTime: period,
          dataType: "energy",
        },
      }),
  });

  const renderChartItem = useCallback(
    (item: TotalClusterDataProps) => {
      return {
        ...item,
        time: generateDateLocale(period, item.time),
      };
    },
    [period]
  );

  if (isError) {
    return <NewRefetch restart={refetch} />;
  }

  return (
    <div>
      <BarChart
        title="Cluster Total Energy Graph"
        isLoading={isLoading}
        multipleChartDataKey={energyData?.data.data.dataKey}
        multipleChartData={energyData?.data.data.data}
        yUnit="Wh"
        coordinate={{
          x: "time",
        }}
        customDropdownComponent={
          <SelectButton
            value={period}
            options={ENERGY_LABEL_TIME_SELECTION}
            onChange={(e) => setPeriod(e.value)}
            unselectable={false}
          />
        }
        renderItem={renderChartItem}
      />
    </div>
  );
}
