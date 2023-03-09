import { useCallback, useMemo, useState, useEffect } from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import {
  Button,
  Calendar,
  Dropdown,
  LineChart,
  RenderedChartItem,
} from "components";
import {
  GeneratorDataAverageProps,
  PLTSProfileDetailAverageResponse,
} from "types";
import { convertCamelCaseToPascalCase, requestHelper } from "utils";

export interface AverageDashbordProps {
  pltsName: string;
}

export interface FilterModalStateProps {
  startDate: Date;
  endDate: Date;
}

export const INITIAL_STATE_DATE: FilterModalStateProps = {
  startDate: new Date(new Date().setHours(0, 0, 0, 0)),
  endDate: new Date(),
};

export default function AverageDashbord({ pltsName }: AverageDashbordProps) {
  const [dropdownValue, setDropdownValue] =
    useState<keyof GeneratorDataAverageProps>();

  const [isLoading, setIsLoading] = useState(true);
  const [generatorData, setGeneratorData] =
    useState<PLTSProfileDetailAverageResponse>();

  const [filterDate, setFilterDate] = useState(INITIAL_STATE_DATE);

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
          endDate: filterDate.endDate.toISOString(),
          startDate: filterDate.startDate.toISOString(),
        },
      }
    );

    if (response && response.status === 200) {
      setGeneratorData(response.data.data);
      setIsLoading(false);
    }
  }, [filterDate, pltsName]);

  const handleRenderDropdownItem = useMemo(() => {
    return generatorData?.dataKeyArray.map((item) => {
      return {
        label: convertCamelCaseToPascalCase(item),
        value: item,
      };
    });
  }, [generatorData]);

  const downloadCSVFile = useCallback(async () => {
    const data = await requestHelper("get_plts_average_file", {
      params: {
        pltsName,
        endDate: filterDate.endDate.toISOString(),
        startDate: filterDate.startDate.toISOString(),
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
  }, [filterDate, pltsName]);

  useEffect(() => {
    getAverageValue();
  }, [getAverageValue]);

  console.log("dropdownvalue", dropdownValue);

  return (
    <>
      <div className="my-8">
        {isLoading ? (
          <div>
            <ProgressSpinner />
          </div>
        ) : (
          <LineChart
            title="Average Value"
            chartData={dropdownValue ? generatorData?.data ?? [] : []}
            coordinate={{
              x: "time",
              y: dropdownValue,
            }}
            renderItem={handleRenderItem}
            customDropdownComponent={
              <div className="flex items-end gap-x-4 justify-end">
                <Button className="bg-blue-500" onClick={downloadCSVFile}>
                  Download CSV
                </Button>

                <Calendar
                  label="Start Date"
                  value={filterDate.startDate}
                  onChange={(e) =>
                    setFilterDate((prevState) => ({
                      ...prevState,
                      startDate: e.value as Date,
                    }))
                  }
                />

                <Calendar
                  label="End Date"
                  className="w-auto"
                  value={filterDate.endDate}
                  onChange={(e) =>
                    setFilterDate((prevState) => ({
                      ...prevState,
                      endDate: e.value as Date,
                    }))
                  }
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
        )}
      </div>
    </>
  );
}
