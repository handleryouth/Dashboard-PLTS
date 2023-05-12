import { useCallback, useMemo, useState } from "react";
import {
  LineSegment,
  VictoryAxis,
  VictoryGroup,
  VictoryLegend,
  VictoryLine,
  VictoryZoomContainer,
} from "victory";
import { VictoryChart } from "victory-chart";
import { VictoryLabel } from "victory-core";
import { ProgressSpinner } from "primereact/progressspinner";
import { convertCamelCaseToPascalCase } from "utils";
import { LineChartProps } from "types";

export default function LineChart<T extends Object>({
  singleChartData,
  multipleChartData,
  containerClassName,
  title,
  customDropdownComponent,
  coordinate,
  renderItem,
  allowZoom = false,
  isLoading,
  multipleChartDataKey,
  xUnit = "",
  yUnit = "",
}: LineChartProps<T>) {
  const [boundingRect, setBoundingRect] = useState({ width: 0, height: 0 });

  const graphRef = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setBoundingRect(node.getBoundingClientRect());
    }
  }, []);

  const generatedData = useMemo(() => {
    return singleChartData?.map((item) => ({
      x: renderItem(item)[coordinate.x],
      y: coordinate.y ? renderItem(item)[coordinate.y] : "",
    }));
  }, [singleChartData, coordinate, renderItem]);

  const generatedMultipleData = useCallback(
    (dataKey: keyof T) => {
      return multipleChartData?.map((item) => {
        return {
          x: renderItem(item)[coordinate.x],
          y: renderItem(item)[dataKey] ?? "",
        };
      });
    },
    [coordinate, multipleChartData, renderItem]
  );

  const generateLegend = useMemo(() => {
    return multipleChartDataKey?.map((item) => ({
      name: convertCamelCaseToPascalCase(item),
    }));
  }, [multipleChartDataKey]);

  return (
    <div
      className={`prose w-full h-full  ${containerClassName ?? ""}`}
      ref={graphRef}
    >
      <div className="flex items-center justify-between flex-col mediumToBigDisplay:flex-row">
        <div className="basis-1/2 prose-h3:mt-0">
          <h3 className="mb-4  mediumToBigDisplay:mb-0 font-bold">{title}</h3>
        </div>

        {customDropdownComponent}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-full min-h-[10rem]">
          <ProgressSpinner className="w-14 h-14" />
        </div>
      ) : (
        <VictoryChart
          containerComponent={<VictoryZoomContainer allowZoom={allowZoom} />}
          width={
            boundingRect.width > 386 || boundingRect.width < 1360
              ? boundingRect.width
              : 386
          }
          height={340}
        >
          <VictoryGroup colorScale="qualitative">
            {singleChartData && (
              <VictoryLine
                data={generatedData}
                style={{
                  data: {
                    stroke: "#42A5F5",
                  },
                  parent: { border: "1px solid #ccc", height: "100%" },
                }}
                standalone={false}
                labels={({ datum }) => datum.y}
                labelComponent={<VictoryLabel renderInPortal dy={-20} />}
              />
            )}

            {multipleChartData &&
              multipleChartDataKey &&
              multipleChartDataKey.map((key, index) => (
                <VictoryLine
                  data={generatedMultipleData(key as keyof T)}
                  key={index}
                  labels={({ datum }) => datum.y}
                  labelComponent={<VictoryLabel renderInPortal dy={-20} />}
                />
              ))}
          </VictoryGroup>

          <VictoryAxis
            axisLabelComponent={<VictoryLabel />}
            style={{
              tickLabels: { angle: -20 },
              grid: { stroke: "#000000", strokeWidth: 0.5 },
            }}
            standalone={false}
            tickFormat={(tick) => `${tick} ${xUnit}`}
            gridComponent={<LineSegment />}
            tickLabelComponent={<VictoryLabel verticalAnchor="start" />}
          />
          <VictoryAxis
            dependentAxis
            standalone={false}
            gridComponent={<LineSegment />}
            tickFormat={(tick) => `${tick} ${yUnit}`}
            tickLabelComponent={
              <VictoryLabel verticalAnchor="middle" textAnchor="start" x={0} />
            }
            style={{
              grid: { stroke: "#000000", strokeWidth: 0.5 },
            }}
          />

          {multipleChartDataKey && (
            <VictoryLegend
              orientation="horizontal"
              colorScale="qualitative"
              gutter={20}
              data={generateLegend}
            />
          )}
        </VictoryChart>
      )}
    </div>
  );
}
