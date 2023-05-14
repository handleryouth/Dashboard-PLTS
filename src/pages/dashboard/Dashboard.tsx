import { Container, ErrorRefetch } from "components";
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
          <ErrorRefetch>
            <MonitoringDashboard />
          </ErrorRefetch>
        </Container>

        <Container>
          <ErrorRefetch>
            <AverageDashboard />
          </ErrorRefetch>
        </Container>

        <Container>
          <ErrorRefetch>
            <PowerDashboard />
          </ErrorRefetch>
        </Container>

        <Container>
          <ErrorRefetch>
            <ClusterTotalDashboard />
          </ErrorRefetch>
        </Container>

        <Container>
          <ErrorRefetch>
            <EnergyDashboard />
          </ErrorRefetch>
        </Container>
      </div>
    </>
  );
}
