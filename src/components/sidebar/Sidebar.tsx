import { useMemo } from "react";
import { Sidebar as PrimereactSidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { sidebarItems } from "utils";
import { SidebarChildren } from "./components";
import { useSidebar } from "./context";

export default function Sidebar() {
  const { showDashboard, toggleDashboardInactive } = useSidebar();

  const { dashboardLinks, mapLinks, pltsLinks, aclLinks, positionLinks } =
    useMemo(() => sidebarItems(), []);

  return (
    <PrimereactSidebar
      visible={showDashboard}
      position="left"
      onHide={() => toggleDashboardInactive()}
      modal={false}
      showCloseIcon={false}
      dismissable
    >
      <div className="flex justify-between flex-col h-full prose">
        <div>
          <div>
            <h3 className="mt-0">Tony</h3>
            <p>rafaeltonydavid@yahoo.com</p>
          </div>

          <SidebarChildren groupLinks={dashboardLinks} />

          <SidebarChildren groupLinks={pltsLinks} />

          <SidebarChildren groupLinks={mapLinks} />

          <SidebarChildren groupLinks={positionLinks} />

          <SidebarChildren groupLinks={aclLinks} />
        </div>

        <Button
          label="Logout"
          className="w-full bg-red-500/40 text-red-500 hover:!bg-red-500 hover:!text-white"
        />
      </div>
    </PrimereactSidebar>
  );
}
