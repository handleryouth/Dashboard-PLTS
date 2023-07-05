import { useCallback, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Sidebar as PrimereactSidebar } from "primereact/sidebar";
import { logout, sidebarItems } from "utils";
import { SidebarChildren } from "./components";
import { useSidebar } from "./context";
import { Button } from "../button";
import { BaseModal } from "../modal";

export default function Sidebar() {
  const { showDashboard, toggleDashboardInactive } = useSidebar();

  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const [cookies, , removeCookie] = useCookies([
    "staffData",
    "isLogin",
    "refreshToken",
    "accessToken",
  ]);

  const {
    dashboardLinks,
    mapLinks,
    pltsLinks,
    aclLinks,
    positionLinks,
    settingsLinks,
  } = useMemo(() => sidebarItems(), []);

  const signOut = useCallback(async () => {
    await logout({
      onLogoutFailure() {
        setShowModal(true);
      },
      onLogoutSuccess() {
        removeCookie("staffData");
        removeCookie("isLogin");
        navigate("/");
        toggleDashboardInactive();
        setShowModal(false);
      },
    });
  }, [navigate, removeCookie, toggleDashboardInactive]);

  return (
    <>
      <BaseModal
        header="Error Logout"
        onHide={() => setShowModal(false)}
        visible={showModal}
      >
        <p>Failed to logout. Please try again</p>
      </BaseModal>
      <PrimereactSidebar
        visible={showDashboard}
        position="left"
        onHide={toggleDashboardInactive}
        modal={false}
        showCloseIcon={false}
      >
        <div className="flex justify-between flex-col h-full prose">
          <div>
            <div>
              <h3 className="mt-0">{cookies?.staffData?.name ?? "-"}</h3>
              <p>{cookies?.staffData?.email ?? "-"}</p>
            </div>

            <SidebarChildren groupLinks={dashboardLinks} />

            <SidebarChildren groupLinks={pltsLinks} />

            <SidebarChildren groupLinks={mapLinks} />

            {cookies.staffData?.role === "admin" && (
              <>
                <SidebarChildren groupLinks={positionLinks} />
                <SidebarChildren groupLinks={aclLinks} />
                <SidebarChildren groupLinks={settingsLinks} />
              </>
            )}
          </div>

          <Button
            onClick={signOut}
            className="bg-red-500/40 text-red-500 hover:!bg-red-500 hover:!text-white transition-colors"
          >
            Log out
          </Button>
        </div>
      </PrimereactSidebar>
    </>
  );
}
