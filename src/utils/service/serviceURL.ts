import {
  LoginRequestBody,
  LoginResponse,
  GeneratorDataProps,
  PLTSMap,
  StaffRequestParams,
  StaffDataResponse,
  ActivateStaffBodyProps,
  ServiceMessageResponse,
  DeactivateStaffBodyProps,
  EditStaffBodyProps,
} from "types";
import { ServiceStructure } from "./service";

export interface ServiceURL {
  plts_get_plts_detail: ServiceStructure<{
    response: GeneratorDataProps;
  }>;
  plts_auth_login: ServiceStructure<{
    body: LoginRequestBody;
    response: LoginResponse;
  }>;
  plts_get_map_overview: ServiceStructure<{
    response: PLTSMap;
  }>;
  get_staff_list: ServiceStructure<{
    response: StaffDataResponse;
    params: StaffRequestParams;
  }>;
  activate_staff: ServiceStructure<{
    body: ActivateStaffBodyProps;
    response: ServiceMessageResponse;
  }>;
  deactivate_staff: ServiceStructure<{
    body: ActivateStaffBodyProps;
    response: DeactivateStaffBodyProps;
  }>;
  edit_staff: ServiceStructure<{
    body: EditStaffBodyProps;
    response: ServiceMessageResponse;
  }>;
}
