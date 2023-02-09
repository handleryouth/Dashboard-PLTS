import { ReactNode, useCallback, useMemo, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { GeneratorDataPropsExcludeDeviceType } from "types";
import {
  GENERATOR_DATA_DROPDOWN_ITEMS,
  GENERATOR_DATA_TRANSLATIONS,
} from "const";
import {
  LineSegment,
  VictoryAxis,
  VictoryContainer,
  VictoryLine,
} from "victory";
import { VictoryChart } from "victory-chart";
import { VictoryLabel } from "victory-core";

export interface ChartData<T, K> {
  x: T;
  y: K;
}

export interface SmallDashboardProps {
  title?: string;
  chartData: GeneratorDataPropsExcludeDeviceType[];
  containerClassName?: string;
  customDropdownComponent?: ReactNode;
}

export default function SmallDashboard({
  chartData,
  containerClassName,
  title,
  customDropdownComponent,
}: SmallDashboardProps) {
  const [selectedData, setSelectedData] =
    useState<keyof Omit<GeneratorDataPropsExcludeDeviceType, "time">>(
      "dailyYield"
    );

  const [boundingRect, setBoundingRect] = useState({ width: 0, height: 0 });

  const generatedData = useMemo(() => {
    return (
      chartData?.map((item) => {
        return {
          x: new Date(item.time).toLocaleTimeString(),
          y: item[selectedData].toFixed(2),
        };
      }) ?? []
    );
  }, [chartData, selectedData]);

  const graphRef = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setBoundingRect(node.getBoundingClientRect());
    }
  }, []);

  return (
    <div
      className={`w-full shadow-xl py-3 px-4 rounded ${
        containerClassName ?? ""
      }`}
      ref={graphRef}
    >
      <div className="flex items-end justify-between">
        <div className="basis-full">
          <h3 className="mt-0 font-bold">{title}</h3>
        </div>

        {customDropdownComponent ?? (
          <Dropdown
            value={selectedData}
            options={GENERATOR_DATA_DROPDOWN_ITEMS}
            filter
            onChange={(e) => {
              console.log(e.target);
              setSelectedData(e.target.value);
            }}
            className="w-full"
          />
        )}
      </div>

      <VictoryChart
        containerComponent={<VictoryContainer />}
        width={boundingRect.width}
      >
        <VictoryLine
          data={generatedData}
          style={{
            data: {
              stroke: "#42A5F5",
            },
            parent: { border: "1px solid #ccc" },
          }}
        />
        <VictoryAxis
          axisLabelComponent={
            <VictoryLabel
              style={{
                width: 300,
              }}
            />
          }
          style={{
            tickLabels: { angle: -20 },
            grid: { stroke: "#000000", strokeWidth: 0.5 },
          }}
          standalone={false}
          gridComponent={<LineSegment />}
          tickLabelComponent={<VictoryLabel verticalAnchor="start" y={270} />}
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

      <div className="flex items-center justify-between">
        <p className="font-bold">{GENERATOR_DATA_TRANSLATIONS[selectedData]}</p>

        <p>
          {chartData.length > 0
            ? chartData[chartData.length - 1][selectedData]
            : "-"}
        </p>
      </div>
    </div>
  );
}
