
import { Login, Dashboard, SignUp, Map } from "pages";
import { RouteListProps } from "types";

export const ROUTES_LIST: RouteListProps[] = [
  {
    path: "/",
    component: Dashboard,
    name: "dashboard",
  },
  {
    path: "/login",
    component: Login,
    name: "login",
  },
  {
    name: "signup",
    path: "/signup",
    component: SignUp,
  },
  {
    name: "map",
    path: "/map",
    component: Map,
  },
];
