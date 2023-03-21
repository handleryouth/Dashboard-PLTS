import { GenerateSidebarChildrenTemplate } from "components";
import { MenuItem } from "primereact/menuitem";

export function sidebarItems() {
  const pltsLinks: MenuItem[] = [
    {
      label: "Inverter",
      url: "/inverter",
      template: (item, options) => (
        <GenerateSidebarChildrenTemplate item={item} options={options} />
      ),
    },
  ];

  const dashboardLinks: MenuItem[] = [
    {
      label: "Dashboard",
      url: "/",
      template: (item, options) => (
        <GenerateSidebarChildrenTemplate item={item} options={options} />
      ),
    },
  ];

  const mapLinks: MenuItem[] = [
    {
      label: "Map",
      url: "/map",
      template: (item, options) => (
        <GenerateSidebarChildrenTemplate item={item} options={options} />
      ),
    },
  ];

  const aclLinks: MenuItem[] = [
    {
      label: "Staff Management",
      url: "/staff-management",
      template: (item, options) => (
        <GenerateSidebarChildrenTemplate item={item} options={options} />
      ),
    },
  ];

  const positionLinks: MenuItem[] = [
    {
      label: "Position",
      url: "/position",
      template: (item, options) => (
        <GenerateSidebarChildrenTemplate item={item} options={options} />
      ),
    },
  ];

  return { pltsLinks, dashboardLinks, mapLinks, aclLinks, positionLinks };
}
