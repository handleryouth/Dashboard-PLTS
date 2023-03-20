import { useCallback, useMemo, useState, memo, useEffect } from "react";
import {
  VictoryChart,
  VictoryGroup,
  VictoryAxis,
  VictoryLabel,
  LineSegment,
  VictoryLegend,
  VictoryLine,
} from "victory";
import { ProgressSpinner } from "primereact/progressspinner";
import { PLTSTotalClusterResponse, TotalClusterDataProps } from "types";
import { convertCamelCaseToPascalCase, requestHelper } from "utils";

export default function ClusterTotalDashboard() {
  const [loading, setLoading] = useState(true);

  const [boundingRect, setBoundingRect] = useState({ width: 0, height: 0 });

  const graphRef = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setBoundingRect(node.getBoundingClientRect());
    }
  }, []);

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

  const generatedData = useCallback(
    (dataKey: string) => {
      return clusterTotalData?.data.map((item) => ({
        x: new Date(item.time).toLocaleTimeString("id-ID", {
          hour: "numeric",
        }),
        y: item[dataKey as keyof TotalClusterDataProps],
      }));
    },
    [clusterTotalData]
  );

  const generateLegend = useMemo(() => {
    return clusterTotalData?.dataKey.map((item) => ({
      name: convertCamelCaseToPascalCase(item),
    }));
  }, [clusterTotalData]);

  console.log("rendereding");

  const memoizedData = useMemo(() => {
    return (
      <VictoryChart width={boundingRect.width} height={450}>
        <VictoryGroup offset={20} colorScale="qualitative">
          {clusterTotalData?.dataKey?.map((item) => (
            <VictoryLine key={item} data={generatedData(item)} />
          ))}
        </VictoryGroup>

        <VictoryAxis
          axisLabelComponent={<VictoryLabel />}
          fixLabelOverlap
          style={{
            tickLabels: { angle: -20 },
            grid: { stroke: "#000000", strokeWidth: 0.5 },
          }}
          standalone={false}
          gridComponent={<LineSegment />}
          tickLabelComponent={<VictoryLabel verticalAnchor="start" />}
        />
        <VictoryAxis
          dependentAxis
          standalone={false}
          gridComponent={<LineSegment />}
          tickLabelComponent={
            <VictoryLabel verticalAnchor="middle" textAnchor="start" x={0} />
          }
          style={{
            grid: { stroke: "#000000", strokeWidth: 0.5 },
          }}
        />

        <VictoryLegend
          orientation="horizontal"
          colorScale="qualitative"
          gutter={20}
          data={generateLegend}
        />
      </VictoryChart>
    );
  }, [boundingRect.width, clusterTotalData, generateLegend, generatedData]);

  return (
    <div ref={graphRef}>
      <h3>Cluster Data</h3>

      {loading ? (
        <div className="text-center">
          <ProgressSpinner />
        </div>
      ) : (
        memoizedData
      )}
    </div>
  );
}

export const MemoizedClusterTotalDashboard = memo(ClusterTotalDashboard);
