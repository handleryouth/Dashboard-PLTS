import { useCallback, useMemo, useState, useRef, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { Button, LineChart, RenderedChartItem } from "components";
import { GeneratorDataProps, GeneratorDataPropsExcludeDeviceType } from "types";
import { convertCamelCaseToPascalCase } from "utils";
import { ProgressSpinner } from "primereact/progressspinner";

export interface MonitoringChartProps {
  title: string;
  customClassname?: string;
  onButtonClicked?: () => void;
  buttonTitle?: string;
}

export default function MonitoringChart({
  title,
  customClassname,
  onButtonClicked,
  buttonTitle,
}: MonitoringChartProps) {
  const [generatorData, setGeneratorData] = useState<GeneratorDataProps[]>([]);

  const [dataKey, setDataKey] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const [dropdownValue, setDropdownValue] = useState<
    keyof GeneratorDataPropsExcludeDeviceType
  >(dataKey[0] as keyof GeneratorDataPropsExcludeDeviceType);

  const previousValueRef = useRef<GeneratorDataProps[]>([]);

  const logDataOnMessage = useCallback((event: any) => {
    setIsLoading(false);
    const newData = JSON.parse(event.data);

    if (previousValueRef.current.length > 5) {
      const previousDataSliced = previousValueRef.current.slice(1);

      setGeneratorData([...previousDataSliced, newData]);
      previousValueRef.current = [...previousDataSliced, newData];
    } else {
      setGeneratorData((prevState) => [...prevState, newData]);
      previousValueRef.current = [...previousValueRef.current, newData];
    }

    setDataKey(newData.dataKey);
  }, []);

  const handleSSEEvent = useCallback(async () => {
    const sseSource = new EventSource(
      `http://${window.location.hostname}:8000/api/plts?pltsName=${title}`,

      {
        withCredentials: true,
      }
    );

    sseSource.onopen = () => {
      console.log("sse open");
    };

    sseSource.onmessage = logDataOnMessage;

    sseSource.onerror = () => {
      sseSource.close();
    };
  }, [logDataOnMessage, title]);

  useEffect(() => {
    handleSSEEvent();
  }, [handleSSEEvent]);

  const handleRenderItem = useCallback(
    (
      item: GeneratorDataPropsExcludeDeviceType
    ): RenderedChartItem<GeneratorDataPropsExcludeDeviceType> => ({
      ...item,
      time: new Date(item.time).toLocaleTimeString(),
    }),
    []
  );

  const handleRenderDropdownItem = useMemo(() => {
    return dataKey.map((item) => {
      return {
        label: convertCamelCaseToPascalCase(item),
        value: item,
      };
    });
  }, [dataKey]);

  return (
    <>
      {isLoading ? (
        <ProgressSpinner className="h-14 w-14" />
      ) : (
        <LineChart
          containerClassName={customClassname}
          title={title}
          chartData={dropdownValue ? generatorData : []}
          coordinate={{
            x: "time",
            y: dropdownValue,
          }}
          renderItem={handleRenderItem}
          customDropdownComponent={
            <div className="flex items-center gap-x-4 ">
              {buttonTitle && (
                <Button
                  className="w-full"
                  onClick={() => onButtonClicked && onButtonClicked()}
                >
                  {buttonTitle}
                </Button>
              )}
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
    </>
  );
}
