import { useCallback, useMemo, useState, useEffect } from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import { Button, Dropdown, LineChart, RenderedChartItem } from "components";
import {
  GeneratorDataPropsExcludeDeviceType,
  PLTSProfileDetailAverageResponse,
} from "types";
import { convertCamelCaseToPascalCase, requestHelper } from "utils";
import FilterModal from "./FilterModal";

export interface AverageDashbordProps {
  pltsName: string;
}

export default function AverageDashbord({ pltsName }: AverageDashbordProps) {
  const [dropdownValue, setDropdownValue] =
    useState<keyof GeneratorDataPropsExcludeDeviceType>();

  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [generatorData, setGeneratorData] =
    useState<PLTSProfileDetailAverageResponse>();

  const handleRenderItem = useCallback(
    (
      item: GeneratorDataPropsExcludeDeviceType
    ): RenderedChartItem<GeneratorDataPropsExcludeDeviceType> => ({
      ...item,
      time: new Date(item.time).toLocaleString(),
    }),
    []
  );

  const getAverageValue = useCallback(async () => {
    const response = await requestHelper(
      "get_plts_profile_detail_average_value",
      {
        params: {
          pltsName,
        },
      }
    );

    if (response && response.status === 200) {
      setGeneratorData(response.data.data);
      setIsLoading(false);
    }
  }, [pltsName]);

  const handleRenderDropdownItem = useMemo(() => {
    return generatorData?.dataKeyArray.map((item) => {
      return {
        label: convertCamelCaseToPascalCase(item),
        value: item,
      };
    });
  }, [generatorData]);

  useEffect(() => {
    getAverageValue();
  }, [getAverageValue]);

  return (
    <>
      <FilterModal
        toggleCloseModal={() => setShowModal(false)}
        visible={showModal}
        pltsName={pltsName}
      />

      <div className="my-8">
        {isLoading ? (
          <div>
            <ProgressSpinner />
          </div>
        ) : (
          <LineChart
            title="Average Value"
            chartData={dropdownValue ? generatorData!.data : []}
            coordinate={{
              x: "time",
              y: dropdownValue,
            }}
            renderItem={handleRenderItem}
            customDropdownComponent={
              <div className="flex items-center gap-x-4">
                <Button
                  className="bg-blue-500 w-full"
                  onClick={() => setShowModal(true)}
                >
                  Download CSV
                </Button>
                <Dropdown
                  value={dropdownValue}
                  options={handleRenderDropdownItem}
                  placeholder="Select Data"
                  filter
                  onChange={(e) => {
                    setDropdownValue(() => e.target.value);
                  }}
                  className="w-full"
                />
              </div>
            }
          />
        )}
      </div>
    </>
  );
}
