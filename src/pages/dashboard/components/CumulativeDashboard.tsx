import { useCallback, useEffect, useMemo, useState } from "react";
import {
  LineSegment,
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryLabel,
  VictoryLegend,
  VictoryTooltip,
  VictoryZoomContainer,
} from "victory";
import { convertCamelCaseToPascalCase, requestHelper } from "utils";
import { Dropdown } from "components";
import { PLTSComparingValueResponse } from "types";

export default function CumulativeDashboard() {
  const [dataKey, setDataKey] = useState<string[]>([]);

  const [boundingRect, setBoundingRect] = useState({ width: 0, height: 0 });

  const graphRef = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setBoundingRect(node.getBoundingClientRect());
    }
  }, []);

  const [comparingData, setComparingData] =
    useState<PLTSComparingValueResponse>();

  console.log("comparing data", comparingData);

  const [dropdownValue, setDropdownValue] = useState<string>();

  const getDataKey = useCallback(async () => {
    const response = await requestHelper("get_plts_comparing_data_key");

    if (response && response.status === 200) {
      setDataKey(response.data.data);
    }
  }, []);

  const getDataValue = useCallback(async () => {
    const response = await requestHelper("get_plts_comparing_value", {
      params: {
        dataName: dropdownValue,
      },
    });

    if (response && response.status === 200) {
      setComparingData(response.data.data);
    }
  }, [dropdownValue]);

  const handleRenderDropdownItem = useMemo(() => {
    return dataKey.map((item) => {
      return {
        label: convertCamelCaseToPascalCase(item),
        value: item,
      };
    });
  }, [dataKey]);

  useEffect(() => {
    getDataKey();
  }, [getDataKey]);

  useEffect(() => {
    if (dropdownValue) {
      getDataValue();
    }
  }, [dropdownValue, getDataValue]);

  const generatedData = useCallback(
    (dataKey: string) => {
      return comparingData?.data.map((item) => ({
        x: new Date(item.time).toLocaleTimeString("id-ID"),
        y: item[dataKey],
      }));
    },
    [comparingData?.data]
  );

  const generateLegend = useMemo(() => {
    return comparingData?.pltsKey.map((item) => ({
      name: convertCamelCaseToPascalCase(item),
    }));
  }, [comparingData?.pltsKey]);

  console.log("comparing data", comparingData);

  return (
    <div ref={graphRef}>
      <div className="flex items-center justify-between">
        <h3 className="my-0 basis-1/2">Comparing Dashboard</h3>

        <Dropdown
          value={dropdownValue}
          options={handleRenderDropdownItem}
          placeholder="Select Data"
          filter
          onChange={(e) => {
            setDropdownValue(e.target.value);
          }}
          className="w-full"
        />
      </div>
      <VictoryChart width={boundingRect.width} height={450}>
        <VictoryGroup offset={20} colorScale="qualitative">
          {comparingData?.pltsKey.map((item) => (
            <VictoryBar
              key={item}
              data={generatedData(item)}
              labels={({ datum }) => datum.y}
              labelComponent={
                <VictoryTooltip dy={0} centerOffset={{ x: 25 }} />
              }
            />
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
    </div>
  );
}
