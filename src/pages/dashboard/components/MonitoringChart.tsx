import { useCallback, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { LineChart, RenderedChartItem } from "components";
import { GENERATOR_DATA_DROPDOWN_ITEMS } from "const";
import { GeneratorDataProps, GeneratorDataPropsExcludeDeviceType } from "types";
import {
  AVERAGE_DASHBOARD_INITIAL_STATE,
  AverageDashboardStateProps,
} from "./AverageDashboard";

export interface MonitoringChartProps {
  title: string;
  chartData: GeneratorDataProps[];
  customClassname?: string;
}

export default function MonitoringChart({
  chartData,
  title,
  customClassname,
}: MonitoringChartProps) {
  const [dropdownValue, setDropdownValue] =
    useState<AverageDashboardStateProps>(AVERAGE_DASHBOARD_INITIAL_STATE);

  const handleRenderItem = useCallback(
    (
      item: GeneratorDataPropsExcludeDeviceType
    ): RenderedChartItem<GeneratorDataPropsExcludeDeviceType> => ({
      ...item,
      time: new Date(item.time).toLocaleTimeString(),
    }),
    []
  );

  return (
    <LineChart
      title={title}
      containerClassName={customClassname}
      chartData={chartData}
      coordinate={{
        x: "time",
        y: dropdownValue.generatorData,
      }}
      renderItem={handleRenderItem}
      customDropdownComponent={
        <Dropdown
          value={dropdownValue.generatorData}
          options={GENERATOR_DATA_DROPDOWN_ITEMS}
          filter
          onChange={(e) => {
            setDropdownValue((prevState) => ({
              ...prevState,
              generatorData: e.target.value,
            }));
          }}
          className="w-full"
        />
      }
    />
  );
}
