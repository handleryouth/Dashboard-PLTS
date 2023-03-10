import {
  LoginRequestBody,
  LoginResponse,
  GeneratorDataProps,
  StaffRequestParams,
  ActivateStaffBodyProps,
  ServiceMessageResponse,
  DeactivateStaffBodyProps,
  EditStaffBodyProps,
  GeneratorDataPropsExcludeDeviceType,
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
  PLTSComparingValueParams,
  PLTSComparingValueResponse,
  PLTSCumulativeValueResponse,
  PLTSCumulativeValueParams,
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
  get_average: ServiceStructure<{
    response: ServiceMessageResponse<GeneratorDataPropsExcludeDeviceType[]>;
  }>;
  create_plts_profile: ServiceStructure<{
    body: PLTSProfileBody;
  }>;
  create_plts_position: ServiceStructure<{
    body: PLTSPositionBody;
  }>;
  get_plts_location: ServiceStructure<{
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
    params: PLTSProfileDetailAverageParams;
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
  get_plts_comparing_data_key: ServiceStructure<{
    response: ServiceMessageResponse<string[]>;
  }>;
  get_plts_comparing_value: ServiceStructure<{
    params: PLTSComparingValueParams;
    response: ServiceMessageResponse<PLTSComparingValueResponse>;
  }>;
  get_plts_cumulative_value: ServiceStructure<{
    params: PLTSCumulativeValueParams;
    response: ServiceMessageResponse<PLTSCumulativeValueResponse>;
  }>;
}
