import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BreadCrumb } from "primereact/breadcrumb";
import { MenuItem } from "primereact/menuitem";
import { Time } from "../time";

export default function Header() {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const getSplittedPathname = useMemo(() => {
    return pathname.split("/").filter(Boolean);
  }, [pathname]);

  const breadcrumbMenu = useMemo<MenuItem[]>(() => {
    return getSplittedPathname.map((item, index) => {
      const routeTo = `/${getSplittedPathname.slice(0, index + 1).join("/")}`;

      return {
        label: item,
        command: () => {
          navigate(routeTo);
        },
      };
    });
  }, [getSplittedPathname, navigate]);

  const home: MenuItem = useMemo(
    () => ({
      icon: "pi pi-home",
      label: "Dashboard",
      command: () => {
        navigate("/");
      },
    }),
    [navigate]
  );

  return (
    <div className="bg-white sticky top-0 z-20">
      <div className=" mx-auto flex items-center justify-between max-w-screen-bigDisplay min-w-[490px] px-4 py-4">
        <BreadCrumb
          className="prose prose-a:my-0 prose-li:my-0  border-none p-0"
          model={breadcrumbMenu}
          home={home}
        />

        <Time />
      </div>
    </div>
  );
}
