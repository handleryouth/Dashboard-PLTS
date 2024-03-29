import { ProgressSpinner } from "primereact/progressspinner";
import { ReactNode, useCallback, useMemo, useState } from "react";
import { RenderedChartItem } from "types";
import { convertCamelCaseToPascalCase } from "utils";
import {
  LineSegment,
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryLabel,
  VictoryLegend,
  VictoryZoomContainer,
} from "victory";

export interface BarChartProps<T extends Object> {
  title?: string;
  singleChartData?: T[];
  multipleChartData?: T[];
  multipleChartDataKey?: string[];
  containerClassName?: string;
  renderItem: (item: T) => RenderedChartItem<T>;
  customDropdownComponent?: ReactNode;
  coordinate: {
    x: keyof T;
    y?: keyof T;
  };
  allowZoom?: boolean;
  isLoading?: boolean;
  xUnit?: string;
  yUnit?: string;
  maxValue?: number;
}

export default function BarChart<T extends Object>({
  coordinate,
  renderItem,
  allowZoom = false,
  containerClassName,
  customDropdownComponent,
  isLoading,
  multipleChartData,
  multipleChartDataKey,
  singleChartData,
  title,
  xUnit = "",
  yUnit = "",
  maxValue,
}: BarChartProps<T>) {
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

  const generateLegend = useMemo(() => {
    return multipleChartDataKey?.map((item) => ({
      name: convertCamelCaseToPascalCase(item),
    }));
  }, [multipleChartDataKey]);

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

  return (
    <div
      className={`prose w-full py-3 px-4 ${containerClassName ?? ""}`}
      ref={graphRef}
    >
      <div className="flex items-center justify-between flex-col mediumToBigDisplay:flex-row  ">
        <div className="basis-1/2">
          <h3 className="mb-4 mediumToBigDisplay:mb-0 font-bold">{title}</h3>
        </div>

        {customDropdownComponent}
      </div>

      {isLoading ? (
        <div className="text-center mt-4">
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
              <VictoryBar
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
              multipleChartDataKey.map((key, index) => {
                return (
                  <VictoryBar
                    data={generatedMultipleData(key as keyof T)}
                    key={index}
                    labels={({ datum }) => datum.y}
                    labelComponent={<VictoryLabel renderInPortal dy={-20} />}
                  />
                );
              })}
          </VictoryGroup>

          <VictoryAxis
            axisLabelComponent={<VictoryLabel />}
            style={{
              tickLabels: { angle: -20 },
              grid: { stroke: "#000000", strokeWidth: 0.5 },
            }}
            standalone={false}
            gridComponent={<LineSegment />}
            tickFormat={(tick) => `${tick} ${xUnit}`}
            tickLabelComponent={<VictoryLabel verticalAnchor="start" />}
          />
          <VictoryAxis
            dependentAxis
            domain={maxValue ? [0, maxValue] : undefined}
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
