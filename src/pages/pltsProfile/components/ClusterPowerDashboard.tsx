import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { PLTSClusterValueResponseDataProps, RenderedChartItem } from "types";
import { generateDateLocale, requestHelper } from "utils";
import { LineChart, NewRefetch } from "components";
import { useQuery } from "@tanstack/react-query";

export default function ClusterDashboard() {
  const { id } = useParams<"id">();

  const getClusterPowerData = useCallback(async () => {
    const response = await requestHelper("get_plts_cluster_value", {
      params: {
        id,
        dataTime: "hourly",
      },
    });

    if (response && response.status === 200) {
      return response.data.data;
    } else {
      throw new Error("failed to get cluster data");
    }
  }, [id]);

  const {
    data: clusterData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["clusterPowerGraph", id],
    queryFn: getClusterPowerData,
    enabled: !!id,
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

  if (isError) {
    return <NewRefetch restart={refetch} />;
  }

  return (
    <div>
      <LineChart
        isLoading={isLoading}
        multipleChartDataKey={clusterData?.dataKey}
        multipleChartData={clusterData?.data}
        maxValue={clusterData?.capacity}
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
