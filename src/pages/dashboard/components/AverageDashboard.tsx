import { useCallback, useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { SelectButton } from "primereact/selectbutton";
import { Dropdown, LineChart, NewRefetch } from "components";
import {
  DataTimeType,
  GeneratorDataPropsExcludeDeviceType,
  PLTSMapKey,
  RenderedChartItem,
} from "types";
import {
  convertCamelCaseToPascalCase,
  generateDateLocale,
  getAverageData,
  getPositionList,
} from "utils";
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

  const [period, setPeriod] = useState<DataTimeType>("daily");

  const [positionDropdown, setPositionDropdown] = useState<string>();

  const {
    data: positionListData,
    isError: positionListIsError,
    refetch: positionListRefetch,
  } = useQuery({
    queryKey: ["positionList"],
    queryFn: getPositionList,
  });

  const {
    data: generatorData,
    isError: generatorDataIsError,
    isLoading: generatorDataLoading,
    refetch: generatorDataRefetch,
  } = useQuery({
    queryKey: ["generatorData", positionDropdown, period],
    queryFn: positionDropdown
      ? async () => await getAverageData(positionDropdown, period)
      : undefined,
    staleTime: AVERAGE_DASHBOARD_STALE_TIME,
    enabled: !!positionDropdown,
  });

  const handleRenderItem = useCallback(
    (
      item: GeneratorDataPropsExcludeDeviceType
    ): RenderedChartItem<GeneratorDataPropsExcludeDeviceType> => ({
      ...item,
      time: generateDateLocale(period, item.time),
    }),
    [period]
  );

  const getPositionDropdownItem = useMemo(() => {
    return positionListData?.map((item) => {
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
  }, [generatorData]);

  const getDataUnit = useMemo(() => {
    const yUnit = generatorData?.unit.find(
      (item) => item.dataKey === dropdownValue
    );

    return {
      y: yUnit?.unit ?? "",
      maxValue: yUnit?.maximumValue,
    };
  }, [dropdownValue, generatorData]);

  if (positionListIsError || generatorDataIsError) {
    return (
      <NewRefetch
        restart={() => {
          positionListRefetch();
          generatorDataRefetch();
        }}
      />
    );
  }

  return (
    <LineChart
      isLoading={positionDropdown ? generatorDataLoading : false}
      singleChartData={generatorData?.data ?? []}
      coordinate={{
        x: "time",
        y: dropdownValue,
      }}
      title="Average Graph"
      yUnit={getDataUnit.y}
      maxValue={getDataUnit.maxValue}
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
