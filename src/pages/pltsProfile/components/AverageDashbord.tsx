import { useCallback, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SelectButton } from "primereact/selectbutton";
import { Button, Dropdown, LineChart, NewRefetch } from "components";
import {
  AverageDashbordProps,
  DataTimeType,
  FilterModalStateProps,
  GeneratorDataAverageProps,
  RenderedChartItem,
} from "types";
import {
  convertCamelCaseToPascalCase,
  generateDateLocale,
  getAverageData,
  requestHelper,
} from "utils";
import {
  AVERAGE_DASHBOARD_STALE_TIME,
  BUTTON_LABEL_TIME_SELECTION,
} from "const";
import CSVModal from "./CSVModal";

export default function AverageDashbord({ pltsName }: AverageDashbordProps) {
  const [dropdownValue, setDropdownValue] =
    useState<keyof GeneratorDataAverageProps>();

  const [modalVisible, setModalVisible] = useState(false);

  const [period, setPeriod] = useState<DataTimeType>("daily");

  const {
    data: generatorData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["generatorData", pltsName, period],
    queryFn: async () => await getAverageData(pltsName, period),
    staleTime: AVERAGE_DASHBOARD_STALE_TIME,
  });

  const handleRenderItem = useCallback(
    (
      item: GeneratorDataAverageProps
    ): RenderedChartItem<GeneratorDataAverageProps> => ({
      ...item,
      time: generateDateLocale(period, item.time),
    }),
    [period]
  );

  const handleRenderDropdownItem = useMemo(() => {
    return generatorData?.dataKeyArray.map((item) => {
      return {
        label: convertCamelCaseToPascalCase(item),
        value: item,
      };
    });
  }, [generatorData]);

  const downloadCSVFile = useCallback(
    async (dateValue: FilterModalStateProps) => {
      const data = await requestHelper("get_plts_average_file", {
        params: {
          pltsName,
          endDate: dateValue.endDate.toISOString(),
          startDate: dateValue.startDate.toISOString(),
        },
      });
      if (data && data.status === 200) {
        const url = window.URL.createObjectURL(
          new Blob([data.data.data], {
            type: "text/csv",
          })
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "data.csv");
        document.body.appendChild(link);
        link.click();
      }
    },
    [pltsName]
  );

  if (isError) {
    return <NewRefetch restart={refetch} />;
  }

  return (
    <>
      <CSVModal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onConfirm={downloadCSVFile}
      />

      <LineChart
        isLoading={isLoading}
        title="Average Graph"
        singleChartData={dropdownValue ? generatorData?.data ?? [] : []}
        coordinate={{
          x: "time",
          y: dropdownValue,
        }}
        renderItem={handleRenderItem}
        customDropdownComponent={
          <div className="flex items-center justify-center  mediumToBigDisplay:justify-end gap-x-4 w-full flex-wrap gap-y-4">
            <Button
              className="bg-blue-500 w-max"
              onClick={() => setModalVisible(true)}
            >
              Download CSV
            </Button>

            <SelectButton
              className="text-center"
              value={period}
              options={BUTTON_LABEL_TIME_SELECTION}
              onChange={(e) => setPeriod(e.value)}
              unselectable={false}
            />

            <Dropdown
              value={dropdownValue}
              options={handleRenderDropdownItem}
              placeholder="Select Data"
              filter
              onChange={(e) => {
                setDropdownValue(() => e.target.value);
              }}
              containerClassName="w-auto"
            />
          </div>
        }
      />
    </>
  );
}
