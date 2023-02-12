import { useState, useRef, useCallback, useEffect } from "react";
import { GeneratorDataProps } from "types";
import MonitoringChart from "./MonitoringChart";

export default function MonitoringDashboard() {
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
    <div className="flex items-center justify-between mb-8 gap-8">
      <MonitoringChart chartData={generatorData} title="AJ301" />
      <MonitoringChart chartData={generatorData} title="Research Center" />
      <MonitoringChart chartData={generatorData} title="Rektorat ITS" />
    </div>
  );
}
