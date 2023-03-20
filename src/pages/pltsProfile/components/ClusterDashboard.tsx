import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
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
import { SelectButton } from "primereact/selectbutton";
import { PLTSClusterValueResponse } from "types";
import { BUTTON_LABEL_TIME_SELECTION } from "const";
import {
  convertCamelCaseToPascalCase,
  generateDateLocale,
  requestHelper,
} from "utils";

export default function ClusterDashboard() {
  const { id } = useParams<"id">();

  const [period, setPeriod] = useState("daily");

  const [loading, setLoading] = useState(true);

  const [boundingRect, setBoundingRect] = useState({ width: 0, height: 0 });

  const graphRef = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setBoundingRect(node.getBoundingClientRect());
    }
  }, []);

  const [clusterData, setClusterData] = useState<PLTSClusterValueResponse>();

  const getClusterPowerValue = useCallback(async () => {
    setLoading(true);
    const responseData = await requestHelper("get_plts_cluster_value", {
      params: {
        id,
        dataTime: period,
      },
    });

    if (responseData && responseData.status === 200) {
      setClusterData(responseData.data.data);
    }
    setLoading(false);
  }, [id, period]);

  console.log("cluster data", clusterData);

  const generatedData = useCallback(
    (dataKey: string) => {
      console.log("datakey", dataKey);
      return clusterData?.data.map((item) => ({
        x: generateDateLocale(item.time),
        y: item[dataKey],
      }));
    },
    [clusterData?.data]
  );

  const generateLegend = useMemo(() => {
    return clusterData?.dataKey.map((item) => ({
      name: convertCamelCaseToPascalCase(item),
    }));
  }, [clusterData?.dataKey]);

  useEffect(() => {
    getClusterPowerValue();
  }, [getClusterPowerValue]);

  return (
    <div ref={graphRef}>
      <h3>Cluster Data</h3>

      <SelectButton
        className="text-center my-4"
        value={period}
        options={BUTTON_LABEL_TIME_SELECTION}
        onChange={(e) => setPeriod(e.value)}
        unselectable={false}
      />

      {loading ? (
        <div className="text-center">
          <ProgressSpinner />
        </div>
      ) : (
        <VictoryChart width={boundingRect.width} height={450}>
          <VictoryGroup offset={20} colorScale="qualitative">
            {clusterData?.dataKey?.map((item) => (
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
      )}
    </div>
  );
}
