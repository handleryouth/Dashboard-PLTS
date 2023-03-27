import { useCallback, useState, useEffect } from "react";
import { PLTSTotalClusterResponse, TotalClusterDataProps } from "types";
import { generateDateLocale, requestHelper } from "utils";
import { LineChart, RenderedChartItem } from "components";

export default function ClusterTotalDashboard() {
  const [loading, setLoading] = useState(true);

  const [clusterTotalData, setClusterTotalData] =
    useState<PLTSTotalClusterResponse>();

  const getTotalClusterData = useCallback(async () => {
    setLoading(true);
    const response = await requestHelper("get_plts_total_cluster", {
      params: {
        dataTime: "hourly",
      },
    });

    if (response && response.status === 200) {
      setClusterTotalData(response.data.data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    getTotalClusterData();
  }, [getTotalClusterData]);

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
        isLoading={loading}
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
