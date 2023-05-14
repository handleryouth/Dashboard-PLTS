import { useCallback, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SelectButton } from "primereact/selectbutton";
import { Dropdown, LineChart } from "components";
import { BUTTON_LABEL_TIME_SELECTION } from "const";
import {
  DataTimeType,
  PLTSGetPowerResponse,
  PLTSProfileList,
  RenderedChartItem,
} from "types";
import { generateDateLocale, getPositionList, requestHelper } from "utils";

export default function PowerDashboard() {
  const [dropdown, setDropdown] = useState<string>();

  const [period, setPeriod] = useState<DataTimeType>("daily");

  const { data: positionListData, isLoading: positionListLoading } = useQuery({
    queryKey: ["positionList"],
    queryFn: getPositionList,
    staleTime: 0,
    cacheTime: 0,
  });

  const getPowerData = useCallback(async () => {
    const response = await requestHelper("plts_get_power", {
      params: {
        dataTime: period,
        pltsName: dropdown,
      },
    });

    if (response && response.status === 200) {
      return response.data.data;
    } else {
      throw new Error("failed to get power data");
    }
  }, [dropdown, period]);

  const { data: powerData, isFetching: powerDataIsFetching } = useQuery({
    queryKey: ["powerData", dropdown, period],
    queryFn: getPowerData,
    enabled: !!dropdown,
  });

  const handleRenderItem = useCallback(
    (item: PLTSGetPowerResponse): RenderedChartItem<PLTSGetPowerResponse> => ({
      ...item,
      time: generateDateLocale(period, item.time),
    }),
    [period]
  );

  const getPositionDropdownItem = useMemo(() => {
    return (positionListData as PLTSProfileList[])?.map((item) => {
      return {
        label: item.pltsName,
        value: item.pltsName,
      };
    });
  }, [positionListData]);

  return (
    <LineChart
      isLoading={positionListLoading || powerDataIsFetching}
      singleChartData={powerData ?? []}
      coordinate={{
        x: "time",
        y: "power",
      }}
      yUnit="W"
      title="Power Graph"
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
            value={dropdown}
            placeholder="Select Inverter Position"
            onChange={(e) => {
              setDropdown(e.target.value);
            }}
            options={getPositionDropdownItem}
            containerClassName="w-auto"
          />
        </div>
      }
    />
  );
}
