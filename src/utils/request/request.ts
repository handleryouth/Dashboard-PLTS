import { requestInstance } from "utils";
import { ServiceURL, serviceMap } from "../service";
import { AxiosResponse } from "axios";

export interface RequestHelperConfig<T extends keyof ServiceURL> {
  params?: Partial<ServiceURL[T]["params"]>;
  body?: Partial<ServiceURL[T]["body"]>;
  withCredentials?: boolean;
}

export async function requestHelper<T extends keyof ServiceURL>(
  requestKey: T,
  config?: RequestHelperConfig<T>
) {
  const { method, url } = serviceMap[requestKey];

  const loadData: AxiosResponse<ServiceURL[T]["response"]> =
    await requestInstance({
      method,
      url,
      params: config?.params,
      data: config?.body,
      withCredentials: config?.withCredentials,
    });

  return loadData;
}
