import { Container } from "components";
import {
  AverageDashboard,
  CumulativeDashboard,
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
          <CumulativeDashboard />
        </Container>

        <Container>
          <AverageDashboard />
        </Container>
      </div>
    </>
  );
}
