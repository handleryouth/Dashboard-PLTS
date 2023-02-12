import { AverageDashboard, MonitoringDashboard } from "./components";

export default function MainDashboard() {
  return (
    <div className="flex flex-col py-4">
      <MonitoringDashboard />
      <AverageDashboard />
    </div>
  );
}
