import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { SelectButton } from "primereact/selectbutton";
import { BarChart, LineChart } from "components";
import { ENERGY_LABEL_TIME_SELECTION } from "const";
import { PLTSClusterValueResponseDataProps, RenderedChartItem } from "types";
import { generateDateLocale, requestHelper } from "utils";

export interface EnergyDashboardProps {
  enableGridPower?: boolean;
}

export default function EnergyDashboard() {
  const [period, setPeriod] = useState("daily");

  const { id } = useParams<"id">();

  const { data: energyData, isLoading } = useQuery({
    queryKey: ["clusterEnergyGraph", id, period],
    queryFn: () =>
      requestHelper("get_plts_cluster_value", {
        params: {
          dataTime: period,
          dataType: "energy",
          id,
        },
      }),
  });

  const renderChartItem = useCallback(
    (
      item: PLTSClusterValueResponseDataProps
    ): RenderedChartItem<PLTSClusterValueResponseDataProps> => {
      return {
        ...item,
        time: generateDateLocale(period, item.time),
      };
    },
    [period]
  );

  return (
    <div>
      <LineChart
        title="Cluster Energy Graph"
        isLoading={isLoading}
        multipleChartDataKey={energyData?.data.data.dataKey}
        multipleChartData={energyData?.data.data.data}
        yUnit="W"
        coordinate={{
          x: "time",
        }}
        renderItem={renderChartItem}
        customDropdownComponent={
          <SelectButton
            value={period}
            options={ENERGY_LABEL_TIME_SELECTION}
            onChange={(e) => setPeriod(e.value)}
            unselectable={false}
          />
        }
      />

      <BarChart
        isLoading={isLoading}
        singleChartData={energyData?.data.data.data ?? []}
        yUnit="Wh"
        coordinate={{
          x: "time",
          y: "gridPower",
        }}
        title="Grid Power"
        renderItem={renderChartItem}
      />
    </div>
  );
}
