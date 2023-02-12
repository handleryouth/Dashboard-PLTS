import { useState, useRef, useCallback, useEffect } from "react";
import { GeneratorDataProps } from "types";
import { AverageDashboard, MonitoringChart } from "../dashboard";
import { PLTSAnalyticValue } from "./components";

export default function PltsProfile() {
  const [generatorData, setGeneratorData] = useState<GeneratorDataProps[]>([]);

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

  const handleSSEEvent = useCallback(async () => {
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
    handleSSEEvent();
  }, [handleSSEEvent]);

  return (
    <div className="my-4 ">
      <div className="flex items-center gap-4 ">
        <div className="h-[400px] rounded-sm shadow w-full py-8 bg-white">
          <MonitoringChart
            chartData={generatorData}
            title="Monitoring Value"
            customClassname="h-full"
          />
        </div>
        <div className="h-[400px] rounded-sm shadow w-full py-8 bg-white">
          <AverageDashboard customClassname="h-full" />
        </div>
      </div>

      <PLTSAnalyticValue />
    </div>
  );
}
