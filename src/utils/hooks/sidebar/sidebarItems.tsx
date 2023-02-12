import { GenerateSidebarChildrenTemplate } from "components";
import { MenuItem } from "primereact/menuitem";

export function sidebarItems() {
  const pltsLinks: MenuItem[] = [
    {
      label: "PLTS",
      items: [
        {
          label: "AJ301",
          url: "/plts-detail/aj301",
          template: (item, options) => (
            <GenerateSidebarChildrenTemplate item={item} options={options} />
          ),
        },
        {
          label: "Research Center",
          url: "/plts-detail/researchCenter",
          template: (item, options) => (
            <GenerateSidebarChildrenTemplate item={item} options={options} />
          ),
        },
        {
          label: "Rektorat ITS",
          url: "/plts-detail/rektoratITS",
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

  const aclLinks: MenuItem[] = [
    {
      label: "Staff Management",
      url: "/staff-management",
      template: (item, options) => (
        <GenerateSidebarChildrenTemplate item={item} options={options} />
      ),
    },
  ];

  return { pltsLinks, dashboardLinks, mapLinks, aclLinks };
}
