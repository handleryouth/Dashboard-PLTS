import {
  LoginRequestBody,
  LoginResponse,
  GeneratorDataProps,
  StaffRequestParams,
  ActivateStaffBodyProps,
  ServiceMessageResponse,
  DeactivateStaffBodyProps,
  EditStaffBodyProps,
  PLTSProfileBody,
  PLTSPositionBody,
  PLTSPositionDataResponse,
  PLTSListResponse,
  PLTSListParams,
  PLTSMapListResponse,
  PLTSProfileEditBody,
  PLTSPositionEditDataBody,
  PLTSProfileDeleteParams,
  PLTSProfileList,
  PltsProfileDetail,
  PLTSProfileDetailResponse,
  PLTSProfileDetailAverageParams,
  PLTSProfileDetailAverageResponse,
  StaffDetailRequestParams,
  StaffDataProps,
  PLTSAnalyticValueParams,
  PLTSAnalyticValueResponse,
  PLTSDataKeyParams,
  PLTSProfileParams,
  PLTSCSVDownloadFileParams,
  PLTSClusterValueParams,
  PLTSClusterValueResponse,
  PLTSTotalClusterParams,
  PLTSTotalClusterResponse,
  SignupParams,
  PLTSPositionParams,
  PLTSGetPowerParams,
  PLTSGetPowerResponse,
  SettingsBodyProps,
  SettingsGetResponse,
} from "types";
import { ServiceStructure } from "./service";

export interface ServiceURL {
  plts_get_plts_detail: ServiceStructure<{
    response: GeneratorDataProps;
  }>;
  plts_auth_login: ServiceStructure<{
    body: LoginRequestBody;
    response: ServiceMessageResponse<LoginResponse>;
  }>;
  plts_get_map_overview: ServiceStructure<{
    response: ServiceMessageResponse<GeneratorDataProps>;
  }>;
  get_staff_list: ServiceStructure<{
    params: StaffRequestParams;
    response: ServiceMessageResponse<StaffDataProps[]>;
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
  create_plts_profile: ServiceStructure<{
    body: PLTSProfileBody;
  }>;
  create_plts_position: ServiceStructure<{
    body: PLTSPositionBody;
  }>;
  get_plts_location: ServiceStructure<{
    params: PLTSPositionParams;
    response: ServiceMessageResponse<PLTSPositionDataResponse[]>;
  }>;
  get_plts_list: ServiceStructure<{
    params: PLTSListParams;
    response: ServiceMessageResponse<PLTSListResponse[]>;
  }>;
  get_plts_map: ServiceStructure<{
    response: ServiceMessageResponse<PLTSMapListResponse[]>;
  }>;
  patch_plts_profile: ServiceStructure<{
    body: PLTSProfileEditBody;
  }>;
  patch_plts_position: ServiceStructure<{
    body: PLTSPositionEditDataBody;
  }>;
  delete_plts_position: ServiceStructure<{
    params: PLTSProfileDeleteParams;
  }>;
  get_plts_profile_list: ServiceStructure<{
    params: PLTSProfileParams;
    response: ServiceMessageResponse<PLTSProfileList[]>;
  }>;
  get_plts_profile_detail: ServiceStructure<{
    params: PltsProfileDetail;
    response: ServiceMessageResponse<PLTSProfileDetailResponse>;
  }>;
  get_plts_profile_detail_average_value: ServiceStructure<{
    params: PLTSProfileDetailAverageParams;
    response: ServiceMessageResponse<PLTSProfileDetailAverageResponse>;
  }>;
  get_staff_detail: ServiceStructure<{
    params: StaffDetailRequestParams;
    response: ServiceMessageResponse<StaffDataProps>;
  }>;
  get_plts_average_file: ServiceStructure<{
    params: PLTSCSVDownloadFileParams;
    response: ServiceMessageResponse<string>;
  }>;
  get_plts_analytic_value: ServiceStructure<{
    params: PLTSAnalyticValueParams;
    response: ServiceMessageResponse<PLTSAnalyticValueResponse>;
  }>;
  delete_plts_profile: ServiceStructure<{
    params: PLTSProfileDeleteParams;
    response: ServiceMessageResponse;
  }>;
  get_plts_data_key: ServiceStructure<{
    params: PLTSDataKeyParams;
    response: ServiceMessageResponse<string[]>;
  }>;
  get_plts_cluster_value: ServiceStructure<{
    params: PLTSClusterValueParams;
    response: ServiceMessageResponse<PLTSClusterValueResponse>;
  }>;
  get_plts_total_cluster: ServiceStructure<{
    params: PLTSTotalClusterParams;
    response: ServiceMessageResponse<PLTSTotalClusterResponse>;
  }>;
  post_signup_data: ServiceStructure<{
    body: SignupParams;
  }>;
  plts_auth_logout: ServiceStructure<{
    response: ServiceMessageResponse;
  }>;
  plts_get_power: ServiceStructure<{
    params: PLTSGetPowerParams;
    response: ServiceMessageResponse<PLTSGetPowerResponse>;
  }>;
  plts_post_settings: ServiceStructure<{
    body: SettingsBodyProps;
    response: ServiceMessageResponse;
  }>;
  plts_get_settings: ServiceStructure<{
    response: ServiceMessageResponse<SettingsGetResponse>;
  }>;
}
