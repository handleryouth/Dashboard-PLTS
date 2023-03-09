import { Dashboard, Map, PltsDetail, Plts, Position } from "pages";
import { RouteListProps } from "types";

export const USER_ROUTES: RouteListProps[] = [
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
    name: "pltsDetail",
    path: "/plts/:id",
    element: <PltsDetail />,
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
    name: "allPage",
    path: "*",
    element: <Dashboard />,
  },
];
