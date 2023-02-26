import { ReactNode, useCallback, useMemo, useState } from "react";
import {
  LineSegment,
  VictoryAxis,
  VictoryLine,
  VictoryZoomContainer,
} from "victory";
import { VictoryChart } from "victory-chart";
import { VictoryLabel } from "victory-core";

export type RenderedChartItem<T> = Record<keyof T, string | number>;

export interface LineChartProps<T extends Object> {
  title?: string;
  chartData: T[];
  containerClassName?: string;
  renderItem: (item: T) => RenderedChartItem<T>;
  customDropdownComponent?: ReactNode;
  coordinate: {
    x: keyof T;
    y?: keyof T;
  };
  allowZoom?: boolean;
}

export default function LineChart<T extends Object>({
  chartData,
  containerClassName,
  title,
  customDropdownComponent,
  coordinate,
  renderItem,
  allowZoom = false,
}: LineChartProps<T>) {
  const [boundingRect, setBoundingRect] = useState({ width: 0, height: 0 });

  const graphRef = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setBoundingRect(node.getBoundingClientRect());
    }
  }, []);

  const generatedData = useMemo(() => {
    return chartData.map((item) => ({
      x: renderItem(item)[coordinate.x],
      y: coordinate.y ? renderItem(item)[coordinate.y] : "",
    }));
  }, [chartData, coordinate, renderItem]);

  return (
    <div
      className={`w-full py-3 px-4 ${containerClassName ?? ""}`}
      ref={graphRef}
    >
      <div className="flex items-start justify-between flex-col monitoringChartBreakpoint:flex-row monitoringChartBreakpoint:items-end">
        <div className="basis-1/4">
          <h3 className="mt-0 font-bold">{title}</h3>
        </div>

        {customDropdownComponent}
      </div>
      <VictoryChart
        containerComponent={<VictoryZoomContainer allowZoom={allowZoom} />}
        width={boundingRect.width}
        height={340}
      >
        <VictoryLine
          data={generatedData}
          style={{
            data: {
              stroke: "#42A5F5",
            },
            parent: { border: "1px solid #ccc", height: "100%" },
          }}
          standalone={false}
        />
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
      </VictoryChart>
    </div>
  );
}
