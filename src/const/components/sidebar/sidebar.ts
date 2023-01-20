import { MenuItem } from "primereact/menuitem";

export const PLTS_SIDEBAR_OVERVIEW_LINKS: MenuItem[] = [
  {
    label: "PLTS",
    items: [
      {
        label: "PLTS A",
        command: (e) => {
          console.log(e.item);
        },
      },
      {
        label: "PLTS B",
        url: "/plts-b",
      },
      {
        label: "PLTS C",
        url: "/plts-c",
      },
    ],
  },
];

