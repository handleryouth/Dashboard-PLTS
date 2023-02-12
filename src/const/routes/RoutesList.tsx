import {
  Login,
  Dashboard,
  SignUp,
  Map,
  StaffManagement,
  StaffManagementEdit,
  PltsDetail,
} from "pages";
import { RouteListProps } from "types";

export const ROUTES_LIST: RouteListProps[] = [
  {
    path: "/",
    name: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "/login",
    element: <Login />,
    name: "login",
  },
  {
    name: "signup",
    path: "/signup",
    element: <SignUp />,
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
    path: "/plts-detail/:pltsName",
    element: <PltsDetail />,
  },
];
