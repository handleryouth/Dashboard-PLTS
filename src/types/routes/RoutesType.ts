import { RouteObject } from "react-router-dom";

export type RouteName =
  | "login"
  | "dashboard"
  | "signup"
  | "map"
  | "staffManagement"
  | "staffManagementEdit"
  | "pltsDetail";

export interface RouteListProps extends Omit<RouteObject, "name"> {
  name: RouteName;
}
