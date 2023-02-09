import {
  LoginRequestBody,
  LoginResponse,
  GeneratorDataProps,
  StaffRequestParams,
  StaffDataResponse,
  ActivateStaffBodyProps,
  ServiceMessageResponse,
  DeactivateStaffBodyProps,
  EditStaffBodyProps,
  GeneratorDataPropsExcludeDeviceType,
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
    response: ServiceMessageResponse<GeneratorDataProps>;
  }>;
  get_staff_list: ServiceStructure<{
    params: StaffRequestParams;
    response: StaffDataResponse;
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
  get_average: ServiceStructure<{
    response: ServiceMessageResponse<GeneratorDataPropsExcludeDeviceType[]>;
  }>;
}
