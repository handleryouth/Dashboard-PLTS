import { useState } from "react";
import { Chart } from "primereact/chart";
import { Dropdown } from "primereact/dropdown";
import { GeneratorDataProps } from "types";
import {
  GENERATOR_DATA_DROPDOWN_ITEMS,
  GENERATOR_DATA_TRANSLATIONS,
} from "const";

export interface SmallDashboardProps {
  title: string;
  chartData: GeneratorDataProps[];
  containerClassName?: string;
  chartHeight?: string;
  positionDescription?: string;
}

export default function SmallDashboard({
  chartData,
  title,
  chartHeight,
  containerClassName,
  positionDescription,
}: SmallDashboardProps) {
  const options = {
    animation: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const [selectedData, setSelectedData] =
    useState<keyof GeneratorDataProps>("dailyYield");

  return (
    <div
      className={`w-full shadow-xl py-3 px-4 rounded ${
        containerClassName ?? ""
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="basis-full">
          <h3 className="mt-0 font-bold">{title}</h3>
          <p>{positionDescription}</p>
        </div>

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
      </div>

      <Chart
        type="line"
        height={chartHeight}
        data={{
          labels: chartData?.map((item) => item.time) || [],
          datasets: [
            {
              data: chartData?.map((item) => item[selectedData]) || [],
              fill: false,
              borderColor: "#42A5F5",
              tension: 0.1,
            },
          ],
        }}
        options={options}
      />

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
