import { Sidebar as PrimereactSidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { SIDEBAR_OVERVIEW_LINKS, SIDEBAR_PLTS_LINKS } from "const";
import { SidebarChildren } from "./components";
import { useSidebar } from "./context";

export default function Sidebar() {
  const { showDashboard, toggleDashboard } = useSidebar();
  return (
    <PrimereactSidebar
      visible={showDashboard}
      position="left"
      onHide={() => toggleDashboard()}
    >
      <div className="flex justify-between flex-col h-full">
        <div>
          <div className="flex items-center mb-9">
            <img
              src="/elektro-its-logo.jpg"
              alt="logo"
              className="w-[47px] h-[47px] rounded-full"
            />
            <h1 className="text-3xl font-bold ml-4 text-black">Elektro ITS</h1>
          </div>

          <SidebarChildren
            headerTitle="Overview"
            linkPath={SIDEBAR_OVERVIEW_LINKS}
          />

          <SidebarChildren
            headerTitle="Overview"
            linkPath={SIDEBAR_PLTS_LINKS}
          />
        </div>

        <Button
          label="Logout"
          className="w-full bg-red-500/40 text-red-500 hover:!bg-red-500 hover:!text-white"
        />
      </div>
    </PrimereactSidebar>
  );
}
