import { useCallback, useEffect, useRef, useState } from "react";
import { Dropdown, SmallDashboard } from "components";
import { GeneratorDataProps, GeneratorDataPropsExcludeDeviceType } from "types";
import { requestHelper } from "utils";
import { DROPDOWN_LOCATIONS_ITEMS, GENERATOR_DATA_DROPDOWN_ITEMS } from "const";

export default function MainDashboard() {
  const [generatorData, setGeneratorData] = useState<GeneratorDataProps[]>([]);
  const [averageData, setAverageData] = useState<
    GeneratorDataPropsExcludeDeviceType[]
  >([]);

  const previousValueRef = useRef<GeneratorDataProps[]>([]);

  const logDataOnMessage = useCallback((event: any) => {
    const newData = JSON.parse(event.data);

    if (previousValueRef.current.length > 5) {
      const previousDataSliced = previousValueRef.current.slice(1);

      setGeneratorData([...previousDataSliced, newData]);
      previousValueRef.current = [...previousDataSliced, newData];
    } else {
      setGeneratorData((prevState) => [...prevState, newData]);
      previousValueRef.current = [...previousValueRef.current, newData];
    }
  }, []);

  const testingSSEEvent = useCallback(async () => {
    const sseSource = new EventSource(
      `http://${window.location.hostname}:8000/api/plts/`,
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
  }, [logDataOnMessage]);

  const getAveragePLTSData = useCallback(async () => {
    const responseData = await requestHelper("get_average");

    if (responseData && responseData.status === 200) {
      setAverageData(responseData.data!.data);
    }
  }, []);

  useEffect(() => {
    testingSSEEvent();
    getAveragePLTSData();
  }, [testingSSEEvent, getAveragePLTSData]);

  return (
    <div className="flex flex-col py-4">
      <div className="flex items-center justify-between mb-8 gap-8">
        <SmallDashboard chartData={generatorData} title="AJ301" />

        <SmallDashboard chartData={generatorData} title="ITS Research Center" />

        <SmallDashboard chartData={generatorData} title="Gedung Rektorat ITS" />
      </div>

      <SmallDashboard
        chartData={averageData.splice(0, 5)}
        title="Average Value"
        customDropdownComponent={
          <div className="flex gap-x-4 items-center w-full">
            <Dropdown
              options={GENERATOR_DATA_DROPDOWN_ITEMS}
              filter
              onChange={(e) => {
                console.log(e.target);
              }}
              label="Variable:"
              className="w-full"
            />
            <Dropdown
              options={DROPDOWN_LOCATIONS_ITEMS}
              onChange={(e) => {
                console.log(e.target);
              }}
              className="w-full"
              label="Compare with:"
            />
          </div>
        }
      />
    </div>
  );
}
