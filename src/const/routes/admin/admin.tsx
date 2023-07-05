import {
  Dashboard,
  Map,
  StaffManagement,
  StaffManagementEdit,
  PltsDetail,
  PltsForm,
  Plts,
  Position,
  PositionForm,
  Settings,
} from "pages";
import { RouteListProps } from "types";

export const ADMIN_ROUTES: RouteListProps[] = [
  {
    path: "/dashboard",
    name: "dashboard",
    element: <Dashboard />,
  },
  {
    name: "map",
    path: "/map",
    element: <Map />,
  },
  {
    name: "staffManagementEdit",
    path: "/staff-management/:id",
    element: <StaffManagementEdit />,
  },
  {
    name: "staffManagement",
    path: "/staff-management",
    element: <StaffManagement />,
  },
  {
    name: "pltsDetail",
    path: "/inverter/:id",
    element: <PltsDetail />,
  },
  {
    name: "pltsCreate",
    path: "/inverter/create",
    element: <PltsForm />,
  },
  {
    name: "pltsEdit",
    path: "/inverter/edit",
    element: <PltsForm edit />,
  },
  {
    name: "pltsList",
    path: "/inverter",
    element: <Plts />,
  },
  {
    name: "position",
    path: "/position",
    element: <Position />,
  },
  {
    name: "positionCreate",
    path: "/position/create",
    element: <PositionForm />,
  },
  {
    name: "positionEdit",
    path: "/position/edit",
    element: <PositionForm edit />,
  },
  {
    name: "settings",
    path: "/settings",
    element: <Settings />,
  },
  {
    name: "allPage",
    path: "*",
    element: <Dashboard />,
  },
];
