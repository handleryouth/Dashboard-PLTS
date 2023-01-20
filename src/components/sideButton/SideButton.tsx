import { useSidebar } from "../sidebar";
import { Button } from "../button";

export default function SideButton() {
  const { showDashboard, toggleDashboardActive } = useSidebar();
  return (
    <div
      className={`h-full flex items-center fixed  ${
        showDashboard ? "" : "z-[9999]"
      }`}
    >
      <Button className="rounded-l-none p-4" onClick={toggleDashboardActive}>
        <i className="pi pi-caret-right text-white" />
      </Button>
    </div>
  );
}
