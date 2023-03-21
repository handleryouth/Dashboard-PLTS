import { Container } from "components";
import {
  AverageDashboard,
  ClusterTotalDashboard,
  MonitoringDashboard,
} from "./components";

export default function MainDashboard() {
  return (
    <>
      <div className="flex flex-col py-4">
        <Container>
          <MonitoringDashboard />
        </Container>

        <Container>
          <AverageDashboard />
        </Container>

        <Container>
          <ClusterTotalDashboard />
        </Container>
      </div>
    </>
  );
}
