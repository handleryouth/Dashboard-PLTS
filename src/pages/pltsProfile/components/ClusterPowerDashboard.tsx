import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { PLTSClusterValueResponseDataProps, RenderedChartItem } from "types";
import { generateDateLocale, requestHelper } from "utils";
import { LineChart } from "components";
import { useQuery } from "@tanstack/react-query";

export default function ClusterDashboard() {
  const { id } = useParams<"id">();

  const { data: clusterData, isLoading } = useQuery({
    queryKey: ["clusterPowerGraph"],
    queryFn: () =>
      requestHelper("get_plts_cluster_value", {
        params: {
          id,
          dataTime: "hourly",
        },
      }),
  });

  const renderChartItem = useCallback(
    (
      item: PLTSClusterValueResponseDataProps
    ): RenderedChartItem<PLTSClusterValueResponseDataProps> => {
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
        isLoading={isLoading}
        multipleChartDataKey={clusterData?.data.data.dataKey}
        multipleChartData={clusterData?.data.data.data}
        yUnit="W"
        coordinate={{
          x: "time",
        }}
        title="Cluster Power Graph"
        renderItem={renderChartItem}
      />
    </div>
  );
}
