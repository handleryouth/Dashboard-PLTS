import { useCallback, useEffect, useState } from "react";
import { Dropdown, LineChart, RenderedChartItem } from "components";
import { GeneratorDataPropsExcludeDeviceType, PLTSMapKey } from "types";
import { requestHelper } from "utils";
import { DROPDOWN_LOCATIONS_ITEMS, GENERATOR_DATA_DROPDOWN_ITEMS } from "const";

export interface AverageDashboardStateProps {
  location: PLTSMapKey;
  generatorData: keyof GeneratorDataPropsExcludeDeviceType;
}

export const AVERAGE_DASHBOARD_INITIAL_STATE: AverageDashboardStateProps = {
  generatorData: "dailyYield",
  location: "aj301",
};

export interface AverageDashboardProps {
  customClassname?: string;
}

export default function AverageDashboard({
  customClassname,
}: AverageDashboardProps) {
  const [averageData, setAverageData] = useState<
    GeneratorDataPropsExcludeDeviceType[]
  >([]);

  const [dropdownValue, setDropdownValue] =
    useState<AverageDashboardStateProps>(AVERAGE_DASHBOARD_INITIAL_STATE);

  const getAveragePLTSData = useCallback(async () => {
    const responseData = await requestHelper("get_average");

    if (responseData && responseData.status === 200) {
      setAverageData(responseData.data!.data);
    }
  }, []);

  useEffect(() => {
    getAveragePLTSData();
  }, [getAveragePLTSData]);

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
      chartData={averageData.slice(0, 5)}
      containerClassName={customClassname}
      coordinate={{
        x: "time",
        y: dropdownValue.generatorData,
      }}
      title="Average Value"
      renderItem={handleRenderItem}
      customDropdownComponent={
        <div className="flex items-center gap-x-4 w-full">
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

          <Dropdown
            value={dropdownValue.location}
            options={DROPDOWN_LOCATIONS_ITEMS}
            filter
            onChange={(e) => {
              setDropdownValue((prevState) => ({
                ...prevState,
                location: e.target.value,
              }));
            }}
            className="w-full"
          />
        </div>
      }
    />
  );
}
