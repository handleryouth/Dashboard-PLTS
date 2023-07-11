import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { TotalClusterDataProps, RenderedChartItem } from "types";
import { generateDateLocale, requestHelper } from "utils";
import { LineChart, NewRefetch } from "components";
import { AVERAGE_CLUSTER_STALE_TIME } from "const";

export default function ClusterTotalDashboard() {
  const getClusterTotalData = useCallback(async () => {
    const response = await requestHelper("get_plts_total_cluster", {
      params: {
        dataTime: "hourly",
      },
    });

    if (response.status === 200) {
      return response.data.data;
    } else {
      throw new Error("failed to get cluster data");
    }
  }, []);

  const {
    data: clusterTotalData,
    isLoading,
    refetch,
    isError,
  } = useQuery({
    queryKey: ["clusterTotalData"],
    staleTime: AVERAGE_CLUSTER_STALE_TIME,
    queryFn: getClusterTotalData,
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

  if (isError) {
    return <NewRefetch restart={refetch} />;
  }

  return (
    <div>
      <LineChart
        title="Cluster Total Power Graph"
        yUnit="kW"
        isLoading={isLoading}
        maxValue={clusterTotalData?.maximumValue}
        multipleChartDataKey={clusterTotalData?.dataKey}
        multipleChartData={clusterTotalData?.data}
        coordinate={{
          x: "time",
        }}
        renderItem={renderChartItem}
      />
    </div>
  );
}
