import { Container } from "components";
import {
  AverageDashboard,
  MemoizedClusterTotalDashboard,
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
          <MemoizedClusterTotalDashboard />
        </Container>
      </div>
    </>
  );
}
