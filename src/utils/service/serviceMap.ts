import { RequestURLDetail } from "./service";
import { ServiceURL } from "./serviceURL";

type ServiceMapProps = Record<keyof ServiceURL, RequestURLDetail>;

export const serviceMap: ServiceMapProps = {
  plts_get_plts_detail: {
    method: "GET",
    url: "/api/plts/testing",
  },
  plts_auth_login: {
    method: "POST",
    url: "/api/login/",
  },
  plts_get_map_overview: {
    method: "GET",
    url: "/api/plts/map-overview",
  },
  get_staff_list: {
    method: "GET",
    url: "/api/staff",
  },
  activate_staff: {
    method: "POST",
    url: "/api/staff/activate",
  },
  deactivate_staff: {
    method: "POST",
    url: "/api/staff/deactivate",
  },
  edit_staff: {
    method: "POST",
    url: "/api/staff/detail",
  },
  get_average: {
    method: "GET",
    url: "/api/plts/average-plts",
  },
};
