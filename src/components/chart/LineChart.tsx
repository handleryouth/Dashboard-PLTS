import { ReactNode, useCallback, useMemo, useState } from "react";
import {
  LineSegment,
  VictoryAxis,
  VictoryContainer,
  VictoryLine,
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
    y: keyof T;
  };
}

export default function LineChart<T extends Object>({
  chartData,
  containerClassName,
  title,
  customDropdownComponent,
  coordinate,
  renderItem,
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
      y: renderItem(item)[coordinate.y],
    }));
  }, [chartData, coordinate, renderItem]);

  console.log("generated data", generatedData);
  return (
    <div
      className={`w-full py-3 px-4 ${containerClassName ?? ""}`}
      ref={graphRef}
    >
      <div className="flex items-end justify-between">
        <div className="basis-full">
          <h3 className="mt-0 font-bold">{title}</h3>
        </div>

        {customDropdownComponent}
      </div>
      <VictoryChart
        containerComponent={<VictoryContainer />}
        width={boundingRect.width}
        height={Math.max(340, boundingRect.height)}
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
          axisLabelComponent={<VictoryLabel
            
            
            />}
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
