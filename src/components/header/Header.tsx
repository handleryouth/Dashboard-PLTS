import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BreadCrumb } from "primereact/breadcrumb";
import { MenuItem } from "primereact/menuitem";

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
    <div className="bg-white">
      <BreadCrumb
        className=" mx-auto prose prose-a:my-0 prose-li:my-0  max-w-screen-bigDisplay min-w-[490px] border-none"
        model={breadcrumbMenu}
        home={home}
      />
    </div>
  );
}
