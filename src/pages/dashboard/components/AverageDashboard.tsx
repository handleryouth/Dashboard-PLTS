import { useCallback, useEffect, useState, useMemo } from "react";
import { Dropdown, LineChart, RenderedChartItem } from "components";
import {
  GeneratorDataPropsExcludeDeviceType,
  PLTSMapKey,
  PLTSProfileDetailAverageResponse,
  PLTSProfileList,
} from "types";
import { convertCamelCaseToPascalCase, requestHelper } from "utils";
import { SelectButton } from "primereact/selectbutton";
import { BUTTON_LABEL_TIME_SELECTION } from "const";

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

  const [isLoading, setIsLoading] = useState(true);

  const [period, setPeriod] = useState("daily");

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
      time: item.time
        ? new Date(item.time).toLocaleString("id-ID")
        : new Date().toLocaleString("id-ID"),
    }),
    []
  );

  const getAverageValue = useCallback(async () => {
    setIsLoading(true);
    const response = await requestHelper(
      "get_plts_profile_detail_average_value",
      {
        params: {
          pltsName: positionDropdown,
          dataTime: period,
        },
      }
    );

    if (response && response.status === 200) {
      setGeneratorData(response.data.data);
    }
    setIsLoading(false);
  }, [period, positionDropdown]);

  const getPltsLocation = useCallback(async () => {
    setIsLoading(true);
    const response = await requestHelper("get_plts_profile_list");

    if (response && response.status === 200) {
      setPositionListData(response.data.data);
    }
    setIsLoading(false);
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
      isLoading={isLoading}
      singleChartData={generatorData?.data ?? []}
      coordinate={{
        x: "time",
        y: dropdownValue,
      }}
      title="Average Graph"
      renderItem={handleRenderItem}
      customDropdownComponent={
        <div className="flex items-center justify-center   mediumToBigDisplay:justify-end gap-x-4 w-full flex-wrap gap-y-4">
          <SelectButton
            className="text-center"
            value={period}
            options={BUTTON_LABEL_TIME_SELECTION}
            onChange={(e) => setPeriod(e.value)}
            unselectable={false}
          />

          <Dropdown
            filter
            value={positionDropdown}
            placeholder="Select Inverter Position"
            onChange={(e) => {
              setPositionDropdown(e.target.value);
            }}
            options={getPositionDropdownItem}
            containerClassName="w-auto"
          />

          <Dropdown
            filter
            value={dropdownValue}
            placeholder="Select Data"
            options={getDataDropdownItem ?? []}
            onChange={(e) => {
              setDropdownValue(e.target.value);
            }}
            containerClassName="w-auto"
          />
        </div>
      }
    />
  );
}
