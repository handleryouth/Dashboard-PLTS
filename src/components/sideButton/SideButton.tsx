import { useSidebar } from "../sidebar";
import { Button } from "../button";

export default function SideButton() {
  const { showDashboard, toggleDashboardActive } = useSidebar();
  return (
    <div
      className={` flex items-center fixed  top-1/2 ${
        showDashboard ? "" : "z-[3]"
      }`}
    >
      <Button
        className="rounded-l-none p-4 bg-black"
        onClick={toggleDashboardActive}
      >
        <i className="pi pi-caret-right text-white" />
      </Button>
    </div>
  );
}
