import { useCallback, useMemo } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Sidebar as PrimereactSidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { requestHelper, showModal, sidebarItems } from "utils";
import { SidebarChildren } from "./components";
import { useSidebar } from "./context";

export default function Sidebar() {
  const { showDashboard, toggleDashboardInactive } = useSidebar();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [cookies, , removeCookie] = useCookies([
    "staffData",
    "isLogin",
    "refreshToken",
    "accessToken",
  ]);

  const { dashboardLinks, mapLinks, pltsLinks, aclLinks, positionLinks } =
    useMemo(() => sidebarItems(), []);

  const signOut = useCallback(async () => {
    const response = await requestHelper("plts_auth_logout");

    if (response.status === 200) {
      removeCookie("staffData");
      removeCookie("isLogin");
      navigate("/");
      toggleDashboardInactive();
    } else {
      dispatch(
        showModal({
          message: response.data.message,
          title: "Error",
        })
      );
    }
  }, [dispatch, navigate, removeCookie, toggleDashboardInactive]);

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
            </>
          )}
        </div>

        <Button
          onClick={signOut}
          label="Logout"
          className="w-full bg-red-500/40 text-red-500 hover:!bg-red-500 hover:!text-white"
        />
      </div>
    </PrimereactSidebar>
  );
}
