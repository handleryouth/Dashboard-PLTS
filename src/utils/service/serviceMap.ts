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
};
