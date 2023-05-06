import { useCallback, useMemo, useState, useEffect } from "react";
import { SelectButton } from "primereact/selectbutton";
import { Button, Dropdown, LineChart } from "components";
import {
  AverageDashbordProps,
  FilterModalStateProps,
  GeneratorDataAverageProps,
  PLTSProfileDetailAverageResponse,
  RenderedChartItem,
} from "types";
import { convertCamelCaseToPascalCase, requestHelper } from "utils";
import { BUTTON_LABEL_TIME_SELECTION } from "const";
import CSVModal from "./CSVModal";

export default function AverageDashbord({ pltsName }: AverageDashbordProps) {
  const [dropdownValue, setDropdownValue] =
    useState<keyof GeneratorDataAverageProps>();

  const [modalVisible, setModalVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [generatorData, setGeneratorData] =
    useState<PLTSProfileDetailAverageResponse>();

  const [period, setPeriod] = useState("daily");

  const handleRenderItem = useCallback(
    (
      item: GeneratorDataAverageProps
    ): RenderedChartItem<GeneratorDataAverageProps> => ({
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
          pltsName,
          dataTime: period,
        },
      }
    );

    if (response && response.status === 200) {
      setGeneratorData(response.data.data);
      setIsLoading(false);
    }
  }, [period, pltsName]);

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

  useEffect(() => {
    getAverageValue();
  }, [getAverageValue]);

  return (
    <>
      <CSVModal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onConfirm={downloadCSVFile}
      />
      <div className="my-8">
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
      </div>
    </>
  );
}
