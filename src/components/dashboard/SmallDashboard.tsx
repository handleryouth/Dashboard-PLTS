import { Chart } from "primereact/chart";

export interface SmallDashboardProps {
  title: string;
  chartLabel: string[];
  chartData: number[];
}

export default function SmallDashboard({
  chartData,
  chartLabel,
  title,
}: SmallDashboardProps) {
  return (
    <div
      style={{
        width: "700px",
      }}
    >
      <h5>{title}</h5>
      <Chart
        type="line"
        data={{
          labels: chartLabel,
          datasets: [
            {
              label: "First Dataset",
              data: chartData,
              fill: false,
              borderColor: "#42A5F5",
              tension: 0.1,
            },
          ],
        }}
      />
    </div>
  );
}
