import { Chart } from "primereact/chart";
import { Section } from "components";
import { PLTSMapKey } from "types";

export interface SideDetailProps {
  dataKey?: PLTSMapKey;
}

export default function SideDetail({ dataKey }: SideDetailProps) {
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div
      className={`prose !max-w-none transition-widthPaddingMargin  duration-300  bg-gradient-to-br from-[#F8EDE3] to-[#F1F6F5] rounded-md  ${
        dataKey ? "w-[31rem] px-8 mx-4" : "w-0 p-0 mx-0 delay-[400ms]"
      }`}
    >
      <div
        className={`flex justify-center h-96 transition-opacity  ${
          dataKey ? "opacity-100 delay-500" : "opacity-0 delay-100"
        }`}
      >
        <img src="/aj301.png" alt="place" />
      </div>

      <div
        className={`transition-opacity mb-8 flex flex-col gap-y-2 ${
          dataKey ? "opacity-100 delay-500" : "opacity-0 delay-100"
        }`}
      >
        <Section title="Apparent Power" value="0" />
        <Section title="Daily Yield" value="0" />
        <Section title="Grid Current" value="0" />
        <Section title="Grid Frequency" value="0" />
        <Section title="Residual Current" value="0" />
        <Section title="Reactive Power" value="0" />
      </div>

      <Chart
        type="line"
        className={`transition-opacity ${
          dataKey ? "opacity-100 delay-500" : "opacity-0"
        }`}
        data={{
          labels: [],
          datasets: [
            {
              data: [],
              fill: false,
              borderColor: "#42A5F5",
              tension: 0.1,
            },
          ],
        }}
        options={options}
      />
    </div>
  );
}
