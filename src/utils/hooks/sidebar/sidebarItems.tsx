import { GenerateSidebarChildrenTemplate } from "components";
import { MenuItem } from "primereact/menuitem";

export function sidebarItems() {
  const pltsLinks: MenuItem[] = [
    {
      label: "PLTS",
      items: [
        {
          label: "PLTS A",
          url: "/plts-a",
          template: (item, options) => (
            <GenerateSidebarChildrenTemplate item={item} options={options} />
          ),
        },
        {
          label: "PLTS B",
          url: "/plts-b",
          template: (item, options) => (
            <GenerateSidebarChildrenTemplate item={item} options={options} />
          ),
        },
        {
          label: "PLTS C",
          url: "/plts-c",
          template: (item, options) => (
            <GenerateSidebarChildrenTemplate item={item} options={options} />
          ),
        },
      ],
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

  return { pltsLinks, dashboardLinks, mapLinks };
}
