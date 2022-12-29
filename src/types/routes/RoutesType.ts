import { ComponentType } from "react";

export type RouteName = "login" | "dashboard" | "signup";

export interface RouteListProps {
  path: string;
  component: ComponentType<any>;
  name: RouteName;
}
