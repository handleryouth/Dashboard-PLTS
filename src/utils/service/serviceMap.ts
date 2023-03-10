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
  get_staff_detail: {
    method: "GET",
    url: "/api/staff/detail",
  },
  get_average: {
    method: "GET",
    url: "/api/plts/average-plts",
  },
  create_plts_profile: {
    method: "POST",
    url: "/api/plts/add-plts",
  },
  create_plts_position: {
    method: "POST",
    url: "/api/plts/plts-position",
  },
  get_plts_location: {
    method: "GET",
    url: "/api/plts/plts-position",
  },
  get_plts_list: {
    method: "GET",
    url: "/api/plts/plts-list",
  },
  get_plts_map: {
    method: "GET",
    url: "/api/plts/plts-map",
  },
  patch_plts_profile: {
    method: "PATCH",
    url: "/api/plts/add-plts",
  },
  patch_plts_position: {
    method: "PATCH",
    url: "/api/plts/plts-position",
  },
  delete_plts_position: {
    method: "DELETE",
    url: "/api/plts/plts-position",
  },
  get_plts_profile_list: {
    method: "GET",
    url: "/api/plts/plts-name-list",
  },
  get_plts_profile_detail: {
    method: "GET",
    url: "/api/plts/plts-detail",
  },
  get_plts_profile_detail_average_value: {
    method: "GET",
    url: "/api/plts/average-plts",
  },
  get_plts_average_file: {
    method: "GET",
    url: "/api/plts/download-average-plts",
  },
  get_plts_analytic_value: {
    method: "GET",
    url: "/api/plts/analytic-value",
  },
  delete_plts_profile: {
    method: "DELETE",
    url: "/api/plts/delete-plts",
  },
  get_plts_data_key: {
    method: "GET",
    url: "/api/plts/plts-data-key",
  },
  get_plts_comparing_data_key: {
    method: "GET",
    url: "/api/plts/comparing-value-dataKey",
  },
  get_plts_comparing_value: {
    method: "GET",
    url: "/api/plts/comparing-value",
  },
  get_plts_cumulative_value: {
    method: "GET",
    url: "/api/plts/cumulative-value",
  },
};
