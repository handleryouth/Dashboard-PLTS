import {
  LoginRequestBody,
  LoginResponse,
  GeneratorDataProps,
  PLTSMap,
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
}
