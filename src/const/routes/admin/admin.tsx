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
    path: "/plts/:id",
    element: <PltsDetail />,
  },
  {
    name: "pltsCreate",
    path: "/plts/create",
    element: <PltsForm />,
  },
  {
    name: "pltsEdit",
    path: "/plts/edit",
    element: <PltsForm edit />,
  },
  {
    name: "pltsList",
    path: "/plts",
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
    name: "allPage",
    path: "*",
    element: <Dashboard />,
  },
];
