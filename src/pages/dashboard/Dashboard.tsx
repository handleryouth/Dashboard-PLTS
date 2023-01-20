import { useCallback, useEffect, useRef, useState } from "react";
import { SmallDashboard } from "components";
import { GeneratorDataProps } from "types";

export default function MainDashboard() {
  const [generatorData, setGeneratorData] = useState<GeneratorDataProps[]>([]);

  const previousValueRef = useRef<GeneratorDataProps[]>([]);

  const logDataOnMessage = useCallback((event: any) => {
    const newData = JSON.parse(event.data);

    if (previousValueRef.current.length > 10) {
      const previousDataSliced = previousValueRef.current.slice(1);

      setGeneratorData(() => [...previousDataSliced, newData]);
    } else {
      setGeneratorData((prevState) => [...prevState, newData]);
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

  useEffect(() => {
    previousValueRef.current = generatorData;
  }, [generatorData]);

  useEffect(() => {
    testingSSEEvent();
  }, [testingSSEEvent]);

  return (
    <div className="flex flex-col py-4">
      <div className="flex items-center justify-between mb-8 gap-8">
        <SmallDashboard
          chartData={generatorData}
          positionDescription="AJ301"
          title="Daily Yield"
        />

        <SmallDashboard
          chartData={generatorData}
          positionDescription="ITS Research Center"
          title="Daily Yield"
        />

        <SmallDashboard
          chartData={generatorData}
          positionDescription="Gedung Rektorat ITS"
          title="Daily Yield"
        />
      </div>

      <SmallDashboard
        chartData={[]}
        title="Quis fugiat mollit incididunt nisi consectetur id consectetur occaecat eu."
        chartHeight="50"
      />
    </div>
  );
}
