import { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SelectButton } from "primereact/selectbutton";
import { BarChart, NewRefetch } from "components";
import { ENERGY_LABEL_TIME_SELECTION } from "const";
import { TotalClusterDataProps } from "types";
import { generateDateLocale, requestHelper } from "utils";

export default function EnergyDashboard() {
  const [period, setPeriod] = useState("daily");

  const getClusterTotalData = useCallback(async () => {
    const response = await requestHelper("get_plts_total_cluster", {
      params: {
        dataTime: period,
        dataType: "energy",
      },
    });

    if (response.status === 200) {
      return response.data.data;
    } else {
      throw new Error("failed to get cluster data");
    }
  }, [period]);

  const {
    data: energyData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["clusterTotalEnergyGraph", period],
    queryFn: getClusterTotalData,
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
        maxValue={energyData?.maximumValue}
        multipleChartDataKey={energyData?.dataKey}
        multipleChartData={energyData?.data}
        yUnit="kWh"
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
