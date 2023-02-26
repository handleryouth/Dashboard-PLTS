import { useCallback, useEffect, useState, useMemo } from "react";
import { Dropdown, LineChart, RenderedChartItem } from "components";
import {
  GeneratorDataPropsExcludeDeviceType,
  PLTSMapKey,
  PLTSProfileDetailAverageResponse,
  PLTSProfileList,
} from "types";
import { convertCamelCaseToPascalCase, requestHelper } from "utils";

export interface AverageDashboardStateProps {
  location: PLTSMapKey;
  generatorData: keyof GeneratorDataPropsExcludeDeviceType;
}

export const AVERAGE_DASHBOARD_INITIAL_STATE: AverageDashboardStateProps = {
  generatorData: "dailyYield",
  location: "aj301",
};

export default function AverageDashboard() {
  const [dropdownValue, setDropdownValue] =
    useState<keyof GeneratorDataPropsExcludeDeviceType>();

  const [positionDropdown, setPositionDropdown] = useState<string>();

  const [positionListData, setPositionListData] = useState<PLTSProfileList[]>(
    []
  );

  const [generatorData, setGeneratorData] =
    useState<PLTSProfileDetailAverageResponse>();

  const handleRenderItem = useCallback(
    (
      item: GeneratorDataPropsExcludeDeviceType
    ): RenderedChartItem<GeneratorDataPropsExcludeDeviceType> => ({
      ...item,
      time: new Date(item.time).toLocaleTimeString(),
    }),
    []
  );

  const getAverageValue = useCallback(async () => {
    const response = await requestHelper(
      "get_plts_profile_detail_average_value",
      {
        params: {
          pltsName: positionDropdown,
        },
      }
    );

    if (response && response.status === 200) {
      setGeneratorData(response.data.data);
    }
  }, [positionDropdown]);

  const getPltsLocation = useCallback(async () => {
    const response = await requestHelper("get_plts_profile_list");

    if (response && response.status === 200) {
      setPositionListData(response.data.data);
    }
  }, []);

  useEffect(() => {
    if (positionDropdown) {
      getAverageValue();
    }
  }, [getAverageValue, positionDropdown]);

  useEffect(() => {
    getPltsLocation();
  }, [getPltsLocation]);

  const getPositionDropdownItem = useMemo(() => {
    return positionListData.map((item) => {
      return {
        label: item.pltsName,
        value: item.pltsName,
      };
    });
  }, [positionListData]);

  const getDataDropdownItem = useMemo(() => {
    return generatorData?.dataKeyArray.map((item) => {
      return {
        label: convertCamelCaseToPascalCase(item),
        value: item,
      };
    });
  }, [generatorData?.dataKeyArray]);

  return (
    <LineChart
      chartData={generatorData?.data ?? []}
      coordinate={{
        x: "time",
        y: dropdownValue,
      }}
      title="Average Value"
      renderItem={handleRenderItem}
      customDropdownComponent={
        <div className="flex items-center gap-x-4 w-full">
          <Dropdown
            filter
            value={positionDropdown}
            placeholder="Select Plts Position"
            onChange={(e) => {
              setPositionDropdown(e.target.value);
            }}
            options={getPositionDropdownItem}
            className="w-full"
          />

          <Dropdown
            filter
            value={dropdownValue}
            placeholder="Select Data"
            options={getDataDropdownItem ?? []}
            onChange={(e) => {
              setDropdownValue(e.target.value);
            }}
            className="w-full"
          />
        </div>
      }
    />
  );
}
