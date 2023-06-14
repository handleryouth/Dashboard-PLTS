import { Container } from "components";
import {
  AverageDashboard,
  ClusterTotalDashboard,
  EnergyDashboard,
  MonitoringDashboard,
  PowerDashboard,
} from "./components";

export default function MainDashboard() {
  return (
    <>
      <div className="flex flex-col gap-y-4">
        <Container>
          <MonitoringDashboard />
        </Container>

        <Container>
          <AverageDashboard />
        </Container>

        <Container>
          <PowerDashboard />
        </Container>

        <Container>
          <ClusterTotalDashboard />
        </Container>

        <Container>
          <EnergyDashboard />
        </Container>
      </div>
    </>
  );
}
