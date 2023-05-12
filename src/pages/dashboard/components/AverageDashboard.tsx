import { useCallback, useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { SelectButton } from "primereact/selectbutton";
import { Dropdown, LineChart } from "components";
import {
  GeneratorDataPropsExcludeDeviceType,
  PLTSMapKey,
  RenderedChartItem,
} from "types";
import { convertCamelCaseToPascalCase, requestHelper } from "utils";
import {
  AVERAGE_DASHBOARD_STALE_TIME,
  BUTTON_LABEL_TIME_SELECTION,
} from "const";

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

  const [period, setPeriod] = useState("daily");

  const [positionDropdown, setPositionDropdown] = useState<string>();

  const { data: positionListData } = useQuery({
    queryKey: ["positionList"],
    queryFn: () => requestHelper("get_plts_profile_list"),
    staleTime: 0,
    cacheTime: 0,
  });

  const { data: generatorData, isLoading: generatorDataLoading } = useQuery({
    queryKey: ["generatorData", positionDropdown, period],
    queryFn: () =>
      requestHelper("get_plts_profile_detail_average_value", {
        params: {
          pltsName: positionDropdown,
          dataTime: period,
        },
      }),
    staleTime: AVERAGE_DASHBOARD_STALE_TIME,
    enabled: !!positionDropdown,
  });

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

  const getPositionDropdownItem = useMemo(() => {
    return positionListData?.data.data.map((item) => {
      return {
        label: item.pltsName,
        value: item.pltsName,
      };
    });
  }, [positionListData]);

  const getDataDropdownItem = useMemo(() => {
    return generatorData?.data.data.dataKeyArray.map((item) => {
      return {
        label: convertCamelCaseToPascalCase(item),
        value: item,
      };
    });
  }, [generatorData]);

  const getDataUnit = useMemo(() => {
    const yUnit = generatorData?.data.data.unit.find(
      (item) => item.dataKey === dropdownValue
    )?.unit;

    return {
      y: yUnit ?? "",
    };
  }, [dropdownValue, generatorData]);

  return (
    <LineChart
      isLoading={positionDropdown ? generatorDataLoading : false}
      singleChartData={generatorData?.data.data.data ?? []}
      coordinate={{
        x: "time",
        y: dropdownValue,
      }}
      title="Average Graph"
      yUnit={getDataUnit.y}
      renderItem={handleRenderItem}
      customDropdownComponent={
        <div className="flex items-center justify-center  mediumToBigDisplay:justify-end gap-x-4 w-full flex-wrap gap-y-4">
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
