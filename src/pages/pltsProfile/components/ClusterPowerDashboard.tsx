import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  PLTSClusterValueResponse,
  PLTSClusterValueResponseDataProps,
} from "types";
import { generateDateLocale, requestHelper } from "utils";
import { LineChart, RenderedChartItem } from "components";

export default function ClusterDashboard() {
  const { id } = useParams<"id">();

  const [loading, setLoading] = useState(true);

  const [clusterData, setClusterData] = useState<PLTSClusterValueResponse>();

  const getClusterPowerValue = useCallback(async () => {
    setLoading(true);
    const responseData = await requestHelper("get_plts_cluster_value", {
      params: {
        id,
        dataTime: "hourly",
      },
    });

    if (responseData && responseData.status === 200) {
      setClusterData(responseData.data.data);
    }
    setLoading(false);
  }, [id]);

  console.log("cluster data", clusterData);

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

  useEffect(() => {
    getClusterPowerValue();
  }, [getClusterPowerValue]);

  return (
    <div>
      <LineChart
        isLoading={loading}
        multipleChartDataKey={clusterData?.dataKey}
        multipleChartData={clusterData?.data}
        coordinate={{
          x: "time",
        }}
        title="Cluster Power Graph"
        renderItem={renderChartItem}
      />
    </div>
  );
}
