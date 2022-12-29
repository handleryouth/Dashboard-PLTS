import { useState } from "react";
import { Chart } from "primereact/chart";

export default function SmallDashboard() {
  const [basicData] = useState({
    labels: ["January", "February", "March"],
    datasets: [
      {
        label: "First Dataset",
        data: [65, 59, 80],
        fill: false,
        borderColor: "#42A5F5",
        tension: 0.4,
      },
      {
        label: "Second Dataset",
        data: [28, 48, 40],
        fill: false,
        borderColor: "#FFA726",
        tension: 0.4,
      },
    ],
  });

  return (
    <div>
      <h5>Basic</h5>
      <Chart type="line" data={basicData} />
    </div>
  );
}
