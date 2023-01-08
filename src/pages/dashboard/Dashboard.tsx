import { BigDashboard, Button, SmallDashboard } from "components";
import { useCallback, useEffect, useRef, useState } from "react";
import { requestHelper } from "utils";
import { NativeEventSource, EventSourcePolyfill } from "event-source-polyfill";

export interface DailyYieldProps {
  number: number[];
  dataDate: string[];
}

const INITIAL_YIELD_STATE: DailyYieldProps = {
  dataDate: [],
  number: [],
};

export default function MainDashboard() {
  const [power, setPower] = useState<DailyYieldProps>(INITIAL_YIELD_STATE);

  const previousValueRef = useRef<DailyYieldProps>(INITIAL_YIELD_STATE);

  const loadData = useCallback(async () => {
    const response = await requestHelper("/api/plts/testing", {
      method: "GET",
    });

    console.log(response.data);
  }, []);

  // const logDataOnMessage = useCallback(
  //   (event: any) => {
  //     if (previousValueRef.current.length > 10) {
  //       console.log("true");
  //       const previousData = power.number.slice(1);
  //       console.log("previous data", previousData);
  //       const previousDataDate = power.dataDate.slice(1);
  //       setPower(() => ({
  //         number: [...previousData, JSON.parse(event.data).power],
  //         dataDate: [...previousDataDate, JSON.parse(event.data).time],
  //       }));
  //     } else {
  //       console.log("false", power.number.length);
  //       setPower((prevState) => ({
  //         number: [...prevState.number, JSON.parse(event.data).power],
  //         dataDate: [...prevState.dataDate, JSON.parse(event.data).time],
  //       }));
  //     }
  //   },
  //   [power]
  // );

  const testingLogData = useCallback(() => {
    setInterval(() => {
      loadData();
    }, 5000);
  }, [loadData]);

  const testingSSEEvent = () => {
    const sseSource = new EventSource("http://localhost:8080/api/plts/", {
      withCredentials: true,
    });

    sseSource.onopen = () => {
      console.log("sse open");
    };

    sseSource.onmessage = (event) => {
      if (previousValueRef.current.number.length > 10) {
        const previousData = previousValueRef.current.number.slice(1);
        const previousDataDate = previousValueRef.current.dataDate.slice(1);
        setPower(() => ({
          number: [...previousData, JSON.parse(event.data).number],
          dataDate: [...previousDataDate, JSON.parse(event.data).time],
        }));
      } else {
        setPower((prevState) => ({
          dataDate: [...prevState.dataDate, JSON.parse(event.data).time],
          number: [...prevState.number, JSON.parse(event.data).number],
        }));
      }
    };
  };

  useEffect(() => {
    previousValueRef.current = power;
  }, [power]);

  return (
    <div>
      <Button onClick={testingLogData}>testing load data</Button>

      <Button onClick={testingSSEEvent}>testing sse events</Button>

      <div className="flex item-center justify-between py-3">
        <div>
          <h3 className="mt-0 font-bold">Dashboard</h3>
          <p>
            Welcome back <span className="font-bold">Tony!</span>
          </p>
        </div>

        <div>
          <p className="mt-0 mb-2">Tony David</p>
          <p className="mt-0">rafaeltonydavid@yahoo.com</p>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <SmallDashboard
            chartData={power?.number}
            chartLabel={power?.dataDate}
            title="Daily Yield"
          />
        </div>

        <BigDashboard />
      </div>
    </div>
  );
}
