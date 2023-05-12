import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { TotalClusterDataProps, RenderedChartItem } from "types";
import { generateDateLocale, requestHelper } from "utils";
import { LineChart } from "components";
import { AVERAGE_CLUSTER_STALE_TIME } from "const";

export default function ClusterTotalDashboard() {
  const { data: clusterTotalData, isLoading } = useQuery({
    queryKey: ["clusterTotalData"],
    staleTime: AVERAGE_CLUSTER_STALE_TIME,
    queryFn: () =>
      requestHelper("get_plts_total_cluster", {
        params: {
          dataTime: "hourly",
        },
      }),
  });

  const renderChartItem = useCallback(
    (item: TotalClusterDataProps): RenderedChartItem<TotalClusterDataProps> => {
      return {
        ...item,
        time: generateDateLocale("hourly", item.time),
      };
    },
    []
  );

  return (
    <div>
      <LineChart
        title="Cluster Total Power Graph"
        yUnit="W"
        isLoading={isLoading}
        multipleChartDataKey={clusterTotalData?.data.data.dataKey}
        multipleChartData={clusterTotalData?.data.data.data}
        coordinate={{
          x: "time",
        }}
        renderItem={renderChartItem}
      />
    </div>
  );
}
